import { Component } from './Component';
import { Class } from "./Class";
import { Bitset } from '../utils/Bitset';
export declare type EntityId = number;
/**
 * The base class for all entities.
 */
export declare class Entity {
    /**
     * The unique ID for this entity.
     *
     * Entities with id <= 0 are considered uninstantiated.
     */
    readonly id: EntityId;
    /**
     * A contiguous array of all components on the entity.
     */
    private components;
    /**
     * The hash of all components by class on the entity.
     */
    private componentHash;
    /**
     * A bitset representation of the components on the entity.
     */
    private componentBitset;
    /**
     * Whether the entity has been instantiated.
     */
    instantiated(): boolean;
    /**
     * Getter for the component bitset.
     */
    getComponentBitset(): Bitset;
    /**
     * Get all components.
     */
    all(): Component[];
    /**
     * Add a component to the entity.
     *
     * @param component The component to add.
     */
    add<T extends Component>(component: T): T;
    /**
     * Check whether the entity has a component of the given class.
     *
     * @param componentClass The component class.
     */
    has<T extends Component>(componentClass: Class<T>): boolean;
    /**
     * Retrieve the component of the given class.
     *
     * @param componentClass The component class.
     */
    get<T extends Component>(componentClass: Class<T>): T | null;
    /**
     * Remove the component of the given class.
     * There will only ever be one component of a class, so no specific reference is needed.
     *
     * @param componentClass The class of the component to remove.
     */
    remove<T extends Component>(componentClass: Class<T>): T | null;
    /**
     * Internal method to handle component addition.
     *
     * @param component The component to add.
     */
    private addComponent;
    /**
     * Internal getter for components.
     *
     * @param componentClass The class of the component to get.
     */
    private getComponent;
    /**
     * Internal method to handle component removal.
     *
     * @param componentClass The class of the component to remove.
     */
    private removeComponent;
}
