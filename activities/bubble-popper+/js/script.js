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
let bubble = undefined;


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
    console.log(results);
    predictions = results;
  });

  //drawing the bubble and its movement
  bubble = {
    x: random(width),
    y: height,
    size: 100,
    vx: 0,
    vy: -2,
  }
}


function draw() {
  background(0);

// detecting index finger from base to tip
  if (predictions.length > 0) {
    let hand = predictions[0];
    let index = hand.annotations.indexFinger;
    let tip = index[3];
    let base = index [0];
    let tipX = tip[0];
    let tipY = tip[1];
    let baseX = [0];
    let baseY = [1];

    //drawing the pin body
    push();
    noFill();
    stroke(255, 255, 255);
    strokeWeight(2);
    line(baseX, baseY, tipX, tipY);
    pop();

  // drawing red circle at pin head
    push();
    noStroke();
    fill(255, 0, 0);
    ellipse(baseX, baseY, 20);
    pop();

    //check bubble pop
    let d = dist(tipX, tipY, bubble.x, bubble.y);
    if (d < bubble.size /2) {
      bubble.x = random(width);
      bubble.y = height;
    }
  }

  //move the bubble
  bubble.x += bubble.vx;
  bubble.y += bubble.vy;

  if (bubble.y < 0) {
    bubble.x = random(width);
    bubble.y = height;
  }

//drawing the actual bubble
push();
fill(0,100,200);
noStroke();
ellipse(bubble.x, bubble.y, bubble.size);
pop();
}
