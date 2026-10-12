import { Link } from "react-router"
import recipeData from "../data/recipes.json"
import type { Recipe } from "../types"
import Icon from "../components/Icon"
import useTilt from "../hooks/useTilt"
import "./About.css"

const RECIPES = recipeData.recipes as Recipe[]

const PRINCIPLES = [
  {
    n: "01",
    title: "Cook with the season",
    copy: "The best ingredient is the one at its peak. We build recipes around what the market is giving, week by week.",
  },
  {
    n: "02",
    title: "Measure, then trust yourself",
    copy: "We give exact numbers so you can learn the shape of a dish — and then cook it from instinct.",
  },
  {
    n: "03",
    title: "Share the table",
    copy: "Food is a reason to gather. Every recipe here is written to be made for more than one.",
  },
]

const STATS = {
  recipes: RECIPES.length,
  cuisines: new Set(RECIPES.map((recipe) => recipe.cuisine)).size,
  rating: (RECIPES.reduce((sum, recipe) => sum + recipe.rating, 0) / RECIPES.length).toFixed(1),
}

export default function About() {
  const tilt = useTilt<HTMLDivElement>(8)

  return (
    <div className="about shell section">
      <header className="about__head">
        <span className="eyebrow" data-reveal>
          Our story
        </span>
        <h1 className="display-xl about__title" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
          Salvia is a notebook that became a <em className="italic">kitchen.</em>
        </h1>
        <p className="lede about__lede" data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
          It started with two cooks, a shared document of dinners worth repeating, and a stubborn
          belief that good recipes should feel like a friend talking you through it.
        </p>
      </header>

      <div className="about__feature">
        <div className="about__media tilt" ref={tilt} data-reveal>
          <div className="tilt__inner about__media-inner">
            <div className="bezel about__frame">
              <div className="bezel__core about__frame-core">
                <img src={RECIPES[5].image} alt="A dish from the Salvia kitchen" />
                <span className="about__frame-sheen" aria-hidden="true" />
              </div>
            </div>
            <div className="about__chip tilt__pop">
              <Icon name="leaf" size={15} />
              <span>In season now</span>
            </div>
            <div className="about__chip about__chip--years tilt__pop">
              <strong>12</strong>
              <span>years cooking</span>
            </div>
            <span className="tilt__spot" aria-hidden="true" />
          </div>
        </div>

        <div className="about__copy" data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
          <p>
            We are a small studio of cooks and writers who test every recipe the way you would — at
            home, on a normal evening, with the pans you already own. If a dish is fussy, it gets
            rewritten. If it is good, it earns its place in the collection.
          </p>
          <p className="muted">
            No fads, no filler. Just a growing library of food we actually cook, measured and
            explained so you can make it your own.
          </p>

          <dl className="about__stats">
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
      </div>

      <section className="about__principles">
        <span className="eyebrow" data-reveal>
          What we believe
        </span>
        <div className="about__principles-list">
          {PRINCIPLES.map((principle, index) => (
            <div
              className="principle"
              key={principle.n}
              data-reveal
              style={{ "--d": `${index * 110}ms` } as React.CSSProperties}
            >
              <span className="principle__n">{principle.n}</span>
              <h3 className="principle__title">{principle.title}</h3>
              <p className="muted">{principle.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="about__cta" data-reveal>
        <h2 className="display-lg">
          Come cook <em className="italic">with us.</em>
        </h2>
        <Link to="/recipes" className="btn">
          Browse the recipes
          <span className="btn__icon">
            <Icon name="arrow-up-right" size={16} />
          </span>
        </Link>
      </div>
    </div>
  )
}
