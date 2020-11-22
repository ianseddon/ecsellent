import { Class } from '../core/Class';

/**
 * Get the constructor for the given instance.
 *
 * @param instance
 * @return {Constructor} the constructor
 */
export function getClass<T>(instance: T) : Class<T> {
  return Object.getPrototypeOf(instance).constructor;
}

export function getParentClass<J extends unknown, K extends J>(clazz: Class<K>, depth = 1) : Class<J> {
  while (depth > 0) {
    clazz = Object.getPrototypeOf(clazz);
    depth--;
  }
  return clazz;
}

/**
 * Get the depth of the given class.
 * 
 * The depth is the number of parent classes the class has.
 * 
 * @param clazz The class.
 */
export function getClassDepth(clazz: Class<unknown>) : number {
  let depth = 0;
  while (clazz) {
    clazz = Object.getPrototypeOf(clazz);
    depth++;
  }

  // A class with no parents will have depth = 3, so normalize.
  return depth - 3;
}