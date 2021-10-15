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
const corners = [0, 2, 6, 8];
const middleConers = [1, 3, 5, 7];
const twoWayCorners = [
  [1, 0, 3],
  [1, 2, 5],
  [5, 8, 7],
  [3, 6, 7],
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

export const computerMove = (arr, gameLevel) => {
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
              oCount = 0;
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
      let xCorners = 0;
      for (let i = 0; i < corners.length; i++) {
        if (arr[corners[i]] === "X") {
          xCorners++;
        }
      }

      if (
        (xCorners > 1 && gameLevel) ||
        (xCorners === 1 && arr[4] === "O" && gameLevel)
      ) {
        //take the middle which is empty yet
        for (let i = 0; i < middleConers.length; i++) {
          if (arr[middleConers[i]] === null) {
            index = middleConers[i];
            xCorners = 0;
            break;
          }
        }
      } else if (xCorners === 1 && arr[4] === "X" && gameLevel) {
        for (let i = 0; i < corners.length; i++) {
          if (arr[corners[i]] === null) {
            index = corners[i];
            break;
          }
        }
      } else {
        if (gameLevel) {
          for (let i = 0; i < twoWayCorners.length; i++) {
            if (
              arr[twoWayCorners[i][0]] === "X" &&
              arr[twoWayCorners[i][2]] === "X" &&
              arr[twoWayCorners[i][1]] === null
            ) {
              index = twoWayCorners[i][1];
              break;
            }
          }
        }
        if (!index) {
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
    }
  }

  const newArray = Array.from(arr);
  newArray[index] = "O";
  return newArray;
};

export const drawCheck = (gameArray, winner) => {
  let nullCount = 0;
  gameArray.forEach((i) => {
    if (i === null) {
      nullCount++;
    }
  });

  if (!nullCount && !winner) {
    return true;
  } else {
    return false;
  }
};

export const winnerPositionCheck = (arr, index) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === index) {
        return true;
      }
    }
  }
  return false;
};
