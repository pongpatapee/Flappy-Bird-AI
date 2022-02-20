class Bird {
  constructor(json){
    // this.x = x; 
    // this.y = y; 
    this.x = 30;
    this.y = height/2; 

    this.grav = 0.5;
    this.vel = 0;

    this.size = [34, 24];
    this.imgInd = 0;
    
    this.dead = false;
  
    this.init(json);
    
  }
  
  init(json){
    for(let i in json){
      this[i] = json[i];
    }
  }

  update(){
    this.vel += this.grav;
    if(this.vel >= 10){
        this.vel = 10;
    }
    else if(this.vel <= -20){
        this.vel = -20;
    }
    this.y += this.vel; 


    //limit sky and ground
    if (this.y < -30) {
        this.y = -30;
    }
    if(this.y >= height - this.size[1]){
        this.y = height - this.size[1];
    }
    
    
  }

  handleRotation(){
    translate(this.x, this.y);
    // rotate(PI/5);
  }
  
  show() {
    
    push();
    this.handleRotation();
    image(birdImgs[this.imgInd], 0, 0, this.size[0], this.size[1]);
    if(frameCount % 10 == 1){
      this.imgInd = (this.imgInd + 1) % 3;
    }
  
    pop();
  }
  
  flap(){
    let upForce = 15;
    this.vel -= upForce;
    console.log('flap flap');
  }
  
  hitPipe(pipe){
    let centerX = floor(this.x + this.size[0]/2);
    let bottomY = floor(this.y + this.size[1]);
    
    if(pipe.x <= centerX && centerX <= pipe.x + pipe.size[0]){
      if(this.y <= pipe.y_top || bottomY >= pipe.y_bottom){
        // this.dead = true;
        return true;
      }
    }
    return false;
  }

  
}