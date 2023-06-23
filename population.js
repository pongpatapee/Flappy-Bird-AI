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
