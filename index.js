window.onload = function() {
    var cvs = document.getElementById("myCanvas");
    var ctx = cvs.getContext("2d");

    //images
    var bg = document.getElementById("bg");
    var bird = document.getElementById("bird");
    var fg = document.getElementById("fg");
    var pipeNorth = document.getElementById("pipeNorth");
    var pipeSouth = document.getElementById("pipeSouth");

    // variables
    var gap = 85;
    var constant = pipeNorth.height+gap;
    var bX = 10;
    var bY = 150
    var gravity = 1.2;
    var score = 0;

    // audio
    var fly = new Audio();
    var scor = new Audio();
    fly.src = "sounds/fly.mp3";
    scor.src = "sounds/score.mp3";
    const audio.currentTime = 0;

    // keys
    document.addEventListener("keydown", moveUp);
    function moveUp(){
      bY -= 25;
      fly.play();
    }

    // pipes
    var pipe = [];
    pipe[0] = {
      x: cvs.width,
      y: 0
    }
    // drawImage
    function draw(){
    ctx.drawImage(bg,0,0);
    for(i=0;i<pipe.length;i++){
    ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
    ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
    pipe[i].x--;
    if(pipe[i].x == 125){
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
      });
    }

    // detect collision
    if(bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >= cvs.height - fg.height){
      location.reload(); // reload the page
    }

    if(pipe[i].x == 5){
      score ++;
      scor.play();
    }
  }

    ctx.drawImage(fg,0,cvs.height - fg.height);
    ctx.drawImage(bird, bX,bY);
    bY += gravity;
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score: "+score,10,cvs.height-20);
    requestAnimationFrame(draw);
  }

  draw();
}
