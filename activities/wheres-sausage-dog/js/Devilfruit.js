class Devilfruit {
  constructor(x, y, image, clickSFX) {
    this.x = x;
    this.y = y;
    this.image = image;
    this.angle = 0;
    this.clickSFX = clickSFX;

  }

  update(){
    this.display();
  }

  display(){
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    rotate(this.angle);
    image(this.image, 0, 0);
    pop();
  }

  overlap(x, y) {
    if (x > this.x - this.image.width / 2 &&
        x < this.x + this.image.width / 2 &&
        y> this.y - this.image.height / 2 &&
        y< this.y + this.image.height / 2) {
        return true;
        }
      else {
        return false;
      }
  }
  //baka sound when mousePressed on fruit
  mousePressed(){
    if (this.overlap(mouseX, mouseY)) {
      this.x += 9;
      this.clickSFX.play();
    }
  }
}
