function showFrontPage() {
  document.getElementById("frontPage").style.display = "block";

  let frontPageImage = document.createElement("img");
  frontPageImage.src = "images/start-background.png";
  frontPageImage.alt = "Front Page Image";
  document.getElementById("frontPage").appendChild(frontPageImage);

  let startButton = document.querySelector(".startButton");
  startButton.addEventListener("click", showOptions);
}
function showOptions() {
  let startButton = document.querySelector(".startButton");
  let optionsButtons = document.getElementsByClassName("options");
  let tutorialButton = document.querySelector(".tutorial");

  startButton.style.left = "-50%";
  tutorialButton.style.left = "-50%";

  for (let button of optionsButtons) {
    button.style.display = "block";
    button.style.left = "45%";
  }
}

