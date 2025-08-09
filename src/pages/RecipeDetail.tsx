import './RecipeDetail.css'
import { Link, useParams } from 'react-router'
import type { Recipe } from '../types'
import useFetch from '../hooks/useFetch'
export default function RecipeDetail() {
    const { id } = useParams<{ id: string }>()
    const { data, isLoading, error } = useFetch<Recipe>('/recipes/' + id)
    if (isLoading) return <h3>Loading recipe...</h3>
    if (error) return <h3>Error: {error}</h3>
    return (
        <>
            {data ? (
                <div>
                    <Link to="/recipes"><small>⬅️ back</small></Link>
                    <p style={{ marginBottom: 0, fontStyle: 'italic', color: 'hotpink' }}>{data.mealType.join(", ")}</p>
                    <h2 style={{ marginTop: 0, color: 'pink' }}>{data.name}</h2>
                    <span>{data.cuisine} cuisine</span>
                    <hr style={{ marginTop: 0, border: 'none', height: '1px', backgroundColor: 'gray' }} />
                    <p>Rating: {data.rating} ★</p>
                    <p>Difficulty: {data.difficulty}</p>
                    <p>Preparation Time: {data.prepTimeMinutes} ⌛️</p>
                    <p>Cooking Time: {data.cookTimeMinutes} ⏰</p>
                    <p>Servings: {data.servings} 🍽️</p>
                    {/* style img tag with aspect ratio to avoid layout shifting */}
                    <img src={data.image} alt={data.name} className='img-detail'
                        loading='eager'
                    />
                    <hr style={{ border: 'none', height: '1px', backgroundColor: 'gray' }} />
                    <h3>Ingredients:</h3>
                    <ul>
                        {data.ingredients?.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <hr style={{ border: 'none', height: '1px', backgroundColor: 'gray' }} />
                    <h3>Instructions:</h3>
                    <ul>
                        {data.instructions?.map((step, index) => (
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
