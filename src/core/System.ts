import Engine from "./Engine";
import { Component } from "./Component";
import { ComponentListener } from "./ComponentListener";
import { Entity } from "./Entity";
import { EntityListener } from "./EntityListener";
import { EntityManager } from "./EntityManager";
import { Conditions, EntityQuery } from "./EntityQuery";
import { EntityQueryListener } from "./EntityQueryListener";
import { UniqueId } from "./UniqueId";

/**
 * The base class for all systems. These are intended to process entities.
 */
export abstract class System implements ComponentListener, EntityListener {

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
    console.log('addedToEngine');
    
    this.buildQueries(engine.entityManager);
  }

  /**
   * Called when this system is removed from the engine.
   *
   * @param engine The engine this system is attached to.
   */
  removedFromEngine(engine: Engine): void {
    engine.entityManager.removeEntityListener(this);
    engine.entityManager.removeComponentListener(this);

    this.cleanupQueries(engine.entityManager);
    this.engine = null;
  }

  /**
   * 
   * @param entity 
   */
  entityAdded(entity: Entity) {
    Object.values(this.queries).forEach((query) => query.entityAdded(entity));
  }

  /**
   * 
   * @param entity 
   */
  entityRemoved(entity: Entity) {
    Object.values(this.queries).forEach((query) => query.entityRemoved(entity));
  }

  /**
   * 
   * @param entity 
   * 
   * @param component 
   */
  componentAdded(entity: Entity, component: Component) {
    Object.entries(this.queries).forEach(([key, query]) => query.componentAdded(entity, component)); 
  }

  /**
   * 
   * @param entity 
   * @param component 
   */
  componentRemoved(entity: Entity, component: Component) {
    Object.entries(this.queries).forEach(([key, query]) => query.componentRemoved(entity, component));
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
      this.queries[key].addQueryListener({
        queryEntityAdded: (entity: Entity) => this.queryEntityAdded(key, entity),
        queryEntityRemoved: (entity: Entity) => this.queryEntityRemoved(key, entity),
      });
    });

    // Add listeners for notifying queries of changes.
    entityManager.addEntityListener(this);
    entityManager.addComponentListener(this);
  }

  /**
   * Notifies when an entity is added to a query result.
   * 
   * @param key The condition key.
   * @param entity The entity.
   */
  queryEntityAdded(key: string, entity: Entity) {}

  /**
   * Notifies when an entity is removed from a query result.
   * 
   * @param key The condition key.
   * @param entity The entity.
   */
  queryEntityRemoved(key: string, entity: Entity) {}

  /**
   * Clean up queries.
   */
  protected cleanupQueries(entityManager: EntityManager) : void {
    this.queries = {};
  }
}
