import { System } from "../core/System";
import { CanvasContext, Circle, Movement } from "./components";

export class MovementSystem extends System {
  conditions = {
    context: { require: [CanvasContext]},
    entities: { require: [Movement, Circle] },
  };

  update(delta: number) : void {
    const entities = this.queries.entities.results;
    for (const entity of entities) {
      const canvas = this.queries.context.results[0] || null;
      const canvasComponent = canvas?.get(CanvasContext);
      if (!canvas || !canvasComponent) {
        console.warn('Couldnt get canvas context!');
        return;
      }

      const canvasHeight = canvasComponent.height;
      const canvasWidth = canvasComponent.width;
      
      const circle = entity.get(Circle);
      const movement = entity.get(Movement);
      if (!circle || !movement) {
        console.log('Couldnt get components!', circle, movement);
        continue;
      }

      circle.position.x += (movement.velocity.x * movement.acceleration.x * delta);
      circle.position.y += (movement.velocity.y * movement.acceleration.y * delta);

      if (movement.acceleration.x > 1) movement.acceleration.x -= delta;
      if (movement.acceleration.y > 1) movement.acceleration.y -= delta;
      if (movement.acceleration.x < 1) movement.acceleration.x = 1;
      if (movement.acceleration.y < 1) movement.acceleration.y = 1;

      if (circle.position.y + circle.radius < 0)
        circle.position.y = canvasHeight + circle.radius;

      if (circle.position.y - circle.radius > canvasHeight)
        circle.position.y = -circle.radius;

      if (circle.position.x - circle.radius > canvasWidth)
        circle.position.x = 0;

      if (circle.position.x + circle.radius < 0)
        circle.position.x = canvasWidth;
    }
  }
}

export class Renderer extends System {
  conditions = {
    context: { require: [CanvasContext] },
    entities: { require: [Circle] },
  };

  update(delta: number): void {
    const canvas = this.queries.context.results[0] || null;
    const canvasComponent = canvas?.get(CanvasContext);
    const ctx = canvasComponent?.context;
    if (!canvas || !canvasComponent || !ctx) {
      console.warn('Couldnt get canvas context!');
      return;
    }
    
    const canvasWidth = canvasComponent.width;
    const canvasHeight = canvasComponent.height;

    ctx.imageSmoothingQuality = 'medium';
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    const entities = this.queries.entities.results;
    for (const entity of entities) {
      const circle = entity.get(Circle);
      const movement = entity.get(Movement);
      if (!circle || !movement) {
        continue;
      }

      ctx.beginPath();
      ctx.arc(
        circle.position.x,
        circle.position.y,
        circle.radius,
        0,
        2 * Math.PI,
        false
      );
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'white';
      ctx.stroke();
    }

    const fps = Math.round(1 / delta);
    ctx.fillStyle = 'white';
    ctx.fillText(`${fps} FPS`, 10, 10);
  }
}