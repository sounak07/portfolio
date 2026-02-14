import React from "react";
import styled from "styled-components";
import { SOCIAL_LINKS } from "../constants";
import { Github, Linkedin, Twitter, Instagram, Layers, Coffee, Mail } from "lucide-react";

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
  padding: 2.2rem 1rem 2.4rem;

  @media (min-width: 768px) {
    padding: 2.8rem 1.5rem 2.8rem;
  }
`;

const Container = styled.div`
  max-width: 820px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h3`
  font-size: clamp(2rem, 4vw, 3rem);
  font-family: "Space Grotesk", serif;
  font-style: italic;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.6rem;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.02rem;
  line-height: 1.6;
  margin-bottom: 0.9rem;
`;

const MailCTA = styled.a`
  display: inline-block;
  background: #f5cf00;
  color: #121212;
  border: 3px solid #f4e8b6;
  box-shadow: 8px 8px 0 #000;
  font-weight: 700;
  letter-spacing: 0.02em;
  padding: 0.64rem 1.6rem;
  transform: rotate(1.3deg);
  margin-bottom: 1.1rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const Item = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9rem;

  span {
    width: 1.85rem;
    height: 1.85rem;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors.border};
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const BottomSocial: React.FC = () => {
  const links = SOCIAL_LINKS.filter((link) =>
    ["twitter", "linkedin", "instagram", "mail"].includes(link.icon)
  );

  return (
    <Section>
      <Container>
        <Title>Ready to start?</Title>
        <Text>
          Let&apos;s create something amazing together. Drop me a line and let&apos;s get the conversation started.
        </Text>
        <MailCTA href="mailto:sounakume@gmail.com">START_MAIL</MailCTA>
        <Row>
          {links.map((link) => {
            const Icon = IconMap[link.icon] || Layers;
            return (
              <Item
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
              >
                <span>
                  <Icon size={13} />
                </span>
                {link.name}
              </Item>
            );
          })}
        </Row>
      </Container>
    </Section>
  );
};

export default BottomSocial;
