import React from "react";
import styled from "styled-components";
import { TOOLS_CATEGORIES } from "../constants";

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

  @media (min-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const CategoryCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.cardBg};
`;

const CategoryTitle = styled.h4`
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 0.8rem;
`;

const Items = styled.ul`
  list-style: none;
  display: grid;
  gap: 0.48rem;
`;

const Item = styled.li`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.95rem;
  line-height: 1.5;
`;

const Tools: React.FC = () => {
  return (
    <Section id="tools">
      <Container>
        <SectionTitle>Tools I Use</SectionTitle>
        <SectionSubtitle>Technologies I use day-to-day and infrastructure I am comfortable with.</SectionSubtitle>

        <Grid>
          {TOOLS_CATEGORIES.map((category) => (
            <CategoryCard key={category.id}>
              <CategoryTitle>{category.title}</CategoryTitle>
              <Items>
                {category.items.map((item) => (
                  <Item key={item}>{item}</Item>
                ))}
              </Items>
            </CategoryCard>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default Tools;
