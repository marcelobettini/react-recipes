import { useEffect, useState } from "react"

const BASEURL = "https://67f95738094de2fe6ea13bdf.mockapi.io/api/v1/"

// 🎯 Hook genérico que puede manejar cualquier tipo de dato
export default function useFetch<T>(endpoint: string) {
    const [data, setData] = useState<T | null>(null) // ✨ Ahora es genérico
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setError(null)
        setIsLoading(true) // 🔄 Reset loading state on endpoint change

        fetch(BASEURL + endpoint)
            .then((res) => {
                if (!res.ok) throw new Error("Respuesta no OK")
                return res.json()
            })
            .then((data) => {
                setData(data)
            })
            .catch(err => {
                setError(err.message)
                console.error(err.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
        return () => { console.log("Acá va la cleanup function") }
    }, [endpoint])
    return { data, isLoading, error }
}
