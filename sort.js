const btn = document.querySelector("#btn");
const textBox = document.querySelector("#textBox");

const handleClick = e => {
  let cmp = textBox.value;
  cmp = cmp.split("").map(idx => parseInt(idx));

  const swap = (i, j) => {
    let tmp = cmp[i];
    cmp[i] = cmp[j];
    cmp[j] = tmp;
  };

  const partition = (start, end) => {
    let cmpNum = cmp[end - 1];

    let i = -1;
    for (let j = 0; j < end - 1; j++) {
      if (cmp[j] < cmpNum) {
        i = i + 1;
        swap(i, j);
      }
    }
    swap(i + 1, end - 1);
    return i + 1;
  };

  const quicksort = (start, end) => {
    if (start < end) {
      let mid = partition(start, end);
      quicksort(start, mid - 1);
      quicksort(mid + 1, end);
    }
  };
  quicksort(0, cmp.length);
  console.log(cmp);
};

const init = () => {
  btn.addEventListener("click", handleClick);
};

init();
