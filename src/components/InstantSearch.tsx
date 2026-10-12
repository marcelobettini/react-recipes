import { useEffect, useRef, useState } from "react"
import Icon from "./Icon"
import "./Search.css"

type Props = {
  onSearch?: (term: string) => void
  placeholder?: string
}

export default function InstantSearch({
  onSearch,
  placeholder = 'Try "tiramisu", "pizza", "pasta"…',
}: Props) {
  const [value, setValue] = useState("")
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const emit = (next: string) => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => onSearch?.(next.trim().toLowerCase()), 240)
  }

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    [],
  )

  return (
    <div className="search-field" data-reveal>
      <span className="search-field__icon">
        <Icon name="search" size={18} />
      </span>
      <input
        className="search-field__input"
        type="search"
        value={value}
        placeholder={placeholder}
        aria-label="Search recipes"
        onChange={(event) => {
          setValue(event.target.value)
          emit(event.target.value)
        }}
      />
      <button
        type="button"
        className={`search-field__clear ${value ? "is-visible" : ""}`}
        aria-label="Clear search"
        tabIndex={value ? 0 : -1}
        onClick={() => {
          if (timer.current) clearTimeout(timer.current)
          setValue("")
          onSearch?.("")
        }}
      >
        <Icon name="close" size={15} />
      </button>
    </div>
  )
}
