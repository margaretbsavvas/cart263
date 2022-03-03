//Project 1 final
//PAN'S THREE TASKS by Margaret Beaumont-Savvas

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

//background variables
let feast = 0;
let tomb = 0;
let tree = 0;
let tunnel = 0;
let kingdom = 0;

//variable for pan
let pan = undefined;

//variable for ofelia's characters
let ofeliaBack = undefined;
let ofeliaBaby = undefined;

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
  tunnel = loadImage("assets/images/tunnel.png");
  tomb = loadImage("assets/images/tomb.png");
  kingdom = loadImage("assets/images/kingdom.png");

  //preload for pan and ofelia images
  pan = loadImage("assets/sprites/pan.gif");
  ofeliaBack = loadImage("assets/images/ofelia-back.png");
  ofeliaBaby = loadImage("assets/sprites/ofelia-baby.gif");
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
function keyPressed() {
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
      //title screen with instructions for 3 tasks
      background(tree, 0, 0);
      fill(1, 126, 130);
      textSize(60);
      textStyle(BOLD);
      textAlign(CENTER);
      text("PAN'S 3 TASKS", width / 2, height / 8);
      fill(153, 153, 153);
      textSize(20);
      textStyle(ITALIC);
      text(
        "ENTERING THE EVERLASTING KINGDOM.",

        width / 2,
        height / 5.5
      );
      //toadGame instructions
      fill(227, 183, 123);
      textSize(15);
      textStyle(BOLD);
      text(
        "Task 1: Shoot 3 magic stones at the toad to retrieve a key.",
        width / 2,
        height / 3.5
      );
      textStyle(ITALIC);
      text(
        "If you run out of magic stones, self sacrifice yourself to begin again.",
        width / 2,
        height / 2.75
      );
      text(
        "Use the up and down arrow keys to move Ofelia and the space bar to shoot.",
        width / 2,
        height / 3
      );
      //chestGame instructions
      fill(227, 183, 123);
      textSize(15);
      textStyle(BOLD);
      text(
        "Task 2: Use the key to unlock the correct chest and obtain the dagger.",
        width / 2,
        height / 2.3
      );
      textStyle(ITALIC);
      text(
        "Use camera and move hand over chosen chest.",
        width / 2,
        height / 2.1
      );
      //sacrificeGame instructions
      fill(227, 183, 123);
      textSize(15);
      textStyle(BOLD);
      text(
        "Task 3: Use the dagger to sacrifice your baby brother.",
        width / 2,
        height / 1.75
      );
      textStyle(ITALIC);
      text(
        "Do it else you will never enter the kingdom.",
        width / 2,
        height / 1.6
      );
      textStyle(BOLD);
      text("Press ENTER to begin.", width / 1.35, height / 1.2);
      //display pan who is telling you these rules and ofelia entering the challenge
      image(pan, width / 25, height / 1.7, 200, 200);
      image(ofeliaBack, width / 2, height / 1.5, 70, 70);

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
        background(tunnel, 0, 0);
        //ofelia's position and speed
        //adding movement to ofeliaThrow on the y axis with the up keys
        if (keyDown(UP_ARROW) && ofeliaThrow.position.y > 0) {
          ofeliaThrow.position.y = ofeliaThrow.position.y - 5;
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
            dagger.size = dagger.size + 50;
            push();
            image(
              dagger.image,
              width / 4,
              height / 3,
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
            monster.size = monster.size + 50;
          } else {
            //when you die, chestgame restarts
            miniGameRestart = true;
            //chestState = "chestLose";
          }
          push();
          image(
            monster.image,
            width / 2,
            height / 3,
            monster.size,
            monster.size
          );
          pop();
        }
      } //end play state of chestGame
    } // end of chestGame

    // transtions into sacrificeGame once chestGame is won
    else if (gameState === "sacrificeGame") {
      background(tomb, 0, 0);
      fill(227, 183, 123);
      textSize(30);
      textStyle(BOLD);
      textAlign(CENTER);
      text("You must sacrifice your brother!", width / 2, height / 4);
      text("Click to stab him with the dagger!", width / 2, height / 3);
      //both characters on screen
      image(pan, width / 25, height / 1.8, 200, 200);
      image(ofeliaBaby, width / 1.75, height / 1.7, 200, 200);
    } //end sacrifice game
  }
} //end of draw

//when mousePressed to stab baby, then kingdomWin state
function mousePressed() {
  if (gameState === "sacrificeGame") {
    gameState = "kingdomWin";
  }
  if (gameState === "kingdomWin") {
    background(kingdom, 0, 0);
    fill(227, 183, 123);
    textSize(20);
    textStyle(BOLD);
    textAlign(CENTER);
    text("You have chosen to go with your heart!", width / 2, height / 3);
    text(
      "For this, I grant you immortality and your kingdom.",
      width / 2,
      height / 2
    );
    image(pan, width / 25, height / 1.8, 200, 200);
    image(ofeliaBack, width / 2, height / 1.7, 200, 200);
  }
} //end mousePressed

//functions for chestGame: chestIncorrectCollision and checkCorrectCollision
function checkCorrectCollision() {
  //adding a radius to wood chest
  //when key hovers over correct chest (wood) then chestCorrectState
  let d = dist(woodChest.x, woodChest.y, mirrordex, tipY);
  if (d < 70) {
    chestCorrectState = 1;
  }
} // end checkCorrectCollision

function checkIncorrectCollision() {
  //adding radius to silver and iron chest
  //when hovering over iron or silver chest then chestIncorrectState
  let d = dist(silverChest.x, silverChest.y, mirrordex, tipY);
  let d2 = dist(ironChest.x, ironChest.y, mirrordex, tipY);
  if (d < 70) {
    chestIncorrectState = 1;
  } else if (d2 < 70) {
    chestIncorrectState = 1;
  }
} // end checkIncorrectCollision

//gameOver screen
function gameOver() {
  background(tree, 0, 0);
  fill(138, 0, 0);
  textAlign(CENTER);
  textSize(100);
  textStyle(BOLD);
  text("Game Over!", width / 2, height / 2);
  textSize(30);
  textStyle(ITALIC);
  text("Press ENTER to try again.", width / 2, (3 * height) / 3.5);
  image(ofeliaBack, width / 2.15, height / 1.75, 70, 70);
} // end of gameOver
//end
