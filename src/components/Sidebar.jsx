export function Sidebar({ favoritePokemon, blockedPokemon, onToggleFavorite, onToggleBlocked }) {
  return (
    <aside className="sidebar">
      <section className="sidebar__panel">
        <h2 className="sidebar__title">★ Favoritos</h2>
        {favoritePokemon.length === 0 ? (
          <p className="sidebar__empty">Aún no tienes favoritos.</p>
        ) : (
          <ul className="sidebar__list">
            {favoritePokemon.map((p) => (
              <li key={p.id} className="sidebar__row">
                <img src={p.image} alt={p.name} className="sidebar__thumb" />
                <span className="sidebar__name">{p.name}</span>
                <button
                  type="button"
                  className="sidebar__remove"
                  onClick={() => onToggleFavorite(p.id)}
                  title="Quitar de favoritos"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="sidebar__panel">
        <h2 className="sidebar__title">⛔ Bloqueados</h2>
        {blockedPokemon.length === 0 ? (
          <p className="sidebar__empty">No has bloqueado especímenes.</p>
        ) : (
          <ul className="sidebar__list">
            {blockedPokemon.map((p) => (
              <li key={p.id} className="sidebar__row">
                <img src={p.image} alt={p.name} className="sidebar__thumb" />
                <span className="sidebar__name">{p.name}</span>
                <button
                  type="button"
                  className="sidebar__remove"
                  onClick={() => onToggleBlocked(p.id)}
                  title="Desbloquear"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </aside>
  );
}
