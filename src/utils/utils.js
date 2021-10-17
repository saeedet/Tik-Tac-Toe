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
const twoWayCorners = [
  [1, 0, 3],
  [1, 2, 5],
  [5, 8, 7],
  [3, 6, 7],
];
const middleWinCombos = [
  [3, 4, 5],
  [1, 4, 7],
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

  // Check for Immediate win or lose
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
    // logic for computer win check
    for (let i = 0; i < winPotentials.length; i++) {
      for (let j = 0; j < winPotentials[i].length; j++) {
        if (arr[winPotentials[i][j]] === "O") {
          for (let k = 0; k < winPotentials[i].length; k++) {
            if (arr[winPotentials[i][k]] === null) {
              index = winPotentials[i][k];
              console.log(index);
              const newArray = Array.from(arr);
              newArray[index] = "O";
              return newArray;
            }
          }
        }
      }
    }
    // if it's not returned yet, it is a 2way lose anyway
    for (let i = 0; i < winPotentials[0].length; i++) {
      if (arr[winPotentials[0][i]] === null) {
        index = winPotentials[0][i];
        const newArray = Array.from(arr);
        newArray[index] = "O";
        return newArray;
      }
    }
  } else {
    //take the middle
    if (arr[4] === null) {
      const newArray = Array.from(arr);
      newArray[4] = "O";
      return newArray;
    }
    // Hard mode move
    if (gameLevel) {
      // check the middle
      if (arr[4] === "O") {
        // check 2way corners
        for (let i = 0; i < twoWayCorners.length; i++) {
          if (
            arr[twoWayCorners[i][0]] === "X" &&
            arr[twoWayCorners[i][2]] === "X" &&
            arr[twoWayCorners[i][1]] === null
          ) {
            index = twoWayCorners[i][1];
            const newArray = Array.from(arr);
            newArray[index] = "O";
            return newArray;
          }
        }
        // if it is not returned yet then go for middle wins
        for (let i = 0; i < middleWinCombos.length; i++) {
          if (
            arr[middleWinCombos[i][0]] === null &&
            arr[middleWinCombos[i][2]] === null
          ) {
            index = middleWinCombos[i][0];
            const newArray = Array.from(arr);
            newArray[index] = "O";
            return newArray;
          }
        }
      }
      if (arr[4] === "X") {
        // go for corners
        for (let i = 0; i < corners.length; i++) {
          if (arr[corners[i]] === null) {
            index = corners[i];
            const newArray = Array.from(arr);
            newArray[index] = "O";
            return newArray;
          }
        }
      }
    }

    // General move
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === null) {
        const newArray = Array.from(arr);
        newArray[i] = "O";
        return newArray;
      }
    }
  }
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
