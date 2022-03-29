//game1
class GameOne {

constructor(){
  this.x = 20;
  this.y = 20;
  this.fillcolor = color(200, 200, 0);
  this.size = 50;
  this.speed = 20
}//end of constructor

display(){
  fill(this.fillcolor);
  rect(this.x, this.y, this.size, this.size);


}//end display

move(){
  this.x = this.x + this.speed
}//end move
checkEnd(){
  if (this.x > width){
  return true
}
  return false
}//end checkEnd



}//of end class
