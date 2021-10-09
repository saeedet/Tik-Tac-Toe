import React from "react";
import "./Header.css";

const Header = ({ winner, won, draw, resetHandler, gameLevel }) => {
  return (
    <header className="header">
      <div
        className="header__result"
        style={{ display: winner ? "flex" : draw ? "flex" : "none" }}
      >
        {draw ? "Draw! 😞" : `You ${won ? "Won! 😐" : "Lost! 😂"}`}
      </div>
      <div
        className="header__title"
        style={{ display: winner ? "none" : draw ? "none" : "flex" }}
      >
        {gameLevel ? "Beat me if you can! 😈" : "Lets play a Fun game! 😊"}
      </div>
      <div
        className="header__button"
        style={{ display: winner ? "flex" : draw ? "flex" : "none" }}
      >
        <div className="btn" onClick={resetHandler}>
          Lets play again
        </div>
      </div>
    </header>
  );
};

export default Header;
