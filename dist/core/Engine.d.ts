import { SystemManager } from "./SystemManager";
import { EntityManager } from "./EntityManager";
export declare class Engine {
    readonly systemManager: SystemManager;
    readonly entityManager: EntityManager;
    /**
     * Create a new engine, and optionally provide specific implementations of manager classes.
     * @param entityManager The engine's entity manager instance.
     * @param systemManager The engine's system manager instance.
     */
    constructor(entityManager?: EntityManager | null, systemManager?: SystemManager | null);
    /**
     * Handle updating all systems each tick.
     */
    update(delta: number): void;
}
export default Engine;
