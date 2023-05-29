var candies = ["Blue", "Orange", "Red", "Yellow", "Green", "Purple"];
var board = [];
var rows = 9;
var columns = 9;
var score = 0;
var currTile;
var nextTile;

window.onload = function () {
  console.log("onload");
  startGame();
  // playMusicLoop();
  window.setInterval(function () {
    crushCandy();
    slideCandy();
    generateCandy();
  }, 100);
};

// function that generates random candies in the game
function randomCandy() {
  console.log("at random candy generator");
  return candies[Math.floor(Math.random() * candies.length)];
}
function startGame() {
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      console.log("at startGame");
      let tile = document.createElement("img");
      tile.id = r.toString() + "-" + c.toString(); //makes each candy a matrix component
      tile.src = "./images/" + randomCandy() + ".png";

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
  const dropSound = new Audio("../audio/drop.wav");
  dropSound.play();

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
  const audio = new Audio("../audio/Theme-music.mp3");

  // Set the loop property to true to play the music in a loop
  audio.loop = true;

  // Play the music
  audio.play();
}
