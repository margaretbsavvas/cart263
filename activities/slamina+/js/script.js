/**
Slamina New Game +
Margaret Beaumont-Savvas

Exercise 2 for Cart 263 using ResponsiveVoice and Annyang
*/

"use strict";

//Declaring Constant for animals and copying the array from common.json
const flowers = [
    "anemone",
    "amaryllis",
    "amaranth",
    "aster",
    "azalea",
    "babys breath",
    "begonia",
    "bellflower",
    "bergamot",
    "bird of paradise",
    "bluebell",
    "bottlebrush",
    "buttercup",
    "camellias",
    "carnation",
    "chrysantemum",
    "columbine",
    "clover",
    "crocus",
    "daisy",
    "dahlia",
    "daffodil",
    "delphinium",
    "edelweiss",
    "primrose",
    "forget me not",
    "foxglove",
    "freesia",
    "gerbera daisy",
    "gladiolus",
    "hibiscus",
    "heather",
    "hyacinth",
    "holly",
    "iris",
    "jasmine",
    "ladys slipper",
    "lavender",
    "lilac",
    "lily",
    "lotus flower",
    "marigold",
    "marjoram",
    "mimosa",
    "narcissus",
    "orange blossom",
    "orchid",
    "peach blossom",
    "peony",
    "petunia",
    "rhododendron",
    "rosemary",
    "roses",
    "sage",
    "snapdragon",
    "sunflower",
    "tansy",
    "thistle",
    "thyme",
    "tulip",
    "violet",
    "water lily",
    "zinnia"
  ];

//declaring variable called currentAnimal to store the animal the user is guessing
let currentFlower = ``;
let currentAnswer = ``;

//setting variable for background
let farm;
let yiayia;

//variable to declare states
let state = `title`;

//variable for titlestring at title page
let titleString = "Guess what flower the botanist is saying backwards!"
let enterString = "With X as flower, please guess flower like so: I think it is X. Press any key to begin. "

function preload() {
  garden = loadImage ("assets/images/garden.jpg");
  botanist = loadImage ("assets/images/botanist.jpg");
}

//setting up annyang to listen to user guesses
function setup() {
  createCanvas(windowWidth, windowHeight);

  if (annyang) {
    let commands = {
      'I think it is *flower': guessFlower
    };
    annyang.addCommands(commands);
    annyang.start();
//text for annyang responsing
    textSize(100);
    textStyle(BOLD);
    textAlign(CENTER,CENTER);
  }
}


function draw() {
 //drawing states for title screen
 if (state === `title`) {
   title();
 }
 else if (state === `gameOn`) {
   gameOn();
 }
 //text in center of screen
 text(currentAnswer, width /2, height /2);
}

//function for title screen
function title() {
  background (garden, 0, 0, width, height);
  textSize(100);
  fill(255, 204, 0);
  text(titleString, width /2, height /9);
  textSize(50);
  fill(255, 204, 0);
  text(enterString, width /2, height / 6);
}

//function for gameOn screen
function gameOn() {
  background (garden, 0, 0, width, height);
  //function for answers. if answered correctly, text will be green
  if (currentAnswer === currentFlower) {
     fill(0, 153, 51);
   }
   //if answered wrong, text will be red
  else {
     fill(255, 0, 0);
   }
}

//defining a function to assign the guess
function guessFlower(flower) {
  currentAnswer = flower.toLowerCase();
  console.log(currentFlower);
}

//function for reversing a string in program
function reverseString(string) {
  // Split the string into an array of characters
  let characters = string.split('');
  // Reverse the array of characters
  let reverseCharacters = characters.reverse();
  // Join the array of characters back into a string
  let result = reverseCharacters.join('');
  // Return the result
  return result;
}

//function to enter gameOn
function keyPressed(){
  if (state === `title`) {
     state = `gameOn`;
  }
}

//definig a mousePressed() with an assigned random animal for ResponsiveVoice to speak
function mousePressed() {
  currentFlower = random(flowers);
  let reverseFlower = reverseString(currentFlower);
  responsiveVoice.speak(reverseFlower , "Australian Male");
}
