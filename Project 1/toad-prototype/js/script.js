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

let toad = undefined;
let toadImage = undefined;

//setting up an array for 3 stones
let stones = [];
let stonesActive = [0,0,0];
let stoneImage = undefined;

//variable for losing and winning state
let gotHit = undefined;
let won = false;

//variables for amount of stones thrown and for the collision between stone and toad
let numStonesThrown = 0;
let ofeliaThrowStone =false;
let stoneDone =false;
let numberTimesToadHit =0;


function preload() {
  //loading all gif and images for objects
  ofeliaThrowImage = loadImage("assets/sprites/ofelia-throw.gif");
  //resizing the gif for ofelia
  ofeliaThrowImage.resize(100,100);
  insectImage = loadImage("assets/sprites/insect.gif");
  tree = loadImage("assets/images/tree.png");
  toadImage = loadImage("assets/sprites/toad.gif");
  stoneImage = loadImage("assets/images/stone.png");
}



function setup() {
  gotHit = false;

  createCanvas (640, 480);

  //creating the sprites for each stone that are in the array
  stoneImage.resize(30, 30);
  stones[0] = createSprite(20, height/2, 30, 30);
  stones[0].addImage(stoneImage);
  stones[1] = createSprite(20, height/2, 30, 30);
  stones[1].addImage(stoneImage);
  stones[2] = createSprite(20, height/2, 30, 30);
  stones[2].addImage(stoneImage);
  //creating ofelia's, insect's and toad's sprite and resizing
  ofeliaThrow = createSprite(20, height/2, 100, 100);
    ofeliaThrowImage.resize(100,100);
  ofeliaThrow.addImage(ofeliaThrowImage);
  insect = createSprite(width/2, 0, 100, 100);
    insectImage.resize(100,100);
  insect.addImage(insectImage);
  toad = createSprite (width-60, height/2, 200, 200);
  toadImage.resize (200,200);
  toad.addImage(toadImage);

}//end of setup



function draw() {
//*adding state for gameOver and win Screen
if (gotHit===true) {
  gameOver();
}
else if(won===true)
{
      winScreen();

}
 else {
//*adding collision so that players dies when hit by insect
if (insect.overlap(ofeliaThrow)) {
 gotHit = true;
 console.log("hit")
}

  background (0);
 //ofelia's position and speed
 //adding movement to ofeliaThrow with the up and down arrow keys
 if (keyDown(UP_ARROW) && ofeliaThrow.position.y < height) {
   ofeliaThrow.position.y = ofeliaThrow.position.y - 3;

// go through each stone and update to ofelias new position
   for(let i=0; i<3; i++){
     //if the stone is not moving then set it
     if(stonesActive[i]!==1){
     stones[i].position.y= ofeliaThrow.position.y;
   }
   }
 }

 if (keyDown(DOWN_ARROW) && ofeliaThrow.position.y > 0) {
   ofeliaThrow.position.y = ofeliaThrow.position.y + 5;
   // go through each stone and update to ofelias new position
   for(let i=0; i<3; i++){
     //if the stone is not moving then set it
      if(stonesActive[i]!==1){
     stones[i].position.y= ofeliaThrow.position.y;
   }
   }
 }
 // if space bar is pressed then user can throw stone
 if(keyDown(" ")){
   if(numStonesThrown<3){
   ofeliaThrowStone =true;
   stonesActive[numStonesThrown]=1;
 }
 }

 //position of insect and speed
 insect.position.x = insect.position.x - 8;
 //making sure the insect reappears
 if (insect.position.x <= 0 ) {
   insect.position.x = width;
   insect.position.y = random (5, height-5);
 }
//check if ofelia is throwing a stone
if(ofeliaThrowStone===true){
  //change stone position
   stones[numStonesThrown].position.x += 5;

   // if stone is offscreen
   if(stones[numStonesThrown].position.x>width){
     //set stoneDoe to true
     stoneDone =true;
   }

   //check if stone overlaps toadImage
   if (stones[numStonesThrown].overlap(toad)) {

     stoneDone = true;
     stones[numStonesThrown].position.x = width +10;
     numberTimesToadHit++;
      console.log( numberTimesToadHit);
 //when the 3 stones hit the toad, game is won
      if (numberTimesToadHit === 3) {
        won=true;
      }

   }

   //check if stone is offscreen or if stone hit toad
   if(stoneDone ===true){
     //go to next stone
     numStonesThrown=numStonesThrown+1;
     stoneDone=false;
     //reset variable that ofelia is no longer throwing a stone
     ofeliaThrowStone=false;
     }
     console.log(numStonesThrown);



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

function winScreen() {
  background(tree, 0, 0);
  textAlign(CENTER);
  fill("white");
  text("win!", width/2, height/2);
}// end of winScreen

//mouseClicked function to restart
function mouseClicked() {
    if (gotHit) {
      gotHit = false;
      ofeliaThrow.position.y = height /2;
      ofeliaThrow.position.x = 20;
      insect.position.y = height /2;
      insect.position.x = width;
    }
}//end of mouseClicked
