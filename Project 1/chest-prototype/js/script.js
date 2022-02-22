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


function preload() {

}


//setting up canvas
function setup() {
  createCanvas(800, 800);

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

  bubbleTwo = {
    x: 800,
    y: 100,
    size: 100,
  }

  bubbleThree = {
    x: 500,
    y: 700,
    size: 100,
  }
}

let tipX = 0
let tipY = 0

function draw() {
  background(0);

// detecting index finger from base to tip
  if (predictions.length > 0) {
    let hand = predictions[0];
    let index = hand.annotations.indexFinger;
    let tip = index[3];
     tipX = tip[0];
     tipY = tip[1];

    //drawing the pin body


  }

  push();
  fill(255, 0, 0);
  stroke(255, 255, 255);
  strokeWeight(2);
  ellipse(tipX, tipY, 20, 20);
  pop();
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
}
