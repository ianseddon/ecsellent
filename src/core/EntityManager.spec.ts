import { EntityListener } from "./EntityListener";
import { EntityManager } from "./EntityManager";

let entityManager : EntityManager;

beforeEach(() => {
  entityManager = new EntityManager();
})

describe('EntityManager', () => {
  it('creates uninstantiated entities', () => {
    expect(entityManager.createEntity().instantiated()).toBe(false);
    expect(entityManager.allEntities()).toHaveLength(0);
  });

  it('adds entities and instantiates them', () => {
    expect(entityManager.addEntity(entityManager.createEntity()).instantiated()).toBe(true);
    expect(entityManager.allEntities()).toHaveLength(1);
  });

  it('wont instantiate an entity twice', () => {
    const entity = entityManager.addEntity(entityManager.createEntity());
    expect(() => entityManager.addEntity(entity)).toThrowError();
  });

  it('adds entities with unique ids', () => {
    const e1 = entityManager.createEntity();
    const e2 = entityManager.createEntity();

    expect(entityManager.addEntity(e1).id).not.toEqual(entityManager.addEntity(e2).id);
    expect(entityManager.allEntities()).toHaveLength(2);
  });

  it('gets entities by id', () => {
    const entity = entityManager.addEntity(entityManager.createEntity());
    
    expect(entityManager.getEntity(entity.id)).toEqual(entity);
  });

  it('removes entities by id', () => {
    const entity = entityManager.addEntity(entityManager.createEntity());
    entityManager.removeEntity(entity.id);

    expect(entityManager.getEntity(entity.id)).toBeNull();
    expect(entityManager.allEntities()).toHaveLength(0);
  });

  class TestListener implements EntityListener {
    added = false;
    removed = false;
    entityAdded() {
      this.added = true;
    }

    entityRemoved() {
      this.removed = true;
    }
  }

  it('adds entity listeners', () => {
    const listener = new TestListener();
    entityManager.addEntityListener(listener);
    entityManager.addEntity(entityManager.createEntity());

    expect(listener.added).toBe(true);
  });

  it('removes entity listeners', () => {
    const listener = new TestListener();
    entityManager.addEntityListener(listener);

    entityManager.removeEntityListener(listener);
    entityManager.addEntity(entityManager.createEntity());
    
    expect(listener.added).toBe(false);
  });
});