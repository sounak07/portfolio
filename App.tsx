import React, { useState, useEffect } from "react";
import styled, { ThemeProvider, keyframes } from "styled-components";
import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import Header from "./components/Header";
import { Analytics } from "@vercel/analytics/react";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import GithubActivity from "./components/Projects";
import Blogs from "./components/Blogs";
import BlogDetail from "./components/BlogDetail";
import { ViewState } from "./types";
import { GlobalStyles, lightTheme, darkTheme } from "./styles";
import { useSEO } from "./hooks/useSEO";

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
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  const getCurrentView = (): ViewState => {
    if (location.pathname === '/') return 'home';
    if (location.pathname === '/blogs') return 'blogs';
    if (location.pathname.startsWith('/blog/')) return 'blog-detail';
    return 'home';
  };

  const currentView = getCurrentView();

  // SEO for main routes (blog detail handles its own SEO)
  const getSEOConfig = () => {
    if (location.pathname === '/') {
      return {}; // Use defaults from useSEO
    }
    if (location.pathname === '/blogs') {
      return {
        title: 'Blog',
        description: 'Technical blogs by Sounak Gupta on distributed systems, Kafka, databases, system design, and backend engineering.',
        url: '/blogs',
      };
    }
    return {};
  };

  // Only apply SEO for non-blog-detail pages (BlogDetail handles its own)
  const shouldApplySEO = !location.pathname.startsWith('/blog/');
  useSEO(shouldApplySEO ? getSEOConfig() : {});

  const handleNavigate = (view: ViewState) => {
    if (view === 'home') navigate('/');
    else if (view === 'blogs') navigate('/blogs');
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
          <Routes>
            <Route path="/" element={
              <AnimatedSection>
                <Hero onNavigate={() => handleNavigate("blogs")} />
                <Experience />
                <GithubActivity />
              </AnimatedSection>
            } />
            <Route path="/blogs" element={
              <AnimatedSection>
                <Blogs />
              </AnimatedSection>
            } />
            <Route path="/blog/:slug" element={
              <AnimatedSection>
                <BlogDetail />
              </AnimatedSection>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Main>

        <Footer>
          <p>© {new Date().getFullYear()} | Made by Sounak with ❤️</p>
        </Footer>
        <Analytics />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
