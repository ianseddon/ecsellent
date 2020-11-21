import { Class } from '../core/Types';

/**
 * Get the constructor for the given instance.
 *
 * @param instance
 * @return {Constructor} the constructor
 */
export function getClass<T>(instance: T) : Class<T> {
  return Object.getPrototypeOf(instance).constructor;
}