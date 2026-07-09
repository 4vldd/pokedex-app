export function StatsPanel({ total, favoritesCount, blockedCount }) {
  return (
    <section className="stats" aria-label="Estadísticas">
      <div className="stats__item">
        <span className="stats__number">{total}</span>
        <span className="stats__label">Totales</span>
      </div>
      <div className="stats__item">
        <span className="stats__number">{favoritesCount}</span>
        <span className="stats__label">Favoritos</span>
      </div>
      <div className="stats__item">
        <span className="stats__number">{blockedCount}</span>
        <span className="stats__label">Bloqueados</span>
      </div>
    </section>
  );
}
