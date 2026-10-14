// src/components/AnimeModal.jsx
import { X, Star, Calendar, Film } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function AnimeModal({ anime, onClose }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (!anime) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        animation: "fadeIn 0.3s ease-out",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="slide-in"
        style={{
          background: isDark ? "#1a1a2e" : "#ffffff",
          borderRadius: 16,
          maxWidth: 700,
          width: "90%",
          maxHeight: "90vh",
          overflow: "auto",
          border: `1px solid ${isDark ? "#2d2d44" : "#dee2e6"}`,
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ position: "relative" }}>
          <img
            src={
              anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url
            }
            alt={anime.title}
            style={{ width: "100%", height: 300, objectFit: "cover" }}
          />
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 15,
              right: 15,
              background: "rgba(0,0,0,0.7)",
              border: "none",
              borderRadius: "50%",
              width: 40,
              height: 40,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
            }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: 24 }}>
          <h2
            style={{
              fontSize: 24,
              marginBottom: 16,
              color: isDark ? "#fff" : "#212529",
            }}
          >
            {anime.title}
          </h2>

          <div
            style={{
              display: "flex",
              gap: 20,
              marginBottom: 20,
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Star size={18} fill="#ffd700" color="#ffd700" />
              <span style={{ color: isDark ? "#fff" : "#212529" }}>
                <strong>{anime.score || "N/A"}</strong>
              </span>
            </div>
            {anime.year && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Calendar size={18} color="#888" />
                <span style={{ color: isDark ? "#fff" : "#212529" }}>
                  {anime.year}
                </span>
              </div>
            )}
            {anime.episodes && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Film size={18} color="#888" />
                <span style={{ color: isDark ? "#fff" : "#212529" }}>
                  {anime.episodes} eps
                </span>
              </div>
            )}
          </div>

          {anime.synopsis && (
            <p
              style={{
                lineHeight: 1.6,
                color: isDark ? "#c9d1d9" : "#495057",
                marginBottom: 20,
              }}
            >
              {anime.synopsis}
            </p>
          )}

          {anime.genres && (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {anime.genres.map((genre) => (
                <span
                  key={genre.mal_id}
                  style={{
                    padding: "6px 12px",
                    background: "#e94560",
                    color: "#fff",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnimeModal;
