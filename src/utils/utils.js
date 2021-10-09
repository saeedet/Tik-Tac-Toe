const winCombinations = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [3, 4, 5],
  [6, 7, 8],
  [2, 5, 8],
  [1, 4, 7],
  [2, 4, 6],
];

export const winCheck = (arr) => {
  const currentWinCombos = winCombinations.filter(
    (combination) =>
      arr[combination[0]] === arr[combination[1]] &&
      arr[combination[2]] === arr[combination[1]] &&
      arr[combination[0]] !== null
  );

  return currentWinCombos;
};

export const computerMove = (arr) => {
  let index;

  const winPotentials = winCombinations.filter((combination) => {
    if (
      arr[combination[0]] === arr[combination[2]] ||
      arr[combination[0]] === arr[combination[1]] ||
      arr[combination[2]] === arr[combination[1]]
    ) {
      let nullCount = 0;
      for (let i = 0; i < combination.length; i++) {
        if (arr[combination[i]] === null) {
          nullCount++;
        }
      }
      if (nullCount === 1) {
        return true;
      }
      return false;
    } else {
      return false;
    }
  });
  if (winPotentials.length) {
    if (winPotentials.length > 1) {
      let oCount = 0;
      winPotentials.forEach((thisWin) => {
        for (let i = 0; i < thisWin.length; i++) {
          if (arr[thisWin[i]] === "O") {
            oCount++;
          }
        }
        if (oCount === 2) {
          thisWin.forEach((i) => {
            if (arr[i] === null) {
              index = i;
            }
          });
        }
      });
      if (oCount === 0) {
        winPotentials[0].forEach((i) => {
          if (arr[i] === null) {
            index = i;
          }
        });
      }
    } else {
      winPotentials[0].forEach((i) => {
        if (arr[i] === null) {
          index = i;
        }
      });
    }
  } else {
    if (arr[4] === null) {
      index = 4;
    } else {
      const nextMove = winCombinations.filter(
        (combination) =>
          arr[combination[0]] === arr[combination[2]] &&
          arr[combination[2]] === arr[combination[1]] &&
          arr[combination[0]] === null
      );
      if (nextMove.length) {
        index = nextMove[0][0];
      } else {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] === null) {
            index = i;
            break;
          }
        }
      }
    }
  }

  const newArray = Array.from(arr);
  newArray[index] = "O";
  return newArray;
};
