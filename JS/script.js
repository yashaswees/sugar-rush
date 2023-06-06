let candies = ["Blue", "Orange", "Red", "Yellow", "Green", "Purple"];
let board = [];
let rows = 9;
let columns = 9;
let score = 0;
let moves = 40;
let currTile;
let nextTile;
let goal = 0;
let drop = new Audio("audio/drop.wav");
let delicious = new Audio("audio/delicious.wav");
let fairyDust = new Audio("audio/fairy-dust.mp3");
let sweet = new Audio("audio/sweet.wav");
let divine = new Audio("audio/divine.wav");
let invalid = new Audio("audio/invalid.mp3");
let gameOverMusic = new Audio("audio/level-failed.mp3");
let gameRunning = true;
let shotMusic= new Audio("audio/shot.mp3")
let audio = new Audio("audio/Theme-music.mp3");
let sugarCrushAudio = new Audio("audio/sugar-crush.mp3");
const easyButton = document.querySelector(".options.easy");
const mediumButton = document.querySelector(".options.medium");
const hardButton = document.querySelector(".options.hard");


// Add event listeners to the buttons
easyButton.addEventListener("click", function () {
  console.log("easy");
  start(20, 2000); // Pass the moves and goal as parameters
});

mediumButton.addEventListener("click", function () {
  console.log("med");
  start(20, 3000);
});

hardButton.addEventListener("click", function () {
  console.log("hard");
  start(15, 4000);
});

window.onload = function () {
  showFrontPage();
};

let homeButton = document.querySelector(".home");
homeButton.addEventListener("click", function() {
  location.reload();
});

function start(move, goalValue) {
  moves = move;
  goal = goalValue;
  document.getElementById("moves").innerText = moves;
  document.getElementById("goal").innerText = goal;
  document.querySelector(".gameOverImg").style.display = "none";
  document.querySelector(".tryButton").style.display = "none";
  document.getElementById("frontPage").style.display = "none";
  let container = document.querySelector(".container");
  container.style.display = "block";
  // playMusicLoop();
  // Start the game loop
  setTimeout(function () {
    // Start the game loop
    startGame();
    window.setInterval(function () {
      crushCandy();
      checkStatus();
      setTimeout(function () {
        slideCandy();
      }, 300);
      generateCandy();
    }, 200);
  }, 2000); // 2-second delay
  if (!gameRunning) {
    return;
  }
}

function startGame() {
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("img");
      tile.id = r.toString() + "-" + c.toString(); //makes each candy a matrix component
      tile.src = "images/" + randomCandy() + ".png";

      //event listeners for the game
      tile.addEventListener("dragstart", dragStart); // for when dragging process is started
      tile.addEventListener("dragover", dragOver); // for when moving cursor to drag the candy
      tile.addEventListener("dragenter", dragEnter); // dragging candy onto another candy
      tile.addEventListener("dragleave", dragLeave); // leave another candy
      tile.addEventListener("drop", dragDrop); // dropping a candy over another candy
      tile.addEventListener("dragend", dragEnd); // letting go of previous candy
      document.getElementById("board").append(tile);
      row.push(tile);
    }
    board.push(row);
  }
}
// function that generates random candies in the game
function randomCandy() {
  return candies[Math.floor(Math.random() * candies.length)];
}

function dragStart() {
  console.log("at dragStart");
  currTile = this;
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}
function dragLeave() {}

function dragDrop() {
  nextTile = this;
}

function dragEnd() {
  if (currTile.src.includes("blank") || nextTile.src.includes("blank")) {
    // cannot swap with blank
    console.log("at drop");

    return;
  }
  console.log("at dragEnd");
  //check for adjacent candies
  let currCoords = currTile.id.split("-");
  let r = parseInt(currCoords[0]);
  let c = parseFloat(currCoords[1]);

  let nextCoords = nextTile.id.split("-");
  let r2 = parseInt(nextCoords[0]);
  let c2 = parseInt(nextCoords[1]);

  let moveLeft = c2 == c - 1 && r == r2; // same row and adjacent columns
  let moveRight = c2 == c + 1 && r == r2;

  let moveUp = r2 == r - 1 && c == c2; // same column and adjacent rows
  let moveDown = r2 == r + 1 && c == c2;

  let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

  if (isAdjacent) {
    let currImg = currTile.src;
    let nextImg = nextTile.src;

    currTile.src = nextImg;
    nextTile.src = currImg;
    if (nextTile.src.includes("Choco")) {
      console.log("chocopowerup!!");
      nextTile.src = "images/blank.png";
      var candyColor = currTile.src.split("/").pop().split("-")[0];
      if (candyColor.includes(".png")) {
        candyColor = candyColor.slice(0, -4); // Remove the file extension
      }
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
          if (board[r][c].src.includes(candyColor)) {
            board[r][c].src = "images/blank.png";
          }
        }
      }
      let sugarCrushImg = document.querySelector(".sugarCrush");
      setTimeout(function () {
        sugarCrushImg.style.display = "block";
        setTimeout(function () {
          sugarCrushImg.style.display = "none";
        }, 1000); // Display for 1 second
      }, 100);
      sugarCrushAudio.play();
      score += 100;
    }
    let validMove = checkValid();
    if (!validMove) {
      let currImg = currTile.src;
      let nextImg = nextTile.src;

      currTile.src = nextImg;
      nextTile.src = currImg;
    }
  }
}

function playMusicLoop() {
  // Set the loop property to true to play the music in a loop
  audio.loop = true;
  // Play the music
  audio.play();
}

function checkStatus() {
  document.getElementById("score").innerText = score;
  if (score > goal) {
    console.log("congratulations");
    document.querySelector(".levelcomplete").style.display = "block";
    document.querySelector(".nextLevel").style.display = "block";
    audio.pause();
  }
}
