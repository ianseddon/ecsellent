import { Bitset } from "../utils/Bitset";
import { getClass, getClassDepth, getParentClass } from "../utils/Class";
import { Class } from "./Class";

/**
 * Singleton registry to keep uniqueness for IDs.
 */
const classRegister = [0];

export class UniqueId {

  public static anonymousIndex: number = 0;

  private readonly baseIndex: number;
  private readonly index: number;
  private readonly depth: number;

  constructor(baseIndex: number, index: number, depth: number) {
    this.baseIndex = baseIndex;
    this.index = index;
    this.depth = depth;
  }

  /**
   * Get the base index.
   */
  getBaseIndex() : number {
    return this.baseIndex;
  }

  /**
   * Get the index.
   */
  getIndex() : number {
    return this.index;
  }

  /**
   * Get a string hash for this ID.
   */
  hash() : string {
    return `${this.baseIndex}#${this.index}`;
  }

  /**
   * Static ID generator for an instance of a class.
   *
   * @param instance The instance to generate an ID for.
   */
  static forInstance(instance: unknown) : UniqueId {
    return UniqueId.forClass(getClass(instance));
  }

  /**
   * Static ID generator for the given class.
   *
   * @param clazz The class to generate an ID for. 
   */
  static forClass(clazz: Class<unknown>) : UniqueId {
    let uniqueId = clazz.__uniqueId;
    const depth = getClassDepth(clazz);

    // Create unique IDs for every anonymous object.
    if (clazz.name === 'Object') {
      return new UniqueId(-2, this.anonymousIndex++, 0);
    }

    if (!uniqueId || uniqueId.depth !== depth) {
      // If we don't have a unique ID for this class and it's
      // the base class, start filling the registry array.
      if (!uniqueId && depth === 0) {
        const index = classRegister.length;
        classRegister.push(0);
        uniqueId = new UniqueId(-1, index, depth);
      }
      // If this isn't the base class, or we already have an ID
      // for this class, increment the counter for this class.
      else {
        const baseClass = getParentClass(clazz, depth);
        // This will backfill the registry array for any classes in
        // the class parentage that don't have an entry.
        const baseUniqueId = UniqueId.forClass(baseClass);
        const baseIndex = baseUniqueId.index;
        const index = classRegister[baseIndex]++;
        uniqueId = new UniqueId(baseIndex, index, depth);
      }
      clazz.__uniqueId = uniqueId;
    }

    return uniqueId;
  }

  /**
   * Generate a bitset from the given list of classes.
   *
   * @param classes List of classes.
   */
  static bitsetForClasses(...classes: Array<Class<unknown>>) : Bitset {
    const bitset = new Bitset();
    classes.forEach(clazz => bitset.set(UniqueId.forClass(clazz).getIndex()));

    return bitset;
  }
}