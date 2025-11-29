import React, { useState, useEffect } from "react";
import styled, { ThemeProvider, keyframes } from "styled-components";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import GithubActivity from "./components/Projects";
import Blogs from "./components/Blogs";
import { ViewState } from "./types";
import { GlobalStyles, lightTheme, darkTheme } from "./styles";

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex-grow: 1;
  width: 100%;
`;

const Footer = styled.footer`
  padding: 2rem 0;
  text-align: center;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: auto;
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const AnimatedSection = styled.div`
  animation: ${fadeIn} 0.5s ease-out;
`;

function App() {
  const [currentView, setCurrentView] = useState<ViewState>("home");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <AppContainer>
        <Header
          currentView={currentView}
          onNavigate={handleNavigate}
          darkMode={darkMode}
          toggleTheme={toggleTheme}
        />

        <Main>
          {currentView === "home" && (
            <AnimatedSection>
              <Hero onNavigate={() => handleNavigate("blogs")} />
              <Experience />
              <GithubActivity />
            </AnimatedSection>
          )}

          {(currentView === "blogs" || currentView === "blog-detail") && (
            <AnimatedSection>
              <Blogs onBack={() => handleNavigate("home")} />
            </AnimatedSection>
          )}
        </Main>

        <Footer>
          <p>© {new Date().getFullYear()} Sounak</p>
        </Footer>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
