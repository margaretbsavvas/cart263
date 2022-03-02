//Chest game

"use strict";

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

function preload() {
  woodChest.image = loadImage("assets/images/chest-wood.png");
  silverChest.image = loadImage("assets/images/chest-silver.png");
  ironChest.image = loadImage("assets/images/chest-iron.png");

  feast = loadImage("assets/images/feast.png");
  key.image = loadImage("assets/images/key.png");
  monster.image = loadImage("assets/gifs/monster.gif");
  dagger.image = loadImage("assets/images/dagger.png");
}

//setting up canvas
function setup() {
  createCanvas(640, 480);

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

  //listen for predictions
  handpose.on(`predict`, function (results) {
    predictions = results;
  });
}

function draw() {
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

    if (chestIncorrectState === 1) {
      if (dagger.size < width) {
        dagger.size = dagger.size + 10;
      }
      push();
      image(dagger.image, width / 2, height / 2, dagger.size, dagger.size);
      pop();
    }

    if (chestIncorrectState === 1) {
      if (monster.size < width) {
        monster.size = monster.size + 100;
      } else {
        chestState = "chestLose";
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
} // end draw

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
