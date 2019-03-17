let body = document.body;
let table = document.createElement("table");
let result = document.createElement("div");

let columns = [];
let rows = [];
let turn = "X";
const callback = e => {
  const row = rows.indexOf(e.target.parentNode);

  const column = columns[row].indexOf(e.target);

  if (columns[row][column].textContent !== "") {
    console.log("not empty space");
  } else {
    columns[row][column].textContent = turn;

    var fullFlag = false;

    if (
      columns[row][0].textContent === turn &&
      columns[row][1].textContent === turn &&
      columns[row][2].textContent === turn
    ) {
      console.log("가로줄");
      fullFlag = true;
    }

    if (
      columns[0][column].textContent === turn &&
      columns[1][column].textContent === turn &&
      columns[2][column].textContent === turn
    ) {
      console.log("세로줄");
      fullFlag = true;
    }
    if (row - column === 0) {
      if (
        columns[0][0].textContent === turn &&
        columns[1][1].textContent === turn &&
        columns[2][2].textContent === turn
      ) {
        console.log("대각선1");
        fullFlag = true;
      }
    }

    if (Math.abs(row - column) === 2) {
      if (
        columns[0][2].textContent === turn &&
        columns[1][1].textContent === turn &&
        columns[2][0].textContent === turn
      ) {
        console.log("대각선2");
        fullFlag = true;
      }
    }
  }
  console.log(`row: ${row}, column:${column}`);
  console.log(`fullFlag is ${fullFlag}`);
  if (fullFlag) {
    result.textContent = `${turn} won!!`;
    columns.forEach(column =>
      column.forEach(row => {
        row.textContent = "";
      })
    );
  } else {
    if (turn === "X") {
      turn = "O";
      console.log("turn change");
    } else turn = "X";
  }
};

for (i = 1; i <= 3; i++) {
  let row = document.createElement("tr");
  rows.push(row);
  columns.push([]);
  console.log(columns);
  for (let j = 1; j <= 3; j++) {
    let column = document.createElement("td");
    column.addEventListener("click", callback);
    columns[i - 1].push(column);
    row.appendChild(column);
  }
  table.appendChild(row);
}
body.appendChild(table);
body.appendChild(result);
//console.log(columns, rows);
