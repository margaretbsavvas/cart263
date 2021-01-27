"use strict";

const NUM_MATCHA_IMAGES = 6;
const NUM_MATCHA = 100;

let matchaImages = [];
let matcha = [];

//"i" allows the program to read the image numbers
function preload() {
  for (let i = 0; i < NUM_MATCHA_IMAGES; i++) {
    let matchaImage = loadImage(`assets/images/matcha${i}.png`);
    matchaImages.push(matchaImage);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //setting up the icecream
  for (let i = 0; i <NUM_MATCHA; i++) {
      let x= random (0,width);
      let y= random (0,height);
      let matchaImage = random(matchaImages);
      let matcha= new Matcha(x, y, matchaImage);
      matcha.push(matcha);
  }
}

//displaying the matcha icecream
function draw() {
  background(131, 181, 129);

  for (let i = 0; i < matcha.length; i++){
    matcha = [i].upadte();
  }


}
