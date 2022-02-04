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

    expect(query.results.size).toBe(1);
    expect(query.results.has(entity.id)).toBe(true);
  });

  it('adds newly added entities to the results', () => {
    const entity = entityManager.createEntity();
    entity.add(new MockComponent);

    conditions.require = [MockComponent];

    const query = new EntityQuery(entityManager, conditions);

    expect(query.results.size).toBe(0);

    entityManager.addEntityListener(query);
    entityManager.addEntity(entity);

    expect(query.results.size).toBe(1);
    expect(query.results.has(entity.id)).toBe(true);
  });

  it('adds entities containing one of the any conditions', () => {
    entityManager.addEntity(entityManager.createEntity());
    const e1 = entityManager.addEntity(entityManager.createEntity());
    e1.add(new MockComponent);

    conditions.any = [MockComponent, OtherMockComponent];

    const query = new EntityQuery(entityManager, conditions);

    expect(query.results.size).toBe(1);
    expect(query.results.has(e1.id)).toBe(true);
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

    expect(query.results.size).toBe(1);
    expect(query.results.has(e1.id)).toBe(true);
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

    expect(query.results.size).toBe(1);
    expect(query.results.has(e1.id)).toBe(true);
  });

  it('removes entities from results when removed from entity manager', () => {
    const e1 = entityManager.addEntity(entityManager.createEntity());
    const e2 = entityManager.addEntity(entityManager.createEntity());
    e1.add(new MockComponent);
    e2.add(new MockComponent);

    conditions.require = [MockComponent];

    const query = new EntityQuery(entityManager, conditions);

    expect(query.results.size).toBe(2);

    entityManager.addEntityListener(query);
    entityManager.removeEntity(e1.id);

    expect(query.results.size).toBe(1);
    expect(query.results.has(e2.id)).toBe(true);
  });

  it('includes entities that have a required component added', () => {
    const e1 = entityManager.addEntity(entityManager.createEntity());
    const e2 = entityManager.addEntity(entityManager.createEntity());
    e1.add(new MockComponent);
    e2.add(new MockComponent);
    e2.add(new OtherMockComponent);

    conditions.require = [MockComponent, OtherMockComponent];
    const query = new EntityQuery(entityManager, conditions);

    expect(query.results.size).toBe(1);

    entityManager.addComponentListener(query);
    e1.add(new OtherMockComponent);

    expect(query.results.size).toBe(2);
  });

  it('removes entities that have a required component removed', () => {
    const e1 = entityManager.addEntity(entityManager.createEntity());
    const e2 = entityManager.addEntity(entityManager.createEntity());
    e1.add(new MockComponent);
    e1.add(new OtherMockComponent);
    e2.add(new MockComponent);
    e2.add(new OtherMockComponent);

    conditions.require = [MockComponent, OtherMockComponent];
    const query = new EntityQuery(entityManager, conditions);

    expect(query.results.size).toBe(2);

    entityManager.addComponentListener(query);
    e1.remove(OtherMockComponent);

    expect(query.results.size).toBe(1);
  });

  it('removes entities that have an excluded component added', () => {
    const e1 = entityManager.addEntity(entityManager.createEntity());
    const e2 = entityManager.addEntity(entityManager.createEntity());
    e1.add(new MockComponent);
    e1.add(new OtherMockComponent);
    e2.add(new MockComponent);
    e2.add(new OtherMockComponent);

    conditions.require = [MockComponent, OtherMockComponent];
    conditions.exclude = [AnotherMockComponent];
    const query = new EntityQuery(entityManager, conditions);

    expect(query.results.size).toBe(2);
    
    entityManager.addComponentListener(query);
    e1.add(new AnotherMockComponent);

    expect(query.results.size).toBe(1);
  });

  it('notifies listeners when entities are added or removed from the query results', () => {
    const e1 = entityManager.addEntity(entityManager.createEntity());
    const e2 = entityManager.addEntity(entityManager.createEntity());
    e1.add(new MockComponent);
    e2.add(new MockComponent);
    e2.add(new OtherMockComponent);

    conditions.require = [MockComponent, OtherMockComponent];
    conditions.exclude = [AnotherMockComponent];
    const query = new EntityQuery(entityManager, conditions);

    entityManager.addEntityListener(query);
    entityManager.addComponentListener(query);

    expect(query.results.size).toBe(1);

    const queryEntityAdded = jest.fn();
    const queryEntityRemoved = jest.fn();
    query.addQueryListener({
      queryEntityAdded,
      queryEntityRemoved,
    });

    e1.add(new OtherMockComponent);

    expect(queryEntityAdded).toBeCalled()
    expect(queryEntityRemoved).not.toBeCalled();

    e1.add(new AnotherMockComponent);
    e2.add(new AnotherMockComponent);

    expect(queryEntityRemoved).toBeCalledTimes(2);
  });
});