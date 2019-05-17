interface Component {}

/**
 * Interface enabling usage of type as value.
 */
interface ComponentClass<T extends Component> {
  readonly name : string;
  readonly tag? : string;
  new() : T;
}

export { Component, ComponentClass };