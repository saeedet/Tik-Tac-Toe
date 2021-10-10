import React from "react";

const Footer = ({ gameLevel, setGameLevel, resetHandler, winner }) => {
  const levelClickHandler = (level) => {
    resetHandler();
    setGameLevel(level);
  };

  return (
    <div className="footer">
      <div
        className={`footer__regular ${!gameLevel && "footer__regular__active"}`}
        onClick={() => levelClickHandler(false)}
      >
        Medium
      </div>
      <div
        className={`footer__advanced ${
          gameLevel && "footer__advanced__active"
        }`}
        onClick={() => levelClickHandler(true)}
      >
        Hard
      </div>
    </div>
  );
};

export default Footer;
