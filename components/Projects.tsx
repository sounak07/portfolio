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
  Sparkles,
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
  padding: 1rem 1rem 5rem;

  @media (min-width: 768px) {
    padding: 1rem 1.5rem 6rem;
  }
`;

const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 0.6rem;
`;

const IconWrapper = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h3`
  font-size: clamp(1.55rem, 3.4vw, 2.35rem);
  color: ${({ theme }) => theme.colors.text};
`;

const SubHeading = styled.h4`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.84rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 0.9rem;
`;

const SectionSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2rem;
`;

const GraphContainer = styled.div`
  margin-bottom: 2.8rem;
  overflow-x: auto;
  padding-bottom: 0.2rem;
`;

const GraphCard = styled.div`
  min-width: 640px;
  max-width: 860px;
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
`;

const GraphImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 120px;
  object-fit: contain;
  filter: ${({ theme }) => (theme.colors.background === "#131313" ? "invert(1) hue-rotate(180deg) brightness(1.1)" : "none")};
`;

const RepoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1080px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const RepoCard = styled.a`
  display: flex;
  flex-direction: column;
  min-height: 195px;
  padding: 1.05rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.cardBg};
  transition: 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const RepoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.6rem;
  margin-bottom: 0.55rem;
`;

const RepoName = styled.h4`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const RepoDesc = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1rem;
  line-height: 1.55;
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
  padding-top: 0.8rem;
  border-top: 1px dashed ${({ theme }) => theme.colors.border};
`;

const StatsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
`;

const StatItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 2.5rem 0;
`;

const ErrorMsg = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 1.8rem 0;
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
            <GitCommit size={16} />
          </IconWrapper>
          <Title>Open Source Activity</Title>
        </Header>
        <SectionSubtitle>
          Contribution consistency and repositories I have actively worked on recently.
        </SectionSubtitle>

        <div style={{ marginBottom: "2rem" }}>
          <SubHeading>
            <Sparkles size={14} /> Contribution Heatmap
          </SubHeading>
          <GraphContainer>
            <GraphCard>
              <GraphImage
                src={`https://ghchart.rshah.org/196C2E/${GITHUB_CONFIG.username}`}
                alt={`${GITHUB_CONFIG.username}'s Github Chart`}
              />
            </GraphCard>
          </GraphContainer>
        </div>

        <SubHeading>
          <Sparkles size={14} /> Active Repos
        </SubHeading>

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
                  <ExternalLink size={15} style={{ flexShrink: 0 }} />
                </RepoHeader>

                <RepoDesc>{repo.description || "No description available."}</RepoDesc>

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
