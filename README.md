# Pokédex de Campo — Taller React API

Aplicación en React (Vite) que consume la [PokéAPI](https://pokeapi.co) para listar,
buscar, marcar como favoritos y bloquear pokémon de la primera generación. Los
favoritos y bloqueados se guardan en `localStorage`.

## Cómo correrlo localmente

```bash
npm install
npm run dev
```

Abre la URL que muestra la terminal (normalmente `http://localhost:5173`).

## Estructura del proyecto

```
├──src/
    ├── hooks/
    │   ├── useLocalStorage.js   → hook propio y reutilizable para persistir estado
    │   └── usePokemonList.js    → hook que consulta la PokéAPI (carga, error, datos)
    ├── components/
    │   ├── Header.jsx           → título y descripción de la app
    │   ├── SearchBar.jsx        → input de búsqueda (controlado)
    │   ├── PokemonCard.jsx      → una "ficha" individual con sus botones
    │   ├── PokemonGrid.jsx      → grilla de tarjetas + estados de carga/error/vacío
    │   ├── StatsPanel.jsx       → contador de totales/favoritos/bloqueados
    │   ├── Sidebar.jsx          → panel lateral con favoritos y bloqueados
    │   └── Footer.jsx           → nombre del alumno
    └── App.jsx                  → componente principal: guarda el estado y coordina todo lo demás
    └── App.css
    └── main.jsx
    └── index.css
├──public/
├──oxlintrc.json
├──index.html
├──package-lock.json
├──package.json
├──README.md
├──vite.config.js