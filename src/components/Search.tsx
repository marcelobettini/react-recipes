import type { FormEvent } from "react"
type Props = {
    onSearch?: (term: string) => void
}
import './Search.css'

export default function Search({ onSearch }: Props) {
    console.log('renders Search')
    const handleSearch = (e: FormEvent) => {
        e.preventDefault()
        // const query = (form.elements[0] as HTMLInputElement).value
        const form = e.currentTarget as HTMLFormElement
        const query = (form.queryInput as HTMLInputElement).value.trim()
        if (!query) return
        onSearch?.(query.toLowerCase())
    }
    const handleReset = () => {
        onSearch?.('')
    }
    return (
        <form
            className="search-form"
            onSubmit={handleSearch} >
            <input
                aria-label="Search recipes"
                id="queryInput"
                name="queryInput"
                placeholder='tiramisu, pizza,corn...'
                type="search"
            />
            <button type="submit">Go</button>
            <button
                onClick={handleReset}
                type="reset">All</button>
        </form>
    )
}
