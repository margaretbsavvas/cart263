//creating class for sausage dog
class SausageDog extends Animal {
  constructor( x, y, image); {
    //super constructor to pass along the parameters
    super(x, y, image);

   //adding found property and rotation speed for spinning when found
    this.found = false;
    this.rotationSpeed = 0.25;
  }

  //update to call the super's display
  update() {
    super.update();

    if (this.found) {
      this.angle += this.rotationSpeed;
    }
  }

  //adding mousepressed for when sausage dog is found 
  mousePressed(){
    if (mouseX > this.x - this.image.width / 2 &&
        mouseX < this.x + this.image.width / 2 &&
        mouseY > this.y - this.image.height / 2 &&
        mouseY < this.y + this.image.height / 2) {
        this.found = true;
    }
  }
}
