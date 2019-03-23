document.querySelector("#exec").addEventListener("click", () => {
  let hor = parseInt(document.querySelector("#hor").value);
  let ver = parseInt(document.querySelector("#ver").value);
  let mine = parseInt(document.querySelector("#mine").value);

  let dataSet=[];
  let tbody = document.querySelector("#table tbody");

  for(let i = 0; i < ver; i++){
      let arr = [];
      let tr = document.createElement("tr");
      dataSet.push(arr);
      for(let j = 0; j < hor; j++){
          let td = document.createElement("td");
          arr.push(1);
          tr.appendChild(td);
          td.textContent = "1";
      }
      tbody.appendChild(tr);
  }
});
