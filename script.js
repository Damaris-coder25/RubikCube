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
    initBoxes1(colorfulCols, colorfulRows)
    initBoxes2(colorfulCols, colorfulRows)
    initBoxes3(colorfulCols, colorfulRows)
    initBoxes4(colorfulCols, colorfulRows)
    initBoxes5(colorfulCols, colorfulRows)
    initBoxes6(colorfulCols, colorfulRows)
}

function mouseClicked() {
    for (const rows of colorfulBoxes)
        for (const box of rows)
            if (mouseX >= box.x && 
                mouseX <= box.x + box.s &&
                mouseY >= box.y && 
                mouseY <= box.y + box.s) {
                    const currentIndex = colors.indexOf(box.c);
                    const nextIndex = (currentIndex + 1) % colors.length;
                    box.c = colors[nextIndex];
            }

}

function draw() {
    background("#eeeeee")
    drawColorfulBoxes()
}

function drawColorfulBoxes() {
    for (let rows of colorfulBoxes) {
        for (let box of rows) {
                drawBox(box)
        }
    }
}

function drawBox(obj) {
    fill(obj.c.r, obj.c.g, obj.c.b)
    square(obj.x, obj.y, obj.s)
}

//white
function initBoxes1(cols, rows) {
    let x = 180
    let y = 15
    for (let i = 0; i < rows; i++) {
        const lines = []
        colorfulBoxes.push(lines)
        for (let j = 0; j < cols; j++) {
            const box = {
                x: x,
                y: y,
                s: 40,
                c: {
                    r: 225,
                    g: 225,
                    b: 225
                },
            }
            lines.push(box);
            x += 50
        }
        x = 180
        y += 50
    }
}

//yellow
function initBoxes2(cols, rows) {
    let x = 180
    let y = 325
    for (let i = 0; i < rows; i++) {
        const lines = []
        colorfulBoxes.push(lines)
        for (let j = 0; j < cols; j++) {
            const box = {
                x: x,
                y: y,
                s: 40,
                c: {
                    r: 255,
                    g: 255,
                    b: 0
                },
            }
            lines.push(box);
            x += 50
        }
        x = 180
        y += 50
    }
}

//orange
function initBoxes3(cols, rows) {
    let x = 25
    let y = 170
    for (let i = 0; i < rows; i++) {
        const lines = []
        colorfulBoxes.push(lines)
        for (let j = 0; j < cols; j++) {
            const box = {
                x: x,
                y: y,
                s: 40,
                c: {
                    r: 255,
                    g: 165,
                    b: 0
                },
            }
            lines.push(box);
            x += 50
        }
        x = 25
        y += 50
    }
}

//green
function initBoxes4(cols, rows) {
    let x = 180
    let y = 170
    for (let i = 0; i < rows; i++) {
        const lines = []
        colorfulBoxes.push(lines)
        for (let j = 0; j < cols; j++) {
            const box = {
                x: x,
                y: y,
                s: 40,
                c: {
                    r: 0,
                    g: 225,
                    b: 0
                },
            }
            lines.push(box);
            x += 50
        }
        x = 180
        y += 50
    }
}

//red
function initBoxes5(cols, rows) {
    let x = 340
    let y = 170
    for (let i = 0; i < rows; i++) {
        const lines = []
        colorfulBoxes.push(lines)
        for (let j = 0; j < cols; j++) {
            const box = {
                x: x,
                y: y,
                s: 40,
                c: {
                    r: 255,
                    g: 0,
                    b: 0
                },
            }
            lines.push(box);
            x += 50
        }
        x = 340
        y += 50
    }
}

//blue
function initBoxes6(cols, rows) {
    let x = 500
    let y = 170
    for (let i = 0; i < rows; i++) {
        const lines = []
        colorfulBoxes.push(lines)
        for (let j = 0; j < cols; j++) {
            const box = {
                x: x,
                y: y,
                s: 40,
                c: {
                    r: 0,
                    g: 0,
                    b: 225
                },
            }
            lines.push(box);
            x += 50
        }
        x = 500
        y += 50
    }
}