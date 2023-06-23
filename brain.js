class NeuralNetwork {
  constructor(numInput, numHidden, numOutput) {
    // for now we'll have just one hidden layer, future improvements could be to describe the network in an array

    this.inputLayerSize = numInput;
    this.hiddenLayerSize = numHidden;
    this.outputLayerSize = numOutput;

    this.weights1 = this.initWeight(this.inputLayerSize, this.hiddenLayerSize);
    this.weights2 = this.initWeight(this.hiddenLayerSize, this.outputLayerSize);
    this.biases1 = this.initBiases(this.hiddenLayerSize);
    this.biases2 = this.initBiases(this.outputLayerSize);
  }

  initWeight(inputSize, outputSize) {
    const weights = [];
    for (let i = 0; i < outputSize; i++) {
      const row = [];
      for (let j = 0; j < inputSize; j++) {
        row.push(Math.random() * 2 - 1);
      }
      weights.push(row);
    }

    return weights;
  }

  initBiases(size) {
    const biases = [];
    for (let i = 0; i < size; i++) {
      biases.push(Math.random() * 2 - 1);
    }

    return biases;
  }

  // mutateWeight(weights) {
  mutateWeight(weights, mutationRate) {
    for (let i = 0; i < weights.length; i++) {
      for (let j = 0; j < weights[i].length; j++) {
        if (Math.random() < mutationRate) {
          weights[i][j] = Math.random() * 2 - 1;
        }
      }
    }
  }

  mutateBias(bias, mutationRate) {
    for (let i = 0; i < bias.length; i++) {
      if (Math.random() < mutationRate) {
        bias[i] = Math.random() * 2 - 1;
      }
    }
  }

  mutate(mutationRate) {
    this.mutateWeight(this.weights1, mutationRate);
    this.mutateWeight(this.weights2, mutationRate);
    this.mutateBias(this.biases1, mutationRate);
    this.mutateBias(this.biases2, mutationRate);
  }

  mixWeights(weightA, weightB) {
    const weights = new Array(weightA.length);
    for (let i = 0; i < weightA.length; i++) {
      weights[i] = new Array(weightA[i].length);
      for (let j = 0; j < weightA[i].length; j++) {
        if (Math.random() * 2 - 1 < 0.5) {
          weights[i][j] = weightA[i][j];
        } else {
          weights[i][j] = weightB[i][j];
        }
      }
    }

    return weights;
  }

  mixBiases(biasA, biasB) {
    const bias = new Array(biasA.length);

    for (let i = 0; i < biasA.length; i++) {
      if (Math.random() * 2 - 1 <= 0.5) {
        bias[i] = biasA[i];
      } else {
        bias[i] = biasB[i];
      }
    }

    return bias;
  }

  mix(brain1, brain2) {
    this.weights1 = this.mixWeights(brain1.weights1, brain2.weights1);
    this.weights2 = this.mixWeights(brain1.weights2, brain2.weights2);
    this.biases1 = this.mixBiases(brain1.biases1, brain2.biases1);
    this.biases2 = this.mixBiases(brain1.biases2, brain2.biases2);
  }

  feedForward(input) {
    const hiddenLayerOutput = this.activate(
      this.add(this.matmul(input, this.weights1), this.biases1)
    );

    const outputLayerOutput = this.activate(
      this.add(this.matmul(hiddenLayerOutput, this.weights2), this.biases2)
    );

    return outputLayerOutput;
  }

  sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
  }

  activate(vec) {
    return vec.map((val) => this.sigmoid(val));
  }

  add(vec1, vec2) {
    return vec1.map((val, ind) => val + vec2[ind]);
  }

  matmul(vec, mat) {
    let vecSum = [];
    for (let i = 0; i < mat.length; i++) {
      let sum = 0;
      for (let j = 0; j < mat[i].length; j++) {
        sum += mat[i][j] * vec[j];
      }
      vecSum.push(sum);
    }

    return vecSum;
  }
}
