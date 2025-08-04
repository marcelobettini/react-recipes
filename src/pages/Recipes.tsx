import { Link } from 'react-router'
import { recipes } from '../data/recipes.json'
import type { Recipe } from '../types'
export default function Recipes() {
    return (
        <div>
            <h1>Recipes</h1>
            <ul>
                {recipes.map((recipe: Recipe) => (
                    <li
                        key={recipe.id}
                        style={{ cursor: 'pointer' }}
                    >
                        <Link to={`/recipes/${recipe.id}`}>
                            {recipe.name}
                        </Link>
                        {' '}
                        - {' '}
                        {recipe.rating} stars
                    </li>
                ))}
            </ul>
        </div>
    )
}
