import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { ViewState } from "../types";
import { Sun, Moon, Menu, X } from "lucide-react";

interface HeaderProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  darkMode: boolean;
  toggleTheme: () => void;
}

const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const HeaderContainer = styled.header<{
  $scrolled: boolean;
  $menuOpen: boolean;
}>`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 50;
  transition: all 0.3s ease;
  background-color: ${({ $scrolled, $menuOpen, theme }) =>
    $scrolled || $menuOpen ? theme.colors.background : "transparent"};

  ${({ $scrolled, $menuOpen, theme }) =>
    ($scrolled || $menuOpen) &&
    `
    border-bottom: 1px solid ${theme.colors.border};
    backdrop-filter: blur(8px);
    background-color: ${theme.colors.background}E6; /* Hex with opacity */
  `}
`;

const HeaderContent = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: -0.025em;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  z-index: 51;
`;

const NavGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const DesktopNav = styled.nav`
  display: none;
  gap: 2rem;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const NavLink = styled.button<{ $active?: boolean }>`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.text : theme.colors.textSecondary};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const IconButton = styled.button`
  padding: 0.5rem;
  border-radius: 9999px;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 51;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const MobileMenuButton = styled(IconButton)`
  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileMenuOverlay = styled.div`
  position: absolute;
  top: 64px;
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1rem;
  box-shadow: ${({ theme }) => theme.shadows.md};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: ${slideDown} 0.2s ease-out;

  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileNavLink = styled.button<{ $active?: boolean }>`
  text-align: left;
  font-size: 1.125rem;
  font-weight: 500;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.text : theme.colors.textSecondary};
  padding: 0.5rem 0;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  darkMode,
  toggleTheme,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (currentView !== "home") {
      onNavigate("home");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavClick = (view: ViewState) => {
    setMobileMenuOpen(false);
    onNavigate(view);
  };

  return (
    <HeaderContainer $scrolled={scrolled} $menuOpen={mobileMenuOpen}>
      <HeaderContent>
        <Logo onClick={() => handleNavClick("home")}>S.</Logo>

        <NavGroup>
          <DesktopNav>
            <NavLink
              $active={currentView === "home"}
              onClick={() => onNavigate("home")}
            >
              Home
            </NavLink>
            <NavLink onClick={() => handleScrollToSection("experience")}>
              Experience
            </NavLink>
            <NavLink onClick={() => handleScrollToSection("activity")}>
              Activity
            </NavLink>
            <NavLink
              $active={currentView.startsWith("blog")}
              onClick={() => onNavigate("blogs")}
            >
              Blogs
            </NavLink>
          </DesktopNav>

          <IconButton onClick={toggleTheme} aria-label="Toggle Dark Mode">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </IconButton>

          <MobileMenuButton
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </MobileMenuButton>
        </NavGroup>
      </HeaderContent>

      {mobileMenuOpen && (
        <MobileMenuOverlay>
          <MobileNavLink
            $active={currentView === "home"}
            onClick={() => handleNavClick("home")}
          >
            Home
          </MobileNavLink>
          <MobileNavLink onClick={() => handleScrollToSection("experience")}>
            Experience
          </MobileNavLink>
          <MobileNavLink onClick={() => handleScrollToSection("activity")}>
            Activity
          </MobileNavLink>
          <MobileNavLink
            $active={currentView.startsWith("blog")}
            onClick={() => handleNavClick("blogs")}
          >
            Blogs
          </MobileNavLink>
        </MobileMenuOverlay>
      )}
    </HeaderContainer>
  );
};

export default Header;
