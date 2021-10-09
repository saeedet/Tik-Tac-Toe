import { useState } from "react";
import Block from "./components/Block";
import "./App.css";
import "animate.css";
import { computerMove, winCheck } from "./utils/utils";
import { useEffect } from "react/cjs/react.development";

function App() {
  const [gameArray, setGameArray] = useState(() =>
    Array.from(Array(9), () => null)
  );
  const [won, setWon] = useState(false);
  const [winner, setWinner] = useState(false);
  const [draw, setDraw] = useState(false);

  // useEffect(() => {
  //   let nullCount = 0;
  //   gameArray.forEach((i) => {
  //     if (i === null) {
  //       nullCount++;
  //     }
  //   });
  //   if (!nullCount && !winner) {
  //     setDraw(true);
  //   }
  // }, [gameArray, winner]);

  const clickHandler = (e) => {
    const clickedIndex = e.target.id;
    const newGameArray = Array.from(gameArray);
    newGameArray[clickedIndex] = "X";
    setGameArray(newGameArray);
    const winCombinations = winCheck(newGameArray);

    if (winCombinations.length) {
      setWinner(true);
      setWon(true);
    } else {
      setTimeout(() => {
        const computerGameArray = computerMove(newGameArray);
        setGameArray(computerGameArray);
        if (winCheck(computerGameArray).length) {
          setWinner(true);
        }
      }, 350);
    }
  };

  const resetHandler = () => {
    setGameArray(Array.from(Array(9), () => null));
    setWinner(false);
    setWon(false);
    setDraw(false);
  };

  return (
    <div className="App">
      <header className="App__header">
        <div
          className="App__header__result"
          style={{ display: winner ? "flex" : draw ? "flex" : "none" }}
        >
          {draw ? "Draw!" : `You ${won ? "Won" : "Lost"}!`}
        </div>
        <div
          className="App__header__title"
          style={{ display: winner ? "none" : draw ? "none" : "flex" }}
        >
          Beat me if you can!
        </div>
        <div
          className="App__header__button"
          style={{ display: winner ? "flex" : draw ? "flex" : "none" }}
        >
          <div className="btn" onClick={resetHandler}>
            play again
          </div>
        </div>
      </header>
      <div className="container">
        {gameArray?.map((block, index) => (
          <Block
            winner={winner}
            block={block}
            key={index}
            id={index}
            clickHandler={clickHandler}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
