/**
Bubble Popper +
Margaret Beaumont-Savvas

Popping bubbles with your index finger as a pin!
*/

"use strict";

//declaring a video variable for access to webcam
let video = undefined;

//declaring variable for handpose
let handpose = undefined;

//current set of predictions
let predictions = [];

// the bubbles
let bubbleOne = undefined;
let bubbleTwo = undefined;
let bubbleThree= undefined;

let mirrordex = 0;
let tipY = 0;
let tipX = 0;

let correctState = 0; 
let correctImage = undefined;

let incorrectState = 0;
let incorrectImage = undefined;

let gameState = "play"

function preload() {

}


//setting up canvas
function setup() {
  createCanvas(640, 480);

  //access to user's webcam
  video = createCapture(VIDEO);
  video.hide();

  //loading handpose model
  handpose = ml5.handpose(video, {
    fliphorizontal: true
  }, function() {
    console.log(`Model loaded.`);
  });

  //listen for predictions
  handpose.on(`predict`, function(results) {
    predictions = results;
  });

  //drawing the bubbles on the canvas
  bubbleOne = {
    x: 100,
    y: 100,
    size: 100,
  }
  correctImage = {
    x: 100,
    y: 100,
    size: 0,
  }

  incorrectImage = {
    x: 100,
    y: 100,
    size: 0,
  }

  bubbleTwo = {
    x: 500,
    y: 100,
    size: 100,
  }

  bubbleThree = {
    x: 300,
    y: 400,
    size: 100,
  }
}




function draw() {
  background(0);
if (gameState === "play") {

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



  


//drawing the actual bubbles
push();
fill(0,100,200);
noStroke();
ellipse(bubbleOne.x, bubbleOne.y, bubbleOne.size);
pop();


push();
fill(0,100,200);
noStroke();
ellipse(bubbleTwo.x, bubbleTwo.y, bubbleTwo.size);
pop();


push();
fill(0,100,200);
noStroke();
ellipse(bubbleThree.x, bubbleThree.y, bubbleThree.size);
pop();

push();
  fill(255, 0, 0);
  stroke(255, 255, 255);
  strokeWeight(2);
  ellipse(mirrordex, tipY, 20, 20);
  pop();

  if (correctState === 1) {
    if (correctImage.size < width){
      correctImage.size = correctImage.size + 1
    }
    push ();
    fill (0, 255, 0);
    rectMode (CENTER);
    rect(bubbleOne.x, bubbleOne.y, correctImage.size, correctImage.size);
    pop();
  }

if (incorrectState === 1) {
  if (incorrectImage.size < width){
    incorrectImage.size = incorrectImage.size + 5
  }
  else {
    gameState = "lose"
  }
  push();
  rectMode (CENTER);
  fill (0, 255, 0);
  rect(width /2, height /2, incorrectImage.size, incorrectImage.size);
  pop();
}
}//end play state
else {
  // lose state
  background(255,0,0);
}
}// end draw

function checkCorrectCollision () {
  let d = dist(bubbleOne.x, bubbleOne.y, mirrordex, tipY);
  if (d < 30 ) {
    correctState = 1; 
  }
}

function checkIncorrectCollision () {
  let d = dist(bubbleTwo.x, bubbleTwo.y, mirrordex, tipY);
  if (d < 30 ) {
    incorrectState = 1; 
    }
}