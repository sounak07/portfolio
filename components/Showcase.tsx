import React from "react";
import styled from "styled-components";
import { SHOWCASE_ITEMS } from "../constants";

const Section = styled.section`
  padding: 0 1rem 4rem;

  @media (min-width: 768px) {
    padding: 0 1.5rem 5rem;
  }
`;

const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
`;

const SectionTitle = styled.h3`
  font-size: clamp(1.45rem, 3.2vw, 2rem);
  margin-bottom: 0.4rem;
  color: ${({ theme }) => theme.colors.text};
`;

const SectionSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.8rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Card = styled.a`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.cardBg};
  transition: border-color 0.18s ease, transform 0.18s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.textMuted};
    transform: translateY(-2px);
  }
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  margin-bottom: 0.45rem;
`;

const Title = styled.h4`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Kind = styled.span`
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.55;
  font-size: 0.92rem;
`;

const LinkText = styled.span`
  display: inline-block;
  margin-top: 0.7rem;
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Showcase: React.FC = () => {
  const isExternal = (url: string) => url.startsWith("http://") || url.startsWith("https://");

  return (
    <Section id="showcase">
      <Container>
        <SectionTitle>Showcase</SectionTitle>
        <SectionSubtitle>Projects, videos, posts, and references I want to highlight.</SectionSubtitle>

        <Grid>
          {SHOWCASE_ITEMS.map((item) => (
            <Card
              key={item.id}
              href={item.url}
              target={isExternal(item.url) ? "_blank" : undefined}
              rel={isExternal(item.url) ? "noopener noreferrer" : undefined}
            >
              <TopRow>
                <Title>{item.title}</Title>
                <Kind>{item.kind}</Kind>
              </TopRow>
              <Description>{item.description}</Description>
              <LinkText>Open ↗</LinkText>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default Showcase;
