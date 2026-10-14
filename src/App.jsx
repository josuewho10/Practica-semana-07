// src/App.jsx
import { useState, useMemo, useCallback, useRef } from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { useFetch } from "./hooks/useFetch";
import AnimeCard from "./components/AnimeCard";
import AnimeModal from "./components/AnimeModal";
import SkeletonCard from "./components/SkeletonCard";
import { codeSnippets } from "./data/codeSnippets";
import { Play, Code, Moon, Sun, Search, Focus, Sparkles } from "lucide-react";

function AppContent() {
  const { theme, toggleTheme } = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState(null);

  // IA: [problema] Necesitamos acceder al DOM para enfocar el input, pero hacerlo vía estado causaría un re-render innecesario.
  // Solución manual: useRef accede al nodo del DOM directamente sin disparar actualizaciones en la UI.
  const searchInputRef = useRef(null);

  // IA: [problema] Lógica de fetch repetitiva y propensa a memory leaks si no se limpia adecuadamente.
  // Solución manual: Encapsular en Hook Personalizado useFetch (Paso 5) que ya incluye AbortController.
  const { data: animes, loading, error } = useFetch("mock-url");

  // IA: [problema] Filtrar la lista de animes en cada render es costoso computacionalmente y dispara re-renders innecesarios.
  // Solución manual: useMemo memoriza el resultado y solo recalcula si cambian las dependencias (animes, searchTerm).
  const filteredAnimes = useMemo(() => {
    if (!searchTerm) return animes;
    return animes.filter((anime) =>
      anime.title?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [animes, searchTerm]);

  // IA: [problema] Pasar una función nueva en cada render rompe la memoización de los componentes hijos (AnimeCard con React.memo).
  // Solución manual: useCallback estabiliza la referencia de la función para evitar re-renders innecesarios en los hijos.
  const handleFavorite = useCallback((anime) => {
    setFavorites((prev) => {
      const exists = prev.find((f) => f.mal_id === anime.mal_id);
      if (exists) return prev.filter((f) => f.mal_id !== anime.mal_id);
      return [...prev, anime];
    });
  }, []);

  const focusSearch = useCallback(() => {
    searchInputRef.current?.focus();
  }, []);

  const isFavorite = useCallback(
    (anime) => {
      return favorites.some((f) => f.mal_id === anime.mal_id);
    },
    [favorites],
  );

  const isDark = theme === "dark";
  const bg = isDark ? "#0a0a1a" : "#f8f9fa";
  const text = isDark ? "#ffffff" : "#212529";
  const cardBg = isDark ? "#1a1a2e" : "#ffffff";
  const border = isDark ? "#2d2d44" : "#dee2e6";

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: bg,
        color: text,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* LADO IZQUIERDO: La Aplicación Real */}
      <div style={{ flex: 1, padding: "24px", overflowY: "auto" }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
            padding: "20px 24px",
            background: isDark
              ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
              : "#ffffff",
            borderRadius: 16,
            border: `1px solid ${border}`,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: 28,
                background: "linear-gradient(135deg, #e94560 0%, #ff6b6b 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <Sparkles size={32} />
              Directorio de Animes
            </h1>
            <p style={{ margin: "8px 0 0", opacity: 0.7, fontSize: 14 }}>
              Semana 07 - React Hooks Avanzados
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div
              style={{
                padding: "8px 16px",
                background: isDark ? "#0f3460" : "#e9ecef",
                borderRadius: 20,
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              📚 {favorites.length} favoritos
            </div>
            <button
              onClick={toggleTheme}
              style={{
                padding: "10px 20px",
                background: "linear-gradient(135deg, #e94560 0%, #ff6b6b 100%)",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 14,
                fontWeight: 500,
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
              {isDark ? "Modo Claro" : "Modo Oscuro"}
            </button>
          </div>
        </header>

        <div
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 24,
            background: cardBg,
            padding: 16,
            borderRadius: 12,
            border: `1px solid ${border}`,
          }}
        >
          <div style={{ flex: 1, position: "relative" }}>
            <Search
              size={18}
              style={{ position: "absolute", left: 14, top: 14, opacity: 0.5 }}
            />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Buscar anime por título..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 12px 12px 44px",
                fontSize: 15,
                border: `2px solid ${border}`,
                borderRadius: 10,
                background: isDark ? "#0a0a1a" : "#ffffff",
                color: text,
                boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#e94560")}
              onBlur={(e) => (e.target.style.borderColor = border)}
            />
          </div>
          <button
            onClick={focusSearch}
            style={{
              padding: "12px 24px",
              background: "linear-gradient(135deg, #0f3460 0%, #16213e 100%)",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 14,
              fontWeight: 500,
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <Focus size={16} /> Enfocar Input
          </button>
        </div>

        {loading ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 20,
            }}
          >
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : error ? (
          <div
            style={{
              textAlign: "center",
              padding: 60,
              color: "#e94560",
              background: cardBg,
              borderRadius: 16,
              border: `1px solid ${border}`,
            }}
          >
            <h2 style={{ fontSize: 24, marginBottom: 12 }}>
              ❌ Error al cargar
            </h2>
            <p>{error}</p>
          </div>
        ) : (
          <div
            className="fade-in"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 20,
            }}
          >
            {filteredAnimes.map((anime) => (
              <AnimeCard
                key={anime.mal_id}
                anime={anime}
                onFavorite={handleFavorite}
                isFavorite={isFavorite(anime)}
                theme={theme}
                onClick={() => setSelectedAnime(anime)}
              />
            ))}
          </div>
        )}

        {!loading && filteredAnimes.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: 60,
              opacity: 0.6,
              background: cardBg,
              borderRadius: 16,
              border: `1px solid ${border}`,
            }}
          >
            <h3 style={{ fontSize: 20, marginBottom: 8 }}>
              No se encontraron animes 😢
            </h3>
            <p>Intenta con otro término de búsqueda</p>
          </div>
        )}
      </div>

      {/* LADO DERECHO: Panel de Pasos y Código */}
      <div
        style={{
          width: 420,
          borderLeft: `1px solid ${border}`,
          display: "flex",
          flexDirection: "column",
          background: cardBg,
          boxShadow: "-4px 0 20px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            padding: 24,
            borderBottom: `1px solid ${border}`,
            background: isDark
              ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
              : "#ffffff",
          }}
        >
          <h2
            style={{
              margin: "0 0 20px 0",
              fontSize: 20,
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: isDark ? "#fff" : "#212529",
            }}
          >
            <Code size={24} />
            Pasos de la Práctica
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[1, 2, 3, 4, 5].map((step) => (
              <button
                key={step}
                onClick={() => setActiveStep(activeStep === step ? 0 : step)}
                style={{
                  padding: "12px 18px",
                  background:
                    activeStep === step
                      ? "linear-gradient(135deg, #e94560 0%, #ff6b6b 100%)"
                      : isDark
                        ? "#2d2d44"
                        : "#e9ecef",
                  color: activeStep === step ? "#fff" : text,
                  border: "none",
                  borderRadius: 10,
                  cursor: "pointer",
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontSize: 14,
                  fontWeight: activeStep === step ? 600 : 400,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: activeStep === step ? "scale(1.02)" : "scale(1)",
                }}
                onMouseEnter={(e) => {
                  if (activeStep !== step) {
                    e.currentTarget.style.transform = "translateX(4px)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    activeStep === step ? "scale(1.02)" : "scale(1)";
                }}
              >
                <Play
                  size={16}
                  fill={activeStep === step ? "#fff" : "currentColor"}
                />
                <span>Activar Paso {step}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, padding: 24, overflowY: "auto" }}>
          {activeStep > 0 ? (
            <div className="slide-in">
              <h3
                style={{
                  margin: "0 0 8px 0",
                  fontSize: 18,
                  color: "#e94560",
                  fontWeight: 600,
                }}
              >
                {codeSnippets[activeStep].title}
              </h3>
              <p
                style={{
                  margin: "0 0 20px 0",
                  fontSize: 13,
                  opacity: 0.8,
                  fontStyle: "italic",
                  lineHeight: 1.5,
                }}
              >
                💡 {codeSnippets[activeStep].description}
              </p>
              <h4
                style={{
                  margin: "0 0 12px 0",
                  fontSize: 14,
                  opacity: 0.7,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                📄 Código en Vivo (JSX)
              </h4>
              <pre
                style={{
                  background: isDark ? "#0d1117" : "#f8f9fa",
                  padding: 16,
                  borderRadius: 10,
                  fontSize: 11,
                  overflowX: "auto",
                  border: `1px solid ${border}`,
                  color: isDark ? "#c9d1d9" : "#212529",
                  lineHeight: 1.6,
                  maxHeight: "450px",
                  fontFamily: "Fira Code, Consolas, monospace",
                }}
              >
                <code>{codeSnippets[activeStep].code}</code>
              </pre>
            </div>
          ) : (
            <div style={{ textAlign: "center", opacity: 0.6, marginTop: 60 }}>
              <Code size={64} style={{ marginBottom: 16, opacity: 0.3 }} />
              <p style={{ fontSize: 16, marginBottom: 8 }}>
                Selecciona un paso
              </p>
              <p style={{ fontSize: 13 }}>
                Haz clic en cualquier botón para ver el código y la explicación
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Detalles */}
      {selectedAnime && (
        <AnimeModal
          anime={selectedAnime}
          onClose={() => setSelectedAnime(null)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
