// src/components/AnimeCard.jsx
import { memo } from "react";
import { Heart, Star } from "lucide-react";

const AnimeCard = memo(function AnimeCard({
  anime,
  onFavorite,
  isFavorite,
  theme,
  onClick,
}) {
  const isDark = theme === "dark";

  return (
    <div
      onClick={onClick}
      style={{
        border: `1px solid ${isDark ? "#2d2d44" : "#dee2e6"}`,
        borderRadius: 12,
        overflow: "hidden",
        background: isDark ? "#1a1a2e" : "#ffffff",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = "0 12px 24px rgba(233, 69, 96, 0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          src={
            anime.images?.jpg?.image_url || "https://via.placeholder.com/200"
          }
          alt={anime.title}
          style={{
            width: "100%",
            height: 280,
            objectFit: "cover",
            transition: "transform 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        />
        {anime.score && (
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              background: "rgba(0,0,0,0.8)",
              padding: "4px 8px",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: 12,
              color: "#ffd700",
              fontWeight: 600,
            }}
          >
            <Star size={12} fill="#ffd700" />
            {anime.score}
          </div>
        )}
      </div>

      <div style={{ padding: 12 }}>
        <h3
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: isDark ? "#fff" : "#212529",
            margin: "0 0 8px 0",
            lineHeight: 1.3,
            height: 36,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {anime.title}
        </h3>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavorite(anime);
          }}
          style={{
            width: "100%",
            padding: "8px 12px",
            background: isFavorite ? "#e94560" : isDark ? "#0f3460" : "#0f3460",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#e94560")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = isFavorite
              ? "#e94560"
              : "#0f3460")
          }
        >
          <Heart size={14} fill={isFavorite ? "#fff" : "none"} />
          {isFavorite ? "Favorito" : "Agregar"}
        </button>
      </div>
    </div>
  );
});

export default AnimeCard;
