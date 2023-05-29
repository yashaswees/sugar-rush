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
          console.log(color);
          let candy = board[r][c + i];

          if (!candy.src.includes("blank")) {
            if (i < 3) {
              console.log(candy.src);
              candy.src = "../images/blank.png";
            } else {
              candy.src = `../sugar-rush/images/${color}-Striped-Horizontal.png`;
              console.log(candy.src);
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
          console.log(candy.src);
          if (!candy.src.includes("blank")) {
            if (i < 3) {
              candy.src = "../images/blank.png";
              
            } else {
              candy.src = `../images/${color}-Striped-Vertical.png`;
              console.log(candy.src);
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
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 2; c++) {
      let candy1 = board[r][c];

      var candyColor1 = candy1.src.split("/").pop().split("-")[0];
      if (candyColor1.includes(".png")) {
        candyColor1 = candyColor1.slice(0, -4); // Remove the file extension
      }
      let candy2 = board[r][c + 1];
      var candyColor2 = candy2.src.split("/").pop().split("-")[0];
      if (candyColor2.includes(".png")) {
        candyColor2 = candyColor2.slice(0, -4); // Remove the file extension
      }
      let candy3 = board[r][c + 2];
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

        // for (let i = 0; i < columns; i++) {
        //   console.log("horizontal powerup");
        //   board[r][i].src = "../images/blank.png";
        //   board[r][i].setAttribute("src", "../images/blank.png");
        // }
        score += 30;
      }
    }
  }
  //checking each column
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 2; r++) {
      let candy1 = board[r][c];
      var candyColor1 = candy1.src.split("/").pop().split("-")[0];
      if (candyColor1.includes(".png")) {
        candyColor1 = candyColor1.slice(0, -4); // Remove the file extension
      }
      let candy2 = board[r + 1][c];
      var candyColor2 = candy2.src.split("/").pop().split("-")[0];
      if (candyColor2.includes(".png")) {
        candyColor2 = candyColor2.slice(0, -4); // Remove the file extension
      }
      let candy3 = board[r + 2][c];
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
        score += 30;
      }
    }
  }
}
