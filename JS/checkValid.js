function checkValid() {
  // check rows
  document.getElementById("moves").innerText = moves;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 2; c++) {
      let candy1 = board[r][c];
      let candyColor1 = candy1.src.split("/").pop().split("-")[0];
      if (candyColor1.includes(".png")) {
        candyColor1 = candyColor1.slice(0, -4); // Removes the file extension
      }
      let candy2 = board[r][c + 1];
      let candyColor2 = candy2.src.split("/").pop().split("-")[0];
      if (candyColor2.includes(".png")) {
        candyColor2 = candyColor2.slice(0, -4);
      }
      let candy3 = board[r][c + 2];
      let candyColor3 = candy3.src.split("/").pop().split("-")[0];
      if (candyColor3.includes(".png")) {
        candyColor3 = candyColor3.slice(0, -4);
      }
      if (
        candyColor1 == candyColor2 &&
        candyColor2 == candyColor3 &&
        !candy1.src.includes("blank")
      ) {
        moves -= 1;
        document.getElementById("moves").innerText = moves;
        if (moves == 0) {
          setTimeout(function (){
            gameOver();
          }, 2000)
        }
        return true;
      }
    }
  }
  // check columns
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 2; r++) {
      let candy1 = board[r][c];
      let candyColor1 = candy1.src.split("/").pop().split("-")[0];
      if (candyColor1.includes(".png")) {
        candyColor1 = candyColor1.slice(0, -4);
      }
      let candy2 = board[r + 1][c];
      let candyColor2 = candy2.src.split("/").pop().split("-")[0];
      if (candyColor2.includes(".png")) {
        candyColor2 = candyColor2.slice(0, -4);
      }
      let candy3 = board[r + 2][c];
      let candyColor3 = candy3.src.split("/").pop().split("-")[0];
      if (candyColor3.includes(".png")) {
        candyColor3 = candyColor3.slice(0, -4);
      }
      if (
        candyColor1 == candyColor2 &&
        candyColor2 == candyColor3 &&
        !candy1.src.includes("blank")
      ) {
        swap.play();
        moves -= 1;
        document.getElementById("moves").innerText = moves;
        if (moves == 0)  {
          gameOver();
        }
        return true;
      }
    }
  }
  invalid.play();
  return false;
}
