import { Component } from "./Component";

describe('Component', () => {
  class TestComponent extends Component {}
  class OtherComponent extends Component {}

  it('can return its own class', () => {
    const testComponent = new TestComponent();

    expect(testComponent.getClass()).toBe(TestComponent);
  });

  it('can determine if it is a given class', () => {
    const testComponent = new TestComponent();

    expect(testComponent.is(TestComponent)).toBe(true);
    expect(testComponent.is(OtherComponent)).toBe(false);
  });

});