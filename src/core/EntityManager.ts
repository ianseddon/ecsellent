import { Entity, EntityId } from "./Entity";
import { Component } from "./Component";
import { EntityListener } from "./EntityListener";
import { Class } from './Class';
import { getClass } from "../utils/Class";

/**
 * Interface to allow mutation of entity ID.
 */
interface MutableIdEntity extends Entity {
  id: number;
}

export class EntityManager {
  /**
   * The ID of the next entity to be created.
   */
  protected nextEntityId: EntityId = 1;

  /**
   * A contiguous array of all entities.
   */
  protected entities: Entity[] = [];

  /**
   * The hash of all entities.
   */
  protected entityHash: Map<EntityId, Entity> = new Map();

  /**
   * The hash of entity listeners.
   */
  protected entityListeners: Map<Class<EntityListener>, EntityListener> = new Map();

  /**
   * Get the ID of the next created entity.
   */
  private acquireEntityId() : EntityId {
    return this.nextEntityId++;
  }

  /**
   * Create a new uninstantiated entity.
   */
  createEntity(): Entity {
    return new Entity();
  }

  /**
   * Get an array of all entities.
   */
  allEntities() : Entity[] {
    return this.entities;
  }

  /**
   * Add the given entity and instantiate it.
   *
   * @param entity The entity to add.
   */
  addEntity(entity: Entity) : Entity {
    if (entity.instantiated()) {
      throw new Error('Entity is already instantiated.');
    }

    (entity as MutableIdEntity).id = this.acquireEntityId();

    this.entities.push(entity);
    this.entityHash.set(entity.id, entity);

    // Notify entity listeners that a new entity was added.
    this.entityListeners.forEach(entityListener => entityListener.entityAdded(entity));

    return entity;
  }

  /**
   * Retrieve an entity by its ID.
   * @param entityId The ID of the entity to retrieve.
   */
  getEntity(entityId: EntityId): Entity | null {
    return this.entityHash.get(entityId) || null;
  }

  /**
   * Remove an entity by its ID.
   * @param entityId The ID of the entity to remove.
   */
  removeEntity(entityId: EntityId): void {
    const deleteEntity = this.entityHash.get(entityId);
    if (!deleteEntity) {
      return;
    }

    this.entityListeners.forEach(entityListener => entityListener.entityRemoved(deleteEntity));

    this.entities.splice(this.entities.indexOf(deleteEntity), 1);
    this.entityHash.delete(entityId);
  }

  /**
   * Add a listener that will be notified when entities are added/removed.
   * @param entityListener
   */
  addEntityListener(entityListener: EntityListener): void {
    this.entityListeners.set(getClass(entityListener), entityListener);
  }

  /**
   * Remove the entity listener of the given class.
   * @param entityListener
   */
  removeEntityListener<T extends EntityListener>(entityListenerClass: Class<T>): void {
    this.entityListeners.delete(entityListenerClass);
  }

  /**
   * Add a component to an entity.
   * @param entityId The ID of the entity.
   * @param component The class of the component to add.
   */
  addComponent<T extends Component>(entityId: EntityId, component: T): T | false {
    const entity = this.getEntity(entityId);

    return entity?.add(component) || false;
  }

  /**
   * Retrieve a component from an entity.
   * @param entityId The ID of the entity.
   * @param component The class of the component to retrieve.
   */
  getComponent<T extends Component>(entityId: EntityId, component: Class<T>): T | null {
    const entity = this.getEntity(entityId);

    return entity?.get(component) || null;
  }

  /**
   * Check whether an entity has the given component.
   * @param entityId The ID of the entity.
   * @param component The class of the component check for.
   */
  hasComponent<T extends Component>(entityId: EntityId, component: Class<T>): boolean {
    const entity = this.getEntity(entityId);
  
    return entity?.has(component) || false;
  }

  /**
   * Remove a component from an entity.
   * @param entityId The ID of the entity.
   * @param component The class of the component to remove.
   */
  removeComponent<T extends Component>(entityId: EntityId, component: Class<T>): void {
    const entity = this.getEntity(entityId);

    entity && entity.remove(component);
  }
}
