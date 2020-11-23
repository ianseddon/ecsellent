import { Component } from "./Component";
import { EntityManager } from "./EntityManager";
import { Conditions, EntityQuery } from "./EntityQuery";
import { System } from "./System";

class MockComponent extends Component {}
class MockSystem extends System {
  public conditions: { [key: string]: Conditions } = {}
  public queries: { [key: string]: EntityQuery } = {};

  public buildQueries(entityManager: EntityManager) : void {
    super.buildQueries(entityManager);
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
});