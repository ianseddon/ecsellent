import { getClass } from '../utils/Constructor';
import { Component } from './Component';
import { Class } from "./Types";

export type EntityId = number;

/**
 * The base class for all entities.
 */
export class Entity {

  /**
   * The unique ID for this entity.
   * 
   * Entities with id <= 0 are considered uninstantiated.
   */
  public readonly id: EntityId = 0;

  /**
   * The hash of all components by class on the entity.
   */
  private componentHash : Map<Class<Component>, Component> = new Map();

  /**
   * A contiguous array of all components on the entity.
   */
  private components : Component[] = [];

  /**
   * Whether the entity has been instantiated.
   */
  public instantiated() {
    return this.id > 0;
  }

  /**
   * Get all components.
   */
  public all() {
    return this.components;
  }

  /**
   * Add a component to the entity.
   *
   * @param component The component to add.
   */
  public add<T extends Component>(component: T) {
    // TODO: Emit event
    this.addComponent(component) // && this.engine && this.engine.XXX

    return component;
  }

  /**
   * Check whether the entity has a component of the given class.
   *
   * @param componentClass The component class.
   */
  public has<T extends Component>(componentClass: Class<T>) : boolean {
    return this.componentHash.has(componentClass);
  }

  /**
   * Retrieve the component of the given class.
   *
   * @param componentClass The component class.
   */
  public get<T extends Component>(componentClass: Class<T>) : T | null {
    return this.componentHash.get(componentClass) as T || null;
  }

  /**
   * Remove the component of the given class.
   * There will only ever be one component of a class, so no specific reference is needed.
   *
   * @param componentClass The class of the component to remove.
   */
  public remove<T extends Component>(componentClass: Class<T>) : T | null {
    // TODO: Emit event.
    return this.removeComponent(componentClass) as T || null;
  }

  /**
   * Internal method to handle component addition.
   *
   * @param component The component to add.
   */
  private addComponent(component: Component) : boolean {
    const type = getClass(component);
    const old = this.componentHash.get(type);
    if (component === old) {
      return false;
    }

    // Remove the old component first.
    old && this.removeComponent(type);

    // Add the component to both data structures.
    this.componentHash.set(type, component);
    this.components.push(component);

    return true;
  }

  /**
   * Internal method to handle component removal.
   *
   * @param componentClass The class of the component to remove.
   */
  private removeComponent(componentClass: Class<Component>) : Component | null {
    const component = this.get(componentClass);
    if (component) {
      this.components.splice(this.components.indexOf(component), 1);
      this.componentHash.delete(componentClass);
    }

    return component || null;
  }
}
