//toad game
//https://anti.hackclub.com/workshops/dodge/#part-ii-the-external-js-file

"use strict";

//variables for gameStates
let gameState = "title";
let miniGameRestart = false;

//variables for toad game
//declaring variable for ofelia's sprite
let ofeliaThrow = undefined;
let ofeliaThrowImage = undefined;
//declaring variables for inspect
let insect = undefined;
let insectImage = undefined;
//variables for toad
let toad = undefined;
let toadImage = undefined;

//setting up an array for 3 stones
let stones = [];
let stonesActive = [0, 0, 0];
let stoneImage = undefined;

//variable for losing and winning state
let gotHit = undefined;
let won = false;

//variables for amount of stones thrown and for the collision between stone and toad
let numStonesThrown = 0;
let ofeliaThrowStone = false;
let stoneDone = false;
let numberTimesToadHit = 0;

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
//monster variable
let monster = undefined;
//dagger variable
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

//position and size of dagger
dagger = {
  x: 100,
  y: 100,
  size: 0,
  image: undefined,
};
//position and size of monster
monster = {
  x: 100,
  y: 100,
  size: 0,
  image: undefined,
};
//position and size of 3 chests
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

//background variables
let feast = 0;

//flipping the webcam
let mirrordex = 0;
let tipY = 0;
let tipX = 0;

//states for winning chest game
let chestCorrectState = 0;

//states for losing chest game
let chestIncorrectState = 0;

let chestState = "chestPlay";
//end of chest variables

//declaring variable for gameOver and title background
let tree = undefined;

function preload() {
  //preload for toad game
  ofeliaThrowImage = loadImage("assets/sprites/ofelia-throw.gif");
  //resizing the gif for ofelia
  ofeliaThrowImage.resize(100, 100);
  insectImage = loadImage("assets/sprites/insect.gif");
  toadImage = loadImage("assets/sprites/toad.gif");
  stoneImage = loadImage("assets/images/stone.png");

  //preload for "sprites" in chest game
  woodChest.image = loadImage("assets/images/chest-wood.png");
  silverChest.image = loadImage("assets/images/chest-silver.png");
  ironChest.image = loadImage("assets/images/chest-iron.png");
  key.image = loadImage("assets/images/key.png");
  monster.image = loadImage("assets/sprites/monster.gif");
  dagger.image = loadImage("assets/images/dagger.png");

  //preload for backgrounds
  tree = loadImage("assets/images/tree.png");
  feast = loadImage("assets/images/feast.png");
} // end of preload

function setup() {
  //state for when ofelia is hit by insect in toadGame
  gotHit = false;

  createCanvas(640, 480);

  //setup for toad game
  //creating the sprites for each stone that are in the array
  stoneImage.resize(30, 30);
  stones[0] = createSprite(20, height / 2, 30, 30);
  stones[0].addImage(stoneImage);
  stones[1] = createSprite(20, height / 2, 30, 30);
  stones[1].addImage(stoneImage);
  stones[2] = createSprite(20, height / 2, 30, 30);
  stones[2].addImage(stoneImage);
  //creating ofelia's, insect's and toad's sprite and resizing
  ofeliaThrow = createSprite(20, height / 2, 100, 100);
  ofeliaThrowImage.resize(100, 100);
  ofeliaThrow.addImage(ofeliaThrowImage);
  insect = createSprite(width / 2, 0, 100, 100);
  insectImage.resize(100, 100);
  insect.addImage(insectImage);
  toad = createSprite(width - 60, height / 2, 200, 200);
  toadImage.resize(200, 200);
  toad.addImage(toadImage);
} //end of setup

//starting with title state, once mousecPressed, then enter toadGame
function mousePressed() {
  if (gameState === "title") {
    gameState = "toadGame";
  }
  if (gameState === "toadGame") {
    //reset toad game for when losing
    if (gotHit) {
      gotHit = false;
      ofeliaThrow.position.y = height / 2;
      ofeliaThrow.position.x = 20;
      insect.position.y = height / 2;
      insect.position.x = width;
      miniGameRestart = false;
      numStonesThrown = 0;
      numberTimesToadHit = 0;
      stonesActive[0] = 0;
      stonesActive[1] = 0;
      stonesActive[2] = 0;
    }
  }
  //reset chestGame
  if (gameState === "chestGame") {
    if (chestIncorrectState === 1) {
      chestIncorrectState = 0;
      monster.size = 0;
      miniGameRestart = false;
    }
  } //reset sacrificeGame
  if (gameState === "sacrificeGame") {
    //reset variables
    // miniGameRestart = false;
  }
}

//making sure that ml5 is only active during chestGame to prevent lag
function getPredictionResults(results) {
  predictions = results;
}

function draw() {
  //if gameOver screen, then program will use miniGameRestart to restart current game
  if (miniGameRestart === true) {
    gameOver();
  }
  //playing chestGame
  //although chestGame is after toadGame, the following order had worked best to help prevent lag
  else {
    if (gameState === "chestSetup") {
      //access to user's webcam
      video = createCapture(VIDEO);
      video.hide();
      //loading handpose model
      handpose = ml5.handpose(
        video,
        {
          //flipping video so that webcam acts more like a mirror rather than perfect copy
          fliphorizontal: true,
        },
        //console.log to make sure model is loaded for ml5 (helps for testing when there is lag)
        function () {
          console.log(`Model loaded.`);
        }
      );
      gameState = "chestGame";
      //listen for predictions of ml5
      handpose.on(`predict`, getPredictionResults);
    } else if (gameState === "title") {
      //title screen with instructions for games
      background(0);
      fill(255);
      text("title", width / 2, height / 2);

      //beginning of toadGame
    } else if (gameState === "toadGame") {
      //calling miniGameRestart for when user loses toadGame
      if (gotHit === true) {
        miniGameRestart = true;
        //when toadGame is won, user is brought directly to chestGame
      } else if (won === true) {
        gameState = "chestSetup";
      } else {
        //adding overlap so that players dies when hit by insect and thus must restart
        if (insect.overlap(ofeliaThrow)) {
          gotHit = true;
          console.log("hit"); //console.log for testing purposes
        }
        //background for toadGame
        background(0);
        //ofelia's position and speed
        //adding movement to ofeliaThrow on the y axis with the up keys
        if (keyDown(UP_ARROW) && ofeliaThrow.position.y > 0) {
          ofeliaThrow.position.y = ofeliaThrow.position.y - 3;
          // go through each stone and update to ofelias new position
          for (let i = 0; i < 3; i++) {
            //if the stone is not moving then set it
            if (stonesActive[i] !== 1) {
              stones[i].position.y = ofeliaThrow.position.y;
            }
          }
        }
        //adding movement to ofeliaThrow on the y axis with the down keys
        if (keyDown(DOWN_ARROW) && ofeliaThrow.position.y < height) {
          ofeliaThrow.position.y = ofeliaThrow.position.y + 5;
          // go through each stone and update to ofelias new position
          for (let i = 0; i < 3; i++) {
            //if the stone is not moving then set it
            if (stonesActive[i] !== 1) {
              stones[i].position.y = ofeliaThrow.position.y;
            }
          }
        }
        // if space bar is pressed then user can throw stone
        if (keyDown(" ")) {
          if (numStonesThrown < 3) {
            ofeliaThrowStone = true;
            stonesActive[numStonesThrown] = 1;
          }
        }
        //position of insect and speed
        insect.position.x = insect.position.x - 8;
        //making sure the insect reappears
        if (insect.position.x <= 0) {
          insect.position.x = width;
          insect.position.y = random(5, height - 5);
        }
        //check if ofelia is throwing a stone
        if (ofeliaThrowStone === true) {
          //change stone position
          stones[numStonesThrown].position.x += 5;
          // if stone is offscreen
          if (stones[numStonesThrown].position.x > width) {
            //set stoneDoe to true
            stoneDone = true;
          }
          //check if stone overlaps toadImage
          if (stones[numStonesThrown].overlap(toad)) {
            stoneDone = true;
            stones[numStonesThrown].position.x = width + 10;
            numberTimesToadHit++;
            console.log(numberTimesToadHit);
            //when the 3 stones hit the toad, game is won
            if (numberTimesToadHit === 3) {
              won = true;
            }
          }
          //check if stone is offscreen or if stone hit toad
          if (stoneDone === true) {
            //go to next stone
            numStonesThrown = numStonesThrown + 1;
            stoneDone = false;
            //reset variable that ofelia is no longer throwing a stone
            ofeliaThrowStone = false;
          }
        }
        //calling all sprites
        drawSprites();
      }
    } //end of toadGame

    //entering chestGame
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
          //collision functions for checking chests
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
        //if user selects correct chest, then dagger appears and grows
        if (chestCorrectState === 1) {
          if (dagger.size < width) {
            dagger.size = dagger.size + 10;
            push();
            image(
              dagger.image,
              width / 2,
              height / 2,
              dagger.size,
              dagger.size
            );
            pop();

          } else {
            console.log("next state"); //here for testing purposes because of lag
            //when correct chest found, transitions to sacrificeGame
            gameState = "sacrificeGame";
            //removing program predictions of ml5 to prevent lag
            handpose.removeListener(`predict`, getPredictionResults);
          }
        }
        //when incorrect chest is selected, monster appears and you die
        if (chestIncorrectState === 1) {
          if (monster.size < width) {
            monster.size = monster.size + 100;
          } else {
            //when you die, chestgame restarts
            miniGameRestart = true;
            //chestState = "chestLose";
          }
          push();
          image(
            monster.image,
            width / 2,
            height / 2,
            monster.size,
            monster.size
          );
          pop();
        }
      } //end play state of chestGame

    } // end of chestGame
    // transtions into sacrificeGame once chestGame is won
    else if (gameState === "sacrificeGame") {
      background(0);
      fill(255);
      text("sacrifice game", width / 2, height / 2);
    } //end sacrifice game

    // else if(gameState === "kingdomWin") {
    //   background(0);
    //   fill(255);
    //   text("win", width/2, height/2);
    // }
  } //if not in restart screen
} //end of draw

//functions for chestGame: chestIncorrectCollision and checkCorrectCollision
function checkCorrectCollision() {
  //adding a radius to wood chest
  //when key hovers over correct chest (wood) then chestCorrectState
  let d = dist(woodChest.x, woodChest.y, mirrordex, tipY);
  if (d < 100) {
    chestCorrectState = 1;
  }
} // end checkCorrectCollision
function checkIncorrectCollision() {
  //adding radius to silver and iron chest
  //when hovering over iron or silver chest then chestIncorrectState
  let d = dist(silverChest.x, silverChest.y, mirrordex, tipY);
  let d2 = dist(ironChest.x, ironChest.y, mirrordex, tipY);
  if (d < 100) {
    chestIncorrectState = 1;
  } else if (d2 < 100) {
    chestIncorrectState = 1;
  }
} // end checkIncorrectCollision

//gameOver screen
function gameOver() {
  background(tree, 0, 0);
  textAlign(CENTER);
  fill("white");
  text("Game Over!", width / 2, height / 2);
  text("Click anywhere to try again.", width / 2, (3 * height) / 4);
} // end of gameOver

function winScreen() {
  background(tree, 0, 0);
  textAlign(CENTER);
  fill("white");
  text("win!", width / 2, height / 2);
} // end of winScreen
