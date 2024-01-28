let grid;
let rowCount = 100;
let rowSize = 100;
let boxSize = 10;
let hue = 180;
function createGrid() {
    let result = [];
    for (let i = 0; i < rowCount; i++) {
        let row = [];
        for (let j = 0; j < rowSize; j++) {
            row.push(0);
        }
        result.push(row);
    }
    return result;
}

function drawGrid() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === 0) {
                fill("black");
            } else {
                fill(grid[i][j], 100, 100);
            }
            noStroke();
            rect(i * boxSize, j * boxSize, boxSize, boxSize);
        }
    }
}

function updateGrid() {
    let newGrid = createGrid();

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] > 0) {
                let nX = i;
                let nY = j + 1;

                if (grid[nX][nY] > 0) {
                    if (Math.random() > 0.75) {
                        if (Math.random() > 0.5) {
                            if (isValidPosition(nX + 1,nY)) {
                                nX += 1;
                            } else if (isValidPosition(nX - 1,nY)) {
                                nX -= 1;
                            }
                        }
                    }
                }

                if (isValidPosition(nX, nY)) {
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
    createCanvas(1000, 1000);
    grid = createGrid();

    colorMode(HSB, 360, 100, 100);
}

function mouseDragged() {
    let x = Math.floor(mouseX / boxSize);
    let y = Math.floor(mouseY / boxSize);


    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (Math.random() > 0.3) {
                if (isValidPosition(x + i, y + j)) {
                    grid[x + i][y + j] = hue;
                }
            }
        }
    }

    hue += 0.5;

    if (hue >= 320) {
        hue = 180;
    }
}

function draw() {
    background("black");

    drawGrid();

    updateGrid();
}