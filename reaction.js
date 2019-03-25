let screen = document.querySelector("#screen");
let records = [];
let startTime = new Date();
let inter;

screen.addEventListener("click", () => {
  if (screen.classList.contains("waiting")) {
    screen.classList.remove("waiting");
    screen.classList.add("ready");
    screen.textContent = "초록색이 되면 클릭하세요";
    inter = setTimeout(() => {
      startTime = new Date();
      screen.click();
    }, Math.random() * 1000 + 3000);
  } else if (screen.classList.contains("ready")) {
    if (!startTime) {
      clearInterval(inter);
      console.log('h')
      screen.classList.remove("ready");
      screen.classList.add("waiting");
      screen.textContent = "기다려주세요";
    } else {
      screen.classList.remove("ready");
      screen.classList.add("now");
      screen.textContent = "클릭하세요";
    }
  } else if (screen.classList.contains("now")) {
    let clickTime = new Date();
    records.push(clickTime - startTime);

    clickTime = null;
    startTime = null;
    screen.classList.remove("now");
    screen.classList.add("waiting");
    screen.textContent = "클릭해서 시작하세요";
  }
});
