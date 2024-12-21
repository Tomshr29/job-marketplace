import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// Types pour le contexte
interface ThemeContextType {
  theme: string; // Peut être "light" ou "dark"
  toggleTheme: () => void; // Fonction pour changer de thème
}

// Type pour les props du ThemeProvider
interface ThemeProviderProps {
  children: ReactNode; // Les enfants du fournisseur
}

// Crée le contexte avec un type par défaut (null pour commencer)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Fournisseur du contexte
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<string>("light");

  // Charger le thème depuis localStorage au premier rendu
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.className = savedTheme; // Remplace la classe sur <html>
  }, []);

  // Fonction pour basculer le thème
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.className = newTheme; // Met à jour <html>
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme doit être utilisé dans un ThemeProvider");
  }
  return context;
};
