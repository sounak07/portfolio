import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { BLOG_POSTS } from "../constants";
import { fetchBlogContent } from "../services/blogService";
import MarkdownRenderer from "./MarkdownRenderer";
import { ArrowLeft, Calendar } from "lucide-react";
import { useSEO } from "../hooks/useSEO";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); }
  50% { transform: translateY(0); animation-timing-function: cubic-bezier(0, 0, 0.2, 1); }
`;

const Container = styled.div`
  padding: 7.6rem 1rem 5rem;
  max-width: 1050px;
  margin: 0 auto;
  animation: ${fadeIn} 0.5s ease-out;

  @media (min-width: 768px) {
    padding: 8.3rem 1.5rem 5.5rem;
  }
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  font-size: 0.84rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1.2rem;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  &:hover svg {
    transform: translateX(-4px);
  }

  svg {
    margin-right: 0.45rem;
    transition: transform 0.2s;
  }
`;

const DetailHeader = styled.header`
  margin-bottom: 1.7rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => `${theme.colors.cardBg}f4`};
  border-radius: 20px;
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 1.4rem;
  }
`;

const MetaInfo = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.7rem;
  font-family: "Space Grotesk", monospace;
`;

const DetailTitle = styled.h1`
  font-size: clamp(1.8rem, 4vw, 2.7rem);
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  line-height: 1.2;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
`;

const DetailTag = styled.span`
  font-size: 0.72rem;
  background-color: ${({ theme }) => `${theme.colors.backgroundAlt}cc`};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 0.22rem 0.5rem;
  border-radius: 9999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const ContentCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => `${theme.colors.cardBg}f1`};
  border-radius: 20px;
  padding: 1rem;
  min-height: 300px;

  @media (min-width: 768px) {
    padding: 1.4rem;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10rem;
  gap: 0.5rem;
`;

const Dot = styled.div<{ $delay: string }>`
  width: 0.7rem;
  height: 0.7rem;
  background-color: ${({ theme }) => theme.colors.textMuted};
  border-radius: 9999px;
  animation: ${bounce} 1s infinite;
  animation-delay: ${(props) => props.$delay};
`;

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const selectedPost = BLOG_POSTS.find((p) => p.slug === slug);

  useSEO(
    selectedPost
      ? {
          title: selectedPost.title,
          description: selectedPost.excerpt,
          url: `/blog/${selectedPost.slug}`,
          type: "article",
          article: {
            publishedTime: selectedPost.date,
            author: "Sounak Gupta",
            tags: selectedPost.tags,
          },
        }
      : {}
  );

  useEffect(() => {
    if (selectedPost) {
      setLoading(true);
      fetchBlogContent(selectedPost.slug, selectedPost.folder).then((text) => {
        setContent(text);
        setLoading(false);
        window.scrollTo(0, 0);
      });
    }
  }, [selectedPost]);

  if (!selectedPost) {
    return (
      <Container>
        <BackButton onClick={() => navigate("/")}>
          <ArrowLeft size={16} />
          Back to Home
        </BackButton>
        <p>Blog post not found.</p>
      </Container>
    );
  }

  return (
    <Container>
      <BackButton onClick={() => navigate("/blogs")}>
        <ArrowLeft size={16} />
        Back to Blogs
      </BackButton>

      <DetailHeader>
        <MetaInfo>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
            <Calendar size={14} /> {selectedPost.date}
          </span>
        </MetaInfo>
        <DetailTitle>{selectedPost.title}</DetailTitle>
        <TagList>
          {selectedPost.tags.map((tag) => (
            <DetailTag key={tag}>#{tag}</DetailTag>
          ))}
        </TagList>
      </DetailHeader>

      <ContentCard>
        {loading ? (
          <LoadingSpinner>
            <Dot $delay="0s" />
            <Dot $delay="0.1s" />
            <Dot $delay="0.2s" />
          </LoadingSpinner>
        ) : (
          <MarkdownRenderer content={content || ""} />
        )}
      </ContentCard>
    </Container>
  );
};

export default BlogDetail;
