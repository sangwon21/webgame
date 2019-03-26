let rivalHero = document.getElementById("rival-hero");
let myHero = document.getElementById("my-hero");
let rivalDeck = document.getElementById("rival-deck");
let myDeck = document.getElementById("my-deck");
let rivalField = document.getElementById("rival-cards");
let myField = document.getElementById("my-cards");
let rivalCost = document.getElementById("rival-cost");
let myCost = document.getElementById("my-cost");

let rivalDeckData = [];
let myDeckData = [];
let myHeroData;
let rivalHeroData;

let rivalFieldData = [];
let myFieldData = [];
let turn = true;

const connectCardToDom = (data, dom, hero) => {
  let card = document.querySelector(".card-hidden .card").cloneNode(true);
  card.querySelector(".card-cost").textContent = data.cost;
  card.querySelector(".card-att").textContent = data.att;
  card.querySelector(".card-hp").textContent = data.hp;
  if (hero) {
    card.querySelector(".card-cost").style.display = "none";
    let name = document.createElement("div");
    name.textContent = "Hero";
    card.appendChild(name);
  }
  card.addEventListener("click", () => {
    if (turn) {
      let currentCost = Number(myCost);
      if (data.cost > currentCost) {
        return;
      }
      if (!data.mine) {
        return;
      }

      let idx = myDeckData.indexOf(data);
      myDeckData.splice(idx, 1);
      myFieldData.push(data);
      myDeck.innerHTML = "";
      myField.innerHTML = "";
      myFieldData.forEach(data => {
        connectCardToDom(data, myField);
      });
      myDeckData.forEach(data => {
        connectCardToDom(data, myDeck);
      });
      myCost.textContent = currentCost - data.cost;
    } else {
      let currentCost = Number(rivalCost);
      if (data.cost > currentCost) {
        return;
      }
      if (!data.mine) {
        return;
      }
      if (data.mine) return;
      let idx = rivalDeckData.indexOf(data);
      rivalDeckData.splice(idx, 1);
      rivalFieldData.push(data);
      rivalDeck.innerHTML = "";
      rivalField.innerHTML = "";
      rivalFieldData.forEach(data => {
        connectCardToDom(data, rivalField);
      });
      rivalDeckData.forEach(data => {
        connectCardToDom(data, rivalDeck);
      });
      rivalCost.textContent = currentCost - data.cost;
    }
  });
  dom.appendChild(card);
};

const createRivalDeck = num => {
  for (let i = 0; i < num; i++) {
    rivalDeckData.push(createCard());
  }
  rivalDeckData.forEach(data => {
    connectCardToDom(data, rivalDeck);
  });
};

const createMyDeck = num => {
  for (let i = 0; i < num; i++) {
    myDeckData.push(createCard(false, true));
  }
  myDeckData.forEach(data => {
    connectCardToDom(data, myDeck);
  });
};

const createRivalHero = () => {
  rivalHeroData = createCard(true, true);
  connectCardToDom(rivalHeroData, rivalHero, true);
};

const createMyHero = () => {
  myHeroData = createCard(true);
  connectCardToDom(myHeroData, myHero, true);
};

const initialize = () => {
  createRivalDeck(5);
  createMyDeck(5);
  createMyHero();
  createRivalHero();
};

function Card(hero, mycard) {
  if (hero) {
    this.att = Math.ceil(Math.random() * 2);
    this.hp = Math.ceil(Math.random() * 5) + 25;
    this.hero = true;
  } else {
    this.att = Math.ceil(Math.random() * 5);
    this.hp = Math.ceil(Math.random() * 5);
    this.cost = Math.floor(this.att + this.hp) / 2;
  }
  if (mycard) {
    this.mine = true;
  }
}

const createCard = (hero, mycard) => {
  return new Card(hero, mycard);
};

initialize();
