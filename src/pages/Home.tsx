import { Link } from "react-router"
import recipeData from "../data/recipes.json"
import type { Recipe } from "../types"
import RecipeCard from "../components/RecipeCard"
import Icon from "../components/Icon"
import useTilt from "../hooks/useTilt"
import "./Home.css"

const RECIPES = recipeData.recipes as Recipe[]

const FEATURED = RECIPES.slice(0, 6)
const VARIANTS = ["wide", "default", "default", "default", "default", "wide"] as const

const VALUES = [
  {
    icon: "leaf" as const,
    title: "Seasonal first",
    copy: "We cook with what the market gives us, week by week, so every plate tastes of its moment.",
  },
  {
    icon: "whisk" as const,
    title: "Tested twice",
    copy: "Every recipe is cooked, corrected and cooked again before it reaches your kitchen.",
  },
  {
    icon: "bowl" as const,
    title: "Simple by design",
    copy: "Few ingredients, treated well. Technique you can learn on a Tuesday night.",
  },
]

const STATS = {
  recipes: RECIPES.length,
  cuisines: new Set(RECIPES.map((recipe) => recipe.cuisine)).size,
  rating: (RECIPES.reduce((sum, recipe) => sum + recipe.rating, 0) / RECIPES.length).toFixed(1),
}

export default function Home() {
  const tilt = useTilt<HTMLDivElement>(9)

  return (
    <div className="home">
      {/* =============================== HERO =============================== */}
      <section className="hero shell">
        <div className="hero__copy">
          <span className="eyebrow" data-reveal>
            Seasonal kitchen · Since 2014
          </span>

          <h1 className="display-xl hero__title" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
            Plates that make you
            <em className="italic"> slow down.</em>
          </h1>

          <p className="lede hero__lede" data-reveal style={{ "--d": "180ms" } as React.CSSProperties}>
            A curated collection of recipes from kitchens around the world — measured, tested and
            written for people who love to make food at home.
          </p>

          <div className="hero__actions" data-reveal style={{ "--d": "260ms" } as React.CSSProperties}>
            <Link to="/recipes" className="btn">
              Explore the collection
              <span className="btn__icon">
                <Icon name="arrow-up-right" size={16} />
              </span>
            </Link>
            <Link to="/about" className="btn btn--ghost">
              Our story
              <span className="btn__icon">
                <Icon name="arrow-right" size={16} />
              </span>
            </Link>
          </div>

          <dl className="hero__stats" data-reveal style={{ "--d": "340ms" } as React.CSSProperties}>
            <div>
              <dt>{STATS.recipes}</dt>
              <dd>Recipes</dd>
            </div>
            <div>
              <dt>{STATS.cuisines}</dt>
              <dd>Cuisines</dd>
            </div>
            <div>
              <dt>{STATS.rating}</dt>
              <dd>Avg. rating</dd>
            </div>
          </dl>
        </div>

        {/* Layered 3D dish composition */}
        <div className="hero__stage tilt" ref={tilt} data-reveal style={{ "--d": "220ms" } as React.CSSProperties}>
          <div className="tilt__inner hero__stage-inner">
            <span className="hero__ring hero__ring--outer" aria-hidden="true" />
            <span className="hero__ring hero__ring--mid" aria-hidden="true" />
            <span className="hero__ring hero__ring--conic" aria-hidden="true" />

            <div className="hero__ghost hero__ghost--a tilt__pop" aria-hidden="true">
              <img src={RECIPES[1].image} alt="" />
            </div>
            <div className="hero__ghost hero__ghost--b tilt__pop" aria-hidden="true">
              <img src={RECIPES[2].image} alt="" />
            </div>

            <div className="bezel hero__plate">
              <div className="bezel__core hero__plate-core">
                <img src={RECIPES[0].image} alt={RECIPES[0].name} />
                <span className="hero__plate-sheen" aria-hidden="true" />
              </div>
            </div>

            <div className="hero__chip hero__chip--rating tilt__pop">
              <Icon name="star" size={14} />
              <strong>{RECIPES[0].rating.toFixed(1)}</strong>
              <span>{RECIPES[0].reviewCount} reviews</span>
            </div>

            <div className="hero__chip hero__chip--time tilt__pop">
              <Icon name="clock" size={14} />
              <strong>{RECIPES[0].prepTimeMinutes + RECIPES[0].cookTimeMinutes} min</strong>
              <span>{RECIPES[0].difficulty}</span>
            </div>

            <div className="hero__chip hero__chip--cuisine tilt__pop">
              <Icon name="leaf" size={14} />
              <span>{RECIPES[0].cuisine}</span>
            </div>

            <span className="tilt__spot" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* ============================ CUISINE STRIP ======================== */}
      <section className="section--tight shell">
        <div className="strip" data-reveal>
          <span>Italian</span>
          <span className="strip__dot" />
          <span>Japanese</span>
          <span className="strip__dot" />
          <span>Mediterranean</span>
          <span className="strip__dot" />
          <span>Mexican</span>
          <span className="strip__dot" />
          <span>Indian</span>
          <span className="strip__dot" />
          <span>French</span>
        </div>
      </section>

      {/* ============================ FEATURED ============================= */}
      <section className="section shell">
        <header className="section-head" data-reveal>
          <div>
            <span className="eyebrow">This week&rsquo;s table</span>
            <h2 className="display-lg section-head__title">Featured dishes</h2>
          </div>
          <Link to="/recipes" className="section-head__link">
            View all recipes
            <Icon name="arrow-right" size={16} />
          </Link>
        </header>

        <div className="bento">
          {FEATURED.map((recipe, index) => (
            <div className={`bento__cell bento__cell--${index}`} key={recipe.id}>
              <RecipeCard recipe={recipe} variant={VARIANTS[index]} index={index} />
            </div>
          ))}
        </div>
      </section>

      {/* ============================ PHILOSOPHY =========================== */}
      <section className="section shell">
        <div className="philosophy">
          <div className="philosophy__intro" data-reveal>
            <span className="eyebrow">Our kitchen</span>
            <h2 className="display-lg philosophy__title">
              We cook the way we travel — slowly, curiously, and with{" "}
              <em className="italic">good company.</em>
            </h2>
            <p className="lede">
              Salvia began as a notebook shared between friends. Today it is a growing library of
              recipes we return to again and again — the ones that earn a place at the table.
            </p>
            <Link to="/about" className="btn btn--ghost">
              Meet the kitchen
              <span className="btn__icon">
                <Icon name="arrow-up-right" size={15} />
              </span>
            </Link>
          </div>

          <div className="philosophy__values">
            {VALUES.map((value, index) => (
              <div
                className="bezel value"
                key={value.title}
                data-reveal
                style={{ "--d": `${index * 110}ms` } as React.CSSProperties}
              >
                <div className="bezel__core value__core">
                  <span className="value__icon">
                    <Icon name={value.icon} size={20} />
                  </span>
                  <h3 className="value__title">{value.title}</h3>
                  <p className="muted">{value.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
