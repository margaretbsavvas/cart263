/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let gOne;
let gTwo;
let welcome;
let gamechoice1;

//0 = welcome
let state = 0;


/**
Description of preload
*/
function preload() {

}


/**
Description of setup
*/
function setup() {
createCanvas(window.innerWidth, window.innerHeight);
background(0);
gOne = new GameOne();
gTwo = new GameTwo();
welcome = new WelcomeScreen();
gamechoice1 = new GameChoice();

}


/**
Description of draw()
*/
function draw() {
background (0);
if (state === 0) {
  welcome.display();
}//end 0

if (state === 1){
 gamechoice1.display()
} //end 1

if (state === 3){
  gOne.display();
  gOne.move();
if (gOne.checkEnd() === true){
  state = 5
}
}// end 3

if (state === 4){
  gTwo.display();
  gTwo.move();
}
if (gTwo.checkEnd() === true){
  state = 5
}//end 4

if (state === 5){
  console.log("state 5")
}// end 5
}//end draw

function mousePressed(){
  if (state === 0){
  welcome.checkButtonPressN()
  welcome.checkButtonPressP()
  if (welcome.choice === "positive"){
    state = 1
  }
  if (welcome.choice === "negative"){
    state = 2
  }
} // state0
else if (state === 1){
  gamechoice1.checkButtonPressG1()
  gamechoice1.checkButtonPressG2()
  if (gamechoice1.choice === "G1"){
    state = 3
  }
  if (gamechoice1.choice === "G2"){
    state = 4
  }
}
}//mousePressed
