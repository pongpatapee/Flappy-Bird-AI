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

  matmul(mat, vec) {
    let vecSum = [];
    for (let i = 0; i < mat.length; i++) {
      let sum = 0;
      for (let j = 0; j < mat[i].length; i++) {
        sum += mat[i][j] * vec[j];
      }
      vecSum.push(sum);
    }

    return vecSum;
  }
}
