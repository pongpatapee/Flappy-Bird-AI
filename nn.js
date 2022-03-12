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
        return tf.tidy(()=>{

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
            model.compile({
                loss: 'meanSquaredError',
                optimizer: 'sgd'
            });
            return model;
        });
    }

    predict(inputs){
        return tf.tidy(()=>{
            let inputTensor = tf.tensor2d([inputs]);
            let output = this.model.predict(inputTensor);
            output = output.dataSync();
            
            return output;
        });
    }

    copy(){
        return tf.tidy(()=>{
            const weights = this.model.getWeights();
            const modelCopy = new NeuralNetwork(this.nInput, this.nHidden, this.nOutput, weights);

            return modelCopy;
        });
    }

    // mutate(rate){
    //     tf.tidy(()=>{
    //         const weights = this.model.getWeights();
    //         // let mutatedWeights = [];
    //         let mutatedWeights = [];

    //         for(let i = 0; i < weights.length; i++){
    //             let currWeight = weights[i].dataSync().slice();
    //             let shape = weights[i].shape;
    //             let newWeight = [];
    //             for(let j = 0; j < currWeight.length; j++){
    //                 if(random(1) < rate){
    //                     newWeight[j] = currWeight[j] + randomGaussian();
    //                 } else {
    //                     newWeight[j] = currWeight[j];
    //                 }
    //             }
    //             mutatedWeights[i] = tf.tensor(newWeight, shape);
    //         }

    //         this.model.setWeights(mutatedWeights);
    //     });
    // }
    mutate(rate) {
        tf.tidy(() => {
        const weights = this.model.getWeights();
        const mutatedWeights = [];
        for (let i = 0; i < weights.length; i++) {
            let tensor = weights[i];
            let shape = weights[i].shape;
            let values = tensor.dataSync().slice();
            for (let j = 0; j < values.length; j++) {
            if (random(1) < rate) {
                let w = values[j];
                values[j] = w + randomGaussian();
            }
            }
            let newTensor = tf.tensor(values, shape);
            mutatedWeights[i] = newTensor;
        }
        this.model.setWeights(mutatedWeights);
        });
    }

    
    dispose(){
        this.model.dispose();
    }

}