import { Class } from "./Class";
/**
 * The base class for all components.
 */
export declare abstract class Component {
    /**
     * Get the class of this component.
     */
    getClass(): Class<this>;
    /**
     * Check if the component is the given class.
     *
     * @param componentClass The class to check.
     */
    is(componentClass: Class<Component>): boolean;
}
