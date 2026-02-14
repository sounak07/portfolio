import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ViewState } from "../types";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 70;
  padding: 0.75rem 1rem 0;
`;

const DesktopWrap = styled.div`
  display: none;

  @media (min-width: 940px) {
    display: flex;
    justify-content: center;
  }
`;

const Capsule = styled.div`
  height: 56px;
  border-radius: 999px;
  border: 0.05px solid ${({ theme }) => `${theme.colors.border}66`};
  background: ${({ theme }) => `${theme.colors.background}d9`};
  backdrop-filter: blur(8px);
  display: inline-flex;
  align-items: center;
  gap: 0.05rem;
  padding: 0.36rem;
`;

const BrandGroup = styled.button`
  display: inline-flex;
  align-items: baseline;
  gap: 0.45rem;
  border-radius: 999px;
  padding: 0.46rem 0.84rem;
  color: ${({ theme }) => theme.colors.text};

  span:first-child {
    font-family: "Sora", sans-serif;
    font-size: 1.05rem;
    font-weight: 700;
  }

  span:last-child {
    font-size: 0.72rem;
    color: ${({ theme }) => theme.colors.textMuted};
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
`;

const NavLink = styled.button<{ $active?: boolean }>`
  font-size: 0.95rem;
  color: ${({ $active, theme }) => ($active ? theme.colors.text : theme.colors.textSecondary)};
  border-radius: 999px;
  padding: 0.45rem 0.84rem;
  line-height: 1;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ContactButton = styled.a`
  margin-left: 0.22rem;
  border-radius: 999px;
  padding: 0.5rem 0.95rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => `${theme.colors.backgroundAlt}40`};
  line-height: 1;

`;

const MobileBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: ${({ theme }) => `${theme.colors.background}ee`};
  backdrop-filter: blur(8px);
  padding: 0 0.7rem;

  @media (min-width: 940px) {
    display: none;
  }
`;

const MobileBrand = styled.button`
  font-family: "Sora", sans-serif;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 0.02em;
`;

const MobileActions = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
`;

const IconButton = styled.button`
  width: 1.9rem;
  height: 1.9rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const MobileMenu = styled.div`
  margin-top: 0.45rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: ${({ theme }) => `${theme.colors.background}f5`};
  padding: 0.7rem;
  display: grid;
  gap: 0.24rem;

  @media (min-width: 940px) {
    display: none;
  }
`;

const MobileNavLink = styled.button<{ $active?: boolean }>`
  text-align: left;
  font-size: 0.9rem;
  color: ${({ $active, theme }) => ($active ? theme.colors.text : theme.colors.textSecondary)};
  padding: 0.4rem 0.2rem;
`;

const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [istTime, setIstTime] = useState("");

  useEffect(() => {
    const updateIST = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      });
      setIstTime(`${formatter.format(now)} IST`);
    };

    updateIST();
    const interval = setInterval(updateIST, 60_000);
    return () => clearInterval(interval);
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
    <HeaderContainer>
      <DesktopWrap>
        <Capsule>
          <BrandGroup onClick={() => handleNavClick("home")}>
            <span>SK</span>
            <span>{istTime}</span>
          </BrandGroup>

          <NavLink onClick={() => handleScrollToSection("experience")}>About</NavLink>
          <NavLink onClick={() => handleScrollToSection("showcase")}>Work</NavLink>
          <NavLink onClick={() => handleScrollToSection("tools")}>Tools I Use</NavLink>
          <NavLink $active={currentView.startsWith("blog")} onClick={() => onNavigate("blogs")}>Blogs</NavLink>

          <ContactButton href="mailto:sounakume@gmail.com">Get in Touch</ContactButton>
        </Capsule>
      </DesktopWrap>

      <MobileBar>
        <MobileBrand onClick={() => handleNavClick("home")}>OG</MobileBrand>
        <MobileActions>
          <IconButton onClick={() => setMobileMenuOpen((v) => !v)} aria-label="Menu">
            {mobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
          </IconButton>
        </MobileActions>
      </MobileBar>

      {mobileMenuOpen && (
        <MobileMenu>
          <MobileNavLink onClick={() => handleScrollToSection("experience")}>About</MobileNavLink>
          <MobileNavLink onClick={() => handleScrollToSection("showcase")}>Work</MobileNavLink>
          <MobileNavLink onClick={() => handleScrollToSection("tools")}>Tools I Use</MobileNavLink>
          <MobileNavLink onClick={() => handleScrollToSection("activity")}>Activity</MobileNavLink>
          <MobileNavLink $active={currentView.startsWith("blog")} onClick={() => handleNavClick("blogs")}>Blogs</MobileNavLink>
          <MobileNavLink as="a" href="mailto:sounakume@gmail.com">Get in Touch</MobileNavLink>
        </MobileMenu>
      )}
    </HeaderContainer>
  );
};

export default Header;
