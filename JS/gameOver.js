function gameOver(){
    document.querySelector(".gameOverImg").style.display = "block";
    document.querySelector(".tryButton").style.display = "block";
    gameRunning = false;
    gameOverMusic.play();
    
    let tryButton = document.querySelector(".tryButton");
    tryButton.addEventListener("click", function() {
      location.reload();
    });
}