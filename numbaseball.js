let body = document.body;

let candidateNum;
let arrayNum;

const pickingNum = () => {
  candidateNum = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  arrayNum = [];

  for (let i = 0; i < 4; i++) {
    let picked = candidateNum.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    console.log("picked"+picked);
    arrayNum.push(picked);
  }
};

pickingNum();
console.log(arrayNum);

let result = document.createElement("h1");
body.append(result);
let form = document.createElement("form");
document.body.append(form);
let input = document.createElement("input");
input.type = "number";
input.maxLength = 5;
form.append(input);
let button = document.createElement("button");
button.textContent = "submit";
form.append(button);

let wrongTimes = 0;

form.addEventListener("submit", e => {
  e.preventDefault();
  let answer = input.value;
  if (answer === arrayNum.join("")) {
    result.textContent = "Homerun";
    input.value = "";
    input.focus();
    pickingNum();
    wrongTimes = 0;
  } else {
    let ansNum = answer.split("");
    let strike = 0;
    let ball = 0;
    wrongTimes += 1;
    if (wrongTimes > 10) {
      result.textContent =
        "10번 넘게 틀려서 실패! 답은" + arrayNum.join(",") + "였습니다!";
      result.value = "";
      result.focus();
      pickingNum();
      wrongTimes = 0;
    } else {
      console.log("답이 틀리면", arrayNum);
      for (var i = 0; i < 3; i++) {
        if (Number(ansNum[i]) === arrayNum[i]) {
          strike += 1;
        } else if (arrayNum.indexOf(Number(ansNum[i])) > -1) {
          ball += 1;
        }
      }
      result.textContent = strike + "Strikes" + ball + "balls";
      input.value = "";
      input.focus();
    }
  }
});
