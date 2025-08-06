import './RecipeDetail.css'
import { useParams } from 'react-router'
import type { Recipe } from '../types'
import { useEffect, useState } from 'react'
export default function RecipeDetail() {
    const { id } = useParams<{ id: string }>()
    const [recipe, setRecipe] = useState<Recipe>()
    useEffect(() => {
        fetch('https://67f95738094de2fe6ea13bdf.mockapi.io/api/v1/recipes/' + id)
            .then(response => response.json())
            .then(data => setRecipe(data))
            .catch(error => console.error('Error fetching recipes:', error))
    }, [])
    return (
        <>

            {recipe ? (
                <div>
                    <p style={{ marginBottom: 0, fontStyle: 'italic', color: 'hotpink' }}>{recipe.mealType.join(", ")}</p>
                    <h2 style={{ marginTop: 0, color: 'pink' }}>{recipe.name}</h2>
                    <span>{recipe.cuisine} cuisine</span>
                    <hr style={{ marginTop: 0, border: 'none', height: '1px', backgroundColor: 'gray' }} />
                    <p>Rating: {recipe.rating} ★</p>
                    <p>Difficulty: {recipe.difficulty}</p>
                    <p>Preparation Time: {recipe.prepTimeMinutes} ⌛️</p>
                    <p>Cooking Time: {recipe.cookTimeMinutes} ⏰</p>
                    <p>Servings: {recipe.servings} 🍽️</p>
                    {/* style img tag with aspect ratio to avoid layout shifting */}
                    <img src={recipe.image} alt={recipe.name} className='img-detail'
                        loading='eager'
                    />
                    <hr style={{ border: 'none', height: '1px', backgroundColor: 'gray' }} />
                    <h3>Ingredients:</h3>
                    <ul>
                        {recipe.ingredients?.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <hr style={{ border: 'none', height: '1px', backgroundColor: 'gray' }} />
                    <h3>Instructions:</h3>
                    <ul>
                        {recipe.instructions?.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ul>


                </div>
            ) : (
                <p>Recipe not found</p>
            )}
        </>
    )
}
