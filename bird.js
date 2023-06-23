class Bird {
  constructor(controlType) {
    this.x = 50;
    this.y = height / 2;
    this.vel = 0;
    this.size = { x: assets.birdImgs[0].width, y: assets.birdImgs[0].height };
    this.birdImgs = assets.birdImgs;
    this.imgInd = 0;

    this.useBrain = controlType == "AI";
    if (controlType === "AI") {
      this.brain = new NeuralNetwork();
    }

    this.dead = false;
    this.score = 0; // game score
    this.lifetime = 1;
    this.fitness = 0;
  }

  update() {
    const GRAV = 0.5;
    const MAX_DOWN_VEL = 10;
    const MAX_UP_VEL = 15;
    const SKY_LIMIT = -30;

    this.vel += GRAV;
    if (this.vel >= MAX_DOWN_VEL) {
      this.vel = MAX_DOWN_VEL;
    } else if (this.vel <= -MAX_UP_VEL) {
      this.vel = -MAX_UP_VEL;
    }
    this.y += this.vel;

    //limit sky and ground
    if (this.y < SKY_LIMIT) {
      this.y = SKY_LIMIT;
    }
    if (this.y >= height - this.size.y) {
      this.y = height - this.size.y;
    }
  }

  show() {
    push();
    translate(this.x, this.y);
    this.#handleRotation();
    image(this.birdImgs[this.imgInd], 0, 0, this.size.x, this.size.y);
    if (frameCount % 10 == 1) {
      this.imgInd = (this.imgInd + 1) % 3;
    }
    pop();
  }

  #handleRotation() {}

  flap() {
    let upForce = 15;
    this.vel -= upForce;
  }

  hitPipe(pipe) {
    let centerX = floor(this.x + this.size.x / 2);
    let bottomY = floor(this.y + this.size.y);

    if (pipe.x <= centerX && centerX <= pipe.x + pipe.size.x) {
      if (this.y <= pipe.y_top || bottomY >= pipe.y_bottom) {
        return true;
      }
    }
    return false;
  }

  hitFloor() {
    let bottomY = floor(this.y + this.size.y);

    if (bottomY >= height) {
      return true;
    }
    return false;
  }
}
