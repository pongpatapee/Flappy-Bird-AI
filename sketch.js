let birds;
let currGen;
let generation;
let Neuvol;
let pipes;
let bgImg;
let birdImgs;
let pipeImg;
let score = 0;
let lifetime = 0;
let gameOver = false;
let speedSlider;
let updateCount = 0;
let alive;

function preload() {
  bgImg = loadImage('images/bg.png');
  birdImgs = [];
  birdImgs[0] = loadImage('images/bird1.png');
  birdImgs[1] = loadImage('images/bird2.png');
  birdImgs[2] = loadImage('images/bird3.png');
  pipeBotImg = loadImage('images/pipe_bot.png');
  pipeTopImg = loadImage('images/pipe_top.png');
}

function setup() {
  let canvas = createCanvas(400, 512);
  canvas.parent("canvasContainer");
  frameRate(60);
  speedSlider = createSlider(1, 10, 1, 1);

  
  pipes = [];
  //4 inputs (bird.y, bird.vel, distance to top pipe, distance to bottom pipe)
  let options = {
    population: 1,
    network:[4, [4], 1],
  };
  Neuvol = new Neuroevolution(options);
  currGen = new Neuvol.nextGeneration();
  generation = 1;
 
  birds = [];
  for(let i in currGen){
    birds.push(new Bird());
  }
  alive = birds.length; 
}

function draw() {
  image(bgImg, 0, 0, width, height);
  
  for(let i = 0; i < speedSlider.value(); i++){
    if(gameOver){
      // noLoop();
      restartGame();
    }
    console.log(gameOver);
    createPipe();

    for(let i in pipes){
      pipes[i].show();
      pipes[i].update();
    }
    
    for(let i in birds){
      if(!birds[i].dead){
        //find closest pipe
        let closestPipe;
        for(let j in pipes){
          if(!pipes[j].birdHasPassed){
            closestPipe = pipes[j];
            break;
          }
        }
        // console.log(closestPipe);
        //gather inputs
        let inputs = [birds[i].y, birds[i].vel,
                      closestPipe.y_top,
                      closestPipe.y_bottom
                     ];
        
        let decision = currGen[i].compute(inputs);
        if(decision > 0.5){
          birds[i].flap();
        }
        
        birds[i].update();
        birds[i].show();
        
        handlePipes(birds[i], i);
        
        
        
      }
    }
    
    lifetime++;
   
  }
  showInfo();
}

function showInfo(){
  const size = 24;
  fill(255);
  textSize(size);
  text(`Score: ${score}`, 10, size); 
  text(`Speed: ${speedSlider.value()}`, 10, size * 2);
  
}

function handlePipes(bird, ind){
  for(let i = pipes.length - 1; i >=0; i--){
    
    if(bird.hitPipe(pipes[i])){

      bird.dead = true;
      alive--;
      Neuvol.networkScore(currGen[ind], lifetime);
      if(alive <= 0){
        gameOver = true;
        break;

      }
    }
    
    if(pipes[i].birdPassed(bird)){
      score++; 
    }
    
    if(pipes[i].isOut()){
      pipes.splice(i, 1);
    }
  }
}


function createPipe() {
  let rate = 72;
  if(updateCount % rate == 0){
    pipes.push(new Pipe(width));
  }
  updateCount = (updateCount + 1) % rate;
}

function restartGame(){
  console.log('game restarted')
  lifetime = 0;
  // currGen = new Neuvol.nextGeneration();
  generation++;
 
  birds = [];
  for(let i in currGen){
    birds.push(new Bird());
  }
  alive = birds.length; 
  console.log('hi');
  pipes = [];
  gameOver = false;
  score = 0;
}

// function keyPressed() {
//   if(key === ' '){
//     bird.flap();
//   }
// }
