import { Component } from './Component';
import { Class } from "./Class";
import { Bitset } from '../utils/Bitset';
import { UniqueId } from './UniqueId';
import { EntityManager } from './EntityManager';

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
   * A contiguous array of all components on the entity.
   */
  private components : Component[] = [];

  /**
   * The hash of all components by class on the entity.
   */
  private componentHash : { [key: string]: Component } = {};

  /**
   * A bitset representation of the components on the entity.
   */
  private componentBitset: Bitset = new Bitset();

  private entityManager: EntityManager;

  constructor(entityManager: EntityManager) {
    this.entityManager = entityManager;
  }

  /**
   * Whether the entity has been instantiated.
   */
  instantiated() : boolean {
    return this.id > 0;
  }

  /**
   * Getter for the component bitset.
   */
  getComponentBitset() : Bitset {
    return this.componentBitset;
  }

  /**
   * Get all components.
   */
  all() : Component[] {
    return this.components;
  }

  /**
   * Add a component to the entity.
   *
   * @param component The component to add.
   */
  add<T extends Component>(component: T) : T {
    this.addComponent(component) // && this.engine && this.engine.XXX

    return component;
  }

  /**
   * Check whether the entity has a component of the given class.
   *
   * @param componentClass The component class.
   */
  has<T extends Component>(componentClass: Class<T>) : boolean {
    return this.componentBitset.test(UniqueId.forClass(componentClass).getIndex());
  }

  /**
   * Retrieve the component of the given class.
   *
   * @param componentClass The component class.
   */
  get<T extends Component>(componentClass: Class<T>) : T | null {
    return this.getComponent(UniqueId.forClass(componentClass)) as T || null;
  }

  /**
   * Remove the component of the given class.
   * There will only ever be one component of a class, so no specific reference is needed.
   *
   * @param componentClass The class of the component to remove.
   */
  remove<T extends Component>(componentClass: Class<T>) : T | null {
    return this.removeComponent(UniqueId.forClass(componentClass)) as T || null;
  }

  /**
   * Internal method to handle component addition.
   *
   * @param component The component to add.
   */
  private addComponent(component: Component) : boolean {
    const id = UniqueId.forInstance(component);
    const old = this.componentHash[id.getIndex()] || null;
    if (component === old) {
      return false;
    }

    this.entityManager?.componentAdded(this, component);
    
    // Remove the old component first.
    old && this.removeComponent(id);
    
    // Add the component to all data structures.
    this.componentHash[id.getIndex()] = component;
    this.components.push(component);
    this.componentBitset.set(id.getIndex());

    return true;
  }

  /**
   * Internal getter for components.
   *
   * @param componentClass The class of the component to get.
   */
  private getComponent(id: UniqueId) : Component | null {
    return this.componentHash[id.getIndex()] || null;
  }

  /**
   * Internal method to handle component removal.
   *
   * @param componentClass The class of the component to remove.
   */
  private removeComponent(id: UniqueId) : Component | null {
    const component = this.getComponent(id);
    if (component) {
      this.entityManager?.componentRemoved(this, component);

      delete this.componentHash[id.getIndex()];
      const index = this.components.indexOf(component);
      index !== -1 && this.components.splice(index, 1);
      this.componentBitset.reset(id.getIndex());
    }

    return component || null;
  }
}
