import Engine from "./Engine";

interface System {
  /**
   * Called when this system is added to the engine.
   * @param engine The engine this system is attached to.
   */
  addedToEngine(engine: Engine) : void;

  /**
   * Called when this system is removed from the engine.
   * @param engine The engine this system is attached to.
   */
  removedFromEngine(engine: Engine) : void;

  /**
   * Handle processing of entities or other logic every tick.
   * @param engine The engine this system is attached to.
   * @param delta Frame tick delta.
   */
  update(engine: Engine, delta: number) : void;
}

/**
 * Interface enabling usage of type as value.
 */
interface SystemClass<T extends System> {
  new() : T;
}

/**
 *
 */
abstract class AbstractSystem implements System {
  /**
   * Called when this system is added to the engine.
   * @param engine The engine this system is attached to.
   */
  addedToEngine(engine: Engine): void {
    throw new Error("Method not implemented.");
  }

  /**
   * Called when this system is removed from the engine.
   * @param engine The engine this system is attached to.
   */
  removedFromEngine(engine: Engine): void {
    throw new Error("Method not implemented.");
  }

  /**
   * Handle processing of entities or other logic every tick.
   * @param engine The engine this system is attached to.
   * @param delta Frame tick delta.
   */
  abstract update(engine: Engine, delta: number) : void;
}

export { AbstractSystem, System, SystemClass };