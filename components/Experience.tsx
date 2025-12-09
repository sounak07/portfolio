import React from "react";
import styled from "styled-components";
import { EXPERIENCES } from "../constants";

const Section = styled.section`
  padding: 4rem 0;
  /* border-top: 1px solid ${({ theme }) => theme.colors.border}; */
`;

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2rem;
`;

const ExperienceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ExperienceItemWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  align-items: center;
  
  @media (min-width: 640px) {
    grid-template-columns: auto 1fr auto;
  }
`;

const LogoWrapper = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CompanyName = styled.h4`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.125rem;
  text-transform: lowercase;
`;

const RoleInfo = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: lowercase;
`;

const PeriodWrapper = styled.div`
  grid-column: 2 / 3;
  
  @media (min-width: 640px) {
    grid-column: auto;
    text-align: right;
  }
`;

const PeriodText = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: lowercase;
`;

const Experience: React.FC = () => {
  return (
    <Section id="experience">
      <Container>
        <SectionTitle>journey so far</SectionTitle>

        <ExperienceList>
          {EXPERIENCES.map((job) => (
            <ExperienceItemWrapper key={job.id}>
              <LogoWrapper>
                <img src={job.logo} alt={job.company} />
              </LogoWrapper>
              
              <ContentWrapper>
                <CompanyName>{job.company}</CompanyName>
                <RoleInfo>
                  {job.roles[0]} {job.type && `| ${job.type}`}
                </RoleInfo>
              </ContentWrapper>

              <PeriodWrapper>
                <PeriodText>{job.period}</PeriodText>
              </PeriodWrapper>
            </ExperienceItemWrapper>
          ))}
        </ExperienceList>
      </Container>
    </Section>
  );
};

export default Experience;
