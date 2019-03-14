let body = document.body;
let table = document.createElement("table");

let columns = [];
let rows = [];
let turn = "X";
const callback = e => {
  const row = rows.indexOf(e.target.parentNode);

  const column = columns[row].indexOf(e.target);

  if (columns[row][column].textContent !== '') {
    console.log("empty space");
  } else {
    columns[row][column].textContent = turn;
    if (turn === "X") turn = "O";
    else turn = "X";
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
//console.log(columns, rows);
