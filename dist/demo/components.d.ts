import { Component } from "../core/Component";
import { Vector2 } from "../types/Vector2";
export declare class Movement extends Component {
    velocity: Vector2;
    acceleration: Vector2;
}
export declare class Circle extends Component {
    position: Vector2;
    radius: number;
}
export declare class CanvasContext extends Component {
    context: CanvasRenderingContext2D;
    width: number;
    height: number;
    constructor(context: CanvasRenderingContext2D);
}
