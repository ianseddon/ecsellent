import { Component } from "../core/Component";
import { Vector2 } from "../types/Vector2";

export class Movement extends Component {
  velocity: Vector2 = { x: 0, y: 0 };
  acceleration: Vector2 = { x: 0, y: 0 };
}

export class Circle extends Component {
  position: Vector2 = { x: 0, y: 0 }
  radius = 0;
}

export class CanvasContext extends Component {
  context: CanvasRenderingContext2D;
  width = 0;
  height = 0;

  constructor(context: CanvasRenderingContext2D) {
    super();

    this.context = context;
  }
}