"use strict";

//global
const NUM_MATCHA_IMAGES = 7;
const NUM_MATCHAS = 50;

let matchaImages = [];
let matchas = [];

let wasabiImage = undefined;
let wasabi = undefined;

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
  background(131, 181, 129);

  for (let i = 0; i < matchas.length; i++){
    matchas[i]. update();
  }

  wasabi.update();
}
  function mousePressed(){
    wasabi.mousePressed();
  }
