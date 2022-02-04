import { Component } from "./Component";
import { Entity } from "./Entity";
import { EntityManager } from "./EntityManager";
import { Conditions, EntityQuery } from "./EntityQuery";
import { System } from "./System";

class MockComponent extends Component {}
class OtherMockComponent extends Component {}
class MockSystem extends System {
  public conditions: { [key: string]: Conditions } = {}
  public queries: { [key: string]: EntityQuery } = {};

  public added = jest.fn();
  public removed = jest.fn();

  public buildQueries(entityManager: EntityManager) : void {
    super.buildQueries(entityManager);
  }

  queryEntityAdded(key: string, entity: Entity) {
    super.queryEntityAdded(key, entity);
    this.added(key);
  }

  queryEntityRemoved(key: string, entity: Entity) {
    super.queryEntityRemoved(key, entity);
    this.removed(key);
  }

  update(delta: number) {}
}

describe('System', () => {
  let entityManager: EntityManager;
  let system: MockSystem;
  beforeEach(() => {
    entityManager = new EntityManager();
    system = new MockSystem();
  })

  it('generates queries from conditions', () => {
    system.conditions['test'] = {
      require: [MockComponent],
    };
    system.buildQueries(entityManager);
    expect(system.queries).toHaveProperty('test');
  });

  it('notifies when entities are added to query results', () => {
    system.conditions['foo'] = {
      require: [MockComponent],
    };
    system.conditions['bar'] = {
      require: [OtherMockComponent],
    }

    system.buildQueries(entityManager);

    expect(system.added).not.toHaveBeenCalled();

    const e = entityManager.createEntity();
    e.add(new MockComponent);
    entityManager.addEntity(e);

    expect(system.added).toHaveBeenCalledWith('foo');
    expect(system.added).toHaveBeenCalledTimes(1);

    e.add(new OtherMockComponent);

    expect(system.added).toHaveBeenCalledWith('bar');
    expect(system.added).toHaveBeenCalledTimes(2);
  });

  it('notifies when entities are removed from query results', () => {
    system.conditions['foo'] = {
      require: [MockComponent],
    };
    system.conditions['bar'] = {
      require: [OtherMockComponent],
    }

    const e = entityManager.createEntity();
    e.add(new MockComponent);
    e.add(new OtherMockComponent);
    entityManager.addEntity(e);

    system.buildQueries(entityManager);

    expect(system.removed).not.toHaveBeenCalled();

    e.remove(MockComponent);

    expect(system.removed).toHaveBeenCalledWith('foo');
    expect(system.removed).toHaveBeenCalledTimes(1);

    e.remove(OtherMockComponent);

    expect(system.removed).toHaveBeenCalledWith('bar');
    expect(system.removed).toHaveBeenCalledTimes(2);
  });
});