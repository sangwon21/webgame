let rival = {
  Hero: document.getElementById("rival-hero"),
  Deck: document.getElementById("rival-deck"),
  Field: document.getElementById("rival-cards"),
  Cost: document.getElementById("rival-cost"),
  DeckData: [],
  HeroData: [],
  FieldData: []
};

let my = {
  Hero: document.getElementById("my-hero"),
  Deck: document.getElementById("my-deck"),
  Field: document.getElementById("my-cards"),
  Cost: document.getElementById("my-cost"),
  DeckData: [],
  HeroData: [],
  FieldData: []
};
let turn = true;
let turnBtn = document.getElementById("turn-btn");

const deckToField = (data, myTurn) => {
  let obj = myTurn ? my : rival;
  let currentCost = Number(obj.Cost.textContent);
  if (data.cost > currentCost) {
    return true;
  }
  //console.log(currentCost);

  let idx = obj.DeckData.indexOf(data);
  obj.DeckData.splice(idx, 1);
  obj.FieldData.push(data);
  obj.Deck.innerHTML = "";
  obj.Field.innerHTML = "";
  obj.FieldData.forEach(data => {
    connectCardToDom(data, obj.Field);
  });
  obj.DeckData.forEach(data => {
    connectCardToDom(data, obj.Deck);
  });
  obj.Cost.textContent = currentCost - data.cost;
  data.field = true;
};

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
      if (!data.mine) {
        return;
      }
      if (data.field) {
        card.classList.toggle("card-selected");
      } else if (!deckToField(data, true)) {
        createMyDeck(1);
      }
    } else {
      if (data.mine || data.field) {
        return;
      }
      if (!deckToField(data, false)) {
        createRivalDeck(1);
      }
    }
  });
  dom.appendChild(card);
};

const createRivalDeck = num => {
  for (let i = 0; i < num; i++) {
    rival.DeckData.push(createCard());
  }
  rival.Deck.innerHTML = "";
  rival.DeckData.forEach(data => {
    connectCardToDom(data, rival.Deck);
  });
};

const createMyDeck = num => {
  for (let i = 0; i < num; i++) {
    my.DeckData.push(createCard(false, true));
  }
  my.Deck.innerHTML = "";
  my.DeckData.forEach(data => {
    connectCardToDom(data, my.Deck);
  });
};

const createRivalHero = () => {
  rival.HeroData = createCard(true, true);
  connectCardToDom(rival.HeroData, rival.Hero, true);
};

const createMyHero = () => {
  my.HeroData = createCard(true);
  connectCardToDom(my.HeroData, my.Hero, true);
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

turnBtn.addEventListener("click", () => {
  turn = !turn;
  if (turn) {
    my.Cost.textContent = 10;
  } else {
    rival.Cost.textContent = 10;
  }
  document.getElementById("rival").classList.toggle("turn");
  document.getElementById("my").classList.toggle("turn");
});

initialize();
