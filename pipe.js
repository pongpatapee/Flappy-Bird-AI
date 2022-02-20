class Pipe{
  constructor(x){
    this.x = x;
    this.gap = 130;
    
    this.y_top;
    this.y_bottom;
    this.initHeight();
    
    this.size = [52, 320];
    this.vel = 3;
    
    this.birdHasPassed = false;
  }
  
  initHeight(){
    this.y_top = floor(random(80, 320));
    this.y_bottom = this.y_top + this.gap;
  }
  
  update(){
     this.x -= this.vel;
  }
  
  show(){
    // strokeWeight(10);
    // point(this.x, this.y_top);
    // point(this.x, this.y_bottom);
    
    //bottom pipe
    image(pipeBotImg, this.x, this.y_bottom);
    
    //top pipe
    image(pipeTopImg, this.x, this.y_top - this.size[1]);

    // image(pipeTopImg, this.x, 0);
    
  }
  
  isOut(){
    return this.x < (0 - this.size[0]);
  }
  
  hitBird(bird){
    
    let centerx = floor(bird.x + bird.size[0]/2);
    let bottomY = floor(bird.y + bird.size[1]);
    
    if(this.x <= centerx && centerx <= this.x + this.size[0]){
      if(bird.y <= this.y_top || bottomY >= this.y_bottom){
        return true;
      }
    }
    return false;    
  }
  
  birdPassed(bird) {
    if ((bird.x > this.x + (this.size[0])/2 && !this.birdHasPassed)){
      this.birdHasPassed = true;
      return true;
    }
    return false;
  }
  
}