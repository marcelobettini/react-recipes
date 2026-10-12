import { Link, useParams } from "react-router"
import useFetch from "../hooks/useFetch"
import type { Recipe } from "../types"
import Icon from "../components/Icon"
import type { IconName } from "../components/Icon"
import useTilt from "../hooks/useTilt"
import "./RecipeDetail.css"

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>()
  const tilt = useTilt<HTMLDivElement>(6)

  const { data: recipe, isLoading, error } = useFetch<Recipe>(`recipes/${id}`, {
    enableCache: true,
    cacheDuration: 10 * 60 * 1000,
    cacheKey: `recipe_${id}`,
  })

  if (isLoading) {
    return (
      <div className="detail shell detail--state">
        <span className="eyebrow">Plating up</span>
        <h1 className="display-lg">Loading recipe…</h1>
      </div>
    )
  }

  if (error || !recipe) {
    return (
      <div className="detail shell detail--state">
        <span className="eyebrow">Not found</span>
        <h1 className="display-lg">We couldn&rsquo;t find that dish.</h1>
        <p className="lede muted">{error ?? "This recipe may have been moved or removed."}</p>
        <Link to="/recipes" className="btn btn--ghost">
          Back to the collection
          <span className="btn__icon">
            <Icon name="arrow-right" size={16} />
          </span>
        </Link>
      </div>
    )
  }

  const facts: { icon: IconName; label: string; value: string }[] = [
    { icon: "clock", label: "Prep", value: `${recipe.prepTimeMinutes} min` },
    { icon: "flame", label: "Cook", value: `${recipe.cookTimeMinutes} min` },
    { icon: "users", label: "Serves", value: `${recipe.servings}` },
    { icon: "gauge", label: "Difficulty", value: recipe.difficulty },
    { icon: "spark", label: "Per serving", value: `${recipe.caloriesPerServing} kcal` },
  ]

  return (
    <article className="detail shell">
      <Link to="/recipes" className="detail__back">
        <Icon name="arrow-left" size={16} />
        All recipes
      </Link>

      <div className="detail__hero">
        <div className="detail__intro" data-reveal>
          <span className="eyebrow">{recipe.mealType.join(" · ")}</span>
          <h1 className="display-lg detail__title">{recipe.name}</h1>
          <p className="detail__cuisine muted">
            {recipe.cuisine} cuisine · {recipe.mealType.join(", ")}
          </p>
          <div className="detail__tags">
            {recipe.tags.map((tag) => (
              <span className="chip chip--sage" key={tag}>
                {tag}
              </span>
            ))}
          </div>

          <dl className="detail__facts">
            {facts.map((fact) => (
              <div className="fact" key={fact.label}>
                <span className="fact__icon">
                  <Icon name={fact.icon} size={18} />
                </span>
                <div>
                  <dt>{fact.value}</dt>
                  <dd>{fact.label}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <div className="detail__media tilt" ref={tilt} data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
          <div className="tilt__inner detail__media-inner">
            <div className="bezel detail__frame">
              <div className="bezel__core detail__frame-core">
                <img src={recipe.image} alt={recipe.name} />
                <span className="detail__frame-sheen" aria-hidden="true" />
              </div>
            </div>

            <div className="detail__chip detail__chip--rating tilt__pop">
              <Icon name="star" size={15} />
              <strong>{recipe.rating.toFixed(1)}</strong>
              <span>{recipe.reviewCount} reviews</span>
            </div>

            <div className="detail__chip detail__chip--cuisine tilt__pop">
              <Icon name="leaf" size={15} />
              <span>{recipe.cuisine}</span>
            </div>

            <span className="tilt__spot" aria-hidden="true" />
          </div>
        </div>
      </div>

      <section className="detail__body">
        <div className="detail__col" data-reveal>
          <header className="detail__col-head">
            <span className="detail__col-index">01</span>
            <h2 className="display-md">Ingredients</h2>
          </header>
          <ul className="ingredients">
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>
                <span className="ingredients__mark" aria-hidden="true" />
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div className="detail__col" data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
          <header className="detail__col-head">
            <span className="detail__col-index">02</span>
            <h2 className="display-md">Method</h2>
          </header>
          <ol className="steps">
            {recipe.instructions.map((step, index) => (
              <li key={step}>
                <span className="steps__num">{String(index + 1).padStart(2, "0")}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </article>
  )
}
