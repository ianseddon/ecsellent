import { Bitset } from "../utils/Bitset";
import { Class } from "./Class";
import { Component } from "./Component";
import { ComponentListener } from "./ComponentListener";
import { Entity, EntityId } from "./Entity";
import { EntityListener } from "./EntityListener";
import { EntityQueryListener } from "./EntityQueryListener";
import { EntityManager } from "./EntityManager";
import { UniqueId } from "./UniqueId";
import { getClass } from "../utils/Class";

type Condition = Class<Component>;
export type Conditions = { any?: Condition[], exclude?: Condition[], require?: Condition[] };

export class EntityQuery implements ComponentListener, EntityListener {

  protected readonly any: Bitset;
  protected readonly require: Bitset;
  protected readonly exclude: Bitset;
  protected readonly entityManager: EntityManager;

  protected queryListeners: Map<UniqueId, EntityQueryListener> = new Map();

  /**
   * The results of the query.
   */
  results: Map<EntityId, Entity> = new Map();

  constructor(entityManager: EntityManager, conditions: Conditions) {
    this.any = UniqueId.bitsetForClasses(...conditions.any || []);
    this.require = UniqueId.bitsetForClasses(...conditions.require || []);
    this.exclude = UniqueId.bitsetForClasses(...conditions.exclude || []);
    this.entityManager = entityManager;

    if (this.any.count() == 0 && this.require.count() === 0 && this.exclude.count() === 0) {
      throw new Error('Cannot create an empty query.');
    }

    // Populate the results from any existing entities.
    this.entityManager.allEntities().filter(this.match.bind(this)).forEach((entity) => {
      this.results.set(entity.id, entity);
    });
  }

  /**
   * Add a listener that will be notified when entities are added/removed from the query.
   * 
   * @param entityListener
   */
  addQueryListener(queryListener: EntityQueryListener): void {
    this.queryListeners.set(UniqueId.forInstance(queryListener), queryListener);
  }

  /**
   * Remove the entity listener of the given class.
   * 
   * @param entityListener
   */
  removeQueryListener<T extends EntityQueryListener>(queryListenerClass: Class<T>): void {
    this.queryListeners.delete(UniqueId.forClass(queryListenerClass));
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
   * Component listener callback.
   * 
   * @param entity The entity.
   * @param component The component being added.
   */
  componentAdded(entity: Entity, component: Component) {
    const id = UniqueId.forInstance(component);
    const updated = (new Bitset)
      .set(id.getIndex())
      .or(entity.getComponentBitset());

    const currentMatch = this.match(entity);
    const willMatch = this.matchBitset(updated);

    !currentMatch && willMatch && this.addEntity(entity);
    currentMatch && !willMatch && this.removeEntity(entity);
  }

  /**
   * Component listener callback.
   * 
   * @param entity The entity.
   * @param component The component being removed.
   */
  componentRemoved(entity: Entity, component: Component) {
    const id = UniqueId.forInstance(component);
    const updated = (new Bitset)
      .set(id.getIndex())
      .xor(entity.getComponentBitset());

    const currentMatch = this.match(entity);
    const willMatch = this.matchBitset(updated);

    !currentMatch && willMatch && this.addEntity(entity);
    currentMatch && !willMatch && this.removeEntity(entity);
  }

  /**
   * Add the given entity to the results.
   *
   * @param entity The entity to add.
   */
  protected addEntity(entity: Entity) : void {
    if (this.results.has(entity.id)) {
      return;
    }

    this.queryListeners.forEach(queryListener => queryListener.queryEntityAdded(entity));

    this.results.set(entity.id, entity);
  }

  /**
   * Remove the given entity to the results.
   *
   * @param entity The entity to remove.
   */
  protected removeEntity(entity: Entity) : void {
    if (!this.results.has(entity.id)) {
      return;
    }

    this.queryListeners.forEach(queryListener => queryListener.queryEntityRemoved(entity));
    this.results.delete(entity.id);
  }

  /**
   * Determine if the given entity matches the current conditions.
   *
   * @param entity The entity to match against.
   */
  protected match(entity: Entity) : boolean {
    const components = entity.getComponentBitset();

    return this.matchBitset(components);
  }

  /**
   * Get whether the bitset matches the query.
   * 
   * @param bitset The component bitset.
   * @returns Whether the query matches.
   */
  protected matchBitset(bitset: Bitset) : boolean {
    return this.containsRequired(bitset)
      && this.containsAny(bitset)
      && this.containsNone(bitset);
  }

  /**
   * Check if the given component bitset contains all required components.
   * 
   * @param components The component bitset to check.
   */
  protected containsRequired(components: Bitset) : boolean {
    return components.containsAll(this.require);
  }

  /**
   * Check if the given component bitset contains any of the any components.
   * 
   * @param components The component bitset to check.
   */
  protected containsAny(components: Bitset) : boolean {
    return this.any.none() ? true : components.intersects(this.any);
  }

  /**
   * Check if the given component bitset contains none of the excluded components.
   *
   * @param components The component bitset to check.
   */
  protected containsNone(components: Bitset) : boolean {
    return !components.intersects(this.exclude);
  }
}