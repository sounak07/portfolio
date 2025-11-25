import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GITHUB_CONFIG } from "../constants";
import {
  GitCommit,
  Star,
  GitFork,
  Circle,
  ExternalLink,
  Loader2,
} from "lucide-react";

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  pushed_at: string;
}

const Section = styled.section`
  padding: 4rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) =>
    theme.colors.backgroundAlt}80; /* 50% opacity */
`;

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 3rem;
`;

const IconWrapper = styled.div`
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const SubHeading = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: 0.05em;
  margin-bottom: 1.5rem;
`;

const GraphContainer = styled.div`
  margin-bottom: 3rem;
  overflow-x: auto;
  padding-bottom: 1rem;
`;

const GraphCard = styled.div`
  min-width: 800px;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.75rem;
`;

const GraphImage = styled.img`
  width: 100%;
  height: auto;
  transition: all 0.3s;

  /* Dark Mode Inversion Logic */
  .dark & {
    filter: invert(1) hue-rotate(180deg) brightness(1.1);
  }

  /* Manual check since styled-components theme prop is better */
  filter: ${({ theme }) =>
    theme.colors.background === "#151B23"
      ? "invert(1) hue-rotate(180deg) brightness(1.1)"
      : "none"};
`;

const RepoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const RepoCard = styled.a`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.cardBg};
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.textSecondary};
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const RepoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
`;

const RepoName = styled.h4`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.2s;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${RepoCard}:hover & {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const RepoDesc = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1.5rem;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const RepoFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.backgroundAlt};
  margin-top: auto;
`;

const StatsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 3rem 0;
`;

const ErrorMsg = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 2rem 0;
`;

const GithubActivity: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_CONFIG.username}/repos?sort=pushed&direction=desc&per_page=6`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }

        const data = await response.json();
        setRepos(data);
      } catch (err) {
        setError("Could not load GitHub data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Section id="activity">
      <Container>
        <Header>
          <IconWrapper>
            <GitCommit size={24} />
          </IconWrapper>
          <Title>Open Source Activity</Title>
        </Header>

        <div style={{ marginBottom: "3rem" }}>
          <SubHeading>Contribution History</SubHeading>
          <GraphContainer>
            <GraphCard>
              <GraphImage
                src={`https://ghchart.rshah.org/196C2E/${GITHUB_CONFIG.username}`}
                alt={`${GITHUB_CONFIG.username}'s Github Chart`}
              />
            </GraphCard>
          </GraphContainer>
        </div>

        <SubHeading>Active Repos</SubHeading>

        {loading ? (
          <LoadingWrapper>
            <Loader2 className="animate-spin" color="#9ca3af" size={32} />
          </LoadingWrapper>
        ) : error ? (
          <ErrorMsg>{error}</ErrorMsg>
        ) : (
          <RepoGrid>
            {repos.map((repo) => (
              <RepoCard
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <RepoHeader>
                  <RepoName>{repo.name}</RepoName>
                  <ExternalLink
                    size={16}
                    color="currentColor"
                    style={{ flexShrink: 0 }}
                  />
                </RepoHeader>

                <RepoDesc>
                  {repo.description || "No description available."}
                </RepoDesc>

                <RepoFooter>
                  <StatsGroup>
                    {repo.language && (
                      <StatItem>
                        <Circle size={8} fill="currentColor" />
                        <span>{repo.language}</span>
                      </StatItem>
                    )}
                    <StatItem>
                      <Star size={12} />
                      <span>{repo.stargazers_count}</span>
                    </StatItem>
                    <StatItem>
                      <GitFork size={12} />
                      <span>{repo.forks_count}</span>
                    </StatItem>
                  </StatsGroup>
                  <span>{formatDate(repo.pushed_at)}</span>
                </RepoFooter>
              </RepoCard>
            ))}
          </RepoGrid>
        )}
      </Container>
    </Section>
  );
};

export default GithubActivity;
