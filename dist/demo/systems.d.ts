import { System } from "../core/System";
import { CanvasContext, Circle, Movement } from "./components";
export declare class MovementSystem extends System {
    conditions: {
        context: {
            require: (typeof CanvasContext)[];
        };
        entities: {
            require: (typeof Movement | typeof Circle)[];
        };
    };
    update(delta: number): void;
}
export declare class Renderer extends System {
    conditions: {
        context: {
            require: (typeof CanvasContext)[];
        };
        entities: {
            require: (typeof Circle)[];
        };
    };
    update(delta: number): void;
}
