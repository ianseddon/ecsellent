import { System, SystemClass } from "./System";
import Engine from "./Engine";

interface SystemManagerInterface {
  /**
   * Register a system.
   * @param system The system to register.
   */
  addSystem(system: System) : void;

  /**
   * Retrieve the system of the given type.
   * @param systemClass The type of the system to retrieve.
   */
  getSystem<T extends System>(systemClass: SystemClass<T>) : T;

  /**
   * Remove a system.
   * @param system The system to remove.
   */
  removeSystem(system: System) : void;

  /**
   * Handle each systems logic each tick.
   * @param engine The engine the systems are attached to.
   * @param delta The delta.
   */
  update(engine: Engine, delta: number) : void;
}

/**
 * The default system manager implementation used by the engine.
 */
class SystemManager implements SystemManagerInterface {
  /**
   * Register a system.
   * @param system The system to register.
   */
  addSystem(system: System): void {
    throw new Error("Method not implemented.");
  }

  /**
   * Retrieve the system of the given type.
   * @param systemClass The type of the system to retrieve.
   */
  getSystem<T extends System>(systemClass: SystemClass<T>): T {
    throw new Error("Method not implemented.");
  }

  /**
   * Remove a system.
   * @param system The system to remove.
   */
  removeSystem(system: System): void {
    throw new Error("Method not implemented.");
  }

  /**
   * Handle each systems logic each tick.
   * @param engine The engine the systems are attached to.
   * @param delta The delta.
   */
  update(engine: Engine, delta: number): void {
    throw new Error("Method not implemented.");
  }
}

export { SystemManager, SystemManagerInterface };