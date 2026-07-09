import { useMemo, useState } from "react";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { PokemonGrid } from "./components/PokemonGrid";
import { Sidebar } from "./components/Sidebar";
import { StatsPanel } from "./components/StatsPanel";
import { Footer } from "./components/Footer";
import { usePokemonList } from "./hooks/usePokemonList";
import { useLocalStorage } from "./hooks/useLocalStorage";
import "./App.css";

function App() {
  const { pokemonList, loading, error } = usePokemonList();

  // Favoritos y bloqueados se guardan como arreglos de IDs en localStorage
  const [favorites, setFavorites] = useLocalStorage("pokedex:favorites", []);
  const [blocked, setBlocked] = useLocalStorage("pokedex:blocked", []);

  const [search, setSearch] = useState("");

  // Marca / desmarca un pokemon como favorito
  // Se permite bloquear al estar favorito
  function handleToggleFavorite(id) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  }

  // Bloquea / desbloquea un pokemon.
  function handleToggleBlocked(id) {
    setBlocked((prev) => {
      const yaBloqueado = prev.includes(id);
      if (yaBloqueado) {
        return prev.filter((blockedId) => blockedId !== id);
      }
      // Al bloquear, tambien lo sacamos de favoritos si estaba ahi
      setFavorites((favs) => favs.filter((favId) => favId !== id));
      return [...prev, id];
    });
  }

  // Lista visible: filtrada por texto de busqueda y sin los bloqueados
  const filteredList = useMemo(() => {
    const term = search.trim().toLowerCase();
    return pokemonList
      .filter((p) => !blocked.includes(p.id))
      .filter((p) => p.name.toLowerCase().includes(term));
  }, [pokemonList, blocked, search]);

  // Objetos completos (no solo IDs) para mostrar en el panel lateral
  const favoritePokemon = useMemo(
    () => pokemonList.filter((p) => favorites.includes(p.id)),
    [pokemonList, favorites]
  );
  const blockedPokemon = useMemo(
    () => pokemonList.filter((p) => blocked.includes(p.id)),
    [pokemonList, blocked]
  );

  return (
    <div className="app">
      <Header />

      <main className="app__main">
        <div className="app__content">
          <SearchBar value={search} onChange={setSearch} />

          <StatsPanel
            total={pokemonList.length}
            favoritesCount={favorites.length}
            blockedCount={blocked.length}
          />

          <PokemonGrid
            pokemonList={filteredList}
            loading={loading}
            error={error}
            favorites={favorites}
            blocked={blocked}
            onToggleFavorite={handleToggleFavorite}
            onToggleBlocked={handleToggleBlocked}
          />
        </div>

        <Sidebar
          favoritePokemon={favoritePokemon}
          blockedPokemon={blockedPokemon}
          onToggleFavorite={handleToggleFavorite}
          onToggleBlocked={handleToggleBlocked}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;
