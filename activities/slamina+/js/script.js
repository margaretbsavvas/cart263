/**
Slamina New Game +
Margaret Beaumont-Savvas

Exercise 2 for Cart 263 using ResponsiveVoice and Annyang
*/

"use strict";

//Declaring Constant for animals and copying the array from common.json
const animals = [
      "aardvark",
      "alligator",
      "alpaca",
      "antelope",
      "ape",
      "armadillo",
      "baboon",
      "badger",
      "bat",
      "bear",
      "beaver",
      "bison",
      "boar",
      "buffalo",
      "bull",
      "camel",
      "canary",
      "capybara",
      "cat",
      "chameleon",
      "cheetah",
      "chimpanzee",
      "chinchilla",
      "chipmunk",
      "cougar",
      "cow",
      "coyote",
      "crocodile",
      "crow",
      "deer",
      "dingo",
      "dog",
      "donkey",
      "dromedary",
      "elephant",
      "elk",
      "ewe",
      "ferret",
      "finch",
      "fish",
      "fox",
      "frog",
      "gazelle",
      "gila monster",
      "giraffe",
      "gnu",
      "goat",
      "gopher",
      "gorilla",
      "grizzly bear",
      "ground hog",
      "guinea pig",
      "hamster",
      "hedgehog",
      "hippopotamus",
      "hog",
      "horse",
      "hyena",
      "ibex",
      "iguana",
      "impala",
      "jackal",
      "jaguar",
      "kangaroo",
      "koala",
      "lamb",
      "lemur",
      "leopard",
      "lion",
      "lizard",
      "llama",
      "lynx",
      "mandrill",
      "marmoset",
      "mink",
      "mole",
      "mongoose",
      "monkey",
      "moose",
      "mountain goat",
      "mouse",
      "mule",
      "muskrat",
      "mustang",
      "mynah bird",
      "newt",
      "ocelot",
      "opossum",
      "orangutan",
      "oryx",
      "otter",
      "ox",
      "panda",
      "panther",
      "parakeet",
      "parrot",
      "pig",
      "platypus",
      "polar bear",
      "porcupine",
      "porpoise",
      "prairie dog",
      "puma",
      "rabbit",
      "raccoon",
      "ram",
      "rat",
      "reindeer",
      "reptile",
      "rhinoceros",
      "salamander",
      "seal",
      "sheep",
      "shrew",
      "silver fox",
      "skunk",
      "sloth",
      "snake",
      "squirrel",
      "tapir",
      "tiger",
      "toad",
      "turtle",
      "walrus",
      "warthog",
      "weasel",
      "whale",
      "wildcat",
      "wolf",
      "wolverine",
      "wombat",
      "woodchuck",
      "yak",
      "zebra"
    ];

//declaring variable called currentAnimal to store the animal the user is guessing
let currentAnimal = ``;
let currentAnswer = ``;

//variable for wrong answers
let wrongResponses = ["vlakas!", "ittimenos!", "oxi!"];

//setting variable for background
let farm;
let yiayia;

//variable to declare states
let state = `title`;

//variable for titlestring at title page
let titleString = "Guess what animal YiaYia is saying backwards!"
let enterString = "With X meaning animal, please guess animal like so: I think it is X. Press any key to begin. "

function preload() {
  farm = loadImage ("assets/images/farmhouse.png");
  yiayia = loadImage ("assets/images/yiayia.jpg");
}

//setting up annyang to listen to user guesses
function setup() {
  createCanvas(windowWidth, windowHeight);

  if (annyang) {
    let commands = {
      'I think it is *animal': guessAnimal
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
  background (yiayia, 0, 0, width, height);
  textSize(100);
  fill(255, 204, 0);
  text(titleString, width /2, height /9);
  textSize(50);
  fill(255, 204, 0);
  text(enterString, width /2, height / 6);
}

//function for gameOn screen
function gameOn() {
  background (farm, 0, 0, width, height);
  //function for answers. if answered correctly, text will be green
  if (currentAnswer === currentAnimal) {
     fill(0, 153, 51);
   }
   //if answered wrong, text will be red
  else {
     fill(255, 0, 0);
   }
}

//defining a function to assign the guess
function guessAnimal(animal) {
  currentAnswer = animal.toLowerCase();
  console.log(currentAnimal);
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

function wrongResponse() {
  let response = random(wrongResponses);
  responsiveVoice.speak(response);
}


//function to enter gameOn
function keyPressed(){
  if (state === `title`) {
     state = `gameOn`;
  }
}

//definig a mousePressed() with an assigned random animal for ResponsiveVoice to speak
function mousePressed() {
  currentAnimal = random(animals);
  let reverseAnimal = reverseString(currentAnimal);
  responsiveVoice.speak(reverseAnimal , "Greek Female");
}
