//toad game
//https://anti.hackclub.com/workshops/dodge/#part-ii-the-external-js-file

"use strict";

//declaring variable for ofelia's sprite
let ofeliaThrow = undefined;
let ofeliaThrowImage = undefined;

//declaring variables for inspect
let insect = undefined;
let insectImage = undefined;

//declaring variable for gameOver background
let tree = undefined;

//variable for when ofelia is hit by inspect
let gotHit = undefined;


function preload() {
  //loading ofelia's gif
  ofeliaThrowImage = loadImage("assets/sprites/ofelia-throw.gif");
  //loading insect gif
  insectImage = loadImage("assets/sprites/insect.gif")
  //load gameOver background
  tree = loadImage("assets/images/tree.png")
}// end of preload



function setup() {
  gotHit = false;

  createCanvas (640, 480);
  //creating ofelia's sprite
  ofeliaThrow = createSprite(width, height/2, 0, 0);
  ofeliaThrow.addImage(ofeliaThrowImage);
  insect = createSprite(width/2, 0, 0, 0);
  insect.addImage(insectImage);
}//end of setup



function draw() {
//adding state for gameOver
if (gotHit) {
  gameOver();
}
  else {
//adding collision so that players dies when hit by inspect
if (insect.overlap(ofeliaThrow)) {
  gotHit = true;
}

  background (0);
 //ofelia's position and speed
 //adding movement to ofeliaThrow with the up and down arrow keys
 if (keyDown(UP_ARROW) && ofeliaThrow.position.y < height) {
   ofeliaThrow.position.y = ofeliaThrow.position.y - 1;
 }

 if (keyDown(DOWN_ARROW) && ofeliaThrow.position.y > 0) {
   ofeliaThrow.position.y = ofeliaThrow.position.y + 1;
 }

 //position of insect and speed
 insect.position.x = insect.position.x + 3;
 //making sure the insect reappears
 if (insect.position.x > width) {
   insect.position.x = 0;
   insect.position.y = random (5, height-5);
 }

  //calling all sprites
  drawSprites();
  }
}//end of draw

function gameOver() {
  background(tree, 0, 0);
  textAlign(CENTER);
  fill("white");
  text("Game Over!", width/2, height/2);
  text("Click anywhere to try again.", width/2, 3*height/4);
}// end of gameOver

//mouseClicked function to restart
function mouseClicked() {
    if (gotHit) {
      gotHit = false;
      ofeliaThrow.position.y = height /2;
      ofeliaThrow.position.x = width;
      insect.position.y = height /2;
      insect.position.x = 0;
    }
}//end of mouseClicked
