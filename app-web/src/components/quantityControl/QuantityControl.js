import React from 'react'
import MinusIcon from '../icons/MinusIcon';
import PlusIcon from '../icons/PlusIcon';
const QuantityControl = ({ minusQuantity, changeQuantity, addQuantity,quantity, itemOptionId = -1}) => {
    const paramHelper = (e, func, itemOptionId) => {
      if (itemOptionId === -1) {
        func(e);
      } else {
        func(e, itemOptionId);
      }
    };
  return (
    <>
      <span
        className="input-group-text btn btn-sm btn-secondary"
        onClick={(e) => paramHelper(e, minusQuantity, itemOptionId)}
      >
        <MinusIcon />
      </span>
      <input
        id="quantity-input"
        type="number"
        name="quantity"
        className="input-number"
        value={quantity}
        min="1"
        max="10"
        onChange={(e) => paramHelper(e, changeQuantity, itemOptionId)}
      />
      <span
        className="input-group-text btn btn-sm btn-secondary"
        onClick={(e) => paramHelper(e, addQuantity, itemOptionId)}
        // onClick={addQuantity}
      >
        <PlusIcon />
      </span>
    </>
  );
};

export default QuantityControl