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
}
