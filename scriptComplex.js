// <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <title>Memory Game!</title>
//     <link rel="stylesheet" href="style.css" />
//   </head>
//   <body>
//     <h1>Memory Game!</h1>
//     <button id="start-button">Start</button>
//     <a href="index.html" id="restart-button">Restart?</a>
//     <!-- <button id="restart" href="index.html">Restart</button> -->
//     <h3>Best Score: <span id="best-score">&mdash;</span></h2>
//     <h3>Score: <span id="current-score">&mdash;</span></h2>
//     <div id="game">
//     </div>
//     <script src="scriptComplex.js"></script>
//   </body>
// </html>


const gameContainer = document.getElementById("game");
// let numCards = cards.length;
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let currentScore = 0;
let lowScore = localStorage.getItem("lowest-score");
// let startButton = document.getElementById("start");

let noClicking = false;

if (lowScore) {
  document.getElementById("best-score").innerText = lowScore;
}

let startBtn = document.getElementById("start-button")
startBtn.addEventListener("click", startGame);

function startGame()  {
//  setScore(0)
  createDivsForColors(shuffledColors);

}

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow",
  "yellow",
];


function shuffle(array) {
  let arrayCopy = array.slice();
  for (let idx1 = arrayCopy.length - 1; idx1 > 0; idx1--) {
    // generate a random index between 0 and idx1 (inclusive)
    let idx2 = Math.floor(Math.random() * (idx1 + 1));

    // swap elements at idx1 and idx2
    let temp = arrayCopy[idx1];
    arrayCopy[idx1] = arrayCopy[idx2];
    arrayCopy[idx2] = temp;
  }
  return arrayCopy;
}


let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(e) {
  // you can use event.target to see which element was clicked
  if (noClicking) return;
  if (e.target.classList.contains('flipped')) return;
  

  let currentCard = e.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!card1 || !card2 ) {
    currentCard.classList.add('flipped');
    setScore(currentScore + 1);
    if (!card1) {
      card1 = currentCard
    } else {card2 = currentCard
    }
  }

  function setScore(newScore) {
    currentScore = newScore;
    document.getElementById("current-score").innerText = currentScore
  }

  if (card1 && card2) {
    noClicking = true;
    let gif1 = card1.className;
    let gif2 = card2.className;

    if(gif1 === gif2) {
      cardsFlipped += 2
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      noClicking = false;
    } else {
      setTimeout(function() {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000);
    }
  }

  if(cardsFlipped === COLORS.length) {
    let lowScore = localStorage.getItem("lowest-score") || Infinity;
    if (currentScore < lowScore) {
      localStorage.setItem("lowest-score", currentScore);
    }
    alert ("You won!")
  }
}

// when the DOM loads
// createDivsForColors(shuffledColors);

/* */

