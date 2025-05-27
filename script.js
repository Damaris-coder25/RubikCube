let colorfulBoxes = [];
const cubeSize = 40;
const spacing = 5;
const cubeCount = 3; // 3x3x3 cubes

const faceColors = {
  U: { r: 255, g: 255, b: 255 },   // White (Up)
  D: { r: 255, g: 255, b: 0 },     // Yellow (Down)
  F: { r: 255, g: 0, b: 0 },       // Red (Front)
  B: { r: 0, g: 0, b: 255 },       // Blue (Back)
  L: { r: 255, g: 165, b: 0 },     // Orange (Left)
  R: { r: 0, g: 255, b: 0 }        // Green (Right)
};

let rotX = 0;
let rotY = 0;

function setup() {
  createCanvas(1350, 400, WEBGL);
  noStroke();

  for (let x = 0; x < cubeCount; x++) {
    for (let y = 0; y < cubeCount; y++) {
      for (let z = 0; z < cubeCount; z++) {
        colorfulBoxes.push({
          pos: createVector(
            (x - 1) * (cubeSize + spacing),
            (y - 1) * (cubeSize + spacing),
            (z - 1) * (cubeSize + spacing)
          ),
          faces: {
            U: y === 0 ? faceColors.U : null,
            D: y === 2 ? faceColors.D : null,
            F: z === 2 ? faceColors.F : null,
            B: z === 0 ? faceColors.B : null,
            L: x === 0 ? faceColors.L : null,
            R: x === 2 ? faceColors.R : null,
          }
        });
      }
    }
  }

  rotY = PI / 4;
  rotX = -PI / 6;
}

function draw() {
  background(240);

  // Zoom in (increase size)
  scale(1.2); // 1.5 times bigger, adjust as needed
  rotateX(rotX);
  rotateY(rotY);

  for (const cube of colorfulBoxes) {
    push();
    translate(cube.pos.x, cube.pos.y, cube.pos.z);
    drawFlatCube(cube.faces);
    pop();
  }
}


function drawFlatCube(faces) {
  // Draw 6 faces as colored planes with fill(), no lighting

  // Draw cube faces one by one

  // UP
  push();
  translate(0, -cubeSize / 2, 0);
  rotateX(-HALF_PI);
  fillFace(faces.U);
  plane(cubeSize, cubeSize);
  pop();

  // DOWN
  push();
  translate(0, cubeSize / 2, 0);
  rotateX(HALF_PI);
  fillFace(faces.D);
  plane(cubeSize, cubeSize);
  pop();

  // FRONT
  push();
  translate(0, 0, cubeSize / 2);
  fillFace(faces.F);
  plane(cubeSize, cubeSize);
  pop();

  // BACK
  push();
  translate(0, 0, -cubeSize / 2);
  rotateY(PI);
  fillFace(faces.B);
  plane(cubeSize, cubeSize);
  pop();

  // LEFT
  push();
  translate(-cubeSize / 2, 0, 0);
  rotateY(-HALF_PI);
  fillFace(faces.L);
  plane(cubeSize, cubeSize);
  pop();

  // RIGHT
  push();
  translate(cubeSize / 2, 0, 0);
  rotateY(HALF_PI);
  fillFace(faces.R);
  plane(cubeSize, cubeSize);
  pop();
}

function fillFace(color) {
  if (color) {
    fill(color.r, color.g, color.b);
  } else {
    fill(50); // Default grey for no color faces
  }
}

// Optional: rotation functions (if you want to add controls)
function rotateLeft() {
  rotY -= HALF_PI;
}

function rotateRight() {
  rotY += HALF_PI;
}

function rotateUp() {
  rotX -= HALF_PI;
}

function rotateDown() {
  rotX += HALF_PI;
}
