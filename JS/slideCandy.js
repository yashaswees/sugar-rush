function slideCandy() {
  for (let c = 0; c < columns; c++) {
    let ind = rows - 1; 
    for (let r = columns - 1; r >= 0; r--) {//starts from the bottom of column to top
      if (!board[r][c].src.includes("blank")) {
        board[ind][c].src = board[r][c].src;// assigns candies at the [r][c] to [ind][c]
        ind -= 1;//index decreases only when candy is found
      }
    }
    for (let r = ind; r >= 0; r--) {
      board[r][c].src = "images/blank.png";
    }
  }
}
