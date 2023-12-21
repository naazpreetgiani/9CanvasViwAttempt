// Canvas View Easier
// When player moves, move the canvas with it

// Canvas Setup
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 400;
cnv.height = 400;

let leftPressed = false;
let rightPressed = false;

// Player Characteristics
let player = {
  x: cnv.width / 2,
  y: 650,
  w: 25,
  h: 25,
  dx: 5,
  dy: 0,
  a: 0.1,
  jumpSpeed: -5,
  color: "blue"
};


// Global Variables
let walls = [];
// Level 1 Walls
walls.push({ x: 200, y: 500, w: 100, h: 20 });
walls.push({ x: 450, y: 500, w: 100, h: 20 });
walls.push({ x: 700, y: 500, w: 100, h: 20 });
walls.push({ x: 950, y: 500, w: 100, h: 20 });
walls.push({ x: 1200, y: 500, w: 100, h: 20 });
walls.push({ x: 1450, y: 500, w: 100, h: 20 });

// Level 2 Walls
walls.push({ x: 50, y: 400, w: 100, h: 20 });
walls.push({ x: 300, y: 400, w: 100, h: 20 });
walls.push({ x: 550, y: 400, w: 100, h: 20 });
walls.push({ x: 800, y: 400, w: 100, h: 20 });
walls.push({ x: 1050, y: 400, w: 100, h: 20 });
walls.push({ x: 1350, y: 400, w: 100, h: 20 });
walls.push({ x: 1600, y: 400, w: 100, h: 20 });
walls.push({ x: 1850, y: 400, w: 100, h: 20 });

// Level 3 Walls
walls.push({ x: 200, y: 300, w: 100, h: 20 });
walls.push({ x: 450, y: 300, w: 100, h: 20 });
walls.push({ x: 700, y: 300, w: 100, h: 20 });
walls.push({ x: 950, y: 300, w: 100, h: 20 });
walls.push({ x: 1200, y: 300, w: 100, h: 20 });
walls.push({ x: 1450, y: 300, w: 100, h: 20 });

// Level 4 Walls
walls.push({ x: 50, y: 200, w: 100, h: 20 });
walls.push({ x: 300, y: 200, w: 100, h: 20 });
walls.push({ x: 550, y: 200, w: 100, h: 20 });
walls.push({ x: 800, y: 200, w: 100, h: 20 });
walls.push({ x: 1050, y: 200, w: 100, h: 20 });
walls.push({ x: 1350, y: 200, w: 100, h: 20 });
walls.push({ x: 1600, y: 200, w: 100, h: 20 });
walls.push({ x: 1850, y: 200, w: 100, h: 20 });


// Draw Function
window.addEventListener("load", draw);

function draw() {
  // LOGIC
  cnv.x = player.x - 200;
  cnv.y = player.y - 200;

  // Horizontal Movement
   if (rightPressed) {
    player.x += player.dx;
  } else if (leftPressed) {
    player.x -= player.dx;
  }

  //Vertical Movement
  player.dy += player.a; // Accelerate
  player.y += player.dy; // Move

  // Land on Floor
  if (player.y + player.h > cnv.height) {
    player.y = cnv.height - player.h;
    player.dy = 0;
  }

  // Check Collision with border
  if (player.x < 0) {
    player.x = 0;
  } else if (player.x + player.w > 1750) {
    player.x = 1750 - player.w;
  }
 
  if (player.x + 200 > 1750) {
    cnv.x = 1350;
  } else if (player.x - 200 < 0) {
    cnv.x = 0;
  }

  if (player.y < 0) {
    player.y += jumpSpeed;
  } else if (player.y + player.h > 650) {
    player.y = 650;
  }
 
  if (player.y + 200 > 650) {
    cnv.y = 250;
  } else if (player.y - 200 < 0) {
    cnv.y = 0;
  }

  for (let i = 0; i < walls.length; i++) {
    let wall = walls[i];

    if (player.x < wall.x + wall.w &&
      player.x + player.w > wall.x &&
      player.y < wall.y + wall.h &&
      player.y + player.w > wall.y) {
      if (upPressed) {
        if (player.y + player.h > wall.y) {
        player.y = wall.y + wall.h;
        }
      } else if (downPressed) {
        if (player.y < wall.y + wall.h){
        player.y = wall.y - player.h;
        }
      } else if (leftPressed) {
        if (player.x < wall.x + wall.w) {
          player.x = wall.x + wall.w;
        }
      } else if (rightPressed) {
        if (player.x + player.w > wall.x) {
          player.x = wall.x - player.w;
        }
      }
    }
    // if (player.x < wall.x + wall.w &&
    //   player.x + player.w > wall.x &&
    //   player.y < wall.y + wall.h &&
    //   player.y + player.w > wall.y) { 
    //   if (player.y + player.h > wall.y) {
    //     player.y = wall.y - player.h;
    //   } else if (player.y < wall.y + wall.h) {
    //     player.y -= player.a;
    //     // player.y += player.dy;
    //   } else if (player.x < wall.x + wall.w) {
    //     player.x = wall.x + wall.w;
    //     player.dy -= player.a;
    //     player.y += player.dy;
    //   } else if (player.x + player.w > wall.x) {
    //     player.x = wall.x - player.w;
    //     player.y -= player.dy;
    //   }
    }


  // DRAWING
  // Background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Draw Walls
  ctx.fillStyle = "black";
  for (let i = 0; i < walls.length; i++) {
    let wall = walls[i];
    ctx.fillRect(wall.x - cnv.x, wall.y - cnv.y, wall.w, wall.h);
  }

  // Draw Player
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x - cnv.x, player.y - cnv.y, player.w, player.h);

  // Animation Loop
  requestAnimationFrame(draw);
}

// Event Listeners & Handlers
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

function keydownHandler(e) {
    //Check for keys pressed
  if (e.code === "ArrowUp") {
      upPressed = true;
      player.dy = player.jumpSpeed;
    } else if (e.code === "ArrowLeft") {
      leftPressed = true;
    } else if (e.code === "ArrowRight") {
      rightPressed = true;
  }
}

function keyupHandler(e) {
    //Check for keys pressed
  if (e.code === "ArrowLeft") {
    leftPressed = false;
  } else if (e.code === "ArrowRight") {
    rightPressed = false;
  } 
}
