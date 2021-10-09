import { useState } from "react";
import Block from "./components/Block";
import "./App.css";
import "animate.css";
import {
  computerMove,
  winCheck,
  drawCheck,
  winnerPositionCheck,
} from "./utils/utils";
import Header from "./components/Header";

function App() {
  const [gameArray, setGameArray] = useState(() =>
    Array.from(Array(9), () => null)
  );
  const [won, setWon] = useState(false);
  const [winner, setWinner] = useState("");
  const [draw, setDraw] = useState(false);
  const [gameLevel, setGameLevel] = useState(false);
  const [winArray, setWinArray] = useState([]);

  const clickHandler = (e) => {
    const clickedIndex = e.target.id;
    const newGameArray = Array.from(gameArray);
    newGameArray[clickedIndex] = "X";
    setGameArray(newGameArray);
    setDraw(drawCheck(newGameArray, winner));

    const winCombinations = winCheck(newGameArray);

    if (winCombinations.length) {
      setWinArray(winCombinations);
      setWinner(newGameArray[winCombinations[0][0]]);
      setWon(true);
    } else {
      setTimeout(() => {
        const computerGameArray = computerMove(newGameArray, gameLevel);
        setGameArray(computerGameArray);
        const computerWinCheck = winCheck(computerGameArray);

        if (computerWinCheck.length) {
          console.log(computerWinCheck);
          setWinArray(computerWinCheck);
          setWinner(computerGameArray[computerWinCheck[0][0]]);
        }
      }, 350);
    }
  };

  const resetHandler = () => {
    setGameArray(Array.from(Array(9), () => null));
    setWinner("");
    setWon(false);
    setDraw(false);
    setWinArray([]);
  };

  return (
    <div className="App">
      <Header
        gameLevel={gameLevel}
        winner={winner}
        won={won}
        draw={draw}
        resetHandler={resetHandler}
      />
      <div className="container">
        {gameArray?.map((block, index) => {
          let winPosition = false;
          if (winner) {
            winPosition = winnerPositionCheck(winArray, index);
          }
          return (
            <Block
              winPosition={winPosition}
              winner={winner}
              block={block}
              key={index}
              id={index}
              clickHandler={clickHandler}
            />
          );
        })}
      </div>
      <div className="footer">
        <div
          className={`footer__regular ${
            !gameLevel && "footer__regular__active"
          }`}
          onClick={() => setGameLevel(false)}
        >
          Medium
        </div>
        <div
          className={`footer__advanced ${
            gameLevel && "footer__advanced__active"
          }`}
          onClick={() => setGameLevel(true)}
        >
          Hard
        </div>
      </div>
    </div>
  );
}

export default App;
