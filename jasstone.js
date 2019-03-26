let rivalHero = document.getElementById("rival-hero");
let myHero = document.getElementById("my-hero");
let rivalDeck = document.getElementById("rival-deck");
let myDeck = document.getElementById("my-deck");

let rivalDeckData = [];
let myDeckData = [];
let myHeroData;
let rivalHeroData;

const createRivalDeck = num => {
  for (let i = 0; i < num; i++) {
    rivalDeckData.push(createCard());
  }
  rivalDeckData.forEach(data => {
    let card = document.querySelector(".card-hidden .card").cloneNode(true);
    card.querySelector(".card-cost").textContent = data.cost;
    card.querySelector(".card-att").textContent = data.att;
    card.querySelector(".card-hp").textContent = data.hp;
    rivalDeck.appendChild(card);
  });
};

const createMyDeck = num => {
  for (let i = 0; i < num; i++) {
    myDeckData.push(createCard());
  }
  myDeckData.forEach(data => {
    let card = document.querySelector(".card-hidden .card").cloneNode(true);
    card.querySelector(".card-cost").textContent = data.cost;
    card.querySelector(".card-att").textContent = data.att;
    card.querySelector(".card-hp").textContent = data.hp;
    myDeck.appendChild(card);
  });
};

const createRivalHero = () => {
  rivalHeroData = createCard("hero");
  let card = document.querySelector(".card-hidden .card").cloneNode(true);
  card.querySelector(".card-cost").textContent = rivalHeroData.cost;
  card.querySelector(".card-att").textContent = rivalHeroData.att;
  card.querySelector(".card-hp").textContent = rivalHeroData.hp;
  rivalHero.append(card);
};

const createMyHero = () => {
  myHeroData = createCard("hero");
  let card = document.querySelector(".card-hidden .card").cloneNode(true);
  card.querySelector(".card-cost").textContent = myHeroData.cost;
  card.querySelector(".card-att").textContent = myHeroData.att;
  card.querySelector(".card-hp").textContent = myHeroData.hp;
  myHero.append(card);
};

const initialize = () => {
  createRivalDeck(5);
  createMyDeck(5);
  createMyHero();
  createRivalHero();
};

function Card(hero) {
  if (hero) {
    this.att = Math.ceil(Math.random() * 2);
    this.hp = Math.ceil(Math.random() * 5) + 25;
  } else {
    this.att = Math.ceil(Math.random() * 5);
    this.hp = Math.ceil(Math.random() * 5);
    this.cost = Math.floor(this.att + this.hp) / 2;
  }
}

const createCard = hero => {
  return new Card(hero);
};

initialize();
