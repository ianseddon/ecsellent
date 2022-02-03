import { Entity, EntityId } from "./Entity";
import { Component } from "./Component";
import { EntityListener } from "./EntityListener";
import { Class } from './Class';
export declare class EntityManager {
    /**
     * The ID of the next entity to be created.
     */
    protected nextEntityId: EntityId;
    /**
     * A contiguous array of all entities.
     */
    protected entities: Entity[];
    /**
     * The hash of all entities.
     */
    protected entityHash: Map<EntityId, Entity>;
    /**
     * The hash of entity listeners.
     */
    protected entityListeners: Map<Class<EntityListener>, EntityListener>;
    /**
     * Get the ID of the next created entity.
     */
    private acquireEntityId;
    /**
     * Create a new uninstantiated entity.
     */
    createEntity(): Entity;
    /**
     * Get an array of all entities.
     */
    allEntities(): Entity[];
    /**
     * Add the given entity and instantiate it.
     *
     * @param entity The entity to add.
     */
    addEntity(entity: Entity): Entity;
    /**
     * Retrieve an entity by its ID.
     * @param entityId The ID of the entity to retrieve.
     */
    getEntity(entityId: EntityId): Entity | null;
    /**
     * Remove an entity by its ID.
     * @param entityId The ID of the entity to remove.
     */
    removeEntity(entityId: EntityId): void;
    /**
     * Add a listener that will be notified when entities are added/removed.
     * @param entityListener
     */
    addEntityListener(entityListener: EntityListener): void;
    /**
     * Remove the entity listener of the given class.
     * @param entityListener
     */
    removeEntityListener<T extends EntityListener>(entityListenerClass: Class<T>): void;
    /**
     * Add a component to an entity.
     * @param entityId The ID of the entity.
     * @param component The class of the component to add.
     */
    addComponent<T extends Component>(entityId: EntityId, component: T): T | false;
    /**
     * Retrieve a component from an entity.
     * @param entityId The ID of the entity.
     * @param component The class of the component to retrieve.
     */
    getComponent<T extends Component>(entityId: EntityId, component: Class<T>): T | null;
    /**
     * Check whether an entity has the given component.
     * @param entityId The ID of the entity.
     * @param component The class of the component check for.
     */
    hasComponent<T extends Component>(entityId: EntityId, component: Class<T>): boolean;
    /**
     * Remove a component from an entity.
     * @param entityId The ID of the entity.
     * @param component The class of the component to remove.
     */
    removeComponent<T extends Component>(entityId: EntityId, component: Class<T>): void;
}
