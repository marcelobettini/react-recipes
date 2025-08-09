import type { Recipe } from '../types'
import useFetch from '../hooks/useFetch'
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

    if (isLoading) return <h3>Loading recipes...</h3>
    if (error) return <h3>Error: {error}</h3>
    return (
        <div>
            <Search onSearch={onSearch} />
            <InstantSearch onSearch={onSearch} />
            <h1>Recipes</h1>
            <ul>
                {data?.filter(recipe => recipe.name.toLowerCase().includes(searchTerm)).map((recipe: Recipe) => (
                    <RecipeHeading recipe={recipe} key={recipe.id} />
                ))}
            </ul>
        </div>
    )
}
