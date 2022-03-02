//toad game
//https://anti.hackclub.com/workshops/dodge/#part-ii-the-external-js-file

"use strict";

let gameState = "title";
let miniGameRestart = false;

//variables for toad game
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

//variables for chest game
//declaring a video variable for access to webcam
let video = undefined;

//declaring variable for handpose
let handpose = undefined;

//current set of predictions
let predictions = [];

// the chest variables
let woodChest = undefined;
let silverChest = undefined;
let ironChest = undefined;
let monster = undefined;
let dagger = undefined;
//key variable
let key = undefined;

//position of the 3 chests on the canvas
woodChest = {
  x: 50,
  y: 10,
  size: 200,
  image: undefined,
};

//position of dagger
dagger = {
  x: 100,
  y: 100,
  size: 0,
  image: undefined,
};

//position of monster
monster = {
  x: 100,
  y: 100,
  size: 0,
  image: undefined,
};

silverChest = {
  x: 450,
  y: 50,
  size: 200,
  image: undefined,
};

ironChest = {
  x: 10,
  y: 250,
  size: 200,
  image: undefined,
};

key = {
  x: 100,
  y: 100,
  size: 100,
  image: undefined,
};

//background variable
let feast = 0;

//flipping the webcam
let mirrordex = 0;
let tipY = 0;
let tipX = 0;

//states for winning
let chestCorrectState = 0;

//states for losing
let chestIncorrectState = 0;

let chestState = "chestPlay";
//end of chest variables


function preload() {
  //preload for toad game
  ofeliaThrowImage = loadImage("assets/sprites/ofelia-throw.gif");
  //resizing the gif for ofelia
  ofeliaThrowImage.resize(100,100);
  insectImage = loadImage("assets/sprites/insect.gif");
  tree = loadImage("assets/images/tree.png");
  toadImage = loadImage("assets/sprites/toad.gif");
  stoneImage = loadImage("assets/images/stone.png");

  //preload for chest game
  woodChest.image = loadImage("assets/images/chest-wood.png");
  silverChest.image = loadImage("assets/images/chest-silver.png");
  ironChest.image = loadImage("assets/images/chest-iron.png");
  feast = loadImage("assets/images/feast.png");
  key.image = loadImage("assets/images/key.png");
  monster.image = loadImage("assets/sprites/monster.gif");
  dagger.image = loadImage("assets/images/dagger.png");
}



function setup() {
  gotHit = false;

  createCanvas (640, 480);
  //setup for toad game
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

function mousePressed(){
  if (gameState === "title") {
    gameState = "toadGame";
  }
  if(gameState ==="toadGame"){

    //reset toad game
    if (gotHit) {
      gotHit = false;
      ofeliaThrow.position.y = height /2;
      ofeliaThrow.position.x = 20;
      insect.position.y = height /2;
      insect.position.x = width;
      miniGameRestart=false;
      numStonesThrown =0;
      numberTimesToadHit =0;
      stonesActive[0] =0;
      stonesActive[1] =0;
       stonesActive[2] =0;


    }

  } //reset tood gameOver
  if(gameState ==="chestGame"){
    if(chestIncorrectState ===1){
      chestIncorrectState=0;
      monster.size=0;
      miniGameRestart=false;

    }
  }//reset chest game
  if(gameState === "sacrificeGame") {
    //reset variables
    // miniGameRestart = false;
  }

}

function getPredictionResults(results){
  predictions = results;

}

function draw() {
  //if restartScreen
  if(miniGameRestart ===true){
    gameOver();
  }
//playing a game
  else{
   if(gameState ==="chestSetup"){
    //setup for chest game
    //access to user's webcam
    video = createCapture(VIDEO);
    video.hide();

    //loading handpose model
    handpose = ml5.handpose(
      video,
      {
        fliphorizontal: true,
      },
      function () {
        console.log(`Model loaded.`);

      }
    );
    gameState = "chestGame";

    //listen for predictions
    handpose.on(`predict`, getPredictionResults);



  }
  else if (gameState === "title") {
background (0);
fill(255);
text("title", width/2, height/2);

  }
  else if (gameState === "toadGame") {

//*adding state for gameOver and win Screen
if (gotHit===true) {
  miniGameRestart =true;
}
else if(won===true)
{
    //  winScreen();
gameState = "chestSetup";
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
 if (keyDown(UP_ARROW) && ofeliaThrow.position.y >0) {
   ofeliaThrow.position.y = ofeliaThrow.position.y - 3;

// go through each stone and update to ofelias new position
   for(let i=0; i<3; i++){
     //if the stone is not moving then set it
     if(stonesActive[i]!==1){
     stones[i].position.y= ofeliaThrow.position.y;
   }
   }
 }

 if (keyDown(DOWN_ARROW) && ofeliaThrow.position.y <height) {
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
}//end of toad

else if (gameState === "chestGame") {
  background(feast, 0, 0, 640, 480);
  if (chestState === "chestPlay") {
    // detecting index finger from base to tip
    if (predictions.length > 0) {
      let hand = predictions[0];
      let index = hand.annotations.indexFinger;
      let tip = index[3];
      tipX = tip[0];
      tipY = tip[1];
      mirrordex = width - tipX;
      //drawing the pin body
      checkCorrectCollision();
      checkIncorrectCollision();
    }

    //calling the chests, key, and their positions
    push();
    image(
      woodChest.image,
      woodChest.x,
      woodChest.y,
      woodChest.size,
      woodChest.size
    );
    pop();

    push();
    image(
      silverChest.image,
      silverChest.x,
      silverChest.y,
      silverChest.size,
      silverChest.size
    );
    pop();

    push();
    image(
      ironChest.image,
      ironChest.x,
      ironChest.y,
      ironChest.size,
      ironChest.size
    );
    pop();

    push();
    image(key.image, mirrordex, tipY, 100, 100);
    pop();

    if (chestCorrectState === 1) {
      if (dagger.size < 10) {
        dagger.size = dagger.size + 10;

      push();
      image(dagger.image, width / 2, height / 2, dagger.size, dagger.size);
      pop();
    }
    else{
      console.log("next state");
      gameState = "sacrificeGame";
      handpose.removeListener(`predict`, getPredictionResults);
    }
    }

    if (chestIncorrectState === 1) {
      if (monster.size < width) {
        monster.size = monster.size + 100;
      } else {
          miniGameRestart =true;
        //chestState = "chestLose";
      }
      push();
      image(monster.image, width / 2, height / 2, monster.size, monster.size);
      pop();
    }
  } //end play state
  else {
    // lose state
    background(255, 0, 0);
  }
}// end of chestGame
else if(gameState ==="sacrificeGame"){
  background(0);
  fill(255);
  text("sacrifice game",width/2,height/2);

}//ens sacrifice game

// else if(gameState === "kingdomWin") {
//   background(0);
//   fill(255);
//   text("win", width/2, height/2);
// }

} //if not in restart screen

}//end of draw

//functions for chestGame: chestIncorrectState and checkCorrectCollision
function checkCorrectCollision() {
  let d = dist(woodChest.x, woodChest.y, mirrordex, tipY);
  if (d < 100) {
    chestCorrectState = 1;
  }
} // end checkCorrectCollision

function checkIncorrectCollision() {
  let d = dist(silverChest.x, silverChest.y, mirrordex, tipY);
  let d2 = dist(ironChest.x, ironChest.y, mirrordex, tipY);
  if (d < 100) {
    chestIncorrectState = 1;
  } else if (d2 < 100) {
    chestIncorrectState = 1;
  }
} // end checkIncorrectCollision

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
