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

/**
Description of preload
*/
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

}


function draw() {
  background(0);

  if (predictions.length > 0) {
    let hand = predictions[0];
    let index = hand.annotations.indexFinger;
    let tip = index[3];
    let base = index [0];
    let tipX = tip[0];
    let tipY = tip[1];
    let baseX = [0];
    let baseY = [1];
    push();
    nofill();
    stroke(255, 255, 255);
    strokeWeight(2);
    line(baseX, baseY, tipX, tipY);
    pop();


  }
}
