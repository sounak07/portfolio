import React from "react";
import styled from "styled-components";
import { PROFILE, SOCIAL_LINKS } from "../constants";
import { NavigateCallback } from "@/types";
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Layers,
  Coffee,
  Mail,
  MapPin,
  ArrowRight,
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

const Section = styled.section`
  padding: 6.6rem 1rem 3rem;

  @media (min-width: 768px) {
    padding: 7.2rem 1.5rem 3.8rem;
  }
`;

const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 980px) {
    grid-template-columns: 1.25fr 0.75fr;
  }
`;

const Content = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 1.1rem;
  background: ${({ theme }) => theme.colors.cardBg};
`;

const Eyebrow = styled.p`
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 0.6rem;
`;

const Title = styled.h1`
  font-size: clamp(1.8rem, 4.5vw, 3rem);
  line-height: 1.12;
  margin-bottom: 0.8rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
  max-width: 64ch;
`;

const MetaRow = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.86rem;
`;

const Actions = styled.div`
  margin-top: 1.1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

const PrimaryAction = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  border: 1px solid ${({ theme }) => theme.colors.text};
  border-radius: 8px;
  padding: 0.52rem 0.72rem;
  color: ${({ theme }) => theme.colors.primaryInverse};
  background: ${({ theme }) => theme.colors.text};
  font-size: 0.84rem;
`;

const SecondaryAction = styled.a`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 0.52rem 0.72rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.84rem;
`;

const SideCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 1.1rem;
  background: ${({ theme }) => theme.colors.cardBg};
  display: grid;
  gap: 0.8rem;
`;

const Avatar = styled.img`
  width: 88px;
  height: 88px;
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Name = styled.h2`
  font-size: 1rem;
`;

const SocialLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
`;

const SocialLink = styled.a`
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
  }
`;

interface HeroProps {
  onNavigate: NavigateCallback;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <Section>
      <Container>
        <Content>
          <Eyebrow>{PROFILE.title}</Eyebrow>
          <Title>Engineering reliable backend systems at scale.</Title>
          <Description>{PROFILE.bio}</Description>
          <MetaRow>
            <MapPin size={14} /> {PROFILE.location}
          </MetaRow>

          <Actions>
            <PrimaryAction onClick={() => onNavigate("blogs")}>Read Blogs <ArrowRight size={14} /></PrimaryAction>
            <SecondaryAction href={PROFILE.resumeUrl} target="_blank" rel="noopener noreferrer">
              Resume
            </SecondaryAction>
          </Actions>
        </Content>

        <SideCard>
          <Avatar src={PROFILE.avatar} alt={PROFILE.name} />
          <Name>{PROFILE.name}</Name>
          <Description>Open to impactful backend work, architecture reviews, and mentoring.</Description>
          <SocialLinks>
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
                  <Icon size={15} />
                </SocialLink>
              );
            })}
          </SocialLinks>
        </SideCard>
      </Container>
    </Section>
  );
};

export default Hero;
