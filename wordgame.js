var body = document.body;
var word = document.createElement("div");

word.textContent = "시작";
document.body.append(word);

let form = document.createElement("form");
document.body.append(form);

let input = document.createElement("input");
form.append(input);

let button = document.createElement("button");
button.textContent = "Submit";
form.append(button);

let result = document.createElement("div");
document.body.append(result);

form.addEventListener("submit", e => {
  e.preventDefault();
  if (word.textContent[word.textContent.length - 1] === input.value[0]) {
    result.textContent = "Right";
    word.textContent = input.value;
    input.value = "";
    input.focus();
  } else {
    result.textContent = "Wrong";
    input.value = "";
    input.focus();
  }
});
