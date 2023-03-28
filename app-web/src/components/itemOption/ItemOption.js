import React from "react";

const ItemOption = ({ option }) => {
  console.log(option.option.optionName);
  const showOptionName = option.option.optionName === "base";
  console.log(showOptionName);
  const price = option.price/100;
  return (
    <>
      {!showOptionName && <p>{option.option.optionName}</p>}
      <p>${price}</p>
    </>
  );
};
export default ItemOption;
