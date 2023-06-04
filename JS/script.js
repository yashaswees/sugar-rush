let candies = ["Blue", "Orange", "Red", "Yellow", "Green", "Purple"];
let board = [];
let rows = 9;
let columns = 9;
let score = 0;
let moves = 5;
let currTile;
let nextTile;
let drop= new Audio("audio/drop.wav");
let delicious = new Audio("audio/delicious.wav");
let fairyDust = new Audio ("audio/fairy-dust.mp3");
let sweet = new Audio("audio/sweet.wav");
let divine = new Audio("audio/divine.wav");
let invalid= new Audio("audio/invalid.mp3");
let gameOverMusic = new Audio("audio/game-over.mp3")
let gameRunning = true;

window.onload = function () {
  showFrontPage();
};

function start() {
  document.querySelector(".gameOverImg").style.display = "none";
  document.querySelector(".tryButton").style.display = "none";
  document.getElementById("frontPage").style.display = "none";
  let container = document.querySelector(".container");
  container.style.display = "block";
  console.log("at start");
  // playMusicLoop(); 
  // Start the game loop
  setTimeout(function() {
    // Start the game loop
    startGame();
    window.setInterval(function() {
      crushCandy();
      setTimeout(function() {
        slideCandy();
      }, 300);
      generateCandy();
    }, 200);
  }, 2000); // 2-second delay
  if (gameRunning == false){
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
    let validMove = checkValid();
    if (!validMove) {
      // makes sure that only those moves are valid that make a combination
      // const swapSound= new Audio('../audio/swap.wav');
      // swapSound.play();
      let currImg = currTile.src;
      let nextImg = nextTile.src;
      currTile.src = nextImg;
      nextTile.src = currImg;
    }
  }
}

function playMusicLoop() {
  // Create an Audio object with the path to your music file
  const audio = new Audio("audio/Theme-music.mp3");

  // Set the loop property to true to play the music in a loop
  audio.loop = true;

  // Play the music
  audio.play();
}
