import { Link } from 'react-router'
import useFetch from '../hooks/useFetch'
import type { Recipe } from '../types'

export default function Recipes() {
    // 📦 Hook para lista completa de recetas
    const { data: recipes, isLoading, error } = useFetch<Recipe[]>('recipes', {
        enableCache: true,
        cacheDuration: 5 * 60 * 1000,  // 5 minutos
        cacheKey: 'recipes'
    })

    if (isLoading) return <p>Loading recipes...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div>
            <h1>Recipes</h1>
            <ul>
                {recipes?.map((recipe: Recipe) => (
                    <li key={recipe.id}>
                        <Link to={`/recipes/${recipe.id}`}>
                            {recipe.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
