import { Link } from 'react-router'
import { useState, useEffect } from 'react'
import type { Recipe } from '../types'
export default function Recipes() {
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // 📦 PASO 1: Intentar recuperar datos del cache local
        // Buscamos tanto los datos como el timestamp de cuando se guardaron
        const cachedRecipes = localStorage.getItem('recipes')
        const cacheTimestamp = localStorage.getItem('recipes_timestamp')

        // ⏰ PASO 2: Configurar duración del cache
        // 5 minutos = 5 * 60 * 1000 millisegundos
        // Puedes ajustar este valor según tus necesidades
        const CACHE_DURATION = 5 * 60 * 1000

        // 🕐 PASO 3: Verificar si el cache ha expirado
        const now = Date.now()
        const isExpired = !cacheTimestamp || (now - parseInt(cacheTimestamp)) > CACHE_DURATION

        // 🚀 PASO 4: Decidir si usar cache o hacer fetch
        if (cachedRecipes && !isExpired) {
            // ✅ CACHE HIT: Los datos están disponibles y no han expirado
            console.log('📦 Cargando recetas desde cache local')
            setRecipes(JSON.parse(cachedRecipes))
            setLoading(false)
        } else {
            // ❌ CACHE MISS: No hay datos o han expirado, hacer fetch
            console.log('🌐 Descargando recetas desde la API')
            fetch('https://67f95738094de2fe6ea13bdf.mockapi.io/api/v1/recipes')
                .then(response => response.json())
                .then(data => {
                    // 📝 PASO 5: Actualizar estado con datos frescos
                    setRecipes(data)

                    // 💾 PASO 6: Guardar en localStorage para futuras visitas
                    // Guardamos tanto los datos como el timestamp actual
                    localStorage.setItem('recipes', JSON.stringify(data))
                    localStorage.setItem('recipes_timestamp', now.toString())

                    console.log('💾 Recetas guardadas en cache local')
                    setLoading(false)
                })
                .catch(error => {
                    // 🚨 PASO 7: Manejar errores de red
                    console.error('Error fetching recipes:', error)
                    setLoading(false)
                })
        }
    }, []) // Array vacío = solo se ejecuta una vez al montar el componente

    // 🔄 PASO 8: Render condicional basado en el estado de carga
    if (loading) {
        // 📱 Mostrar indicador mientras se determina si usar cache o hacer fetch
        return <p>Loading recipes...</p>
    }

    return (
        <div>
            <h1>Recipes</h1>
            {/* 📋 PASO 9: Renderizar la lista de recetas (desde cache o API) */}
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
                        {recipe.rating} ⭐️
                    </li>
                ))}
            </ul>
        </div>
    )
}

/* 
🎯 RESUMEN DE LA ESTRATEGIA DE CACHE PARA LISTA DE RECETAS:

1. 📦 Cache global: Una sola entrada para toda la lista de recetas
2. ⏰ Expiración corta: 5 minutos para mantener datos relativamente frescos
3. 🚀 Carga instantánea: Primera visita = fetch, siguientes = cache
4. 💾 Persistencia: Sobrevive al cierre del navegador
5. 🔄 Renovación automática: Cache expira y se renueva automáticamente

💡 BENEFICIOS:
- Primera carga después de cache = instantánea
- Reduce carga del servidor
- Mejor experiencia al navegar de vuelta a /recipes
- Balance perfecto entre frescura de datos y rendimiento

🔧 CONFIGURACIÓN:
- Duración: 5 minutos (ajustable según necesidades)
- Almacenamiento: localStorage (persistente)
- Invalidación: Automática por tiempo
*/
