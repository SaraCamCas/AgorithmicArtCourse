let cols;
let rows;
let size = 15;
let grid = [];
let nextGrid = [];

function initialArray(cols, rows) {
  let arr = [];
  for (let i = 0; i < cols; i++) {
    arr[i] = [];
    for (let j = 0; j < rows; j++) {
      arr[i][j] = floor(random(2));
    }
  }
  return arr;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(width / size - 1);
  rows = floor(height / size - 1);
  
  // Initialize both grids 
  grid = initialArray(cols, rows);
  nextGrid = initialArray(cols, rows);
  
  //frameRate(10); // Slow down
}

function draw() {
  background(0);
  rectMode(CENTER);
  
  // Draw first generation
  drawingGrid();
  
  // Calculate next gen
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let cell = grid[i][j];
      let neighbour = neighbourSum(grid, i, j);
      
      
      
      // Conway's Game of Life rules:
      // Any dead cell with exactly three live neighbours becomes alive
      if (cell === 0 && neighbour === 3) {
        nextGrid[i][j] = 1;
      }
      // Any live cell with less than 2 or more than 3 neighbours dies
      else if (cell === 1 && (neighbour < 2 || neighbour > 3)) {
        nextGrid[i][j] = 0;
      } 
      // Otherwise, cell remains the same
      else {
        nextGrid[i][j] = cell;
      }
      
    }
  }
  
  // Lets add life if the mouse is on top
  
  let mouseCol = floor((mouseX - size/2) / size);
  let mouseRow = floor((mouseY - size/2) / size);
  
 // Making sure it does not go out of bound
  if (mouseCol >= 0 && mouseCol < cols && mouseRow >= 0 && mouseRow < rows) {
      for (let k = -1; k < 3; k++){
        for (let j = -1; j < 3; j++) {      
         let tempcol = (mouseCol + k + cols) % cols;
         let temprow = (mouseRow + j + rows) % rows;
      
         nextGrid[tempcol][temprow] = 1;            // Set to alive
    }
      }

    }
  
  // Swap grids
  let temp = grid;
  grid = nextGrid;
  nextGrid = temp;
}

function neighbourSum(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      // Torus boundaries
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      
      sum += grid[col][row];
    }
  }
  // Subtract the center cell itself. If its 0 it does nothing
  sum -= grid[x][y];
  
  return sum;
}

function drawingGrid() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j] === 1) {
        fill(255); // White for alive
        // Draw with offset from edges 
        rect(i * size + size / 2, j * size + size / 2, size*0.7, size*0.7);
      } 
      
      
      
    }
  }
}

