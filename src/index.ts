import Engine from "./core/Engine";
import { Entity } from "./core/Entity";
import { CanvasContext, Circle, Movement } from "./demo/components";
import { MovementSystem, Renderer } from "./demo/systems";

const random = (min: number, max: number): number => Math.floor((Math.random() * (max - min)) + min);

const engine = new Engine();

const canvas = document.querySelector('canvas');
if (!canvas) {
  throw new Error('No canvas element!');
}
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');
if (!ctx) {
  throw new Error('Could not get canvas context');
}
const canvasEntity = new Entity();
const canvasContext = new CanvasContext(ctx);
canvasContext.width = canvas.width;
canvasContext.height = canvas.width;
canvasEntity.add(canvasContext);
engine.entityManager.addEntity(canvasEntity);

window.addEventListener('resize', () => {
  canvasContext.width = canvas.width;
  canvasContext.height = canvas.height;
});

for (let i = 0; i < 30; i++) {
  const entity = engine.entityManager.createEntity();
  const circle = new Circle();
  const movement = new Movement();

  circle.position.x = random(0, canvas.width);
  circle.position.y = random(0, canvas.height);
  circle.radius = random(20, 100);
  movement.velocity.x = random(-20, 20);
  movement.velocity.y = random(-20, 20);

  entity.add(circle);
  entity.add(movement);
  engine.entityManager.addEntity(entity);
}

engine.systemManager.addSystem(new Renderer);
engine.systemManager.addSystem(new MovementSystem);

// Set up the update loop.
let lastTime = performance.now();
const update = () => {
  const time = performance.now();
  const delta = (time - lastTime) / 1000;
  lastTime = time;
  engine.update(delta);
  requestAnimationFrame(update);
}

update();