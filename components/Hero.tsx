import React, { useEffect, useMemo, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { PROFILE, SOCIAL_LINKS } from "../constants";
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
import { NavigateCallback } from "@/types";

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
const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const zoomIn = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

const Section = styled.section`
  padding-top: 8rem;
  padding-bottom: 4rem;
  padding-left: 1rem;
  padding-right: 1rem;
  max-width: 1024px;
  margin: 0 auto;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 768px) {
    padding-top: 12rem;
    padding-bottom: 6rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row-reverse;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

const ProfileImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  animation: ${zoomIn} 1s ease-out 0.5s backwards;

  @media (min-width: 768px) {
    justify-content: flex-end;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 8rem;
  height: 8rem;
  border-radius: 9999px;
  padding: 0.25rem;
  background: linear-gradient(
    to bottom right,
    ${({ theme }) => theme.colors.border},
    ${({ theme }) => theme.colors.background}
  );
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};

  img {
    width: 100%;
    height: 100%;
    border-radius: 9999px;
    object-fit: cover;
  }

  @media (min-width: 768px) {
    width: 12rem;
    height: 12rem;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  max-width: 42rem;
  width: 100%;
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const NameHeading = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.2;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  @media (min-width: 768px) {
    font-size: 4.5rem;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  padding-top: 1rem;
  animation: ${slideUp} 1s ease-out 1s backwards;
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryInverse};
  font-weight: 500;
  transition: all 0.2s;
  box-shadow: ${({ theme }) => theme.shadows.md};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.textSecondary};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    color: ${({ theme }) => theme.colors.primaryInverse};
  }
`;

const SecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const GradientText = styled.span`
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  background-image: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.text},
    ${({ theme }) => theme.colors.textSecondary},
    ${({ theme }) => theme.colors.textMuted}
  );
`;

const BlinkingCursor = styled.span<{ $height: string }>`
  display: inline-block;
  width: 4px;
  height: ${(props) => props.$height};
  background-color: ${({ theme }) => theme.colors.text};
  margin-left: 0.25rem;
  vertical-align: middle;
  animation: ${blink} 1s step-end infinite;
`;

const TitleHeading = styled.h2`
  font-size: 1.25rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  height: 1.5em;
  display: flex;
  align-items: center;

  @media (min-width: 768px) {
    font-size: 1.875rem;
  }
`;

const Bio = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.625;
  max-width: 42rem;
  animation: ${slideUp} 1s ease-out 1s backwards;
`;

const SocialLinksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  animation: ${slideUp} 1s ease-out 1s backwards;
`;

const SocialLink = styled.a`
  padding: 0.75rem;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
    color: ${({ theme }) => theme.colors.text};
    transform: translateY(-4px);
  }
`;

const ResumeButtonContainer = styled.div`
  padding-top: 1rem;
  animation: ${slideUp} 1s ease-out 1s backwards;
`;

const ResumeButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryInverse};
  font-weight: 500;
  transition: all 0.2s;
  box-shadow: ${({ theme }) => theme.shadows.md};

  &:hover {
    background-color: ${({ theme }) =>
      theme.colors
        .textSecondary}; /* Slightly lighter than primary for hover effect fallback */
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    color: ${({ theme }) => theme.colors.primaryInverse};
  }
`;

interface HeroProps {
  onNavigate: NavigateCallback;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [typedNameIndex, setTypedNameIndex] = useState(0);
  const [typedTitleIndex, setTypedTitleIndex] = useState(0);
  const typedName = useMemo(
    () => PROFILE.name.slice(0, typedNameIndex),
    [typedNameIndex]
  );
  const typedTitle = useMemo(
    () => PROFILE.title.slice(0, typedTitleIndex),
    [typedTitleIndex]
  );

  // Typing effect logic
  useEffect(() => {
    const nameText = PROFILE.name;
    const titleText = PROFILE.title;
    let nameIndex = 0;
    let titleIndex = 0;
    let typingTimeout: any;

    const typeName = () => {
      if (nameIndex <= nameText.length) {
        setTypedNameIndex(nameIndex++);
        typingTimeout = setTimeout(typeName, 100);
      } else {
        typingTimeout = setTimeout(typeTitle, 400);
      }
    };

    const typeTitle = () => {
      if (titleIndex <= titleText.length) {
        setTypedTitleIndex(titleIndex++);
        typingTimeout = setTimeout(typeTitle, 50);
      }
    };

    typingTimeout = setTimeout(typeName, 500);

    return () => clearTimeout(typingTimeout);
  }, []);

  return (
    <Section>
      <Layout>
        <ProfileImageWrapper>
          <ImageContainer>
            <img src={PROFILE.avatar} alt={PROFILE.name} />
          </ImageContainer>
        </ProfileImageWrapper>

        <ContentWrapper>
          <TextBlock>
            <NameHeading>
              <GradientText>{typedName}</GradientText>
              {typedTitle.length === 0 && <BlinkingCursor $height="1em" />}
            </NameHeading>
            <TitleHeading>
              {typedTitle}
              {typedTitle.length > 0 &&
                typedTitle.length < PROFILE.title.length && (
                  <BlinkingCursor $height="1.2em" />
                )}
            </TitleHeading>
            <Bio>{PROFILE.bio}</Bio>
          </TextBlock>

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
                  <Icon size={22} />
                </SocialLink>
              );
            })}
          </SocialLinksContainer>

          <ActionsContainer>
            <PrimaryButton
              href={PROFILE.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText size={18} />
              Resume
            </PrimaryButton>

            <SecondaryButton onClick={() => onNavigate("blogs")}>
              <BookOpen size={18} />
              Read Blogs
            </SecondaryButton>
          </ActionsContainer>
        </ContentWrapper>
      </Layout>
    </Section>
  );
};

export default Hero;
