function crushCandy() {
  crushTwo();
  crushFive();
  crushFour();
  crushThree();
  document.getElementById("score").innerText = score;
}
function crushTwo() {
  // when two striped combination is made in row
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 1; c++) {
      let candy1 = board[r][c];
      let candy2 = board[r][c + 1];
      if (candy1.src.includes("Striped") && candy2.src.includes("Striped")) {
        for (let i = 0; i < columns; i++) {
          console.log(" powerup crusing 2 whole rows");
          board[i][c].src = "images/blank.png";
          board[i][c + 1].src = "images/blank.png";
          let tastyImg = document.querySelector(".delicious");
          setTimeout(function () {
            tastyImg.style.display = "block";
            setTimeout(function () {
              tastyImg.style.display = "none";
            }, 1000); // Display for 1 second
          }, 100);
        }
        delicious.play();
        score += 180;
      }
    }
  }
  // when two striped combination is made in column
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 1; r++) {
      let candy1 = board[r][c];
      let candy2 = board[r + 1][c];
      if (candy1.src.includes("Striped") && candy2.src.includes("Striped")) {
        for (let i = 0; i < rows; i++) {
          console.log("powerup crushing whole 2 columns");
          board[r][i].src = "images/blank.png";
          board[r + 1][i].src = "images/blank.png";
          console.log("striped combination column");
          let sweetImg = document.getElementById("sweetImg");
          setTimeout(function () {
            sweetImg.style.display = "block";
            setTimeout(function () {
              sweetImg.style.display = "none";
            }, 1000); // Display for 1 second
          }, 100);
        }
        console.log("playing sweet at 2 column combinaiton");
        sweet.play();
        score += 180;
      }
    }
  }
}

function crushFive() {
  let sounds = ["delicious", "tasty"];
  let randomIndex = Math.floor(Math.random() * sounds.length);
  let selectedSound = sounds[randomIndex];
  //checking each row
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 4; c++) {
      let candy1 = board[r][c];
      let candy2 = board[r][c + 1];
      let candy3 = board[r][c + 2];
      let candy4 = board[r][c + 3];
      let candy5 = board[r][c + 4];
      if (
        candy1.src === candy2.src &&
        candy2.src === candy3.src &&
        candy3.src === candy4.src &&
        candy4.src === candy5.src &&
        !candy1.src.includes("blank")
      ) {
        console.log("at crush Five");
        candy1.src = "images/blank.png";
        candy2.src = "images/blank.png";
        candy5.src = "images/blank.png";
        candy4.src = "images/blank.png";
        candy3.src = "images/Choco.png";
        let audio = new Audio(`audio/${selectedSound}.wav`);
        audio.play();
        score += 50;
      }
    }
  }
  //checking each column
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 4; r++) {
      let candy1 = board[r][c];
      let candy2 = board[r + 1][c];
      let candy3 = board[r + 2][c];
      let candy4 = board[r + 3][c];
      let candy5 = board[r + 4][c];
      if (
        candy1.src === candy2.src &&
        candy2.src === candy3.src &&
        candy3.src === candy4.src &&
        candy4.src === candy5.src &&
        !candy1.src.includes("blank")
      ) {
        console.log("at crush Five");
        candy1.src = "images/blank.png";
        candy2.src = "images/blank.png";
        candy5.src = "images/blank.png";
        candy4.src = "images/blank.png";
        candy3.src = "images/Choco.png";
        score += 50;
        let audio = new Audio(`audio/${selectedSound}.wav`);
        audio.play();
      }
    }
  }
}
function crushFour() {
  // Checking each row
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      let isRowOfSameColor = true;
      let color;

      for (let i = 0; i < 4; i++) {
        let candy = board[r][c + i];

        var candyColor = candy.src.split("/").pop().split("-")[0];
        candyColor = candyColor.slice(0, -4); // Remove the file extension
        // console.log(candyColor);
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
              candy.src = "images/blank.png";
            } else {
              candy.src = `images/${color}-Striped.png`;
            }
            score += 40;
          }
        }
        drop.play();
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

        var candyColor = candy.src.split("/").pop().split("-")[0];
        if (candyColor.includes(".png")) {
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

      if (isColumnOfSameColor && candyColor.includes(color)) {
        // Perform actions on the candies in the row
        for (let i = 0; i < 4; i++) {
          let candy = board[r + i][c];
          if (!candy.src.includes("blank")) {
            if (i < 3) {
              candy.src = "images/blank.png";
            } else {
              candy.src = `images/${color}-Striped.png`;
            }
            score += 40;
          }
        }
        drop.play();
      }
    }
  }
}
