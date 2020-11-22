import { Class } from "./Class";
import { Component } from "./Component";
import { Entity } from "./Entity";
import { EntityListener } from "./EntityListener";
import { EntityManager } from "./EntityManager";

type Condition = Class<Component>;
export type Conditions = { require: Condition[], exclude: Condition[] };

export class EntityQuery implements EntityListener {

  protected readonly conditions: Conditions;

  protected readonly entityManager: EntityManager;

  results: Entity[] = [];

  constructor(entityManager: EntityManager, conditions: Conditions) {
    this.conditions = conditions;
    this.entityManager = entityManager;

    if (this.conditions.require.length === 0 && this.conditions.exclude.length === 0) {
      throw new Error('Cannot create an empty query.');
    }

    // Populate the results from any existing entities.
    this.results = this.entityManager.allEntities().filter(this.match.bind(this));
    // Add this query as an entity listener.
    this.entityManager.addEntityListener(this);
  }

  /**
   * Entity listener callback.
   *
   * @param entity The entity added.
   */
  entityAdded(entity: Entity): void {
    this.match(entity) && this.addEntity(entity);
  }

  /**
   * Entity listener callback.
   *
   * @param entity The entity removed.
   */
  entityRemoved(entity: Entity): void {
    this.match(entity) && this.removeEntity(entity);
  }

  protected addEntity(entity: Entity) : void {
    this.results.push(entity);
  }

  protected removeEntity(entity: Entity) : void {
    this.results.splice(this.results.indexOf(entity), 1);
  }

  /**
   * Determine if the given entity matches the current conditions.
   *
   * @param entity The entity to match against.
   */
  protected match(entity: Entity) : boolean {
    return !!this.conditions.require.reduce((match, condition) => match && entity.has(condition), true)
      && !!this.conditions.exclude.reduce((excludes, condition) => excludes && !entity.has(condition), true);
  }

}