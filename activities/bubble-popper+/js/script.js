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
  handpose.on(`predict`, fucntion(results) {
    console.log(results);
    predictions = results;
  });

}



/**
Description of draw()
*/
function draw() {

}
