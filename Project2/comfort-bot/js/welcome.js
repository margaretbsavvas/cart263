//game1
class WelcomeScreen {

constructor(){
  this.choice = ""
  this.x = 20;
  this.y = 20;
  this.size = 50;
  this.x2 = 20;
  this.y2 = 80;
  this.size2 = 50;

}//end of constructor

display(){
  fill(255, 0, 0);
  rect(this.x, this.y, this.size, this.size);
  fill(0, 255, 0);
  rect(this.x2, this.y2, this.size2, this.size2);

}//end display

checkButtonPressN(){
  if (mouseX > this.x && mouseX < this.x + this.size &&
    mouseY > this.y && mouseY < this.y + this.size){
      console.log("negative")
      this.choice = "negative"
    }
} //end N

checkButtonPressP(){
  if (mouseX > this.x2 && mouseX < this.x2 + this.size2 &&
    mouseY > this.y2 && mouseY < this.y2 + this.size2){
      console.log("positive")
      this.choice = "positive"
    }
}// end P

}//of end class
