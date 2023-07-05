let assets = {};
let birdPop;
let speedSlider;
let speedSliderText;
let pipes;
let currGen;

function preload() {
  assets.bgImg = loadImage("images/bg.png");
  assets.baseImg = loadImage("images/base.png");
  assets.birdImgs = [];
  assets.birdImgs[0] = loadImage("images/bird1.png");
  assets.birdImgs[1] = loadImage("images/bird2.png");
  assets.birdImgs[2] = loadImage("images/bird3.png");
  assets.pipeBotImg = loadImage("images/pipe_bot.png");
  assets.pipeTopImg = loadImage("images/pipe_top.png");
}

function setup() {
  createCanvas(400, 512);
  speedSlider = createSlider(1, 10, 1, 1);
  speedSliderText = createP(`Time: ${speedSlider.value()}x`);

  const mutationRate = 0.1;
  const maxPop = 100;
  birdPop = new Population(mutationRate, maxPop);
  currGen = birdPop.generation;

  const numPipes = 5;
  pipes = new PipesContainer(numPipes);
}

function draw() {
  drawBackground();
  speedSliderText.html(`Time: ${speedSlider.value()}x`);
  for (let k = 0; k < speedSlider.value(); k++) {
    pipes.show();
    pipes.update();

    birdPop.show();
    birdPop.update();
    birdPop.think(pipes.getClosestPipe());
    birdPop.checkHit(pipes.getClosestPipe());
    birdPop.showVision(pipes.getClosestPipe());

    if (birdPop.generation > currGen) {
      currGen = birdPop.generation;
      pipes.reset();
    }
  }
  showStats();
}

function drawBackground() {
  image(assets.bgImg, 0, 0, width, height);
}

function showStats() {
  textSize(16);
  fill(255);
  let bestBird = birdPop.getBest();
  let bestScore = max(birdPop.maxLifetime, bestBird.lifetime);
  text(`Generation: ${birdPop.generation}`, 30, 30);
  text(`Alive: ${birdPop.numAlive} / ${birdPop.maxPop}`, 30, 50);
  text(`Best score ${bestScore}`, 30, 70);
  text(`Current Best ${bestBird.lifetime}`, 30, 90);
}

// function keyPressed() {
//   if (keyCode === 32) {
//     birdPop.population.forEach((bird) => bird.flap());
//   }
// }
