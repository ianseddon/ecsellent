import Engine from "./Engine";
import { EntityManager } from "./EntityManager";
import { Conditions, EntityQuery } from "./EntityQuery";

/**
 * The base class for all systems. These are intended to process entities.
 */
export abstract class System {

  /**
   * The engine this is attached to.
   */
  protected engine: Engine | null = null;

  /**
   * The priority this system should be given.
   *
   * A lower number is given higher priority.
   */
  protected priority = 0;

  /**
   * The queries for this system.
   */
  protected queries: { [key: string]: EntityQuery } = {};

  /**
   * This can be overridden by systems that require queried entities.
   */
  protected conditions: { [key: string]: Conditions } = {};

  /**
   * Get the priority.
   */
  getPriority() : number {
    return this.priority;
  }

  /**
   * Set the priority.
   *
   * @param priority The priority.
   */
  setPriority(priority: number) : void {
    this.priority = priority;
    // TODO: Trigger system sorting.
  }

  /**
   * Called when this system is added to the engine.
   *
   * @param engine The engine this system is attached to.
   */
  addedToEngine(engine: Engine): void {
    this.engine = engine;
    this.buildQueries(engine.entityManager);
  }

  /**
   * Called when this system is removed from the engine.
   *
   * @param engine The engine this system is attached to.
   */
  removedFromEngine(engine: Engine): void {
    this.cleanupQueries(engine.entityManager);
    this.engine = null;
  }

  /**
   * Handle processing of entities or other logic every tick.
   * @param engine The engine this system is attached to.
   * @param delta Frame tick delta.
   */
  abstract update(delta: number) : void;

  /**
   * Build queries from the conditions against the given entity manager.
   *
   * @param entityManager The entity manager.
   */
  protected buildQueries(entityManager: EntityManager) : void {
    Object.entries(this.conditions).forEach(([key, conditions]) => {
      this.queries[key] = new EntityQuery(entityManager, conditions);
    });
  }

  /**
   * Clean up queries.
   */
  protected cleanupQueries(entityManager: EntityManager) : void {
    // TODO: Unregister entity listeners.
    this.queries = {};
  }
}
