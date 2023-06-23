class Pipe {
  constructor(x) {
    this.x = x ? x : width + 50;
    this.gap = 150;

    this.y_top = random(150, 300);
    // this.y_top = height / 2;
    this.y_bottom = this.y_top + this.gap;

    this.size = { x: assets.pipeBotImg.width, y: assets.pipeBotImg.height };
    this.vel = 3;
  }

  randomHeight() {
    this.y_top = random(150, 300);
    this.y_bottom = this.y_top + this.gap;
  }

  show() {
    fill(150);
    // circle(this.x, this.y_top, 8);
    // circle(this.x, this.y_bottom, 8);
    //bottom pipe
    image(assets.pipeBotImg, this.x, this.y_bottom);

    //top pipe
    image(assets.pipeTopImg, this.x, this.y_top - this.size.y);
  }

  update() {
    this.x -= this.vel;
  }

  isOffScreen() {
    return this.x + this.size.x < 0;
  }
}
