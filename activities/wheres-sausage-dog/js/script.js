/**
Where's the gomu-gomu fruit?
Margaret Beaumont-Savvas

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";
//declaring global constants for number of fruit images and number of fruits to display
const NUM_FRUIT_IMAGES = 9;
const NUM_FRUITS = 600;

//arrays for fruit images and for fruits objects
let fruitImages = [];
let fruits= [];

//variables for gomuImage
let gomuImage = undefined;
let gomu = undefined;

//Sound for gomu fruit
let gomugomuSFX = undefined;

//variable for text
let titleString = "Find the gomu-gomu fruit!";
let enterString = "Press any key to begin.";

//variable for title state
let state = `title`;

function preload() {
//creating a loop to load all fruit images by using the iterator
  for (let i = 0; i < NUM_FRUIT_IMAGES; i++) {
    let fruitImage = loadImage(`assets/images/fruit${i}.png`);
    fruitImages.push(fruitImage);
  }
  //loading gomu image
  gomuImage = loadImage(`assets/images/gomu.png`);
  //load gomu sound
  gomugomuSFX = loadSound(`assets/sounds/gomu-gomu.wav`);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //setting up text for title screen
  textAlign(CENTER,CENTER);
  textFont('Helvetica')
  //create the fruit
  for (let i = 0; i < NUM_FRUITS; i++) {
    let x = random (0, width);
    let y = random (0, height);
    let fruitImage = random(fruitImages);
    let fruit = new Devilfruit(x, y, fruitImage);
    fruits.push(fruit);
  }
  //setting up gomu object
  let x = random(0, width);
  let y= random(0, height);
  gomu = new Gomu(x, y, gomuImage, gomugomuSFX);
}

function draw() {
  background(75, 192, 196);
//drawing the states
  if (state === `title`) {
    title();
  }
  else if (state === `gameOn`) {
    gameOn();
  }
}

//creatung title function
function title() {
  background (75,192,196);
  background (gomuImage, 0, 0);
  textSize(50);
  text(titleString, width /2, height /8);
  textSize(30);
  text(enterString, width/2, height /5);
}

function gameOn(){
  //using a for loop to go through animals and call the update
    for (let i = 0; i < fruits.length; i++) {
     fruits[i].update();
    }
    //calling update for sausage dog object
    gomu.update();
}
//defining the mousePressed function and calling the mousePressed of sausage dog object
function mousePressed() {
  gomu.mousePressed();
}

//press any key to begin game
function keyPressed(){
  if(state === `title`){
    state = `gameOn`;
  }
}
