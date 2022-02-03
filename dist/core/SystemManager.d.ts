import { System } from "./System";
import Engine from "./Engine";
import { Class } from "./Class";
/**
 * The default system manager implementation used by the engine.
 */
export declare class SystemManager {
    /**
     * The associated engine.
     */
    private engine;
    /**
     * A contiguous array of systmes ordered by priority.
     */
    private systems;
    /**
     * The hash of systems.
     */
    private systemHash;
    /**
     * Whether the update loop is currently in progress.
     */
    private updating;
    constructor(engine: Engine);
    /**
     * Whether systems are in the middle of updating.
     */
    isUpdating(): boolean;
    /**
     * Register a system.
     *
     * @param system The system to register.
     */
    addSystem(system: System): System;
    /**
     * Retrieve the system of the given type.
     *
     * @param systemClass The type of the system to retrieve.
     */
    getSystem<T extends System>(systemClass: Class<T>): T | null;
    /**
     * Remove a system.
     *
     * @param system The system to remove.
     */
    removeSystem<T extends System>(systemClass: Class<T>): void;
    /**
     * Handle each system's logic each tick.
     *
     * @param engine The engine the systems are attached to.
     * @param delta The delta.
     */
    update(delta: number): void;
    /**
     * Internal method to get systems by ID.
     *
     * @param id The system ID.
     */
    private getSystemInternal;
    /**
     * Internal method to handle system removal.
     *
     * @param id The system ID.
     */
    private removeSystemInternal;
    /**
     * Sort the systems by priority.
     */
    private sortSystems;
}
