// The fractal trees were inspired by Daniel Shiffmal fractal trees!
// Source: https://www.youtube.com/watch?v=0jjeOYMjmDU

var len, len1, angle, angle1 // Var for frost and tree
var recdWidth, recHeight, recdX, recX, blocks, recY, extraheight  // Var recs
var maxflakes, snowX, snowWidth, snowY, snowHeight // Var snow

function setup() {
  createCanvas(1200, 900);
}


function draw() {
  background(0);
  
  // Trees and the Frost
  frostTrees();
  
  // Statue
  Statue();
  
  // Snow 
  snowstrom(1200, 0, width, 0, height);
  
  noLoop();
}

// Functions for the statue!

function Statue(){
  recWidth = 500;  
  recHeight = 110; 
  recX = (width - recWidth) / 2;  // Center horizontally
  recY = (35)
  extraheight = 15;
  blocks = floor(random(2,6));
  drawIrregularrecs(recWidth,recHeight+extraheight,recX,recY);
  let temp = recHeight+extraheight+3 ;
  for (let i=0; i < blocks; i++){
  drawIrregulargrid(recWidth,recHeight,recX,recY + temp);
  temp += recHeight+3;
  }
  drawIrregularrecs(recWidth,recHeight+15,recX,recY+temp);
}

function drawIrregularrecs(recWidth,recHeight,recX,recY) {
    // Individual columns
  
    maxflakes = 5;
    
    let currentX = recX;
    let minWidth = 20;
    let maxWidth = 100;
    
    while (currentX < recX + recWidth) {
        let remainingSpace = (recX + recWidth) - currentX;
        let columnWidth;
        
        // Check if this is the last rectangle
        if (remainingSpace <= minWidth * 2) {
            // Last rectangle: use all remaining space
            columnWidth = remainingSpace;
        } else {
            // Regular rectangle: random width
            columnWidth = random(minWidth, maxWidth);
        }
        
        // Doesn't exceed remaining space
        columnWidth = min(columnWidth, remainingSpace);
        
        fill(random(150, 200));
        stroke(255); 
        strokeWeight(2);
        rect(currentX, recY, columnWidth, recHeight); //x, y, w, and h 
      
        snowstrom(maxflakes, currentX, columnWidth, recY, recHeight)
        
        currentX += columnWidth;
    }
    
}

function drawIrregulargrid(recWidth, recHeight, recX, recY) {
    maxflakes = 9;
    
    let currentX = recX;
    let minWidth = 20;
    let minHeight = 15;
    let maxWidth = 100;
    let maxHeight = 80;
    
    // Create columns
    while (currentX < recX + recWidth) {
        let remainingWidth = (recX + recWidth) - currentX;
        let columnWidth;
        
        // See if this is the last column
        if (remainingWidth < minWidth * 2) {
            columnWidth = remainingWidth; 
        } else {
            columnWidth = random(minWidth, maxWidth);
        }
        // Doesn't exceed remaining space
        columnWidth = min(columnWidth, remainingWidth);
        
        // Draw this column
        let currentY = recY;
        
        
        // Create rows within this column
        while (currentY < recY + recHeight) {
            let remainingHeight = (recY + recHeight) - currentY;
            let rowHeight;
            
            // See if this is the last row
            if (remainingHeight < minHeight * 2) {
                rowHeight = remainingHeight; 
            } else {
                rowHeight = random(minHeight, maxHeight);
            }
            // Doesn't exceed remaining space
            rowHeight = min(rowHeight, remainingHeight);
            // Draw the cell
            stroke(255);
            strokeWeight(2);
            fill(random(50, 100));
            rect(currentX, currentY, columnWidth, rowHeight);
            snowstrom(maxflakes, currentX, columnWidth, currentY, rowHeight);
            
            currentY += rowHeight;
        }
        
        currentX += columnWidth;
    }
}

// Function for the snow!

function snowstrom(maxflakes, snowX, snowWidth, snowY, snowHeight){
  noStroke();
  fill(255);
  margin = 5;
  numdots = floor(random(0, maxflakes+1));
  
  for (let i=0; i < numdots; i++){
    let dotX = random(snowX + margin, snowX + snowWidth - margin);
    let dotY = random(snowY + margin, snowY + snowHeight - margin);
    
    let size = random(3, 6);
    ellipse(dotX, dotY, size, size);
  }
  
}

// Functions for the trees and the frost!

function frostTrees(){
  len = random(50, 300); // Length of the tree trunk
  len1 = random(50, 300);
  stroke(255);
  strokeWeight(2);
  angle = random(PI/12, PI/3); // Angle of the branches
  angle1 = random(PI/20, PI/4); 
  
  // Draw tree 1
  push();
  translate(150, height);
  trees(len, angle);
  pop();
  
  // Draw tree 2
  push();
  translate(width - 150, height);
  trees(len1, angle1);
  pop();
  
  // Draw frost
  push();
  translate(0, height-100); 
  frost(len1, angle1);
  pop();
  
  push();
  translate(0, height-300); 
  frost(len, angle);
  pop();
}

function frost(len, angle){
  rotate(angle);
  
  line(0,0,0, -len);
  translate(0,-len) // Moves it up by len pixels.
  if (len>1
     ){
    frost(len*0.69,angle)
    frost(len*0.69,-angle)
  }
}

function trees(len, angle){
  // Draw the trunk
  line(0,0,0, -len); // Draws a line from (0,0) to (0,-len)
  
  if (len>4){
    // End of the trunk
    push();
    translate(0, -len); // Moves it up by len pixels.
    
    // Right branch
    push(); // Save current position settings
    rotate(angle);
    trees(len*0.69, angle);
    pop(); // Restore to saved position/rotation
    
    // Left branch
    push(); // Save current position settings
    rotate(-angle);
    trees(len*0.69, angle);
    pop(); // Restore to saved position/rotation
    
    pop();
  }
}

