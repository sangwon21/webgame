let tbody = document.querySelector("#table tbody");
let dataSet = [];

document.querySelector("#exec").addEventListener("click", () => {
  let hor = parseInt(document.querySelector("#hor").value);
  let ver = parseInt(document.querySelector("#ver").value);
  let mine = parseInt(document.querySelector("#mine").value);

  // Picking bombs location

  let candidate = Array(hor * ver)
    .fill()
    .map((_, idx) => idx + 1);

  let shuffle = [];

  while (candidate.length > 80) {
    let pickedNum = candidate.splice(
      Math.floor(Math.random() * candidate.length),
      1
    )[0];
    shuffle.push(pickedNum);
  }

  console.log("shuffle:");
  console.log(shuffle);

  for (let i = 0; i < ver; i++) {
    let arr = [];
    let tr = document.createElement("tr");
    dataSet.push(arr);
    for (let j = 0; j < hor; j++) {
      let td = document.createElement("td");

      td.addEventListener("contextmenu", e => {
        e.preventDefault();
        let parentTr = e.currentTarget.parentNode;
        let parentTbody = e.currentTarget.parentNode.parentNode;

        let kan = Array.prototype.indexOf.call(
          parentTr.children,
          e.currentTarget
        );
        let jul = Array.prototype.indexOf.call(parentTbody.children, parentTr);

        e.currentTarget.textContent = "!";
        dataSet[jul][kan] = "!";
        console.log(dataSet);
      });

      arr.push(1);
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }

  for (let i = 0; i < shuffle.length; i++) {
    let vertical = Math.floor(shuffle[i] / 10);
    let horizon = shuffle[i] % 10;
    console.log(vertical, horizon);
    tbody.children[vertical].children[horizon].textContent = "X";
    dataSet[vertical][horizon] = "X";
  }

  console.log(dataSet);
});
