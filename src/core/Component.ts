import { getClass } from "../utils/Constructor";
import { Class } from "./Types";

/**
 * The base class for all components.
 */
export abstract class Component {

  /**
   * Get the class of this component.
   */
  getClass() {
    return getClass(this);
  }

  /**
   * Check if the component is the given class.
   *
   * @param componentClass The class to check.
   */
  is(componentClass: Class<Component>) {
    return getClass(this) === componentClass;
  }
}
