let computerChoice = "0";
let dictionary = {
  rock: "0",
  scissor: "-142px",
  paper: "-243px"
};

let dictionary2 = {
  "0": "rock",
  "-142px": "scissor",
  "-243px": "paper"
};

var interval;

const intervalMaker = () => {
  interval = setInterval(function() {
    if (computerChoice === dictionary.rock) {
      computerChoice = dictionary.scissor;
    } else if (computerChoice === dictionary.scissor) {
      computerChoice = dictionary.paper;
    } else {
      computerChoice = dictionary.rock;
    }
    document.querySelector("#computer").style.background =
      "url(https://en.pimg.jp/023/182/267/1/23182267.jpg) " +
      computerChoice +
      " 0";
  }, 100);
  //console.log(interval)
};

intervalMaker();

let scoreBoard = {
  "rock": 1,
  "scissor": 0,
  "paper": -1
};

document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    clearInterval(interval);
    setInterval(() => {
      intervalMaker();
    }, 1000);
    //console.log(e.target.textContent);
    let myChoice = e.target.textContent.toLowerCase();
    //console.log(myChoice);
    let myScore = scoreBoard[myChoice];
    let computerScore = scoreBoard[dictionary2[computerChoice]];
    let difference = myChoice - computerScore;
    console.log(myScore, computerScore);
    if (difference === 0) {
      console.log('draw')
    }
    else if([-1,2].includes(difference)){
      console.log('you win')
    }
    else{
      console.log('you lose');
    }
    //onsole.log(myChoice, dictionary2[computerChoice]);
  });
});
