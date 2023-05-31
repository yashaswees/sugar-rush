function crushCandy() {
  crushFive();
  crushFour();
  crushThree();
  document.getElementById("score").innerText = score;
}


function crushFive() {
  var sounds = ["delicious", "tasty"];
  var randomIndex = Math.floor(Math.random() * sounds.length);
  var selectedSound = sounds[randomIndex];
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
        candy4.src === candy5.src
      ) {
        console.log("at crush Five");
        candy1.src = "../images/blank.png";
        candy2.src = "../images/blank.png";
        candy5.src = "../images/blank.png";
        candy4.src = "../images/blank.png";
        candy3.src = "../images/Choco.png";
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
        candy1.src = "../images/blank.png";
        candy2.src = "../images/blank.png";
        candy5.src = "../images/blank.png";
        candy4.src = "../images/blank.png";
        candy3.src = "../images/Choco.png";
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
              candy.src = "../images/blank.png";
            } else {
              candy.src = `../images/${color}-Striped.png`;
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
              candy.src = "../images/blank.png";
            } else {
              candy.src = `../images/${color}-Striped.png`;
            }
            score += 40;
          }
        }
      }
    }
  }
}


