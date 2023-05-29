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
    if (currTile.src.includes("blank") || nextTile.src.includes("blank")){ // cannot swap with blank 
      console.log('at drop');
    
        return;
    }
    const dropSound= new Audio('../audio/drop.wav');
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
    if(!validMove){ // makes sure that only those moves are valid that make a combination
      // const swapSound= new Audio('../audio/swap.wav');
      // swapSound.play();
        let currImg = currTile.src;
        let nextImg = nextTile.src;
        currTile.src = nextImg;
        nextTile.src = currImg;
    }
  }
}
function crushCandy() {
  crushFour();
  crushThree();
  document.getElementById("score").innerText = score;
}
function crushFour() {
  // Checking each row
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      let isRowOfSameColor = true;
      let color;

      for (let i = 0; i < 4; i++) {
        let candy = board[r][c + i];
      
        var candyColor = candy.src.split('/').pop().split('-')[0];
        candyColor = candyColor.slice(0, -4); // Remove the file extension
      
        if (i === 0) {
          color = candyColor;
        } else if (candyColor !== color) {
          isRowOfSameColor = false;
          break;
        }
      }
      
      if (isRowOfSameColor && candyColor.includes(color)) {
        // Perform actions on the candies in the row
        for (let i = 0; i < 4; i++) {
          let candy = board[r][c + i];

          if (!candy.src.includes("blank")) {
            if (i < 3) {
              candy.src = "../images/blank.png";
            } else {
              candy.src = `../images/${color}-Striped-Horizontal.png`;
            }
            score += 40;
          }
        }
      }
    }
  }

  // Checking each column
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 3; r++) {
      let isColumnOfSameColor = true;
      let color;

      for (let i = 0; i < 4; i++) {
        let candy = board[r + i][c];
        
        var candyColor = candy.src.split('/').pop().split('-')[0];
        if (candyColor.includes(".png")){
          candyColor = candyColor.slice(0, -4); // Remove the file extension
        }
        
        // console.log(candyColor)
        if (i === 0) {
          color = candyColor;
        } else if (candyColor !== color) {
          isColumnOfSameColor = false;
          break;
        }
      }

      if (isColumnOfSameColor && candyColor.includes(color)){
        // Perform actions on the candies in the row
        for (let i = 0; i < 4; i++) {
          let candy = board[r + i][c];

          if (!candy.src.includes("blank")) {
            if (i < 3) {
              candy.src = "../images/blank.png";
            } else {
              candy.src = `../images/${color}-Striped-Vertical.png`;
            }
            score += 40;
          }
        }
      }
      }
    }
  }


function crushThree() { //crushes a row or column of 3 candies
  //checking each row
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 2; c++) {
      let candy1 = board[r][c];
      var candyColor1 = candy1.src.split('/').pop().split('-')[0];
      if (candyColor1.includes(".png")){
        candyColor1 = candyColor1.slice(0, -4); // Remove the file extension
      }
      let candy2 = board[r][c + 1];
      var candyColor2 = candy2.src.split('/').pop().split('-')[0];
      if (candyColor2.includes(".png")){
        candyColor2 = candyColor2.slice(0, -4); // Remove the file extension
      }
      let candy3 = board[r][c + 2];
      var candyColor3 = candy3.src.split('/').pop().split('-')[0];
      if (candyColor3.includes(".png")){
        candyColor3 = candyColor3.slice(0, -4); // Remove the file extension
      }
      if (
        candyColor1 == candyColor2 &&
        candyColor2 == candyColor3 &&
        !candy1.src.includes("blank")
      ) {
        console.log("three crushed row")
        candy1.src = "../images/blank.png";
        candy2.src = "../images/blank.png";
        candy3.src = "../images/blank.png";
        
        for (let i = 0; i < columns; i++) {
          console.log("horizontal powerup");
          board[r][i].src = "../images/blank.png";
          board[r][i].setAttribute("src", "../images/blank.png");
        }
        score +=30;
      }
    }
  }
  //checking each column
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 2; r++) {
      let candy1 = board[r][c];
      var candyColor1 = candy1.src.split('/').pop().split('-')[0];
      if (candyColor1.includes(".png")){
        candyColor1 = candyColor1.slice(0, -4); // Remove the file extension
      }
      let candy2 = board[r + 1][c];
      var candyColor2 = candy2.src.split('/').pop().split('-')[0];
      if (candyColor2.includes(".png")){
        candyColor2 = candyColor2.slice(0, -4); // Remove the file extension
      }
      let candy3 = board[r + 2][c];
      var candyColor3 = candy3.src.split('/').pop().split('-')[0];
      if (candyColor3.includes(".png")){
        candyColor3 = candyColor3.slice(0, -4); // Remove the file extension
      }
      if (
        candyColor1 == candyColor2 &&
        candyColor2 == candyColor3 &&
        !candy1.src.includes("blank")
      ) {
        console.log("three crushed column")
        candy1.src = "../images/blank.png";
        candy2.src = "../images/blank.png";
        candy3.src = "../images/blank.png";
        score +=30;
      }
    }
  }
}

function checkValid() {
  //check rows
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 2; c++) {
      let candy1 = board[r][c];
      var candyColor1 = candy1.src.split('/').pop().split('-')[0];
      if (candyColor1.includes(".png")){
        candyColor1 = candyColor1.slice(0, -4); // Remove the file extension
      }
      let candy2 = board[r][c + 1];
      var candyColor2 = candy2.src.split('/').pop().split('-')[0];
      if (candyColor2.includes(".png")){
        candyColor2 = candyColor2.slice(0, -4); // Remove the file extension
      }
      let candy3 = board[r][c + 2];
      var candyColor3 = candy3.src.split('/').pop().split('-')[0];
      if (candyColor3.includes(".png")){
        candyColor3 = candyColor3.slice(0, -4); // Remove the file extension
      }
      if (
        candyColor1 == candyColor2 &&
        candyColor2 == candyColor3 &&
        !candy1.src.includes("blank")
      ) {
              return true;
          }
      }
  }

  //check columns
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 2; r++) {
      let candy1 = board[r][c];
      var candyColor1 = candy1.src.split('/').pop().split('-')[0];
      if (candyColor1.includes(".png")){
        candyColor1 = candyColor1.slice(0, -4); // Remove the file extension
      }
      let candy2 = board[r + 1][c];
      var candyColor2 = candy2.src.split('/').pop().split('-')[0];
      if (candyColor2.includes(".png")){
        candyColor2 = candyColor2.slice(0, -4); // Remove the file extension
      }
      let candy3 = board[r + 2][c];
      var candyColor3 = candy3.src.split('/').pop().split('-')[0];
      if (candyColor3.includes(".png")){
        candyColor3 = candyColor3.slice(0, -4); // Remove the file extension
      }
      if (
        candyColor1 == candyColor2 &&
        candyColor2 == candyColor3 &&
        !candy1.src.includes("blank")
      ) {
              return true;
          }
      }
  }
  console.log("invalid move");
  return false;
}



function slideCandy(){
    for (let c = 0; c < columns; c++){
        let ind = rows - 1;
        for (let r = columns-1; r >= 0; r--){
            if (!board[r][c].src.includes("blank")){
                board[ind][c].src = board[r][c].src;
                ind -= 1;
            }
        } 
        for(let r = ind;r >=0; r--){ 
          board[r][c].src="../images/blank.png";
        }
    }
}
function generateCandy(){
    for(let c =0; c < columns; c++){
        if (board[0][c].src.includes("blank")){
            board[0][c].src="./images/"+ randomCandy() + ".png";
        }
    }
}

function playMusicLoop() {
  // Create an Audio object with the path to your music file
  const audio = new Audio('../audio/Theme-music.mp3');

  // Set the loop property to true to play the music in a loop
  audio.loop = true;

  // Play the music
  audio.play();
}



