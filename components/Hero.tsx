import React from "react";
import styled from "styled-components";
import { PROFILE } from "../constants";
import { NavigateCallback } from "@/types";
import {
  ArrowRight,
} from "lucide-react";

const Section = styled.section`
  position: relative;
  padding: 5.3rem 1rem 1.4rem;
  margin-bottom: 2.4rem;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 5.8rem 1.5rem 1.8rem;
    margin-bottom: 3rem;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(to right, ${({ theme }) => `${theme.colors.border}22`} 1px, transparent 1px);
    background-size: 44px 100%;
    opacity: 0.38;
  }
`;

const Aura = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(70% 45% at 10% 10%, rgba(255, 255, 255, 0.05), transparent 60%),
    radial-gradient(60% 40% at 100% 0%, rgba(251, 146, 60, 0.08), transparent 65%);
`;

const Container = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1120px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;

  @media (min-width: 980px) {
    grid-template-columns: 1.12fr 0.88fr;
    align-items: center;
  }
`;

const Intro = styled.p`
  font-family: "Space Grotesk", sans-serif;
  font-style: italic;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: clamp(1.55rem, 3.8vw, 2.7rem);
  margin-bottom: 0.25rem;
  opacity: 0.45;
`;

const Title = styled.h1`
  font-size: clamp(2.6rem, 9vw, 5.9rem);
  line-height: 0.95;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.85rem;
`;

const Summary = styled.p`
  max-width: 58ch;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: clamp(0.98rem, 1.7vw, 1.12rem);
  line-height: 1.68;
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => `${theme.colors.text}14`};
  border: 1px solid ${({ theme }) => `${theme.colors.text}2f`};
  border-radius: 4px;
  padding: 0.03rem 0.35rem;
`;

const Actions = styled.div`
  margin-top: 1.1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
`;

const PrimaryAction = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border: 1px solid ${({ theme }) => theme.colors.text};
  border-radius: 999px;
  padding: 0.54rem 0.86rem;
  color: ${({ theme }) => theme.colors.primaryInverse};
  background: ${({ theme }) => theme.colors.text};
  font-size: 0.83rem;
  font-weight: 600;
`;

const SecondaryAction = styled.a`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  padding: 0.54rem 0.86rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.83rem;
  font-weight: 600;
`;

const Visual = styled.div`
  position: relative;
  min-height: 355px;
  display: grid;
  place-items: center;

  @media (max-width: 979px) {
    min-height: 300px;
  }
`;

const Polaroid = styled.div`
  width: min(360px, 84vw);
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 0.95rem 0.95rem 2.3rem;
  transform: rotate(-5deg);
  box-shadow: ${({ theme }) => theme.shadows.md};

  img {
    width: 100%;
    aspect-ratio: 4 / 5;
    object-fit: cover;
    filter: grayscale(0.8);
    border: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const PolaroidLabel = styled.p`
  position: absolute;
  bottom: 0.72rem;
  left: 50%;
  transform: translateX(-50%);
  font-family: "Space Grotesk", monospace;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;


const Tag = styled.div`
  position: absolute;
  left: 20%;
  top: 90%;
  transform: translate(-50%, -50%) rotate(5deg);
  z-index: 3;
  background: #0ea5e9;
  color: #e8f8ff;
  border-radius: 6px;
  font-size: 0.75rem;
  padding: 0.3rem 0.5rem;
  font-family: "Space Grotesk", sans-serif;
`;

interface HeroProps {
  onNavigate: NavigateCallback;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <Section>
      <Aura />
      <Container>
        <div>
          <Intro>Namaste,</Intro>
          <Title>I'm {PROFILE.name}.</Title>
          <Summary>
            <Highlight>{PROFILE.title}</Highlight> {PROFILE.bio}
          </Summary>

          <Actions>
            <PrimaryAction onClick={() => onNavigate("blogs")}>
              Read Blogs <ArrowRight size={14} />
            </PrimaryAction>
            <SecondaryAction href={PROFILE.resumeUrl} target="_blank" rel="noopener noreferrer">
              Resume
            </SecondaryAction>
          </Actions>
        </div>

        <Visual>
          <Polaroid>
            <img src={PROFILE.avatar} alt={PROFILE.name} />
            <PolaroidLabel>me.jpeg</PolaroidLabel>
          </Polaroid>
          <Tag>{PROFILE.name}</Tag>
        </Visual>
      </Container>
    </Section>
  );
};

export default Hero;
