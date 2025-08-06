
import { useEffect, useState } from "react"

const BASEURL = "https://67f95738094de2fe6ea13bdf.mockapi.io/api/v1/"

// 📋 Opciones de configuración para el hook
interface UseFetchOptions {
    enableCache?: boolean        // ✨ Habilitar/deshabilitar cache
    cacheDuration?: number      // ⏰ Duración del cache en ms
    cacheKey?: string          // 🔑 Clave personalizada para cache
}

// 🎯 Hook genérico con cache integrado
export default function useFetch<T>(
    endpoint: string,
    options: UseFetchOptions = {}
) {
    const [data, setData] = useState<T | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    // 🔧 Configuración por defecto
    const {
        enableCache = true,                    // Cache habilitado por defecto
        cacheDuration = 5 * 60 * 1000,        // 5 minutos por defecto
        cacheKey = endpoint                    // Usar endpoint como clave por defecto
    } = options

    useEffect(() => {
        setError(null)
        setIsLoading(true)

        // 🚀 ESTRATEGIA DE CACHE
        if (enableCache) {
            // 📦 PASO 1: Intentar cargar desde cache
            const cachedData = localStorage.getItem(cacheKey)
            const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`)

            const now = Date.now()
            const isExpired = !cacheTimestamp || (now - parseInt(cacheTimestamp)) > cacheDuration

            if (cachedData && !isExpired) {
                // ✅ CACHE HIT: Datos disponibles y frescos
                console.log(`📦 Cargando desde cache: ${cacheKey}`)
                setData(JSON.parse(cachedData))
                setIsLoading(false)
                return
            }
        }

        // ❌ CACHE MISS o cache deshabilitado: Hacer fetch
        console.log(`🌐 Fetch desde API: ${endpoint}`)
        fetch(BASEURL + endpoint)
            .then((res) => {
                if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)
                return res.json()
            })
            .then((fetchedData) => {
                setData(fetchedData)

                // 💾 PASO 2: Guardar en cache si está habilitado
                if (enableCache) {
                    const now = Date.now()
                    localStorage.setItem(cacheKey, JSON.stringify(fetchedData))
                    localStorage.setItem(`${cacheKey}_timestamp`, now.toString())
                    console.log(`💾 Guardado en cache: ${cacheKey}`)
                }
            })
            .catch(err => {
                setError(err.message)
                console.error(`🚨 Error en fetch:`, err.message)
            })
            .finally(() => {
                setIsLoading(false)
            })

        // 🧹 Cleanup function (opcional)
        return () => {
            console.log(`🧹 Cleanup para: ${endpoint}`)
        }
    }, [endpoint, cacheKey, cacheDuration, enableCache])

    return { data, isLoading, error }
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
