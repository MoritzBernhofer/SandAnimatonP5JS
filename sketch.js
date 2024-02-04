let grid;
let rowCount = 100;
let rowSize = 100;
let boxSize = 10;
let hue = 0;
let brightness = 40;

let hueMinInput;
let hueMaxInput;
let hueChangeInput;

let hueMin;
let hueMax;
let hueChange;


let sandCount;

interface value{

}

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

function isValidPosition(x, y, newGrid) {
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

    createP("Choose min and a max value for the color (0-360) and a change rate (0 to 180)");

    hueMinInput = createInput("0");
    hueMaxInput = createInput("360");
    hueChangeInput = createInput("0.5");

    createP("Amount of sand");
    sandCount = createP("0");

    createP("<img id='color-wheel' src=\"https://i.stack.imgur.com/PokCt.png\">");



    hueMin = hueMinInput.value();
    hueMax = hueMaxInput.value();
    hueChange = hueChangeInput.value();
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

    hue += Number.parseFloat(hueChange);

    if (hue >= hueMax) {
        hue = hueMin;
    }

    brightness += 0.5;

    if(brightness >= 100){
        brightness = 40;
    }
}


function draw() {
    hueMin = Number.parseInt(hueMinInput.value());
    hueMax = Number.parseInt(hueMaxInput.value());
    hueChange = Number.parseFloat(hueChangeInput.value());

    if(hue > hueMax || hue < hueMin){
        hue = hueMin;
    }

    if(isNaN(hue)){
        hue = hueMin;
    }

    sandCount.html(grid.flat().reduce((previousValue, currentValue) => previousValue + (currentValue > 0 ? 1 : 0)));

    background("black");

    drawGrid();

    updateGrid();
}