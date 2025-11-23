import { createGlobalStyle } from "styled-components";

const neutral = {
  50: "#f9fafb",
  100: "#f3f4f6",
  200: "#e5e7eb",
  300: "#d1d5db",
  400: "#9ca3af",
  500: "#6b7280",
  600: "#4b5563",
  700: "#374151",
  800: "#1f2937",
  900: "#111827",
  950: "#030712",
};

export const lightTheme = {
  colors: {
    background: neutral[50],
    backgroundAlt: neutral[100],
    text: neutral[900],
    textSecondary: neutral[500],
    textMuted: neutral[400],
    border: neutral[200],
    primary: neutral[900],
    primaryInverse: neutral[50],
    hover: neutral[200],
    cardBg: "#ffffff",
    accent: "#2563eb",
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
  },
};

export const darkTheme = {
  colors: {
    background: neutral[950],
    backgroundAlt: neutral[900],
    text: neutral[50],
    textSecondary: neutral[400],
    textMuted: neutral[600],
    border: neutral[800],
    primary: neutral[50],
    primaryInverse: neutral[900],
    hover: neutral[800],
    cardBg: neutral[900],
    accent: "#60a5fa",
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.5)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.5)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.5)",
  },
};

export type ThemeType = typeof lightTheme;

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: background-color 0.3s ease, color 0.3s ease;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.textSecondary};
  }
`;
