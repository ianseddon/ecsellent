import { Entity } from "./Entity";
export interface EntityQueryListener {
    /**
     * Listener for when an entity is added to query results.
     *
     * @param entity The entity that was added.
     */
    queryEntityAdded(entity: Entity): void;
    /**
     * Listener for when an entity is removed from query results.
     *
     * @param entity The entity that was removed.
     */
    queryEntityRemoved(entity: Entity): void;
}
