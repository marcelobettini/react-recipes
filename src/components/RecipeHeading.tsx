import type { Recipe } from '../types'
import { Link } from 'react-router'
import './RecipeHeading.css'

export default function RecipeHeading({ recipe }: { recipe: Recipe }) {
    return (
        <li
            className='recipe-link'
            key={recipe.id}
        >
            <img src={recipe.image} alt={recipe.name} />
            <Link to={`/recipes/${recipe.id}`}>
                {recipe.name} - {recipe.rating} ⭐️
            </Link>

        </li>)
}
