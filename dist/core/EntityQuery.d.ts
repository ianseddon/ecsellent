import { Bitset } from "../utils/Bitset";
import { Class } from "./Class";
import { Component } from "./Component";
import { Entity } from "./Entity";
import { EntityListener } from "./EntityListener";
import { EntityManager } from "./EntityManager";
declare type Condition = Class<Component>;
export declare type Conditions = {
    any?: Condition[];
    exclude?: Condition[];
    require?: Condition[];
};
export declare class EntityQuery implements EntityListener {
    protected readonly any: Bitset;
    protected readonly require: Bitset;
    protected readonly exclude: Bitset;
    protected readonly entityManager: EntityManager;
    /**
     * The results of the query.
     */
    results: Entity[];
    constructor(entityManager: EntityManager, conditions: Conditions);
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
