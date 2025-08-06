import { Link } from 'react-router'
import type { Recipe } from '../types'
import useFetch from '../hooks/useFetch'
import './Recipes.css'
export default function Recipes() {
    const { data, isLoading, error } = useFetch<Recipe[]>('/recipes')

    if (isLoading) return <h3>Loading recipes...</h3>
    if (error) return <h3>Error: {error}</h3>
    return (
        <div>
            <h1>Recipes</h1>
            <ul>
                {data?.map((recipe: Recipe) => (
                    <li
                        className='recipe-link'
                        key={recipe.id}
                        style={{ cursor: 'pointer' }}
                    >
                        <Link to={`/recipes/${recipe.id}`}>
                            {recipe.name}
                        </Link>
                        {' '}
                        - {' '}
                        {recipe.rating} ⭐️
                    </li>
                ))}
            </ul>
        </div>
    )
}
