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