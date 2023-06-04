function generateCandy() {
  for (let c = 0; c < columns; c++) {
    if (board[0][c].src.includes("blank")) {
      board[0][c].src = "images/" + randomCandy() + ".png";
    }
  }
}

