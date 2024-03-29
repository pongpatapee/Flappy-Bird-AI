class PipesContainer {
  constructor(numPipes) {
    this.numPipes = numPipes;
    this.horizontalGap = 180;
    this.pipes = [];

    for (let i = 0; i < numPipes; i++) {
      this.pipes.push(new Pipe(width + i * this.horizontalGap));
    }
  }

  getLastPipe() {
    return this.pipes[this.pipes.length - 1];
  }

  getClosestPipe() {
    for (let i = 0; i < this.pipes.length; i++) {
      let hasPassedBird =
        this.pipes[i].x + this.pipes[i].size.x < Bird.getXPos();

      if (hasPassedBird) continue;

      return this.pipes[i];
    }
  }

  show() {
    this.pipes.forEach((pipe) => {
      pipe.show();
    });
  }

  update() {
    for (let i = this.pipes.length - 1; i >= 0; i--) {
      let pipe = this.pipes[i];

      pipe.update();

      if (pipe.isOffScreen()) {
        this.pipes.shift();

        let new_x_pos = this.getLastPipe().x + this.horizontalGap;
        this.pipes.push(new Pipe(new_x_pos));
      }
    }
  }

  reset() {
    this.pipes = [];
    for (let i = 0; i < this.numPipes; i++) {
      this.pipes.push(new Pipe(width + i * this.horizontalGap));
    }
  }
}
