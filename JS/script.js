let candies = ["Blue", "Orange", "Red", "Yellow", "Green", "Purple"];
let board = [];
let rows = 9;
let columns = 9;
let score = 0;
let moves = 40;
let currTile;
let nextTile;
let goal = 0;
let level = 0;
let drop = new Audio("audio/drop.wav");
let delicious = new Audio("audio/delicious.wav");
let fairyDust = new Audio("audio/fairy-dust.mp3");
let sweet = new Audio("audio/sweet.wav");
let divine = new Audio("audio/divine.wav");
let invalid = new Audio("audio/invalid.mp3");
let gameOverMusic = new Audio("audio/level-failed.mp3");
let lvlComplete = new Audio("audio/level-complete.mp3");
let lvlCompleted = new Audio("audio/level-completed.mp3");
let choco = new Audio("audio/choco.mp3");
let chocoPopped = new Audio("audio/chocoPopped.mp3");
let gameRunning = true;
let cont = false;
let shotMusic = new Audio("audio/shot.mp3");
let audio = new Audio("audio/Theme-music.mp3");
let sugarCrushAudio = new Audio("audio/sugar-crush.mp3");
const easyButton = document.querySelector(".options.easy");
const mediumButton = document.querySelector(".options.medium");
const hardButton = document.querySelector(".options.hard");
const tutorialButton = document.querySelector(".tutorial");
const XButton = document.querySelector(".X");

// Add event listeners to the buttons
tutorialButton.addEventListener("click", function () {
  document.querySelector(".tutorialImg").style.display = "block";
  XButton.style.display = "block";
});

XButton.addEventListener("click", function () {
  document.querySelector(".tutorialImg").style.display = "none";
  XButton.style.display = "none";
});

easyButton.addEventListener("click", function () {
  start(1); // Pass the moves and goal as parameters
});

mediumButton.addEventListener("click", function () {
  start(2);
});

hardButton.addEventListener("click", function () {
  start(3);
});

window.onload = function () {
  showFrontPage();
};

let homeButton = document.querySelector(".home");
homeButton.addEventListener("click", function () {
  location.reload();
});

function start(lvl) {
  level = lvl;
  score = 0;
  if (level == 1) {
    moves = 20;
    goal = 2000;
  } else if (level == 2) {
    moves = 20;
    goal = 3000;
  } else if (level == 3) {
    moves = 15;
    goal = 3000;
  }
  document.getElementById("moves").innerText = moves;
  document.getElementById("goal").innerText = goal;
  document.querySelector(".gameOverImg").style.display = "none";
  document.querySelector(".tryButton").style.display = "none";
  document.getElementById("frontPage").style.display = "none";
  let container = document.querySelector(".container");
  container.style.display = "block";
  playMusicLoop();
  // Start the music loop
  setTimeout(function () {
    // Start the game loop
    if (!cont) {
      startGame();
    }
    window.setInterval(function () {
      crushCandy();
      checkStatus(); //to check if gameover should be called
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
  currTile = this;
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragDrop() {
  nextTile = this;
}

function dragEnd() {
  if (currTile.src.includes("blank") || nextTile.src.includes("blank")) {
    // cannot swap with blank

    return;
  }
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
      let count = 0;
      moves--;
      nextTile.src = "images/blank.png";
      let candyColor = currTile.src.split("/").pop().split("-")[0];
      if (candyColor.includes(".png")) {
        candyColor = candyColor.slice(0, -4); // Remove the file extension
      }
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
          if (board[r][c].src.includes(candyColor)) {
            board[r][c].src = "images/blank.png";
            count++;
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
      chocoPopped.play();
      sugarCrushAudio.play();
      score += count * 10;
      document.getElementById("score").innerText = score;
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
    if (level < 3) {
      document.querySelector(".levelcomplete").style.display = "block";
      document.querySelector(".nextLevel").style.display = "block";
      const nextButton = document.querySelector(".nextLevel");
      nextButton.addEventListener("click", function () {
        cont = true;
        let nxt = level + 1;
        document.querySelector(".levelcomplete").style.display = "none";
        document.querySelector(".nextLevel").style.display = "none";
        start(nxt);
      });
      lvlComplete.play();
    } else if (level == 3) {
      document.querySelector(".victory").style.display = "block";
      lvlCompleted.play();
    }

    audio.pause();
    score = goal;
  }
}
