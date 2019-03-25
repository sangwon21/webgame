let hor = 4;
let ver = 3;

let colorCandidates = [
  "red",
  "red",
  "orange",
  "orange",
  "yellow",
  "yellow",
  "green",
  "green",
  "white",
  "white",
  "pink",
  "pink"
];
let colors = [];
let savedColors = colorCandidates.slice();

const shuffle = () => {
  for (let i = 0; colorCandidates.length > 0; i++) {
    colors = colors.concat(
      colorCandidates.splice(
        Math.floor(Math.random() * colorCandidates.length),
        1
      )
    );
  }
  console.log(colors);
};

let clickedCards = [];
let completedCards = [];
let startTime;

//console.log(colorCandidates);
const setting = () => {
  let clickFlag = false;
  for (let i = 0; i < hor * ver; i++) {
    let card = document.createElement("div");
    card.classList = "card";
    let cardInner = document.createElement("div");
    cardInner.classList = "card-inner";
    let cardFront = document.createElement("div");
    cardFront.classList = "card-front";
    let cardBack = document.createElement("div");
    cardBack.classList = "card-back";
    cardBack.style.backgroundColor = colors[i];

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    (c => {
      c.addEventListener("click", () => {
        if (clickFlag && !completedCards.includes(c)) {
          c.classList.toggle("flipped");
          clickedCards.push(c);
          //console.log(clickedCards);
          if (clickedCards.length === 2) {
            if (
              clickedCards[0].querySelector(".card-back").style
                .backgroundColor ===
              clickedCards[1].querySelector(".card-back").style.backgroundColor
            ) {
              completedCards.push(clickedCards[0]);
              completedCards.push(clickedCards[1]);
              clickedCards = [];
              if (completedCards.length === hor * ver) {
                let endTime = new Date();
                alert("congratulation!" + (startTime - endTime) / 1000);
                document.querySelector("#wrapper").innerHTML = "";
                colorCandidates = savedColors.slice();
                colors = [];
                completedCards = [];
                startTime = null;
                shuffle();
                setting();
              }
            } else {
              clickFlag = false;
              setTimeout(() => {
                clickedCards[0].classList.remove("flipped");
                clickedCards[1].classList.remove("flipped");
                clickedCards = [];
                clickFlag = true;
              }, 1000);
            }
          }
        }
      });
    })(card);
    document.querySelector("#wrapper").appendChild(card);
  }

  document.querySelectorAll(".card").forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("flipped");
    }, 1000 + 100 * index);
  });

  document.querySelectorAll(".card").forEach((card, index) => {
    setTimeout(() => {
      card.classList.remove("flipped");
      clickFlag = true;
      startTime = new Date();
    }, 5000);
  });
};
shuffle();
setting();
