import { Link } from 'react-router'
import { useState, useEffect } from 'react'
import type { Recipe } from '../types'
export default function Recipes() {
    const [recipes, setRecipes] = useState<Recipe[]>([])
    useEffect(() => {
        fetch('https://67f95738094de2fe6ea13bdf.mockapi.io/api/v1/recipes')
            .then(response => response.json())
            .then(data => setRecipes(data))
            .catch(error => console.error('Error fetching recipes:', error))
    }, [])

    if (!recipes.length) {
        return <p>Loading recipes...</p>
    }
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
