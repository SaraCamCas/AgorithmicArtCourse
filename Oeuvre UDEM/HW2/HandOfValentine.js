// Hand of Valentine

// Handy link for different shades of red : https://htmlcolorcodes.com/colors/shades-of-red/
// Source for the heart shape: https://mathworld.wolfram.com/HeartCurve.html
let cols;
let rows;
let sizeH; // Size of each cell in the grid
let grid = [];
let nextGrid = [];
let SmallColor; let BigColor; let MouseHeart; let InvisiHeart; let SmallColorSemi;// Pink for alive+

// Variables for hand
let video;
let handPose;
let hands = [];

// Function for videos and hand detection

function preload() {
  // Initialize HandPose model with flipped video input
  handPose = ml5.handPose({ flipped: true});
}
// Callback function for when handPose outputs data
function gotHands(results) {
  // save the output to the hands variable
  hands = results;
}

function addCellsAtFinger(x, y) {
  let fingerCol = floor((x - sizeH/2) / sizeH);
  let fingerRow = floor((y - sizeH/2) / sizeH);
  
 // Making sure it does not go out of bound
  if ((fingerCol >= 0) && (fingerCol < cols) && (fingerRow >= 0) && (fingerRow < rows)) {
      for (let k = -1; k < 2; k++){
        for (let j = -1; j < 2; j++) {      
         let tempcol = (fingerCol + k + cols) % cols;
         let temprow = (fingerRow + j + rows) % rows;
      
         if (grid[tempcol][temprow] === 0) { // Only set to alive 
          nextGrid[tempcol][temprow] = 1;
        }            
    }
      }

    }
}

function HandInteraction() {
  if (hands.length > 0){ // Ensure at least one hand is detected
    let hand = hands[0];
    let index = hand.keypoints[8];

    
    let x = map(index.x, 0, video.width, 0, width);
    let y = map(index.y, 0, video.height, 0, height);

    // Add cells around the finger position

    addCellsAtFinger(x, y);
    heart(x, y, sizeH * 4, InvisiHeart, MouseHeart); 

}
}

// Functions for the heart
function initialArray(cols, rows) {
  let arr = [];
  for (let i = 0; i < cols; i++) {
    arr[i] = [];  
    for (let j = 0; j < rows; j++) {
      arr[i][j] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1][floor(random(11))]; // Randomly initialize with more dead cells than alive
    }
  }
  return arr;
}

function heart(originX, originY, heartSize, heartColor, strokeColor) {
  push();  // Save current drawing state, if not a mess with the rest of the drawing
  translate(originX, originY);
  stroke(strokeColor);
  strokeWeight(heartSize * 0.1);
  
  fill(heartColor);
  beginShape();
  for (let t = 0; t < TWO_PI; t += 0.15) { // Smaller step!
    let x = heartSize * 16 * sin(t) * sin(t) * sin(t) / 18; // divide by 18 to make it smaller and fit in the cell
    let y = -heartSize * (13 * cos(t) - 5 * cos(2*t) - 2 * cos(3*t) - cos(4*t)) / 18; // divide by 18 to make it smaller and fit in the cell
    vertex(x, y); // Vertex create a continuous shape
  }
  endShape(CLOSE);
  pop(); // Restore drawing state
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
        
        // Draw with offset from edges 
        let tempx = i * sizeH + sizeH / 2;
        let tempy = j * sizeH + sizeH / 2;
        // Uncomment to draw squares instead of hearts

        //fill(255); // White for alive
        //rect(tempx, tempy, sizeH*0.7, sizeH*0.7); 

        let colorOptions = [InvisiHeart, SmallColor, SmallColorSemi];
        let chosenColor = random(colorOptions);

        heart(tempx, tempy, sizeH*0.7, chosenColor, SmallColor); 
      } 
      
      
      
    }
  }
}

///////////////////////////////////////////////////
function setup() {

   // Title of the piece :)
  alert("Game of hearts! <3");
  createCanvas(windowWidth, windowHeight);

  // Video setup
  video = createCapture(VIDEO, { 
    flipped: true,
    audio: false
 //   , video: {
 //     width: 260,    
 //     height: 220,
 //     frameRate: 30 // ← Low = Fast
 //     }
  });
  video.hide();
  
  

  // Start detecting hands
  handPose.detectStart(video, gotHands);

  // Grid setup

  sizeH = 60;
  cols = floor(width / sizeH - 1);
  rows = floor(height / sizeH - 1);

  
  // Set the pink colors
  SmallColor = color(224, 17, 95); // Rasberry Pink 
  BigColor = color(99, 3, 48); // Tyrian Purple
  MouseHeart = color(255, 255, 255, 150); // White 
  InvisiHeart = color(224, 17, 95, 0); // Invisible heart 
  SmallColorSemi = color(224, 17, 95, 75); // Rasberry Pink semi transparent
  
  // Initialize both grids 
  grid = initialArray(cols, rows);
  nextGrid = [];
  for (let i = 0; i < cols; i++) {
    nextGrid[i] = new Array(rows).fill(0);
  }

  
  
  frameRate(30); // Uncomment to slow down Slow down
}

function draw() {
  background(0);
  rectMode(CENTER);
  
  // Background heart
  heart(width/2, height/2, Math.min(windowWidth, windowHeight)*0.4, BigColor, SmallColorSemi); // Big heart in the background
  
  // Draw first gen
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
  
  // Lets add life if the index is there
  
  HandInteraction();
  
  // Swap grids
  let temp = grid;
  grid = nextGrid;
  nextGrid = temp;

  push();
  translate(width - (width/4), 30);
  scale(0.5);  
  image(video, 0, 0);
  pop();
}


