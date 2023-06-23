class Population {
  constructor(mutationRate, maxPop) {
    this.mutationRate = mutationRate;
    this.maxPop = maxPop;

    this.generation = 0;
    this.best = null;

    this.population = [];
    for (let i = 0; i < maxPop; i++) {
      this.population.push(new Bird("AI"));
    }

    this.numAlive = maxPop;

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
        this.numAlive--;
      }
    });
  }

  generateNewPop() {
    for (let i = 0; i < this.population.length; i++) {
      let a = floor(random(this.matingPool.length));
      let b = floor(random(this.matingPool.length));

      let partnerA = this.matingPool[a];
      let partnerB = this.matingPool[b];

      let child = partnerA.crossOver(partnerB);
      child.mutate(this.mutationRate);
      this.population[i] = child;
    }

    this.numAlive = this.maxPop;
    this.generation++;
  }

  calcFitness() {
    let totalLifeTime = 1;
    for (let i = 0; i < this.population.length; i++) {
      totalLifeTime = this.population[i].lifetime;
    }

    this.population.forEach((bird) => {
      bird.fitness = bird.lifetime / totalLifeTime;
    });
  }

  naturalSelection() {
    this.matingPool = [];

    let maxFitness = 0;
    this.population.forEach((bird) => {
      maxFitness = max(bird.fitness, maxFitness);
    });

    for (let i = 0; i < this.population.length; i++) {
      let fitness = map(this.population[i].fitness, 0, maxFitness, 0, 1);
      let n = floor(fitness * 100); // Arbitrary multiplier

      for (let j = 0; j < n; j++) {
        this.matingPool.push(this.population[i]);
      }
    }
  }

  evaluate() {
    let bestFitness = 0;
    let bestBirdInd = 0;

    this.population.forEach((bird, ind) => {
      if (bird.fitness > bestFitness) {
        bestFitness = bird.fitness;
        bestBirdInd = ind;
      }
    });

    this.best = this.population[bestBirdInd];
  }

  getAvgFitness() {
    let totalFitness = 0;
    this.population.forEach((bird) => {
      totalFitness += bird.fitness;
    });
    return totalFitness / this.population.length;
  }

  getBest() {
    if (!this.best) {
      this.evaluate();
    }

    return this.best;
  }

  think(closestPipe) {
    this.population.forEach((bird) => {
      if (!bird.dead) {
        bird.think(closestPipe);
      }
    });
  }

  show() {
    this.population.forEach((bird) => {
      if (!bird.dead) {
        bird.show();
      }
    });
  }

  update() {
    this.population.forEach((bird) => {
      if (!bird.dead) {
        bird.update();
      }
    });

    if (this.numAlive <= 0) {
      this.calcFitness();
      this.naturalSelection();
      this.generateNewPop();
      this.evaluate();
    }
  }
}
