import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { BLOG_POSTS } from "../constants";
import { fetchBlogContent } from "../services/blogService";
import MarkdownRenderer from "./MarkdownRenderer";
import { ArrowLeft, Calendar } from "lucide-react";
import { useSEO } from "../hooks/useSEO";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); }
  50% { transform: translateY(0); animation-timing-function: cubic-bezier(0, 0, 0.2, 1); }
`;

const Container = styled.div`
  padding-top: 8rem;
  padding-bottom: 6rem;
  padding-left: 1rem;
  padding-right: 1rem;
  max-width: 64rem;
  margin: 0 auto;
  animation: ${fadeIn} 0.5s ease-out;

  @media (min-width: 640px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2rem;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  &:hover svg {
    transform: translateX(-4px);
  }

  svg {
    margin-right: 0.5rem;
    transition: transform 0.2s;
  }
`;

const DetailHeader = styled.header`
  margin-bottom: 2.5rem;
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1rem;
  font-family: monospace;
`;

const DetailTitle = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.5rem;
  line-height: 1.3;

  @media (min-width: 768px) {
    font-size: 2.25rem;
  }
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const DetailTag = styled.span`
  font-size: 0.75rem;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10rem;
  gap: 0.5rem;
`;

const Dot = styled.div<{ $delay: string }>`
  width: 0.75rem;
  height: 0.75rem;
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

  // Blog-specific SEO
  useSEO(selectedPost ? {
    title: selectedPost.title,
    description: selectedPost.excerpt,
    url: `/blog/${selectedPost.slug}`,
    type: 'article',
    article: {
      publishedTime: selectedPost.date,
      author: 'Sounak Gupta',
      tags: selectedPost.tags,
    },
  } : {});

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
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
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

      <div style={{ minHeight: "300px" }}>
        {loading ? (
          <LoadingSpinner>
            <Dot $delay="0s" />
            <Dot $delay="0.1s" />
            <Dot $delay="0.2s" />
          </LoadingSpinner>
        ) : (
          <MarkdownRenderer content={content || ""} />
        )}
      </div>
    </Container>
  );
};

export default BlogDetail;
