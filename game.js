 // Create PixiJS application
const app = new PIXI.Application();
await app.init({ backgroundColor: "#3398b9", width: 800, height: 800 });
document.getElementById("game").appendChild(app.canvas);

// Create circle
const circle = new PIXI.Graphics();
circle.beginFill("#f5ef42");
circle.drawCircle(0, 0, 10); // radius 10
circle.endFill();
circle.x = 400;
circle.y = 400;
app.stage.addChild(circle);

// Circle velocity
let xv = 3;
let yv = 2;

// Border thickness
const borderThickness = 10;

// Track which borders have been hit
const bordersHit = { top: false, bottom: false, left: false, right: false };

// Create borders
const borders = {
  top: new PIXI.Graphics(),
  bottom: new PIXI.Graphics(),
  left: new PIXI.Graphics(),
  right: new PIXI.Graphics()
};

borders.top.beginFill(0xff0000).drawRect(0, 0, 800, borderThickness).endFill();
borders.bottom.beginFill(0xff0000).drawRect(0, 790, 800, borderThickness).endFill();
borders.left.beginFill(0xff0000).drawRect(0, 0, borderThickness, 800).endFill();
borders.right.beginFill(0xff0000).drawRect(790, 0, borderThickness, 800).endFill();

for (const key in borders) {
  app.stage.addChild(borders[key]);
}

// Function that resolves a promise once all borders are hit
function waitForAllBordersHit() {
  return new Promise((resolve) => {
    app.ticker.add(() => {
      // Check for collision with each border
      if (circle.x + 10 >= 800) {
        xv = -xv;
        if (!bordersHit.right) {
          bordersHit.right = true;
          borders.right.tint = 0xffffff;
        }
      }
      if (circle.x - 10 <= 0) {
        xv = -xv;
        if (!bordersHit.left) {
          bordersHit.left = true;
          borders.left.tint = 0xffffff;
        }
      }
      if (circle.y + 10 >= 800) {
        yv = -yv;
        if (!bordersHit.bottom) {
          bordersHit.bottom = true;
          borders.bottom.tint = 0xffffff;
        }
      }
      if (circle.y - 10 <= 0) {
        yv = -yv;
        if (!bordersHit.top) {
          bordersHit.top = true;
          borders.top.tint = 0xffffff;
        }
      }

      // Move circle
      circle.x += xv;
      circle.y += yv;

      // Check if all borders have been hit
      if (Object.values(bordersHit).every(Boolean)) {
        app.ticker.stop();
        resolve();
      }
    });
  });
}

// Start the game and show alert once all borders are hit
waitForAllBordersHit().then(() => {
  alert("Game complete! All borders have been hit.");
});
