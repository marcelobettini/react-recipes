import { Link } from 'react-router'
import useFetch from '../hooks/useFetch'
<<<<<<< HEAD
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
=======
import './Recipes.css'
import RecipeHeading from '../components/RecipeHeading'
import Search from '../components/Search'
import { useState } from 'react'
import InstantSearch from '../components/InstantSearch'
export default function Recipes() {
    console.log('renders Recipes')
    const { data, isLoading, error } = useFetch<Recipe[]>('/recipes')
    const [searchTerm, setSearchTerm] = useState<string>('')
    const onSearch = (term: string) => {
        setSearchTerm(term)
    }
>>>>>>> search

    return (
        <div>
            <Search onSearch={onSearch} />
            <InstantSearch onSearch={onSearch} />
            <h1>Recipes</h1>
            <ul>
<<<<<<< HEAD
                {recipes?.map((recipe: Recipe) => (
                    <li key={recipe.id}>
                        <Link to={`/recipes/${recipe.id}`}>
                            {recipe.name}
                        </Link>
                    </li>
=======
                {data?.filter(recipe => recipe.name.toLowerCase().includes(searchTerm)).map((recipe: Recipe) => (
                    <RecipeHeading recipe={recipe} key={recipe.id} />
>>>>>>> search
                ))}
            </ul>
        </div>
    )
}
