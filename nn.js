class NeuralNetwork{
    constructor(nInput, nHidden, nOutput, weights){
        this.nInput = nInput;
        this.nHidden = nHidden;
        this.nOutput = nOutput;

        this.model = this.createModel();

        if(weights){
            this.model.setWeights(weights);
        }
    }

    createModel(){
        const model = tf.sequential();

        //add hiddnen layer
        model.add(tf.layers.dense({
            units: this.nHidden,
            inputShape: [this.nInput],
            activation: 'sigmoid'
        }));

        //output layer
        model.add(tf.layers.dense({
            units: this.nOutput,
            activation: 'softmax'
        }));
        
        const learningRate = 0.01;
        const optimizer = tf.train.sgd(learningRate);
        model.compile({
            loss: 'meanSquaredError',
            optimizer: optimizer
        });

        return model;
    }

    predict(inputs){
        let inputTensor = tf.tensor2d([inputs]);
        let output = this.model.predict(inputTensor);
        output = output.dataSync();
        
        return output;
    }

    copy(){
        const weights = this.model.getWeights();
        modelCopy = new NeuralNetwork(this.nInput, this.nHidden, this.nOutput, weights);

        return modelCopy;
    }

    mutate(rate){
        const weights = this.model.getWeights();

    }
}