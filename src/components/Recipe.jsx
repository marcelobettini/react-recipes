//Versión 2: Un enfoque más funcional

import React from "react";
import IngredientsList from "./IngredientsList";
import Instructions from "./Instructions";

export default function Recipe({ name, pic, ingredients, steps }) {
  return (
    <article className="recipe">
      <h1>{name}</h1>
      <div className="img-ingredients">
        <img src={pic} title={`delicious ${name}`} width='200' alt={name} />
        <IngredientsList list={ingredients} />
      </div>
      <Instructions title={"Cooking Instructions"} steps={steps} />
    </article>
  )
}