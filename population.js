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
    this.maxFitness = 0;
    this.maxLifetime = 0;
  }

  showVision(pipe) {
    this.population.forEach((bird) => {
      if (bird.dead) {
        return;
      }
      bird.drawVision(pipe);
    });
  }

  checkHit(closestPipe) {
    this.population.forEach((bird) => {
      if (bird.dead) return;

      if (bird.hitPipe(closestPipe) || bird.hitFloor()) {
        bird.dead = true;
      }
    });
  }

  generateNewPop() {
    this.population = [];
    for (let i = 0; i < this.maxPop - 1; i++) {
      let child = this.best.copy();

      child.mutate(this.mutationRate);
      this.population[i] = child;
    }

    this.population.push(this.best.copy()); //have at least one identical copy of the best from previous gen

    this.numAlive = this.maxPop;
    this.generation++;
  }

  calcFitness() {
    let totalLifeTime = 0;
    for (let i = 0; i < this.population.length; i++) {
      totalLifeTime += this.population[i].lifetime;
    }

    this.population.forEach((bird) => {
      bird.fitness = bird.lifetime / totalLifeTime;
      this.maxFitness = max(bird.fitness, this.maxFitness);
      this.maxLifetime = max(bird.lifetime, this.maxLifetime);
    });
  }

  naturalSelection() {
    // this.matingPool = [];
    //
    // let maxFitness = 0;
    // this.population.forEach((bird) => {
    //   maxFitness = max(bird.fitness, maxFitness);
    // });
    // // console.log(`maxFitness of this generation is: ${maxFitness}`);
    //
    // for (let i = 0; i < this.population.length; i++) {
    //   let fitness = map(this.population[i].fitness, 0, maxFitness, 0, 1);
    //   let n = floor(fitness * 100); // Arbitrary multiplier
    //
    //   for (let j = 0; j < n; j++) {
    //     this.matingPool.push(this.population[i]);
    //   }
    //   // console.log(
    //   //   `bird ${i}, fitness ${this.population[i].fitness} pushed ${n} times`
    //   // );
    // }
    this.evaluate(); // just define best bird to copy from
  }

  evaluate() {
    let bestLifetime = 0;
    let bestBirdInd = 0;

    this.population.forEach((bird, ind) => {
      if (bird.lifetime > bestLifetime) {
        bestLifetime = bird.lifetime;
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

    this.numAlive = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (!this.population[i].dead) {
        this.numAlive++;
      }
    }

    if (this.numAlive <= 0) {
      this.calcFitness();
      this.naturalSelection();
      this.generateNewPop();
    }
    this.evaluate();
  }
}
