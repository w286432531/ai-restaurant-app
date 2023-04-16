import React from "react";
import "./ItemOption.scss";
import currencyFormatter from "../../utility/formatter";
const ItemOption = ({ option, singleOption, index }) => {
  // console.log(option.option.optionName);
  const showOptionName = !singleOption;
  // console.log(showOptionName);
  return (
    <>
      <input
        className="form-check-input"
        type="radio"
        value={option.id}
        name="optionId"
        defaultChecked={index === 0}
        price={option.price}
      />
      <label className="form-check-label text-capitalize" htmlFor={option.id}>
        {showOptionName && option.option.optionName}{" "}
        {currencyFormatter(option.price)}
      </label>
    </>
  );
};
export default ItemOption;
