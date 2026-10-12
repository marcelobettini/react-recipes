import { useState } from "react"
import useFetch from "../hooks/useFetch"
import type { Recipe } from "../types"
import RecipeCard from "../components/RecipeCard"
import InstantSearch from "../components/InstantSearch"
import Icon from "../components/Icon"
import "./Recipes.css"

export default function Recipes() {
  const { data: recipes, isLoading, error } = useFetch<Recipe[]>("recipes", {
    enableCache: true,
    cacheDuration: 5 * 60 * 1000,
    cacheKey: "recipes",
  })
  const [searchTerm, setSearchTerm] = useState("")

  if (error) {
    return (
      <div className="recipes shell section state">
        <span className="eyebrow">Something went wrong</span>
        <h1 className="display-lg">The kitchen is closed.</h1>
        <p className="lede muted">{error}</p>
      </div>
    )
  }

  const filtered =
    recipes?.filter((recipe) => recipe.name.toLowerCase().includes(searchTerm)) ?? []

  return (
    <div className="recipes shell section">
      <header className="recipes__head">
        <span className="eyebrow" data-reveal>
          The collection
        </span>
        <h1 className="display-xl recipes__title" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
          Recipes
        </h1>
        <p className="lede recipes__lede" data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
          From weeknight comfort to slow-Sunday projects — search the library by name and find your
          next favourite plate.
        </p>
      </header>

      <div className="recipes__toolbar">
        <InstantSearch onSearch={setSearchTerm} />
        <span className="recipes__count">
          {isLoading ? "Loading…" : `${filtered.length} ${filtered.length === 1 ? "recipe" : "recipes"}`}
        </span>
      </div>

      {isLoading ? (
        <div className="recipes__grid">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="skeleton" key={index} style={{ "--d": `${index * 60}ms` } as React.CSSProperties}>
              <span className="skeleton__media" />
              <span className="skeleton__line" />
              <span className="skeleton__line skeleton__line--short" />
            </div>
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="recipes__grid">
          {filtered.map((recipe, index) => (
            <div
              className={`recipes__cell ${index === 0 ? "recipes__cell--lead" : ""}`}
              key={recipe.id}
            >
              <RecipeCard recipe={recipe} variant={index === 0 ? "wide" : "default"} index={index} />
            </div>
          ))}
        </div>
      ) : (
        <div className="empty" data-reveal>
          <span className="empty__icon">
            <Icon name="search" size={26} />
          </span>
          <h2 className="display-md">Nothing on the pass</h2>
          <p className="muted">
            We couldn&rsquo;t find a recipe matching &ldquo;{searchTerm}&rdquo;. Try another
            ingredient or dish name.
          </p>
        </div>
      )}
    </div>
  )
}
