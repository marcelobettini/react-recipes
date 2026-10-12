import { Link } from "react-router"
import type { Recipe } from "../types"
import useTilt from "../hooks/useTilt"
import Icon from "./Icon"
import "./RecipeCard.css"

type Props = {
  recipe: Recipe
  variant?: "default" | "wide" | "tall"
  index?: number
}

export default function RecipeCard({ recipe, variant = "default", index = 0 }: Props) {
  const tilt = useTilt<HTMLDivElement>(6)

  return (
    <article
      ref={tilt}
      className={`card tilt card--${variant}`}
      data-reveal
      style={{ "--d": `${Math.min(index, 6) * 70}ms` } as React.CSSProperties}
    >
      <div className="tilt__inner card__inner">
        <div className="bezel card__bezel">
          <div className="bezel__core card__core">
            <div className="card__media">
              <img src={recipe.image} alt={recipe.name} loading="lazy" />
              <span className="card__glow" aria-hidden="true" />
              <div className="card__badges">
                <span className="chip chip--solid">
                  <Icon name="star" size={13} />
                  {recipe.rating.toFixed(1)}
                </span>
                {recipe.mealType[0] && <span className="chip">{recipe.mealType[0]}</span>}
              </div>
            </div>

            <div className="card__body">
              <div className="card__meta">
                <span className="card__cuisine">{recipe.cuisine}</span>
                <span className="card__dot" aria-hidden="true" />
                <span className="card__difficulty">{recipe.difficulty}</span>
              </div>
              <h3 className="card__title">
                <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
              </h3>
              <div className="card__footer">
                <div className="card__stats">
                  <span>
                    <Icon name="clock" size={15} />
                    {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min
                  </span>
                  <span>
                    <Icon name="users" size={15} />
                    {recipe.servings}
                  </span>
                </div>
                <Link
                  to={`/recipes/${recipe.id}`}
                  className="card__go"
                  aria-label={`View ${recipe.name}`}
                >
                  <Icon name="arrow-up-right" size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <span className="tilt__spot card__spot" aria-hidden="true" />
      </div>
    </article>
  )
}
