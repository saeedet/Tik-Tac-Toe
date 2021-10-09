import "./Block.css";

const Block = ({ id, clickHandler, block, winner, winPosition }) => {
  return (
    <div
      id={id}
      className={`block  ${!block && "block__shadow block_hoverEffect"} ${
        winPosition && `user${winner}`
      }`}
      onClick={block ? undefined : winner ? undefined : clickHandler}
    >
      {block ? block : "X"}
    </div>
  );
};

export default Block;
