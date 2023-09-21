export default function SearchBar ({style, search, handleFilter}) {
  return (
    <input
        className={style}
        value={search}
        onChange={handleFilter}
      />
  )
}