import "./Block.css";

const Block = ({ id, clickHandler, block, winner }) => {
  return (
    <div
      id={id}
      className={`block  ${!block && "block__shadow block_hoverEffect"}`}
      onClick={block ? undefined : winner ? undefined : clickHandler}
    >
      {block ? block : "X"}
    </div>
  );
};

export default Block;
