import { Entity } from "./Entity";
import { Component } from "./Component";
export interface ComponentListener {
    /**
     * Listener for when an entity is added.
     * @param entity The entity that was added.
     */
    componentAdded(entity: Entity, component: Component): void;
    /**
     * Listener for when an entity is removed.
     * @param entity The entity that was removed.
     */
    componentRemoved(entity: Entity, component: Component): void;
}
