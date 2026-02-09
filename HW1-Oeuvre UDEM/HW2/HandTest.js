let video;
let handPose;
let hands = [];
let cols;
let rows;
let size; // Size of each cell in the grid
let grid = [];
let nextGrid = [];
let SmallColor; let BigColor; let MouseHeart; let InvisiHeart; let SmallColorSemi;// Pink for alive+

function preload() {
  // Initialize HandPose model with flipped video input
  handPose = ml5.handPose({ flipped: true });
}
function gotHands(results) {
  hands = results;
}

function heart(originX, originY, heartSize, heartColor, strokeColor) {
  push();  // Save current drawing state, if not a mess with the rest of the drawing
  translate(originX, originY);
  stroke(strokeColor);
  strokeWeight(heartSize * 0.1);
  
  fill(heartColor);
  beginShape();
  for (let t = 0; t < TWO_PI; t += 0.05) { // Smaller step!
    let x = heartSize * 16 * sin(t) * sin(t) * sin(t) / 18; // divide by 18 to make it smaller and fit in the cell
    let y = -heartSize * (13 * cos(t) - 5 * cos(2*t) - 2 * cos(3*t) - cos(4*t)) / 18; // divide by 18 to make it smaller and fit in the cell
    vertex(x, y); // Vertex create a continuous shape
  }
  endShape(CLOSE);
  pop(); // Restore drawing state
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO, { flipped: true });
  video.hide();
  
  // Start detecting hands
  handPose.detectStart(video, gotHands);

  MouseHeart = color(255, 255, 255, 150); // White 
  InvisiHeart = color(224, 17, 95, 0);
  size = 25;
}

function draw() {
  clear();
  image(video, 0, 0, width, height);
  if (hands.length > 0){ // Ensure at least one hand is detected
    let hand = hands[0];
    let index = hand.index_finger_tip;

    let x = map(index.x, 0, video.width, 0, width);
    let y = map(index.y, 0, video.height, 0, height);

    
    heart(x, y, size * 4, InvisiHeart, MouseHeart); 
  }
}