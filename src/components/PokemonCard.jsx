export function PokemonCard({ pokemon, isFavorite, isBlocked, onToggleFavorite, onToggleBlocked }) {
  const { id, name, image, types } = pokemon;
  const numero = String(id).padStart(3, "0");

  return (
    <article className={`card${isBlocked ? " card--blocked" : ""}`}>
      <div className="card__tab" data-type={types[0]}>
        #{numero}
      </div>

      <img className="card__image" src={image} alt={name} loading="lazy" />

      <h3 className="card__name">{name}</h3>

      <div className="card__types">
        {types.map((type) => (
          <span key={type} className="card__type-chip" data-type={type}>
            {type}
          </span>
        ))}
      </div>

      <div className="card__actions">
        <button
          type="button"
          className={`card__btn card__btn--fav${isFavorite ? " is-active" : ""}`}
          onClick={() => onToggleFavorite(id)}
          disabled={isBlocked}
          title={isFavorite ? "Quitar de favoritos" : "Marcar como favorito"}
        >
          {isFavorite ? "★ Favorito" : "☆ Favorito"}
        </button>
        <button
          type="button"
          className={`card__btn card__btn--block${isBlocked ? " is-active" : ""}`}
          onClick={() => onToggleBlocked(id)}
          title={isBlocked ? "Desbloquear" : "Bloquear"}
        >
          {isBlocked ? "Desbloquear" : "Bloquear"}
        </button>
      </div>
    </article>
  );
}
