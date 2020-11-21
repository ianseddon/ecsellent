import { Component } from "./Component";
import { Entity } from "./Entity";

class TestComponent extends Component {}
class OtherComponent extends Component {}

describe('Entity', () => {
  let entity: Entity;
  beforeEach(() => {
    entity = new Entity();
  });

  it('adds components', () => {
    const c = entity.add(new TestComponent);

    expect(entity.all()).toHaveLength(1);
    expect(entity.get(TestComponent)).toBe(c);
  });

  it('replaces components of the same type', () => {
    const c1 = entity.add(new TestComponent);
    const c2 = entity.add(new TestComponent);

    expect(entity.all()).toHaveLength(1);
    expect(entity.has(TestComponent)).toBe(true);
    expect(entity.get(TestComponent)).not.toBe(c1);
    expect(entity.get(TestComponent)).toBe(c2);
  });

  it('removes components', () => {
    entity.add(new TestComponent);
    entity.add(new OtherComponent);
    entity.remove(TestComponent);

    expect(entity.all()).toHaveLength(1);
    expect(entity.has(TestComponent)).toBe(false);
  });

  it('gets all components', () => {
    entity.add(new TestComponent);
    entity.add(new OtherComponent);

    expect(entity.all()).toHaveLength(2);
  });
});