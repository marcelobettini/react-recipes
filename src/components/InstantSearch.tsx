import type { ChangeEvent } from "react"
type Props = {
    onSearch?: (term: string) => void
}
export default function InstantSearch({ onSearch }: Props) {
    console.log("renders InstantSearch")
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value
        onSearch?.(query.toLowerCase())
    }

    const debounce = (func: (e: ChangeEvent<HTMLInputElement>) => void, delay: number) => {
        let timeoutId: ReturnType<typeof setTimeout>
        return (e: ChangeEvent<HTMLInputElement>) => {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => {
                func(e)
            }, delay)
        }
    }
    return (
        <form>
            <input
                aria-label="Search recipes"
                id="queryInput"
                name="queryInput"
                // onChange={handleInputChange}
                onChange={debounce(handleInputChange, 500)}
                placeholder='Search: "tiramisu, pizza,corn..."'
                type="search"
            />
        </form>
    )
}

