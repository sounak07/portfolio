import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  colors: {
    background: "#f7f7f6",
    backgroundAlt: "#f0f0ef",
    text: "#151515",
    textSecondary: "#3f3f3f",
    textMuted: "#6f6f6f",
    border: "#dfdfdd",
    primary: "#161616",
    primaryInverse: "#f8f8f8",
    hover: "#ececeb",
    cardBg: "#ffffff",
    accent: "#2a2a2a",
  },
  shadows: {
    sm: "0 2px 8px rgb(0 0 0 / 0.05)",
    md: "0 8px 22px rgb(0 0 0 / 0.08)",
    lg: "0 14px 40px rgb(0 0 0 / 0.12)",
  },
};

export const darkTheme = {
  colors: {
    background: "#131313",
    backgroundAlt: "#191919",
    text: "#ececec",
    textSecondary: "#b6b6b6",
    textMuted: "#868686",
    border: "#2a2a2a",
    primary: "#ebebeb",
    primaryInverse: "#141414",
    hover: "#222222",
    cardBg: "#161616",
    accent: "#d2d2d2",
  },
  shadows: {
    sm: "0 2px 10px rgb(0 0 0 / 0.26)",
    md: "0 8px 24px rgb(0 0 0 / 0.34)",
    lg: "0 14px 44px rgb(0 0 0 / 0.42)",
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
    font-family: 'Manrope', 'Space Grotesk', sans-serif;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: background-color 0.3s ease, color 0.3s ease;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
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

  h1, h2, h3, h4, h5 {
    font-family: 'Sora', 'Manrope', sans-serif;
    letter-spacing: -0.02em;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.primaryInverse};
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    border: 2px solid transparent;
    background-clip: content-box;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.textSecondary};
  }
`;
