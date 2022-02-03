import { Entity } from "./Entity";
export interface EntityListener {
    /**
     * Listener for when an entity is added.
     * @param entity The entity that was added.
     */
    entityAdded(entity: Entity): void;
    /**
     * Listener for when an entity is removed.
     * @param entity The entity that was removed.
     */
    entityRemoved(entity: Entity): void;
}
