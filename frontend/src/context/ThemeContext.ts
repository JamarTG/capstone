import { createContext } from "react";

export interface ThemeContextProps {
  isDark: boolean;
  toggleTheme: VoidFunction;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);
