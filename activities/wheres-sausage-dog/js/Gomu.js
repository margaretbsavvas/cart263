//creating class for gomu
class Gomu extends Devilfruit {
  constructor( x, y, image) {
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

  //adding mousepressed for when gomu is found
  mousePressed(){
    if (this.overlap(mouseX, mouseY)) {
        this.found = true;
    }
  }
}
