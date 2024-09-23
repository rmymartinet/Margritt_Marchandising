import React, { useState } from "react";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import "./QuantitySelector.scss";

const QuantitySelector = ({
  quantity,
  setQuantity,
  onAdd,
  onRemove,
  maxQuantity,
  isActualQuantityGreaterThanStock,
  maxValue,
}) => {
  const [intervalId, setIntervalId] = useState(null);

  const handleMouseDown = (type) => {
    let id = setInterval(() => {
      if (type === "add") {
        const newQuantity = onAdd();
        setQuantity(newQuantity);
        if (newQuantity >= maxQuantity || maxValue) {
          clearInterval(id);
        }
      } else if (type === "remove" && quantity > 1) {
        onRemove();
      }
    }, 200);

    setIntervalId(id);
  };

  const handleMouseUp = () => {
    clearInterval(intervalId);
  };

  const handleMouseLeave = () => {
    clearInterval(intervalId);
  };

  return (
    <div className="quantity-container">
      <div className="quantity-content">
        {isActualQuantityGreaterThanStock ? (
          <IoIosRemoveCircle
            className="disabled"
            size={25}
            color="gray"
            onMouseDown={() => handleMouseDown("remove")}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onClick={onRemove}
          />
        ) : (
          <IoIosRemoveCircle
            className="remove-icon"
            size={25}
            onMouseDown={() => handleMouseDown("remove")}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onClick={onRemove}
          />
        )}
        <input
          type="number"
          onChange={(e) => setQuantity(Number(e.target.value))}
          value={isActualQuantityGreaterThanStock ? 0 : quantity}
          min="1"
          readOnly
        />

        {isActualQuantityGreaterThanStock ? (
          <IoIosAddCircle
            className="disabled"
            size={25}
            color="gray"
            onMouseDown={() => handleMouseDown("add")}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onClick={onAdd}
          />
        ) : (
          <IoIosAddCircle
            className="add-icon"
            size={25}
            onMouseDown={() => handleMouseDown("add")}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onClick={onAdd}
          />
        )}
      </div>
    </div>
  );
};

export default QuantitySelector;
