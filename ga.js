function getBestBird(){

    return tf.tidy(()=>{
        calcFitness();
        let bestBird = birds[0];
        let bestBirdFitness = -Infinity; 

        for(let bird of birds){
            if(bird.fitness > bestBirdFitness){
                bestBirdFitness = bird.fitness;
                bestBird = bird;
            }
        }   
        if(bestBird === undefined || bestBird === null){
            bestBird = birds[0];
        }
        return bestBird;

    });
}

function calcFitness(){

    tf.tidy(()=>{
        let totalFitness = 0;
        for(let i = 0; i < birds.length; i++){
            totalFitness += birds[i].lifetime;
        }

        for(let bird of birds){
            bird.fitness = bird.lifetime / totalFitness; 
        }

    });
}

function nextGeneration(){
    return tf.tidy(()=>{
        let bestBird = getBestBird();
        let mutationRate = 0.1;
        let newBirds = [];
        for(let i = 0; i < POPULATION; i++){
            let child = new Bird(bestBird.brain);
            child.brain.mutate(mutationRate);
            newBirds[i] = child;
        }

        for(let bird of birds){
            bird.brain.dispose();
        }
        
        return newBirds;

    });
}