import { Bitset } from "../utils/Bitset";
import { Class } from "./Class";
export declare class UniqueId {
    static anonymousIndex: number;
    private readonly baseIndex;
    private readonly index;
    private readonly depth;
    constructor(baseIndex: number, index: number, depth: number);
    /**
     * Get the base index.
     */
    getBaseIndex(): number;
    /**
     * Get the index.
     */
    getIndex(): number;
    /**
     * Get a string hash for this ID.
     */
    hash(): string;
    /**
     * Static ID generator for an instance of a class.
     *
     * @param instance The instance to generate an ID for.
     */
    static forInstance(instance: unknown): UniqueId;
    /**
     * Static ID generator for the given class.
     *
     * @param clazz The class to generate an ID for.
     */
    static forClass(clazz: Class<unknown>): UniqueId;
    /**
     * Generate a bitset from the given list of classes.
     *
     * @param classes List of classes.
     */
    static bitsetForClasses(...classes: Array<Class<unknown>>): Bitset;
}
