class Population {
  constructor(mutationRate, maxPop) {
    this.mutationRate = mutationRate;
    this.maxPop = maxPop;

    this.generation = 0;
    this.best = null;

    this.population = [];
    for (let i = 0; i < maxPop; i++) {
      this.population.push(new Bird("KEY"));
    }

    this.matingPool = [];
    this.calcFitness();
  }

  showVision(pipe) {
    this.population.forEach((bird) => {
      bird.drawVision(pipe);
    });
  }

  checkHit(closestPipe) {
    this.population.forEach((bird) => {
      if (bird.hitPipe(closestPipe) || bird.hitFloor()) {
        bird.dead = true;
      }
    });
  }

  generateNewPop() {}

  calcFitness() {}

  naturalSelection() {}

  evalutate() {}

  getAvgFitness() {}

  getBest() {}

  show() {
    this.population.forEach((bird) => {
      bird.show();
    });
  }

  update() {
    this.population.forEach((bird) => {
      bird.update();
    });
  }
}
