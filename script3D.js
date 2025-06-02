let colorfulBoxes = [];
let scrambleSequence = [];
let moveHistory = []


const colors = [
  { r: 255, g: 255, b: 255 }, // white
  { r: 0, g: 0, b: 255 },     // blue
  { r: 255, g: 0, b: 0 },     // red
  { r: 0, g: 255, b: 0 },     // green
  { r: 255, g: 255, b: 0 },   // yellow
  { r: 255, g: 165, b: 0 }    // orange
];

function setup() {
  createCanvas(600, 600, WEBGL);
  noStroke();
  
  // Initialize 6 faces, each 3x3 stickers of one color
  colorfulBoxes = [];
  initFace(0, colors[0]); // white
  initFace(1, colors[1]); // blue
  initFace(2, colors[2]); // red
  initFace(3, colors[3]); // green
  initFace(4, colors[4]); // yellow
  initFace(5, colors[5]); // orange
}

// Initialize a face as a 3x3 array of colors
function initFace(faceIndex, color) {
  const face = [];
  for (let i = 0; i < 3; i++) {
    const row = [];
    for (let j = 0; j < 3; j++) {
      row.push(color);
    }
    face.push(row);
  }
  colorfulBoxes[faceIndex] = face;
}

 const stickerSize = 60;
  const spacing = stickerSize + 3;
  const dist = spacing * 1.5;


function draw() {
  background("#eeeeee");
  orbitControl();

  rotateX(-QUARTER_PI);
  rotateY(QUARTER_PI);

  // Draw 6 faces of the cube
  for (let f = 0; f < 6; f++) {
    push();
    positionFace(f, dist);

    // Draw 3x3 stickers on this face
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Draw black border (slightly bigger square)
       fill(0); // black
        push();
        translate(
          (j - 1) * spacing,
          (i - 1) * spacing,
          0
        );
        plane(stickerSize + 5, stickerSize + 5);
        pop();

        // Draw colored sticker on top
        const c = colorfulBoxes[f][i][j];
        fill(c.r, c.g, c.b);
        push();
        translate(
          (j - 1) * spacing,
          (i - 1) * spacing,
          1
        );
        plane(stickerSize, stickerSize);
        pop();
      }
    }
    pop();
  }
  
}


// Positions each face of the cube in 3D space
function positionFace(faceIndex, dist) {
  switch (faceIndex) {
    case 0: // White - top
      translate(0, -dist, 0);
      rotateX(HALF_PI);
      break;
    case 1: // Blue - back
      translate(0, 0, -dist);
      rotateY(PI);
      break;
    case 2: // Red - right
      translate(dist, 0, 0);
      rotateY(HALF_PI);
      break;
    case 3: // Green - front
      translate(0, 0, dist);
      break;
    case 4: // Yellow - bottom
      translate(0, dist, 0);
      rotateX(-HALF_PI);
      break;
    case 5: // Orange - left
      translate(-dist, 0, 0);
      rotateY(-HALF_PI);
      break;
  }
}

function toggle3D(){
     window.location.href = "index.html";
}

function scramble() {
  const moves = ["F", "F'", "B", "B'", "R", "R'", "L", "L'", "U", "U'", "D", "D'"];
  scrambleSequence = [];

  for (let i = 0; i < 20; i++) {
    const move = moves[Math.floor(Math.random() * moves.length)];
    scrambleSequence.push(move);

    if (move.endsWith("'")) {
      rotateFaceInverse(move[0]);
    } else {
      rotateFace(move);
    }
  }
}


function solve() {
  if (moveHistory.length === 0) return;

  reverseMoves = moveHistory.slice().reverse().map(move => {
    return move.endsWith("'") ? move[0] : move + "'";
  });

  const movesDiv = document.getElementById("movesText");
  if (movesDiv) {
    movesDiv.innerText = "Mișcări rezolvare: " + reverseMoves.join(" ");
  }

  currentMoveIndex = 0;

  function animateSolve() {
    if (currentMoveIndex >= reverseMoves.length) {
      moveHistory = [];  
      return;
    }

    const move = reverseMoves[currentMoveIndex];
    if (move.endsWith("'")) {
      rotateFaceInverse(move[0], false);
    } else {
      rotateFace(move, false);
    }

    currentMoveIndex++;
    setTimeout(animateSolve, 200);
  }

  animateSolve();
}


function rotateFace(face, record = true) {
  const faceMap = { U: 0, B: 1, R: 2, F: 3, D: 4, L: 5 };
  const idx = faceMap[face];
  if (idx === undefined) return;
  if (record) moveHistory.push(face)

  rotateFaceClockwise(colorfulBoxes[idx]);

  const up = colorfulBoxes[0];
  const back = colorfulBoxes[1];
  const right = colorfulBoxes[2];
  const front = colorfulBoxes[3];
  const down = colorfulBoxes[4];
  const left = colorfulBoxes[5];

  let temp;
  switch (face) {
    case 'F': {
      temp = [up[2][0], up[2][1], up[2][2]];
      up[2][0] = left[2][2]; up[2][1] = left[1][2]; up[2][2] = left[0][2];
      left[0][2] = down[0][2]; left[1][2] = down[0][1]; left[2][2] = down[0][0];
      down[0][0] = right[0][0]; down[0][1] = right[1][0]; down[0][2] = right[2][0];
      right[0][0] = temp[0]; right[1][0] = temp[1]; right[2][0] = temp[2];
      break;
    }
    case 'B': {
      temp = [up[0][0], up[0][1], up[0][2]];
      up[0][0] = right[0][2]; up[0][1] = right[1][2]; up[0][2] = right[2][2];
      right[0][2] = down[2][2]; right[1][2] = down[2][1]; right[2][2] = down[2][0];
      down[2][0] = left[0][0]; down[2][1] = left[1][0]; down[2][2] = left[2][0];
      left[0][0] = temp[2]; left[1][0] = temp[1]; left[2][0] = temp[0];
      break;
    }
    case 'U': {
      temp = [back[0][0], back[0][1], back[0][2]];
      back[0][0] = right[0][0]; back[0][1] = right[0][1]; back[0][2] = right[0][2];
      right[0][0] = front[0][0]; right[0][1] = front[0][1]; right[0][2] = front[0][2];
      front[0][0] = left[0][0]; front[0][1] = left[0][1]; front[0][2] = left[0][2];
      left[0][0] = temp[0]; left[0][1] = temp[1]; left[0][2] = temp[2];
      break;
    }
    case 'D': {
      temp = [back[2][0], back[2][1], back[2][2]];
      back[2][0] = left[2][0]; back[2][1] = left[2][1]; back[2][2] = left[2][2];
      left[2][0] = front[2][0]; left[2][1] = front[2][1]; left[2][2] = front[2][2];
      front[2][0] = right[2][0]; front[2][1] = right[2][1]; front[2][2] = right[2][2];
      right[2][0] = temp[0]; right[2][1] = temp[1]; right[2][2] = temp[2];
      break;
    }
    case 'R': {
      temp = [up[0][2], up[1][2], up[2][2]];
      up[0][2] = front[0][2]; up[1][2] = front[1][2]; up[2][2] = front[2][2];
      front[0][2] = down[0][2]; front[1][2] = down[1][2]; front[2][2] = down[2][2];
      down[0][2] = back[2][0]; down[1][2] = back[1][0]; down[2][2] = back[0][0];
      back[0][0] = temp[2]; back[1][0] = temp[1]; back[2][0] = temp[0];
      break;
    }
    case 'L': {
      temp = [up[0][0], up[1][0], up[2][0]];
      up[0][0] = back[2][2]; up[1][0] = back[1][2]; up[2][0] = back[0][2];
      back[0][2] = down[2][0]; back[1][2] = down[1][0]; back[2][2] = down[0][0];
      down[0][0] = front[0][0]; down[1][0] = front[1][0]; down[2][0] = front[2][0];
      front[0][0] = temp[0]; front[1][0] = temp[1]; front[2][0] = temp[2];
      break;
    }
  }
}


function rotateFaceClockwise(faceMatrix) {
  const copy = JSON.parse(JSON.stringify(faceMatrix));

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      faceMatrix[j][2 - i] = copy[i][j];
    }
  }
}

function rotateFaceCounterClockwise(faceMatrix) {
  const copy = JSON.parse(JSON.stringify(faceMatrix));
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      faceMatrix[2 - j][i] = copy[i][j];
    }
  }
}

function rotateFaceInverse(face, record = true) {
  // Rotire fizică inversă (3 rotiri în sensul acelor de ceasornic = 1 anti-clockwise)
  for (let i = 0; i < 3; i++) {
    rotateFace(face, false);
  }
  if (record) moveHistory.push(face + "'")
}



