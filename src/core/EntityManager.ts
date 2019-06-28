import Entity from "./Entity";
import { Component, ComponentClass } from "./Component";
import EntityListener from "./EntityListener";

interface EntityManagerInterface {
  /**
   * Create a new entity.
   */
  createEntity() : Entity;

  /**
   * Retrieve an entity by its ID.
   * @param entityId The ID of the entity to retrieve.
   */
  getEntity(entityId: number) : Entity;

  /**
   * Remove an entity by its ID.
   * @param entityId The ID of the entity to remove.
   */
  removeEntity(entityId: number) : void;

  /**
   * Add a listener that will be notified when entities are added/removed.
   * @param entityListener
   */
  addEntityListener(entityListener: EntityListener) : void;

  /**
   * Remove the entity listener of the given class.
   * @param entityListener
   */
  removeEntityListener(entityListener: EntityListener) : void;

  /**
   * Add a component to an entity.
   * @param entityId The ID of the entity.
   * @param component The class of the component to add.
   */
  addComponent<T extends Component>(entityId: number, component: ComponentClass<T>) : T;

  /**
   * Retrieve a component from an entity.
   * @param entityId The ID of the entity.
   * @param component The class of the component to retrieve.
   */
  getComponent<T extends Component>(entityId: number, component: ComponentClass<T>) : T;

  /**
   * Check whether an entity has the given component.
   * @param entityId The ID of the entity.
   * @param component The class of the component check for.
   */
  hasComponent<T extends Component>(entityId: number, component: ComponentClass<T>) : boolean;

  /**
   * Remove a component from an entity.
   * @param entityId The ID of the entity.
   * @param component The class of the component to remove.
   */
  removeComponent<T extends Component>(entityId: number, component: ComponentClass<T>) : void;
}

class EntityManager implements EntityManagerInterface {
  /**
   * Add a component to an entity.
   * @param entityId The ID of the entity.
   * @param component The class of the component to add.
   */
  createEntity(): Entity {
    throw new Error("Method not implemented.");
  }

  /**
   * Retrieve an entity by its ID.
   * @param entityId The ID of the entity to retrieve.
   */
  getEntity(entityId: number): Entity {
    throw new Error("Method not implemented.");
  }

  /**
   * Remove an entity by its ID.
   * @param entityId The ID of the entity to remove.
   */
  removeEntity(entityId: number): void {
    throw new Error("Method not implemented.");
  }

  /**
   * Add a component to an entity.
   * @param entityId The ID of the entity.
   * @param component The class of the component to add.
   */
  addComponent<T extends Component>(entityId: number, component: ComponentClass<T>): T {
    throw new Error("Method not implemented.");
  }

  getComponent<T extends Component>(entityId: number, component: ComponentClass<T>): T {
    throw new Error("Method not implemented.");
  }

  /**
   * Check whether an entity has the given component.
   * @param entityId The ID of the entity.
   * @param component The class of the component check for.
   */
  hasComponent<T extends Component>(entityId: number, component: ComponentClass<T>): boolean {
    throw new Error("Method not implemented.");
  }

  /**
   * Remove a component from an entity.
   * @param entityId The ID of the entity.
   * @param component The class of the component to remove.
   */
  removeComponent<T extends Component>(entityId: number, component: ComponentClass<T>): void {
    throw new Error("Method not implemented.");
  }
}

export { EntityManager, EntityManagerInterface };