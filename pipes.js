class PipesContainer {
  constructor(numPipes) {
    this.horizontalGap = 180;
    this.pipes = [];

    for (let i = 0; i < numPipes; i++) {
      this.pipes.push(new Pipe(width + i * this.horizontalGap));
    }
  }

  getLastPipe() {
    return this.pipes[this.pipes.length - 1];
  }

  show() {
    this.pipes.forEach((pipe) => {
      pipe.show();
    });
  }

  update() {
    // console.log(this.pipes);
    for (let i = this.pipes.length - 1; i >= 0; i--) {
      let pipe = this.pipes[i];

      pipe.update();

      if (pipe.isOffScreen()) {
        let offPipe = this.pipes.shift();
        offPipe.x = this.getLastPipe() + this.horizontalGap;
        offPipe.randomHeight();
        this.pipes.push(offPipe);
      }
    }
  }
}
