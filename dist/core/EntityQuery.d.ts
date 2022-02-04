import { Bitset } from "../utils/Bitset";
import { Class } from "./Class";
import { Component } from "./Component";
import { ComponentListener } from "./ComponentListener";
import { Entity, EntityId } from "./Entity";
import { EntityListener } from "./EntityListener";
import { EntityQueryListener } from "./EntityQueryListener";
import { EntityManager } from "./EntityManager";
import { UniqueId } from "./UniqueId";
declare type Condition = Class<Component>;
export declare type Conditions = {
    any?: Condition[];
    exclude?: Condition[];
    require?: Condition[];
};
export declare class EntityQuery implements ComponentListener, EntityListener {
    protected readonly any: Bitset;
    protected readonly require: Bitset;
    protected readonly exclude: Bitset;
    protected readonly entityManager: EntityManager;
    protected queryListeners: Map<UniqueId, EntityQueryListener>;
    /**
     * The results of the query.
     */
    results: Map<EntityId, Entity>;
    constructor(entityManager: EntityManager, conditions: Conditions);
    /**
     * Add a listener that will be notified when entities are added/removed from the query.
     *
     * @param entityListener
     */
    addQueryListener(queryListener: EntityQueryListener): void;
    /**
     * Remove the entity listener of the given class.
     *
     * @param entityListener
     */
    removeQueryListener<T extends EntityQueryListener>(queryListenerClass: Class<T>): void;
    /**
     * Entity listener callback.
     *
     * @param entity The entity added.
     */
    entityAdded(entity: Entity): void;
    /**
     * Entity listener callback.
     *
     * @param entity The entity removed.
     */
    entityRemoved(entity: Entity): void;
    /**
     * Component listener callback.
     *
     * @param entity The entity.
     * @param component The component being added.
     */
    componentAdded(entity: Entity, component: Component): void;
    /**
     * Component listener callback.
     *
     * @param entity The entity.
     * @param component The component being removed.
     */
    componentRemoved(entity: Entity, component: Component): void;
    /**
     * Add the given entity to the results.
     *
     * @param entity The entity to add.
     */
    protected addEntity(entity: Entity): void;
    /**
     * Remove the given entity to the results.
     *
     * @param entity The entity to remove.
     */
    protected removeEntity(entity: Entity): void;
    /**
     * Determine if the given entity matches the current conditions.
     *
     * @param entity The entity to match against.
     */
    protected match(entity: Entity): boolean;
    /**
     * Get whether the bitset matches the query.
     *
     * @param bitset The component bitset.
     * @returns Whether the query matches.
     */
    protected matchBitset(bitset: Bitset): boolean;
    /**
     * Check if the given component bitset contains all required components.
     *
     * @param components The component bitset to check.
     */
    protected containsRequired(components: Bitset): boolean;
    /**
     * Check if the given component bitset contains any of the any components.
     *
     * @param components The component bitset to check.
     */
    protected containsAny(components: Bitset): boolean;
    /**
     * Check if the given component bitset contains none of the excluded components.
     *
     * @param components The component bitset to check.
     */
    protected containsNone(components: Bitset): boolean;
}
export {};
