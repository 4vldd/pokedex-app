import { useState, useEffect } from "react";

/**
 * @param {string} key - Llave bajo la cual se guarda el valor en localStorage.
 * @param {*} initialValue - Valor inicial si no hay nada guardado todavia.
 * @returns {[*, Function]} - [valor, funcionParaActualizarlo]
 */

export function useLocalStorage(key, initialValue) {
  // Estado inicial: se lee UNA sola vez desde localStorage (si existe)
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (error) {
      console.error(`Error leyendo localStorage para la llave "${key}":`, error);
      return initialValue;
    }
  });

  // Cada vez que "value" cambia, lo volvemos a guardar en localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error guardando en localStorage la llave "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
