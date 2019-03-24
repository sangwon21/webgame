let tbody = document.querySelector("#table tbody");
let dataSet = [];

document.querySelector("#exec").addEventListener("click", () => {
  tbody.innerHTML = "";
  let hor = parseInt(document.querySelector("#hor").value);
  let ver = parseInt(document.querySelector("#ver").value);
  let mine = parseInt(document.querySelector("#mine").value);

  // Picking bombs location

  let candidate = Array(hor * ver)
    .fill()
    .map((_, idx) => idx);

  let shuffle = [];

  while (candidate.length > 80) {
    let pickedNum = candidate.splice(
      Math.floor(Math.random() * candidate.length),
      1
    )[0];
    shuffle.push(pickedNum);
  }

  //console.log("shuffle:");
  //console.log(shuffle);

  for (let i = 0; i < ver; i++) {
    let arr = [];
    let tr = document.createElement("tr");
    dataSet.push(arr);
    for (let j = 0; j < hor; j++) {
      let td = document.createElement("td");
      arr.push(0);
      td.addEventListener("contextmenu", e => {
        e.preventDefault();
        let parentTr = e.currentTarget.parentNode;
        let parentTbody = e.currentTarget.parentNode.parentNode;

        let kan = Array.prototype.indexOf.call(
          parentTr.children,
          e.currentTarget
        );
        let jul = Array.prototype.indexOf.call(parentTbody.children, parentTr);

        if (
          e.currentTarget.textContent === "" ||
          e.currentTarget.textContent === "X"
        ) {
          e.currentTarget.textContent = "!";
        } else if (e.currentTarget.textContent === "!") {
          e.currentTarget.textContent = "?";
        } else if (e.currentTarget.textContent === "?") {
          if (dataSet[jul][kan] === 1) {
            e.currentTarget.textContent = "";
          } else if (dataSet[jul][kan] === "X") {
            e.currentTarget.textContent = "X";
          }
        }
      });

      td.addEventListener("click", e => {
        let parentTr = e.currentTarget.parentNode;
        let parentTbody = e.currentTarget.parentNode.parentNode;
        let kan = Array.prototype.indexOf.call(
          parentTr.children,
          e.currentTarget
        );
        let jul = Array.prototype.indexOf.call(parentTbody.children, parentTr);
        e.currentTarget.classList.add("opened");

        if (dataSet[jul][kan] === "X") {
          e.currentTarget.textContent = "펑";
        } else {
          dataSet[jul][kan] = 1;
          let around = [dataSet[jul][kan - 1], dataSet[jul][kan + 1]];
          //console.log(dataSet[jul][kan - 1], dataSet[jul][kan + 1])
          if (dataSet[jul - 1]) {
            around = around.concat(
              dataSet[jul - 1][kan - 1],
              dataSet[jul - 1][kan],
              dataSet[jul - 1][kan + 1]
            );
          }
          if (dataSet[jul + 1]) {
            around = around.concat(
              dataSet[jul + 1][kan - 1],
              dataSet[jul + 1][kan],
              dataSet[jul + 1][kan + 1]
            );
          }
          let aroundBombNum = around.filter(element => {
            return element === "X";
          }).length;
          e.currentTarget.textContent = aroundBombNum;
          if (aroundBombNum === 0) {
            let aroundKan = [];
            if (tbody.children[jul - 1]) {
              aroundKan = aroundKan.concat([
                tbody.children[jul - 1].children[kan - 1],
                tbody.children[jul - 1].children[kan],
                tbody.children[jul - 1].children[kan + 1]
              ]);
            }

            aroundKan = aroundKan.concat([
              tbody.children[jul].children[kan - 1],

              tbody.children[jul].children[kan + 1]
            ]);

            if (tbody.children[jul + 1]) {
              aroundKan = aroundKan.concat([
                tbody.children[jul + 1].children[kan - 1],
                tbody.children[jul + 1].children[kan],
                tbody.children[jul + 1].children[kan + 1]
              ]);
            }
            //console.log(aroundKan);
            aroundKan
              .filter(v => !!v)
              .forEach(next => {
                let parentTr = next.parentNode;
                let parentTbody = next.parentNode.parentNode;
                let kan = Array.prototype.indexOf.call(parentTr.children, next);
                let jul = Array.prototype.indexOf.call(
                  parentTbody.children,
                  parentTr
                );
                console.log(jul, kan);
                if (dataSet[jul][kan] !== 1) {
                  next.click();
                }
              });
          }
          //console.log(around);
        }
      });

      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }

  for (let i = 0; i < shuffle.length; i++) {
    let vertical = Math.floor(shuffle[i] / 10);
    let horizon = shuffle[i] % 10;
    //console.log(vertical, horizon);
    tbody.children[vertical].children[horizon].textContent = "X";
    dataSet[vertical][horizon] = "X";
  }

  //console.log(dataSet);
});
