import React from "react";
import styled, { keyframes } from "styled-components";
import { PROFILE, SOCIAL_LINKS } from "../constants";
import { NavigateCallback } from "@/types";
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Layers,
  FileText,
  Coffee,
  Mail,
  BookOpen,
} from "lucide-react";

const IconMap: Record<string, React.ComponentType<any>> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  stackoverflow: Layers,
  topmate: Coffee,
  mail: Mail,
};

// Animations
const slideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const zoomIn = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

const Section = styled.section`
  padding-top: 5rem;
  padding-bottom: 4rem;
  padding-left: 1rem;
  padding-right: 1rem;
  max-width: 800px;
  margin: 0 auto;
  min-height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4rem;

  @media (min-width: 768px) {
    padding-top: 10rem;
    padding-bottom: 6rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    min-height: 80vh;
    gap: 6rem;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 2rem;
  align-items: center;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.025em;
  
  @media (min-width: 768px) {
    font-size: 4rem;
  }
`;

const SocialLinksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
`;

const SocialLink = styled.a`
  padding: 0.5rem;
  border-radius: 9999px;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all 0.2s;
  border: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    background-color: ${({ theme }) => theme.colors.text};
    color: ${({ theme }) => theme.colors.background};
    border-color: ${({ theme }) => theme.colors.text};
    transform: translateY(-2px);
  }
`;

const ImageContainer = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid ${({ theme }) => theme.colors.border};
  animation: ${zoomIn} 1s ease-out backwards;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AboutSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: ${slideUp} 1s ease-out 0.5s backwards;
`;

const AboutHeading = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  
  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const BioParagraph = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.625;
  
  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`;

const Link = styled.a`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: underline;
  text-decoration-color: ${({ theme }) => theme.colors.textSecondary};
  text-underline-offset: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration-color: ${({ theme }) => theme.colors.primary};
  }
`;

interface HeroProps {
  onNavigate: NavigateCallback;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <Section>
      <HeaderContainer>
        <HeaderContent>
          <Title>hi, {PROFILE.name.toLowerCase()} here</Title>
          <SocialLinksContainer>
            {SOCIAL_LINKS.map((link) => {
              const Icon = IconMap[link.icon] || Layers;
              return (
                <SocialLink
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                >
                  <Icon size={20} />
                </SocialLink>
              );
            })}
          </SocialLinksContainer>
        </HeaderContent>

        <ImageContainer>
          <img src={PROFILE.avatar} alt={PROFILE.name} />
        </ImageContainer>
      </HeaderContainer>

      <AboutSection>
        <AboutHeading>about</AboutHeading>
        
        <BioParagraph>
          tldr; {PROFILE.bio.split(".")[0].toLowerCase()}.
        </BioParagraph>

        <BioParagraph>
          i have deep expertise in data structures, algorithms, OOP, and design patterns.
        </BioParagraph>

        <BioParagraph>
          i really love building teams, taking an orgs engineering culture and unleveling them.
        </BioParagraph>

        <BioParagraph>
          read me blogs,{" "}
          <Link onClick={() => onNavigate("blogs")}>here</Link>.
        </BioParagraph>
      </AboutSection>
    </Section>
  );
};

export default Hero;
