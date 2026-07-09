import { PokemonCard } from "./PokemonCard";

export function PokemonGrid({
  pokemonList,
  loading,
  error,
  favorites,
  blocked,
  onToggleFavorite,
  onToggleBlocked,
}) {
  if (loading) {
    return (
      <div className="state-message state-message--loading">
        <div className="spinner" aria-hidden="true" />
        <p>Consultando la PokéAPI...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-message state-message--error">
        <p>No se pudo cargar el listado.</p>
        <p className="state-message__detail">{error}</p>
      </div>
    );
  }

  if (pokemonList.length === 0) {
    return (
      <div className="state-message">
        <p>No hay especímenes que coincidan con la búsqueda.</p>
      </div>
    );
  }

  return (
    <div className="grid">
      {pokemonList.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          isFavorite={favorites.includes(pokemon.id)}
          isBlocked={blocked.includes(pokemon.id)}
          onToggleFavorite={onToggleFavorite}
          onToggleBlocked={onToggleBlocked}
        />
      ))}
    </div>
  );
}
