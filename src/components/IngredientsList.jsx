import React from "react";

import Ingredient from "./Ingredient";
export default function IngredientsList({ list }) {
  console.log(list);
  return (
    <div className="ingredients">
      <ul>
        {list.map((ingredient, i) => (
          // <Ingredient key={i} {...ingredient} />
          <Ingredient
            key={i}
            name={ingredient.name}
            amount={ingredient.amount}
            measurement={ingredient.measurement}
          />
        ))}
      </ul>
    </div>
  );
}
