import { Component } from "./Component";
import { EntityManager } from "./EntityManager";
import { EntityQuery, Conditions } from "./EntityQuery";

class MockComponent extends Component {}
class OtherMockComponent extends Component {}
class AnotherMockComponent extends Component {}

describe('EntityQuery', () => {
  let entityManager: EntityManager;
  let conditions: Conditions;
  beforeEach(() => {
    conditions = { require: [], exclude: [] };
    entityManager = new EntityManager();
  });

  it('doesnt allow empty queries', () => {
    expect(() => new EntityQuery(entityManager, conditions)).toThrowError();
  });

  it('adds existing entities to the results when instantiated', () => {
    const entity = entityManager.createEntity();
    entity.add(new MockComponent);
    entityManager.addEntity(entity);
    entityManager.addEntity(entityManager.createEntity());
    
    conditions.require = [MockComponent];
    const query = new EntityQuery(entityManager, conditions);

    expect(query.results).toHaveLength(1);
    expect(query.results[0]).toBe(entity);
  });

  it('adds newly added entities to the results', () => {
    const entity = entityManager.createEntity();
    entity.add(new MockComponent);

    conditions.require = [MockComponent];

    const query = new EntityQuery(entityManager, conditions);

    expect(query.results).toHaveLength(0);
    entityManager.addEntity(entity);

    expect(query.results).toHaveLength(1);
    expect(query.results[0]).toBe(entity);
  });

  it('adds entities containing one of the any conditions', () => {
    entityManager.addEntity(entityManager.createEntity());
    const e1 = entityManager.addEntity(entityManager.createEntity());
    e1.add(new MockComponent);

    conditions.any = [MockComponent, OtherMockComponent];

    const query = new EntityQuery(entityManager, conditions);

    expect(query.results).toHaveLength(1);
    expect(query.results[0]).toBe(e1);
  });

  it('excludes entities without all required components', () => {
    entityManager.addEntity(entityManager.createEntity());
    const e1 = entityManager.addEntity(entityManager.createEntity());
    const e2 = entityManager.addEntity(entityManager.createEntity());
    e1.add(new MockComponent);
    e1.add(new OtherMockComponent);
    e2.add(new MockComponent);

    conditions.require = [MockComponent, OtherMockComponent];

    const query = new EntityQuery(entityManager, conditions);

    expect(query.results).toHaveLength(1);
    expect(query.results[0]).toBe(e1);
  });

  it('excludes entities with any excluded component', () => {
    const e1 = entityManager.addEntity(entityManager.createEntity());
    const e2 = entityManager.addEntity(entityManager.createEntity());
    const e3 = entityManager.addEntity(entityManager.createEntity());
    e1.add(new MockComponent);
    e2.add(new MockComponent);
    e2.add(new OtherMockComponent);
    e3.add(new MockComponent);
    e3.add(new AnotherMockComponent);
    
    conditions.require = [MockComponent];
    conditions.exclude = [OtherMockComponent, AnotherMockComponent];

    const query = new EntityQuery(entityManager, conditions);

    expect(query.results).toHaveLength(1);
    expect(query.results[0]).toBe(e1);
  });

  it('removes entities from results when removed from entity manager', () => {
    const e1 = entityManager.addEntity(entityManager.createEntity());
    const e2 = entityManager.addEntity(entityManager.createEntity());
    e1.add(new MockComponent);
    e2.add(new MockComponent);

    conditions.require = [MockComponent];

    const query = new EntityQuery(entityManager, conditions);

    expect(query.results).toHaveLength(2);
    entityManager.removeEntity(e1.id);

    expect(query.results).toHaveLength(1);
    expect(query.results[0]).toBe(e2);
  });
});