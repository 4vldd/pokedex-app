export function SearchBar({ value, onChange }) {
  return (
    <div className="searchbar">
      <label htmlFor="search" className="searchbar__label">
        Buscar espécimen
      </label>
      <input
        id="search"
        type="text"
        className="searchbar__input"
        placeholder="ej: pikachu, charizard, bulbasaur..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
      />
    </div>
  );
}
