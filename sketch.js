let grid;

let rowCount = 142;
let rowSize;
let boxSize = 7;
let hue = 0;
let brightness = 40;

let hueMinInput;
let hueMaxInput;
let hueChangeInput;
let pixelMultInput;
let gravityCheckBox;

let hueMin = 200;
let hueMax = 320;
let hueChange = 0.5;
let pixelMult = 1;

let gravity;

let sandCount;
let fps;


// interface value{
//
// }

function createGrid() {
    let result = [];

    for (let i = 0; i < rowSize; i++) {
        let row = [];
        for (let j = 0; j < rowCount; j++) {
            row.push(0);
        }
        result.push(row);
    }
    return result;
}

function drawGrid() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] !== 0) {
                fill(grid[i][j], 100, 100);
                noStroke();
                rect(i * boxSize, j * boxSize, boxSize, boxSize);
            }
        }
    }
}

function updateGrid() {
    let newGrid = createGrid();

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] > 0) {
                let nX = i + (Math.random() > 0.9 ? (Math.random() > 0.5 ? 1 : -1) : 0);
                let nY = j + 1 * gravity;

                if (isValidPosition(nX, nY)) {
                    if (grid[nX][nY] > 0) {
                        if (Math.random() > 0.75) {
                            if (Math.random() > 0.5) {
                                if (isValidPosition(nX + 1, nY)) {
                                    nX += 1 * gravity;
                                } else if (isValidPosition(nX - 1, nY)) {
                                    nX -= 1 * gravity;
                                }
                            }
                        }
                    }
                }

                if (isValidPosition(nX, nY) && newGrid[nX][nY] === 0) {
                    newGrid[nX][nY] = grid[i][j];
                } else {
                    newGrid[i][j] = grid[i][j];
                }
            }
        }
    }
    grid = newGrid;
}

function isValidPosition(x, y) {
    return x < rowSize
        && x >= 0
        && y < rowCount
        && y >= 0
        && grid[x][y] === 0;
}

function setup() {
    createCanvas(Math.round(windowWidth), 1000, P2D);
    rowSize = Math.round(windowWidth) / boxSize;

    grid = createGrid();

    frameRate(200);

    pixelDensity(1)

    colorMode(HSB, 360, 100, 100);

    createP("Choose min and a max value for the color (0-360) and a change rate (0 to 180)");

    hueMinInput = createInput("" + hueMin);
    hueMaxInput = createInput("" + hueMax);
    hueChangeInput = createInput("" + hueChange);

    createP("Pixel Multiplier, fun");
    pixelMultInput = createInput("" + pixelMult)

    gravityCheckBox = createCheckbox('fun');

    createP("Amount of sand");
    sandCount = createP("0");


    fps = createP("0");
}

function mouseDragged() {
    let x = Math.round(mouseX / boxSize);
    let y = Math.round(mouseY / boxSize);

    for (let i = 0; i < 3 * pixelMult; i++) {
        for (let j = 0; j < 3 * pixelMult; j++) {
            if (Math.random() > 0.1) {
                if (isValidPosition(x + i, y + j)) {
                    grid[x + i][y + j] = hue;
                }
            }
        }
        hue += Number.parseFloat(hueChange / 3);

        if (hue >= hueMax) {
            hue = hueMin;
        }
    }

    brightness += 0.5;

    if (brightness >= 100) {
        brightness = 40;
    }
}


function draw() {
    hueMin = Number.parseInt(hueMinInput.value());
    hueMax = Number.parseInt(hueMaxInput.value());
    hueChange = Number.parseFloat(hueChangeInput.value());
    pixelMult = Number.parseInt(pixelMultInput.value())

    if (hue > hueMax || hue < hueMin) {
        hue = hueMin;
    }

    if (isNaN(hue)) {
        hue = hueMin;
    }

    if (gravityCheckBox.checked()) {
        gravity = -1;
    } else {
        gravity = 1;
    }

    sandCount.html(grid.flat().reduce((previousValue, currentValue) => previousValue + (currentValue > 0 ? 1 : 0)));

    fps.html(Math.round(frameRate() * 100) / 100 + " fps");

    background(0);

    for (let i = 0; i < 3; i++) {
        updateGrid();
    }

    drawGrid();
}