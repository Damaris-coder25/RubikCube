let borderWidth = 0
let borderHeight = 0

const colorfulCols = 3;
const colorfulRows = 3;

const colorfulBoxes = [];

const colors = [
    { r: 255, g: 255, b: 255 }, // white
    { r: 0, g: 0, b: 255 },     // blue
    { r: 255, g: 0, b: 0 },     // red
    { r: 0, g: 255, b: 0 },     // green
    { r: 255, g: 255, b: 0 },   // yellow
    { r: 255, g: 165, b: 0 }    // orange
];

function setup() {
    createCanvas(windowWidth, windowHeight)

    borderWidth = windowWidth
    borderHeight = windowHeight

    colorfulBoxes.length = 0;

    initBoxes(3, 3, 180, 15, 0);   // white
    initBoxes(3, 3, 180, 325, 4);  // yellow
    initBoxes(3, 3, 25, 170, 5);   // orange
    initBoxes(3, 3, 180, 170, 3);  // green
    initBoxes(3, 3, 340, 170, 2);  // red
    initBoxes(3, 3, 500, 170, 1);  // blue
}

function mouseClicked() {
    for (const rows of colorfulBoxes)
        for (const row of rows)
            for (const box of row)
                if (mouseX >= box.x && 
                    mouseX <= box.x + box.s &&
                    mouseY >= box.y && 
                    mouseY <= box.y + box.s) {
                        box.colorIndex = (box.colorIndex + 1) % colors.length;
                        box.c = colors[box.colorIndex];
                }
}

function draw() {
    background("#eeeeee")
    drawColorfulBoxes()
}

function drawColorfulBoxes() {
    for (const face of colorfulBoxes) {
        for (const row of face) {
            for (const box of row) {
                drawBox(box);
            }
        }
    }
}

function drawBox(obj) {
    fill(obj.c.r, obj.c.g, obj.c.b)
    square(obj.x, obj.y, obj.s)
}

function initBoxes(cols, rows, startX, startY, colorIndex) {
    const face = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            const box = {
                x: startX + j * 50,
                y: startY + i * 50,
                s: 40,
                c: colors[colorIndex],
                colorIndex: colorIndex,
            };
            row.push(box);
        }
        face.push(row);
    }
    colorfulBoxes.push(face);
}

function scramble(){
    const colorPool = [];
    let totalBoxes = 0;

    // Calculăm câte boxuri vom schimba (excludem centrul din fiecare matrice)
    for (let f = 0; f < colorfulBoxes.length; f++) {
        for (let i = 0; i < colorfulRows; i++) {
            for (let j = 0; j < colorfulCols; j++) {
                if (i === 1 && j === 1) continue; // sărim peste centrul fiecărei matrice
                totalBoxes++;
            }
        }
    }

    // Creăm colorPool doar pentru boxurile ce vor fi schimbate
    for (let i = 0; i < colors.length; i++) {
        for (let j = 0; j < totalBoxes / colors.length; j++) {
            colorPool.push(i);
        }
    }

    // Amestecăm culorile
    for (let i = colorPool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [colorPool[i], colorPool[j]] = [colorPool[j], colorPool[i]];
    }

    // Aplicăm culorile
    let index = 0;
    for (const face of colorfulBoxes) {
        for (let i = 0; i < colorfulRows; i++) {
            for (let j = 0; j < colorfulCols; j++) {
                if (i === 1 && j === 1) continue; // nu schimbăm boxul central
                const box = face[i][j];
                const colorIndex = colorPool[index++];
                box.c = colors[colorIndex];
                box.colorIndex = colorIndex;
            }
        }
    }
}


function toggle3D(){
     window.location.href = "index3D.html";
}

