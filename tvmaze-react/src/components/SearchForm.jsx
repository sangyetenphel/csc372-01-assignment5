/* Controlled form. The input's value and onChange come from Gallery. */
export default function SearchForm({ query, onQueryChange, onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="query"
        placeholder="Search for a TV show (e.g., friends)"
        autoComplete="off"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  )
}