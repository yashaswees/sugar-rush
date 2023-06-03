function showFrontPage() {
  document.getElementById("frontPage").style.display = "block";

  let frontPageImage = document.createElement("img");
  frontPageImage.src = "images/start-background.png";
  frontPageImage.alt = "Front Page Image";
  document.getElementById("frontPage").appendChild(frontPageImage);

  let startButton = document.getElementById("startButton");
  startButton.addEventListener("click", start);
}
