import { Component } from './Component';

/**
 * Class definition for type 'T'.
 */
export interface Class<T> extends Function {
  /**
   * The constructor.
   */
  new(...args: any[]): T;

  /**
   * The name of the class.
   */
  name: string;

  /**
   * The UniqueType for the class.
   */
  __uniqueType?: UniqueType;
}

/**
 * Class definition for a Component class 'T'.
 */
export interface ComponentClass<T extends Component> extends Class<T> {}

/**
 * 
 */
export class UniqueType {
  // TODO: Implement this.
}