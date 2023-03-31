import React from "react";
import { useParams } from "react-router";
import { useAllItemStore } from "../../store/menuReducer";
import ItemOption from '../itemOption/ItemOption';
const MenuItemDetail = () => {
  const allItems = useAllItemStore((state) => state.allItems);
  const params = useParams();
  const item = allItems.filter((item) => item.id === parseInt(params.itemId))[0];
  const ingredients = item.ingredients.map((ingredient) => ingredient.ingredient.ingredientName)
  console.log(ingredients);
  console.log(item);
  if (!item) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <h1 className="text-capitalize">{item.itemName}</h1>
      <p>{item.description}</p>
      <p></p>
      <ul>
        {item.options.map((option) => (
          <ItemOption key={option.id} option={option} />
        ))}
      </ul>
      <p>Ingredients: {ingredients.join(',')}</p>
      <img
        src={item.imageUrl}
        alt={item.itemName}
        className='image-fluid'
      />
      
    </>
  );
};
export default MenuItemDetail;