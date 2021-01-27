"use strict";

//global
const NUM_MATCHA_IMAGES = 7;
const NUM_MATCHAS = 50;

let matchaImages = [];
let matchas = [];

let wasabiImage = undefined;
let wasabi = undefined;

//adding a countdown timer to find the wasabi
let timer = 5
let countdown = 60

//adding a title screen
let screen = 0;


//"i" allows the program to read the image numbers
function preload() {
  for (let i = 0; i < NUM_MATCHA_IMAGES; i++) {
    let matchaImage = loadImage(`assets/images/matcha${i}.png`);
    matchaImages.push(matchaImage);
  }
    wasabiImage = loadImage(`assets/images/wasabi.png`);
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  //setting up the icecream
  for (let i = 0; i < NUM_MATCHAS; i++) {
      let x = random (0,width);
      let y = random (0,height);
      let matchaImage = random(matchaImages);
      let matcha= new Matcha(x, y, matchaImage);
      matchas.push(matcha);
  }
      let x =random(0, width);
      let y = random(0,height);
      wasabi = new Wasabi(x, y, wasabiImage);
}


//displaying the matcha icecream
function draw() {

  if(screen == 0) {
    background(131, 181, 129);
    fill(0);
    textAlign(CENTER);
    textSize(100);
    text('MATCHA VS WASABI!', width/2, height/2);
    textSize(50);
    text('Find the camouflaged Wasabi. You have 5 seconds! Click to start', width/2, height/1.5);
  }

  else if (screen == 1){
   background(131, 181, 129);

   for (let i = 0; i < matchas.length; i++){
    matchas[i]. update();
   }

   wasabi.update();

   // adding in the timer and its placement
   fill(0);
   textAlign (CENTER, CENTER);
   textSize(100);
   text(timer, width/2, height/2);

   if (frameCount % countdown == 0 && timer > 0) {
    timer --;
   }
   if (timer == 0) {
     text("MY NOSE BURNS", width/2, height*0.7);
    }
  }
}

  function mousePressed(){
    if(screen == 0){
      screen = 1
    } else if (screen == 1) {
      wasabi.mousePressed();
    }
  }
