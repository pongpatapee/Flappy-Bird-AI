let assets = {};
let birdPop;
let speedSlider;
let speedSliderText;
let pipes;

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

  const mutationRate = 0.01;
  const maxPop = 1;
  birdPop = new Population(mutationRate, maxPop);

  const numPipes = 5;
  pipes = new PipesContainer(numPipes);
}

function draw() {
  drawBackground();
  speedSliderText.html(`Time: ${speedSlider.value()}x`);
  for (let k = 0; k < speedSlider.value(); k++) {
    birdPop.show();
    birdPop.update();

    pipes.show();
    pipes.update();
    birdPop.showVision(pipes.getClosestPipe());
  }
}

function drawBackground() {
  image(assets.bgImg, 0, 0, width, height);
}

function keyPressed() {
  if (keyCode === 32) {
    birdPop.population.forEach((bird) => bird.flap());
  }
}
