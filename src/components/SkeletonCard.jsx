// src/components/SkeletonCard.jsx
import { useTheme } from "../context/ThemeContext";

function SkeletonCard() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      style={{
        background: isDark ? "#1a1a2e" : "#ffffff",
        borderRadius: 12,
        overflow: "hidden",
        border: `1px solid ${isDark ? "#2d2d44" : "#dee2e6"}`,
      }}
    >
      <div
        style={{
          width: "100%",
          height: 280,
          background: isDark
            ? "linear-gradient(90deg, #1a1a2e 25%, #2d2d44 50%, #1a1a2e 75%)"
            : "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s infinite",
        }}
      />
      <div style={{ padding: 12 }}>
        <div
          style={{
            height: 16,
            background: isDark ? "#2d2d44" : "#e0e0e0",
            borderRadius: 4,
            marginBottom: 8,
            animation: "pulse 1.5s infinite",
          }}
        />
        <div
          style={{
            height: 12,
            background: isDark ? "#2d2d44" : "#e0e0e0",
            borderRadius: 4,
            width: "60%",
            animation: "pulse 1.5s infinite 0.3s",
          }}
        />
      </div>
    </div>
  );
}

export default SkeletonCard;
