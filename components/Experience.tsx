import React from "react";
import styled from "styled-components";
import { EXPERIENCES } from "../constants";

const Section = styled.section`
  padding: 1rem 1rem 4rem;

  @media (min-width: 768px) {
    padding: 1rem 1.5rem 5.5rem;
  }
`;

const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
`;

const SectionTitle = styled.h3`
  font-size: clamp(1.55rem, 3.4vw, 2.35rem);
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
`;

const SectionSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2rem;
`;

const Timeline = styled.div`
  position: relative;
  display: grid;
  gap: 1rem;

  &::before {
    content: "";
    position: absolute;
    left: 1.3rem;
    top: 0.2rem;
    bottom: 0.2rem;
    width: 1px;
    background: ${({ theme }) => theme.colors.border};
    opacity: 0.75;

    @media (max-width: 767px) {
      display: none;
    }
  }
`;

const ExperienceCard = styled.article`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.8rem;
  padding: 1.1rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.cardBg};

  @media (min-width: 768px) {
    margin-left: 3.1rem;
    padding: 1.4rem;
  }
`;

const Dot = styled.span`
  display: none;

  @media (min-width: 768px) {
    display: block;
    position: absolute;
    left: -2.52rem;
    top: 1.42rem;
    width: 0.88rem;
    height: 0.88rem;
    border-radius: 50%;
    border: 2px solid ${({ theme }) => theme.colors.cardBg};
    background: ${({ theme }) => theme.colors.textMuted};
  }
`;

const Head = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.9rem;
`;

const RoleArea = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
`;

const LogoWrapper = styled.div`
  width: 2.7rem;
  height: 2.7rem;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CompanyName = styled.h4`
  font-size: 1.03rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.2rem;
`;

const RoleInfo = styled.p`
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const PeriodText = styled.span`
  font-size: 0.77rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  background: ${({ theme }) => `${theme.colors.backgroundAlt}cc`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0.35rem 0.55rem;
  border-radius: 999px;
`;

const HighlightList = styled.ul`
  margin: 0.35rem 0 0;
  padding-left: 1rem;
  display: grid;
  gap: 0.45rem;
`;

const Highlight = styled.li`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.55;
  font-size: 0.92rem;
`;

const Experience: React.FC = () => {
  return (
    <Section id="experience">
      <Container>
        <SectionTitle>Experience</SectionTitle>
        <SectionSubtitle>
          Highlights from teams and products I have helped build across full-time and internship roles.
        </SectionSubtitle>

        <Timeline>
          {EXPERIENCES.map((job) => (
            <ExperienceCard key={job.id}>
              <Dot />
              <Head>
                <RoleArea>
                  <LogoWrapper>
                    <img src={job.logo} alt={job.company} />
                  </LogoWrapper>

                  <div>
                    <CompanyName>{job.company}</CompanyName>
                    <RoleInfo>
                      {job.roles[0]} {job.type && `• ${job.type}`}
                    </RoleInfo>
                  </div>
                </RoleArea>
                <PeriodText>{job.period}</PeriodText>
              </Head>

              {job.highlights && job.highlights.length > 0 && (
                <HighlightList>
                  {job.highlights.map((point) => (
                    <Highlight key={point}>{point}</Highlight>
                  ))}
                </HighlightList>
              )}
            </ExperienceCard>
          ))}
        </Timeline>
      </Container>
    </Section>
  );
};

export default Experience;
