// src/hooks/useFetch.js
import { useState, useEffect } from "react";

// IA: [problema] La lógica de fetch se repite en cada componente, violando el principio DRY.
// Solución manual: Encapsular toda la lógica de estado, efecto y limpieza en un Hook Personalizado reutilizable.

const mockAnimes = [
  {
    mal_id: 1,
    title: "Fullmetal Alchemist: Brotherhood",
    score: 9.1,
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/1223/96541.jpg",
      },
    },
    genres: [{ name: "Acción" }],
  },
  {
    mal_id: 5,
    title: "Cowboy Bebop",
    score: 8.75,
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/4/19644.jpg",
      },
    },
    genres: [{ name: "Sci-Fi" }],
  },
  {
    mal_id: 16,
    title: "Hunter x Hunter (2011)",
    score: 9.0,
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/1337/99013.jpg",
      },
    },
    genres: [{ name: "Aventura" }],
  },
  {
    mal_id: 20,
    title: "Naruto",
    score: 8.0,
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/13/17405.jpg",
      },
    },
    genres: [{ name: "Acción" }],
  },
  {
    mal_id: 21,
    title: "One Piece",
    score: 8.7,
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
      },
    },
    genres: [{ name: "Aventura" }],
  },
  {
    mal_id: 30,
    title: "Neon Genesis Evangelion",
    score: 8.35,
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/1314/108941.jpg",
      },
    },
    genres: [{ name: "Mecha" }],
  },
  {
    mal_id: 1535,
    title: "Death Note",
    score: 8.6,
    images: {
      jpg: { image_url: "https://cdn.myanimelist.net/images/anime/9/9453.jpg" },
    },
    genres: [{ name: "Thriller" }],
  },
  {
    mal_id: 38000,
    title: "Demon Slayer: Kimetsu no Yaiba",
    score: 8.5,
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
      },
    },
    genres: [{ name: "Acción" }],
  },
  {
    mal_id: 40748,
    title: "Jujutsu Kaisen",
    score: 8.6,
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
      },
    },
    genres: [{ name: "Acción" }],
  },
  {
    mal_id: 16498,
    title: "Attack on Titan",
    score: 8.5,
    images: {
      jpg: {
        image_url: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
      },
    },
    genres: [{ name: "Acción" }],
  },
];

export function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // IA: [problema] Si el componente se desmonta antes de que termine el fetch, se produce un memory leak.
    // Solución manual: Usar AbortController para cancelar la petición pendiente en la función de limpieza.
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        // IA: [problema] API externa con rate limiting falla frecuentemente en desarrollo.
        // Solución manual: Simular fetch con datos mock y delay realista para evitar errores de red.
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(resolve, 800);
          controller.signal.addEventListener("abort", () => {
            clearTimeout(timeout);
            reject(new DOMException("Aborted", "AbortError"));
          });
        });

        if (controller.signal.aborted) return;
        setData(mockAnimes);
      } catch (err) {
        // IA: [problema] El AbortController lanza un error 'AbortError' que no es un error real de la app.
        // Solución manual: Filtrar explícitamente el AbortError para no mostrarlo como error en la UI.
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchData();

    // Función de limpieza (cleanup) que se ejecuta al desmontar o antes de re-ejecutar el efecto
    return () => controller.abort();
  }, [url]);
  // IA: [problema] En StrictMode, [] no significa "se ejecuta una vez", sino que React simula el montaje/desmontaje ejecutándolo 2 veces en desarrollo para detectar efectos secundarios.
  // Solución manual: Incluir 'url' como dependencia asegura que el efecto se re-ejecute correctamente solo si la URL cambia, manejando el doble invoke de StrictMode de forma segura gracias al AbortController.

  return { data, loading, error };
}
