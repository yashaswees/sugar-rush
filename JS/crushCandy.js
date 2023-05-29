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
              candy.src = `../images/${color}-Striped-Vertical.png`;
            }
            score += 40;
          }
        }
      }
    }
  }
}

function crushThree() {
  //crushes a row or column of 3 candies
  //checking each row
  var stripedHorizontal = false;
  var stripedVertical = false;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 2; c++) {
      let candy1 = board[r][c];
      if (candy1.src.includes("Striped-Horizontal")) {
        var stripedHorizontal = true;
      }
      var candyColor1 = candy1.src.split("/").pop().split("-")[0];
      if (candyColor1.includes(".png")) {
        candyColor1 = candyColor1.slice(0, -4); // Remove the file extension
      }
      let candy2 = board[r][c + 1];
      if (candy2.src.includes("Striped-Horizontal")) {
        var stripedHorizontal = true;
      }
      var candyColor2 = candy2.src.split("/").pop().split("-")[0];
      if (candyColor2.includes(".png")) {
        candyColor2 = candyColor2.slice(0, -4); // Remove the file extension
      }
      let candy3 = board[r][c + 2];
      if (candy3.src.includes("Striped-Horizontal")) {
        var stripedHorizontal = true;
      }
      var candyColor3 = candy3.src.split("/").pop().split("-")[0];
      if (candyColor3.includes(".png")) {
        candyColor3 = candyColor3.slice(0, -4); // Remove the file extension
      }
      if (
        candyColor1 == candyColor2 &&
        candyColor2 == candyColor3 &&
        !candy1.src.includes("blank")
      ) {
        console.log("three crushed row");
        candy1.src = "../images/blank.png";
        candy2.src = "../images/blank.png";
        candy3.src = "../images/blank.png";
        if (stripedHorizontal == true) {
          for (let i = 0; i < columns; i++) {
            console.log("horizontal powerup");
            board[r][i].src = "../images/blank.png";
            board[r][i].setAttribute("src", "../images/blank.png");
          }
        }

        score += 30;
      }
    }
  }
  //checking each column
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 2; r++) {
      let candy1 = board[r][c];
      if (candy1.src.includes("Striped-Vertical")) {
        var stripedVertical = true;
      }
      var candyColor1 = candy1.src.split("/").pop().split("-")[0];
      if (candyColor1.includes(".png")) {
        candyColor1 = candyColor1.slice(0, -4); // Remove the file extension
      }
      let candy2 = board[r + 1][c];
      if (candy2.src.includes("Striped-Vertical")) {
        var stripedVertical = true;
      }
      var candyColor2 = candy2.src.split("/").pop().split("-")[0];
      if (candyColor2.includes(".png")) {
        candyColor2 = candyColor2.slice(0, -4); // Remove the file extension
      }
      let candy3 = board[r + 2][c];
      if (candy3.src.includes("Striped-Vertical")) {
        var stripedVertical = true;
      }
      var candyColor3 = candy3.src.split("/").pop().split("-")[0];
      if (candyColor3.includes(".png")) {
        candyColor3 = candyColor3.slice(0, -4); // Remove the file extension
      }
      if (
        candyColor1 == candyColor2 &&
        candyColor2 == candyColor3 &&
        !candy1.src.includes("blank")
      ) {
        console.log("three crushed column");
        candy1.src = "../images/blank.png";
        candy2.src = "../images/blank.png";
        candy3.src = "../images/blank.png";
        if (stripedVertical == true) {
          for (let i = 0; i < rows; i++) {
            console.log("vertical powerup");
            board[r][i].src = "../images/blank.png";
            board[r][i].setAttribute("src", "../images/blank.png");
          }
        }
        score += 30;
      }
    }
  }
}
