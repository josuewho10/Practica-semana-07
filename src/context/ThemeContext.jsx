// src/context/ThemeContext.jsx
import { createContext, useContext, useState } from "react";

// IA: [Problema] Pasar el estado del tema por props a cada componente (prop drilling) ensucia el código.
// Solución manual: Crear un Contexto global para el tema y un Provider para inyectarlo.
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    // IA: [Problema] Los componentes hijos no pueden acceder al estado sin recibirlo por props.
    // Solución manual: Envolver la app en el Provider y pasar el valor (value) que todos consumirán.
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// IA: [Problema] Llamar useContext(ThemeContext) directamente en cada componente es repetitivo.
// Solución manual: Crear un Custom Hook (useTheme) para encapsular el consumo del contexto.
export const useTheme = () => useContext(ThemeContext);
