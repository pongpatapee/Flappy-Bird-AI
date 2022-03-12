let birds;
let currGen;
let generation = 0;
let pipes;
let bgImg;
let birdImgs;
let pipeImg;
let score = 0;
let gameOver = false;
let speedSlider;
let updateCount = 0;
let alive;
const POPULATION = 50;

function preload() {
  bgImg = loadImage('images/bg.png');
  birdImgs = [];
  birdImgs[0] = loadImage('images/bird1.png');
  birdImgs[1] = loadImage('images/bird2.png');
  birdImgs[2] = loadImage('images/bird3.png');
  pipeBotImg = loadImage('images/pipe_bot.png');
  pipeTopImg = loadImage('images/pipe_top.png');
}

function startGame(){
  tf.tidy(()=>{
    pipes = [];
    score = 0;
    lifetime = 0;
    updateCount = 0;
    generation++;

    if(generation <= 1){
      birds = [];
      for(let i = 0; i < POPULATION; i++){
        birds.push(new Bird());
      } 
      calcFitness();
    } else {
      birds = nextGeneration();
    }
    console.log(tf.memory());
    alive = birds.length; 

  });
}

function setup() {
  let canvas = createCanvas(400, 512);
  canvas.parent("canvasContainer");
  frameRate(60);
  speedSlider = createSlider(1, 10, 1, 1);
  tf.setBackend('cpu');
  
  startGame();
}

function draw() {
  image(bgImg, 0, 0, width, height);
  
  for(let k = 0; k < speedSlider.value(); k++){
    createPipe();
    for(let i = pipes.length - 1; i >= 0; i--){
      pipes[i].update();
      pipes[i].show();
      if(pipes[i].isOut()){
        pipes.splice(i, 1);
      }
    }
    
   let closestPipe = null;
    for(let j in pipes){
      if(!pipes[j].hasBirdPassed){
        closestPipe = pipes[j];
        break;
      }
    }

    
    for(let i in birds){
      if(!birds[i].dead){
        birds[i].update();
        birds[i].show();
        birds[i].lifetime++;
        

        // let inputs = [0.1, 0.2, 0.4, 0.6];
        let inputs = [
          birds[i].y / height,
          birds[i].vel / height,
          closestPipe.y_bottom / height,
          closestPipe.y_top / height
        ];
        let decision = birds[i].brain.predict(inputs);
        if(decision[0] > decision[1]){
          birds[i].flap();
        }
        
        for(let j in pipes){
          //bird hit pipe
          if(birds[i].hitPipe(pipes[j])){  //|| birds[i].hitFloor()
            birds[i].dead = true;
            alive--;
            calcFitness();
            if(gameHasEnded()){
              startGame();
              break;
            }
            
          }
          
          
          //bird has passed pipe
          if(pipes[j].birdPassed(birds[i])){
            birds[i].score++;
            break;
          }
        }

        
      }
    }   
    
    
    
    
  }
  showInfo();
}

function showInfo(){
  const size = 24;
  fill(255);
  textSize(size);
  text(`Score: ${getBestScore()}`, 10, size);
  text(`Generation: ${generation}`, 10, size * 2);
  text(`Alive: ${alive} / ${birds.length}`, 10, size * 3);
  text(`Speed: ${speedSlider.value()}`, 10, size * 4);
  
}


function createPipe() {
  let rate = 72;
  if(updateCount % rate == 0){
    pipes.push(new Pipe(width));
  }
  updateCount = (updateCount + 1) % rate;
}


function getBestScore(){
  for(let bird of birds){
    score = max(bird.score, score);
  }
  return score;
}

function gameHasEnded(){
  return !(alive > 0);
}
