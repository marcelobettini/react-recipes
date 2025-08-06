import './RecipeDetail.css'
import { useParams } from 'react-router'
import type { Recipe } from '../types'
import { useEffect, useState } from 'react'
export default function RecipeDetail() {
    const { id } = useParams<{ id: string }>()
    const [recipe, setRecipe] = useState<Recipe>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // 🛡️ PASO 1: Validación de seguridad
        // Si no hay ID en la URL, no hacer nada
        if (!id) return

        // 🔑 PASO 2: Generar claves únicas para esta receta específica
        // Cada receta tiene su propia entrada en localStorage
        // Ejemplo: recipe_1, recipe_1_timestamp, recipe_2, recipe_2_timestamp, etc.
        const cacheKey = `recipe_${id}`
        const timestampKey = `recipe_${id}_timestamp`

        // 📦 PASO 3: Intentar recuperar datos del cache local
        const cachedRecipe = localStorage.getItem(cacheKey)
        const cacheTimestamp = localStorage.getItem(timestampKey)

        // ⏰ PASO 4: Configurar duración del cache para recetas individuales
        // 10 minutos es más largo que la lista porque los usuarios
        // tienden a volver a ver la misma receta más frecuentemente
        const CACHE_DURATION = 10 * 60 * 1000

        // 🕐 PASO 5: Verificar si el cache ha expirado
        const now = Date.now()
        const isExpired = !cacheTimestamp || (now - parseInt(cacheTimestamp)) > CACHE_DURATION

        // 🚀 PASO 6: Decidir si usar cache o hacer fetch
        if (cachedRecipe && !isExpired) {
            // ✅ CACHE HIT: La receta está disponible y no ha expirado
            console.log(`📦 Cargando receta ${id} desde cache local`)
            setRecipe(JSON.parse(cachedRecipe))
            setLoading(false)
        } else {
            // ❌ CACHE MISS: No hay datos o han expirado, hacer fetch
            console.log(`🌐 Descargando receta ${id} desde la API`)
            fetch('https://67f95738094de2fe6ea13bdf.mockapi.io/api/v1/recipes/' + id)
                .then(response => response.json())
                .then(data => {
                    // 📝 PASO 7: Actualizar estado con datos frescos
                    setRecipe(data)

                    // 💾 PASO 8: Guardar en localStorage para futuras visitas
                    // Guardamos tanto los datos como el timestamp actual
                    localStorage.setItem(cacheKey, JSON.stringify(data))
                    localStorage.setItem(timestampKey, now.toString())

                    console.log(`💾 Receta ${id} guardada en cache local`)
                    setLoading(false)
                })
                .catch(error => {
                    // 🚨 PASO 9: Manejar errores de red
                    console.error('Error fetching recipe:', error)
                    setLoading(false)
                })
        }
    }, [id]) // 🔄 PASO 10: Dependencia crucial en 'id'
    // Esto hace que el efecto se ejecute cuando cambie la ruta
    // Ejemplo: /recipes/1 → /recipes/2 → ejecuta el efecto nuevamente
    return (
        <>
            {/* 🔄 PASO 11: Render condicional basado en el estado de carga */}
            {loading ? (
                // 📱 Mostrar indicador mientras se carga (cache o fetch)
                <p>Loading recipe...</p>
            ) : recipe ? (
                <div>
                    <p style={{ marginBottom: 0, fontStyle: 'italic', color: 'hotpink' }}>{recipe.mealType.join(", ")}</p>
                    <h2 style={{ marginTop: 0, color: 'pink' }}>{recipe.name}</h2>
                    <span>{recipe.cuisine} cuisine</span>
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
