import { Class } from '../core/Class';
/**
 * Get the constructor for the given instance.
 *
 * @param instance
 * @return {Constructor} the constructor
 */
export declare function getClass<T>(instance: T): Class<T>;
export declare function getParentClass<J extends unknown, K extends J>(clazz: Class<K>, depth?: number): Class<J>;
/**
 * Get the depth of the given class.
 *
 * The depth is the number of parent classes the class has.
 *
 * @param clazz The class.
 */
export declare function getClassDepth(clazz: Class<unknown>): number;
