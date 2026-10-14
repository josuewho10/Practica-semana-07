// src/data/codeSnippets.js
export const codeSnippets = {
  1: {
    title: "Paso 1: Ciclo de Render",
    description:
      "Haz clic en el botón. Observa cómo App y AnimeCard se re-renderizan juntos.",
    code: `// IA: [Problema] ¿Cómo medir re-renders sin console.log?
// Solución manual: Usar React DevTools Profiler.
function App() {
  const [episodes, setEpisodes] = useState(0);
  return (
    <button onClick={() => setEpisodes(p => p + 1)}>
      Ver episodio (+1)
    </button>
  );
}`,
  },
  2: {
    title: "Paso 2: Fetch + AbortController",
    description:
      "Los animes se cargan con useEffect. Al desmontar, AbortController cancela la petición.",
    code: `// IA: [Problema] Memory leaks al desmontar componente.
// Solución manual: AbortController en el cleanup.
useEffect(() => {
  const controller = new AbortController();
  fetch(url, { signal: controller.signal })
    .then(res => res.json())
    .then(setData);
  return () => controller.abort();
}, []);`,
  },
  3: {
    title: "Paso 3: useContext (Tema Global)",
    description:
      "Haz clic en 'Oscuro/Claro'. El tema cambia en TODA la app sin pasar props.",
    code: `// IA: [Problema] Prop drilling para pasar el tema.
// Solución manual: Context API y Provider.
const ThemeContext = createContext();
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}`,
  },
  4: {
    title: "Paso 4: Optimización (useMemo + useRef)",
    description:
      "Escribe en el buscador. useMemo filtra sin re-calcular. 'Enfocar' usa useRef.",
    code: `// IA: [Problema] Filtrar en cada render es costoso.
// Solución manual: useMemo para memorizar resultados.
const filtered = useMemo(() => 
  animes.filter(a => a.title.includes(search)),
  [animes, search]
);

// useRef para focus sin re-render
const inputRef = useRef(null);`,
  },
  5: {
    title: "Paso 5: Hook Personalizado useFetch",
    description:
      "Toda la lógica de fetch está encapsulada en useFetch.js. Reutilizable en cualquier componente.",
    code: `// IA: [Problema] Lógica de fetch repetitiva.
// Solución manual: Encapsular en Custom Hook.
export function useFetch(url) {
  const [data, setData] = useState([]);
  // ... lógica de useEffect y AbortController
  return { data, loading, error };
}`,
  },
};
