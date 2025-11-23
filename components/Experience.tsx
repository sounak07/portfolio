import React from 'react';
import styled from 'styled-components';
import { EXPERIENCES } from '../constants';

const Section = styled.section`
  padding: 4rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
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
  margin-bottom: 3rem;
`;

const ExperienceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const ExperienceItemWrapper = styled.div`
  position: relative;
  padding-left: 2rem;

  @media (min-width: 768px) {
    padding-left: 0;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 2rem;
  }
`;

const PeriodWrapper = styled.div`
  margin-bottom: 0.5rem;

  @media (min-width: 768px) {
    margin-bottom: 0;
    text-align: right;
  }
`;

const PeriodTag = styled.span`
  font-size: 0.875rem;
  font-family: monospace;
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
`;

const ContentColumn = styled.div`
  position: relative;
  border-left: 2px solid ${({ theme }) => theme.colors.border};
  padding-left: 2rem;
  padding-bottom: 0.5rem;

  @media (min-width: 768px) {
    grid-column: span 3 / span 3;
    padding-bottom: 0;
  }
`;

const TimelineDot = styled.div`
  position: absolute;
  left: -9px;
  top: 0;
  height: 1rem;
  width: 1rem;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.border};
  border: 4px solid ${({ theme }) => theme.colors.background};
  transition: background-color 0.2s;

  ${ExperienceItemWrapper}:hover & {
    background-color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const RoleHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const Role = styled.h4`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const Company = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const DescriptionList = styled.ul`
  list-style-type: disc;
  list-style-position: outside;
  margin-left: 1rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  li {
    line-height: 1.625;
  }
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SkillBadge = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  transition: all 0.2s;
  cursor: default;

  &:hover {
    border-color: ${({ theme }) => theme.colors.textSecondary};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Experience: React.FC = () => {
  return (
    <Section id="experience">
      <Container>
        <SectionTitle>Experience</SectionTitle>
        
        <ExperienceList>
          {EXPERIENCES.map((job) => (
            <ExperienceItemWrapper key={job.id}>
              {/* Period */}
              <PeriodWrapper>
                <PeriodTag>{job.period}</PeriodTag>
              </PeriodWrapper>

              {/* Content */}
              <ContentColumn>
                <TimelineDot />
                
                <RoleHeader>
                  <Role>{job.role}</Role>
                  <Company>{job.company}</Company>
                </RoleHeader>
                
                <DescriptionList>
                  {job.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </DescriptionList>

                <SkillsContainer>
                  {job.skills.map(skill => (
                    <SkillBadge key={skill}>{skill}</SkillBadge>
                  ))}
                </SkillsContainer>
              </ContentColumn>
            </ExperienceItemWrapper>
          ))}
        </ExperienceList>
      </Container>
    </Section>
  );
};

export default Experience;
