import { Entity } from "./Entity";
interface NodeInterface {
    /**
     * The entities encompassed by this node.
     */
    readonly entities: Entity[];
    /**
     * Check whether this node includes the given entity.
     * @param entity The entity to check.
     */
    includes(entity: Entity): boolean;
}
declare class Node implements NodeInterface {
    entities: Entity[];
    /**
     * Check whether this node includes the given entity.
     * @param entity The entity to check.
     */
    includes(entity: Entity): boolean;
}
export { Node, NodeInterface };
