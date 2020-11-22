import { Bitset } from "../utils/Bitset";
import { getClass } from "../utils/Class";
import { Class } from "./Class";
import { Component } from "./Component";
import { Entity } from "./Entity";
import { EntityListener } from "./EntityListener";
import { EntityManagerInterface } from "./EntityManager";
import { UniqueId } from "./UniqueId";

type Condition = Class<Component>;
export type Conditions = { any?: Condition[], exclude?: Condition[], require?: Condition[] };

export class EntityQuery implements EntityListener {

  protected readonly any: Bitset;
  protected readonly require: Bitset;
  protected readonly exclude: Bitset;
  protected readonly entityManager: EntityManagerInterface;

  /**
   * The results of the query.
   */
  results: Entity[] = [];

  constructor(entityManager: EntityManagerInterface, conditions: Conditions) {
    this.any = UniqueId.bitsetForClasses(...conditions.any || []);
    this.require = UniqueId.bitsetForClasses(...conditions.require || []);
    this.exclude = UniqueId.bitsetForClasses(...conditions.exclude || []);
    this.entityManager = entityManager;

    if (this.any.count() == 0 && this.require.count() === 0 && this.exclude.count() === 0) {
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

  /**
   * Add the given entity to the results.
   *
   * @param entity The entity to add.
   */
  protected addEntity(entity: Entity) : void {
    this.results.push(entity);
  }

  /**
   * Remove the given entity to the results.
   *
   * @param entity The entity to remove.
   */
  protected removeEntity(entity: Entity) : void {
    const index = this.results.indexOf(entity);
    index !== -1 && this.results.splice(index, 1);
  }

  /**
   * Determine if the given entity matches the current conditions.
   *
   * @param entity The entity to match against.
   */
  protected match(entity: Entity) : boolean {
    const mask = UniqueId.bitsetForClasses(...entity.all().map(getClass));
    return mask.containsAll(this.require)
      && (this.any.none() ? true : mask.intersects(this.any))
      && !mask.intersects(this.exclude);
  }

}