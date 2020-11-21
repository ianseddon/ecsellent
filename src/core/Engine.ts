import { SystemManagerInterface, SystemManager } from "./SystemManager";
import { EntityManager, EntityManagerInterface } from "./EntityManager";

export class Engine {
  readonly systemManager: SystemManagerInterface;
  readonly entityManager: EntityManagerInterface;

  /**
   * Create a new engine, and optionally provide specific implementations of manager classes.
   * @param entityManager The engine's entity manager instance.
   * @param systemManager The engine's system manager instance.
   */
  constructor(entityManager: EntityManagerInterface | null = null, systemManager: SystemManagerInterface | null = null) {
    this.entityManager = entityManager || new EntityManager();
    this.systemManager = systemManager || new SystemManager();
  }

  /**
   * Handle updating all systems each tick.
   */
  update() : void {
    throw new Error("Method not implemented.");
  }
}

export default Engine;