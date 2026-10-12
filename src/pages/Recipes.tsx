import { Link } from 'react-router'
import useFetch from '../hooks/useFetch'
import type { Recipe } from '../types'
import Search from '../components/Search'
import InstantSearch from '../components/InstantSearch'
import { useState } from 'react'

export default function Recipes() {
    // 📦 Hook para lista completa de recetas
    const { data: recipes, isLoading, error } = useFetch<Recipe[]>('recipes', {
        enableCache: true,
        cacheDuration: 5 * 60 * 1000,  // 5 minutos
        cacheKey: 'recipes'
    })
    const [searchTerm, setSearchTerm] = useState<string>("")
    const onSearch = (term: string) => {
        setSearchTerm(term)
    }

    if (isLoading) return <p>Loading recipes...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div>
            <Search onSearch={onSearch} />
            <InstantSearch onSearch={onSearch} />
            <h1>Recipes</h1>
            <ul>
                {recipes?.filter(recipe => recipe.name.toLowerCase().includes(searchTerm)).map((recipe: Recipe) => (
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
