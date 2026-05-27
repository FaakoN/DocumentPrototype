import { useState } from 'react'
import './SearchBar.css'

function SearchBar({ placeholder = 'Поиск...', onSearch }) {
  const [query, setQuery] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (onSearch) onSearch(query.trim())
  }

  function handleClear() {
    setQuery('')
    if (onSearch) onSearch('')
  }

  return (
    <form className="search-bar" role="search" onSubmit={handleSubmit}>
      <svg
        className="search-bar__icon"
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>

      <input
        className="search-bar__input"
        type="search"
        value={query}
        placeholder={placeholder}
        aria-label={placeholder}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && (
        <button
          type="button"
          className="search-bar__clear"
          aria-label="Очистить поиск"
          onClick={handleClear}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}

      <button type="submit" className="search-bar__submit">
        Найти
      </button>
    </form>
  )
}

export default SearchBar
