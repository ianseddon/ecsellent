import { System } from "./System";
import Engine from "./Engine";
import { Class } from "./Class";
import { UniqueId } from "./UniqueId";

/**
 * The default system manager implementation used by the engine.
 */
export class SystemManager {

  /**
   * The associated engine.
   */
  private engine: Engine;

  /**
   * A contiguous array of systmes ordered by priority.
   */
  private systems: System[] = [];

  /**
   * The hash of systems.
   */
  private systemHash: { [key: string]: System } = {}

  /**
   * Whether the update loop is currently in progress.
   */
  private updating = false;

  constructor(engine: Engine) {
    this.engine = engine;
  }

  /**
   * Whether systems are in the middle of updating.
   */
  public isUpdating() : boolean {
    return this.updating;
  }

  /**
   * Register a system.
   *
   * @param system The system to register.
   */
  addSystem(system: System): System {
    const id = UniqueId.forInstance(system);
    const old = this.systemHash[id.getIndex()] || null;

    old && this.removeSystemInternal(id);

    this.systems.push(system);
    this.systemHash[id.getIndex()] = system;

    system.addedToEngine(this.engine);

    this.sortSystems();
    return system;
  }

  /**
   * Retrieve the system of the given type.
   *
   * @param systemClass The type of the system to retrieve.
   */
  getSystem<T extends System>(systemClass: Class<T>): T | null {
    const id = UniqueId.forClass(systemClass);
    return (this.getSystemInternal(id) as T) || null;
  }

  /**
   * Remove a system.
   *
   * @param system The system to remove.
   */
  removeSystem<T extends System>(systemClass: Class<T>) : void {
    this.removeSystemInternal(UniqueId.forClass(systemClass));
  }

  /**
   * Handle each system's logic each tick.
   *
   * @param engine The engine the systems are attached to.
   * @param delta The delta.
   */
  update(delta: number): void {
    this.updating = true;
    for (const system of this.systems) {
      system.update(delta);
    }
    this.updating = false;
  }

  /**
   * Internal method to get systems by ID.
   *
   * @param id The system ID.
   */
  private getSystemInternal(id: UniqueId) : System | null {
    return this.systemHash[id.getIndex()] || null;
  }

  /**
   * Internal method to handle system removal.
   *
   * @param id The system ID.
   */
  private removeSystemInternal(id: UniqueId) : System | null {
    const system = this.getSystemInternal(id);
    if (system) {
      delete this.systemHash[id.getIndex()];
      const index = this.systems.indexOf(system);
      index !== -1 && this.systems.splice(index, 1);
    }
    return system;
  }

  /**
   * Sort the systems by priority.
   */
  private sortSystems() {
    this.systems.sort((a, b) => a.getPriority() - b.getPriority());
  }
}
