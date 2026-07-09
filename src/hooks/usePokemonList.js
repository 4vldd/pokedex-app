import { useState, useEffect } from "react";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=151"; // primera generacion

/**
 * @returns {{ pokemonList: Array, loading: boolean, error: string|null }}
 */
export function usePokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelado = false;

    async function cargarPokemon() {
      setLoading(true);
      setError(null);

      try {
        // 1. Traemos la lista basica (nombre + url de detalle) de 151 pokemon
        const resumenRes = await fetch(BASE_URL);
        if (!resumenRes.ok) {
          throw new Error("No se pudo obtener el listado de la PokeAPI");
        }
        const resumenData = await resumenRes.json();

        // 2. Por cada pokemon pedimos su detalle (imagen, tipos, id)
        const detalles = await Promise.all(
          resumenData.results.map(async (p) => {
            const detalleRes = await fetch(p.url);
            if (!detalleRes.ok) {
              throw new Error(`No se pudo obtener el detalle de ${p.name}`);
            }
            const detalle = await detalleRes.json();
            return {
              id: detalle.id,
              name: detalle.name,
              image:
                detalle.sprites?.other?.["official-artwork"]?.front_default ||
                detalle.sprites?.front_default,
              types: detalle.types.map((t) => t.type.name),
            };
          })
        );

        if (!cancelado) {
          // Ordenamos por numero de pokedex para que se vea prolijo
          detalles.sort((a, b) => a.id - b.id);
          setPokemonList(detalles);
        }
      } catch (err) {
        if (!cancelado) {
          setError(err.message || "Ocurrio un error al consultar la API");
        }
      } finally {
        if (!cancelado) {
          setLoading(false);
        }
      }
    }

    cargarPokemon();

    // Funcion de limpieza: evita actualizar estado si el componente se desmonto
    return () => {
      cancelado = true;
    };
  }, []);

  return { pokemonList, loading, error };
}
