import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ViewState } from "../types";
import { Sun, Moon, Menu, X } from "lucide-react";

interface HeaderProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  darkMode: boolean;
  toggleTheme: () => void;
}

const HeaderContainer = styled.header<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 60;
  border-bottom: 1px solid ${({ theme, $scrolled }) => ($scrolled ? theme.colors.border : "transparent")};
  background: ${({ theme, $scrolled }) => ($scrolled ? `${theme.colors.background}f0` : "transparent")};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? "blur(6px)" : "none")};
`;

const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  height: 62px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`;

const Brand = styled.button`
  font-family: "Sora", sans-serif;
  font-size: 0.88rem;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.text};
`;

const NavGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const DesktopNav = styled.nav`
  display: none;
  align-items: center;
  gap: 0.15rem;

  @media (min-width: 880px) {
    display: flex;
  }
`;

const NavLink = styled.button<{ $active?: boolean }>`
  font-size: 0.82rem;
  color: ${({ $active, theme }) => ($active ? theme.colors.text : theme.colors.textSecondary)};
  padding: 0.4rem 0.55rem;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const IconButton = styled.button`
  width: 2rem;
  height: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const MobileMenuButton = styled(IconButton)`
  @media (min-width: 880px) {
    display: none;
  }
`;

const MobileMenu = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  padding: 0.65rem 1rem 0.85rem;
  display: grid;
  gap: 0.25rem;

  @media (min-width: 880px) {
    display: none;
  }
`;

const MobileNavLink = styled.button<{ $active?: boolean }>`
  text-align: left;
  font-size: 0.9rem;
  color: ${({ $active, theme }) => ($active ? theme.colors.text : theme.colors.textSecondary)};
  padding: 0.4rem 0;
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
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (currentView !== "home") {
      onNavigate("home");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavClick = (view: ViewState) => {
    setMobileMenuOpen(false);
    onNavigate(view);
  };

  return (
    <HeaderContainer $scrolled={scrolled}>
      <HeaderContent>
        <Brand onClick={() => handleNavClick("home")}>SOUNAK GUPTA</Brand>

        <NavGroup>
          <DesktopNav>
            <NavLink $active={currentView === "home"} onClick={() => onNavigate("home")}>Home</NavLink>
            <NavLink onClick={() => handleScrollToSection("experience")}>Experience</NavLink>
            <NavLink onClick={() => handleScrollToSection("showcase")}>Showcase</NavLink>
            <NavLink onClick={() => handleScrollToSection("tools")}>Tools</NavLink>
            <NavLink onClick={() => handleScrollToSection("activity")}>Activity</NavLink>
            <NavLink $active={currentView.startsWith("blog")} onClick={() => onNavigate("blogs")}>Blogs</NavLink>
          </DesktopNav>

          <IconButton onClick={toggleTheme} aria-label="Toggle theme">
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </IconButton>

          <MobileMenuButton onClick={() => setMobileMenuOpen((v) => !v)} aria-label="Menu">
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </MobileMenuButton>
        </NavGroup>
      </HeaderContent>

      {mobileMenuOpen && (
        <MobileMenu>
          <MobileNavLink $active={currentView === "home"} onClick={() => handleNavClick("home")}>Home</MobileNavLink>
          <MobileNavLink onClick={() => handleScrollToSection("experience")}>Experience</MobileNavLink>
          <MobileNavLink onClick={() => handleScrollToSection("showcase")}>Showcase</MobileNavLink>
          <MobileNavLink onClick={() => handleScrollToSection("tools")}>Tools</MobileNavLink>
          <MobileNavLink onClick={() => handleScrollToSection("activity")}>Activity</MobileNavLink>
          <MobileNavLink $active={currentView.startsWith("blog")} onClick={() => handleNavClick("blogs")}>Blogs</MobileNavLink>
        </MobileMenu>
      )}
    </HeaderContainer>
  );
};

export default Header;
