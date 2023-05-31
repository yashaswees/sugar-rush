function generateCandy() {
  for (let c = 0; c < columns; c++) {
    if (board[0][c].src.includes("blank")) {
      board[0][c].src = "./images/" + randomCandy() + ".png";
    }
  }
}

// function generateCandy() { TRIED FOR ANIMATION. MIGHT WORK
//   for (let c = 0; c < columns; c++) {
//     if (board[0][c].src.includes("blank")) {
//       let candyImg = document.createElement("img");
//       candyImg.src = "./images/" + randomCandy() + ".png";
//       candyImg.classList.add("candy");
//       document.getElementById("board").appendChild(candyImg);

//       // Trigger the falling animation with a small delay
//       setTimeout(function() {
//         candyImg.classList.add("falling");
//       }, 100); // Delay of 100 milliseconds before the candy starts falling
//     }
//   }
// }
