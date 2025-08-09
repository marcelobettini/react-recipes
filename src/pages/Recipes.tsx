import type { Recipe } from '../types'
import useFetch from '../hooks/useFetch'
import './Recipes.css'
import RecipeHeading from '../components/RecipeHeading'
export default function Recipes() {
    const { data, isLoading, error } = useFetch<Recipe[]>('/recipes')

    if (isLoading) return <h3>Loading recipes...</h3>
    if (error) return <h3>Error: {error}</h3>
    return (
        <div>
            <h1>Recipes</h1>
            <ul>
                {data?.map((recipe: Recipe) => (
                    <RecipeHeading recipe={recipe} key={recipe.id} />
                ))}
            </ul>
        </div>
    )
}
