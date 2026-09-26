import { useParams } from 'react-router'
import useFetch from '../hooks/useFetch'
import type { Recipe } from '../types'
import './RecipeDetail.css'

export default function RecipeDetail() {
    const { id } = useParams<{ id: string }>()

    // 🔍 Hook para receta individual
    const { data: recipe, isLoading, error } = useFetch<Recipe>(`recipes/${id}`, {
        enableCache: true,
        cacheDuration: 10 * 60 * 1000,  // 10 minutos (más tiempo para recetas individuales)
        cacheKey: `recipe_${id}`         // Clave única por receta
    })

    if (isLoading) return <p>Loading recipe...</p>
    if (error) return <p>Error: {error}</p>
    if (!recipe) return <p>Recipe not found</p>
    return (
        <>
            {/* 🔄 PASO 11: Render condicional basado en el estado de carga */}
            {isLoading ? (
                // 📱 Mostrar indicador mientras se carga (cache o fetch)
                <p>Loading recipe...</p>
            ) : recipe ? (
                <div>
                    <Link to="/recipes"><small>⬅️ back</small></Link>
                    <p style={{ marginBottom: 0, fontStyle: 'italic', color: 'hotpink' }}>{data.mealType.join(", ")}</p>
                    <h2 style={{ marginTop: 0, color: 'pink' }}>{data.name}</h2>
                    <span>{data.cuisine} cuisine</span>
                    <hr style={{ marginTop: 0, border: 'none', height: '1px', backgroundColor: 'gray' }} />
                    <p>Rating: {recipe.rating} ⭐️</p>
                    <p>Difficulty: {recipe.difficulty}</p>
                    <p>Preparation Time: {recipe.prepTimeMinutes} ⌛️</p>
                    <p>Cooking Time: {recipe.cookTimeMinutes} ⏰</p>
                    <p>Servings: {recipe.servings} 🍽️</p>
                    {/* style img tag with aspect ratio to avoid layout shifting */}
                    <img src={recipe.image} alt={recipe.name} className='img-detail'
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
                // ❌ Error state: La receta no se encontró o hubo un error
                <p>Recipe not found</p>
            )}
        </>
    )
}

/* 
🎯 RESUMEN DE LA ESTRATEGIA DE CACHE:

1. 🔑 Claves únicas: Cada receta tiene su propia entrada (recipe_1, recipe_2, etc.)
2. ⏰ Expiración independiente: Cada receta expira por separado (10 minutos)
3. 🔄 Navegación eficiente: ir de receta 1 → 2 → 1 carga la 1 desde cache
4. 📱 UX mejorada: Carga instantánea en visitas repetidas
5. 🌐 Fallback automático: Si no hay cache, hace fetch transparentemente

💡 BENEFICIOS:
- Menos requests al servidor
- Navegación más rápida
- Mejor experiencia de usuario
- Funciona offline para recetas ya visitadas
*/
