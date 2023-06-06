function crushThree() {
  //crushes a row or column of 3 candies
  crushThreeRow();
  crushThreeColumn();
}

function crushThreeRow() {
  //checking each row
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 2; c++) {
      var striped = false;
      let candy1 = board[r][c];
      if (candy1.src.includes("Striped")) {
        striped = true;
      }
      var candyColor1 = candy1.src.split("/").pop().split("-")[0];
      if (candyColor1.includes(".png")) {
        candyColor1 = candyColor1.slice(0, -4); // Remove the file extension
      }
      let candy2 = board[r][c + 1];
      if (candy2.src.includes("Striped")) {
        striped = true;
      }
      var candyColor2 = candy2.src.split("/").pop().split("-")[0];
      if (candyColor2.includes(".png")) {
        candyColor2 = candyColor2.slice(0, -4); // Remove the file extension
      }
      let candy3 = board[r][c + 2];
      if (candy3.src.includes("Striped")) {
        striped = true;
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
        candy1.src = "images/blank.png";
        candy2.src = "images/blank.png";
        candy3.src = "images/blank.png";
        drop.play();
        if (striped == true) {
          for (let i = 0; i < columns; i++) {
            console.log(" powerup crusing whole row");
            board[r][i].src = "images/blank.png";
            board[r][i].setAttribute("src", "images/blank.png");
            let sweetImg = document.getElementById("sweetImg");
            setTimeout(function () {
              sweetImg.style.display = "block";
              setTimeout(function () {
                sweetImg.style.display = "none";
              }, 1000); // Display the sweetImg for 1 second
            }, 100);
          }
          fairyDust.play();
          sweet.play();
          score += 60;
        }
        score += 30;
      }
    }
  }
  if (gameRunning == false) {
    return;
  }
}

function crushThreeColumn() {
  //checking each column

  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 2; r++) {
      var striped = false;
      let candy1 = board[r][c];
      if (candy1.src.includes("Striped")) {
        striped = true;
      }
      var candyColor1 = candy1.src.split("/").pop().split("-")[0];
      if (candyColor1.includes(".png")) {
        candyColor1 = candyColor1.slice(0, -4); // Remove the file extension
      }
      let candy2 = board[r + 1][c];
      if (candy2.src.includes("Striped")) {
        striped = true;
      }
      var candyColor2 = candy2.src.split("/").pop().split("-")[0];
      if (candyColor2.includes(".png")) {
        candyColor2 = candyColor2.slice(0, -4); // Remove the file extension
      }
      let candy3 = board[r + 2][c];
      if (candy3.src.includes("Striped")) {
        striped = true;
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
        candy1.src = "images/blank.png";
        candy2.src = "images/blank.png";
        candy3.src = "images/blank.png";
        console.log("playing drop at column");
        drop.play();
        if (striped == true) {
          for (let i = 0; i < rows; i++) {
            console.log("powerup crushing whole column");
            board[i][c].src = "images/blank.png";
          }
          fairyDust.play();
          let divineImg = document.querySelector(".divineImg");
          setTimeout(function () {
            divineImg.style.display = "block";
            setTimeout(function () {
              divineImg.style.display = "none";
            }, 1000); // Display for 1 second
          }, 100);
          divine.play();
          score += 60;
        }
        score += 30;
      }
    }
  }
  if (gameRunning == false) {
    return;
  }
}
