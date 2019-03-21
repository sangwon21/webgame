let candidateNums = Array(45)
  .fill()
  .map((element, idx) => idx + 1);

let shuffle = [];

while (candidateNums.length > 0) {
  let movedNum = candidateNums.splice(
    Math.floor(Math.random() * candidateNums.length),
    1
  )[0];
  shuffle.push(movedNum);
}

let bonus = shuffle[shuffle.length - 1];
let pickedNum = shuffle.slice(0, 6);

let result = document.getElementById("result");

for (let i = 0; i < pickedNum.length; i++) {
  let ball = document.createElement("div");
  ball.className='ball'
  ball.textContent = pickedNum[i];
  result.appendChild(ball);
}

let bonusBox = document.getElementsByClassName("bonus")[0];
let bonusBall = document.createElement("div");
bonusBall.textContent = bonus;
bonusBox.appendChild(bonusBall);
