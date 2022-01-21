/**
Where's sausage dog?
Margaret Beaumont-Savvas

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";
//declaring global constants for number of animal images and number of animals to display
const NUM_ANIMAL_IMAGES = 10;
const NUM_ANIMALS = 200;

//arrays for animal images and for animal objects
let animalImages = [];
let animals= [];

//variables for sausage dog
let sausageDogImage = undefined;
let sausageDog = undefined;

function preload() {
//creating a loop to load all animal images by using the iterator
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++) {
    let animalImage = loadImage(`assets/images/animal${i}.png`);
    animalImages.push(animalImage);
  }
  //loading sausage dog image
  sausageDogImage = loadImage(`assets/images/sausage-dog.png`);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //create the animal
  for (let i = 0; i < NUM_ANIMALS; i++) {
    let x = random (0, width);
    let y = random (0, height);
    let animalImage = random(animalImages);
    let animal = new Animal(x, y, animalImage);
    animals.push(animal);
  }
  //setting up sausage dog object
  let x = random(0, width);
  let y= randome(0, height);
  sausageDog = new SausageDog(x, y, sausageDogImage);
}

function draw() {
  background(255, 255, 0);
//using a for loop to go through animals and call the update
  for (let i = 0; i < animals.length; i++) {
   animals[i].update();
  }

  //calling update for sausage dog object
  sausageDog.update();
}

//defining the mousePressed function and calling the mousePressed of sausage dog object
function mousePressed() {
  sausageDog.mousePressed();
}
