import React from "react";
import styled, { keyframes } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { BLOG_POSTS } from "../constants";
import { ArrowLeft } from "lucide-react";

interface BlogsProps {}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
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
const Container = styled.div`
  padding-top: 8rem;
  padding-bottom: 6rem;
  padding-left: 1rem;
  padding-right: 1rem;
  max-width: 48rem;
  margin: 0 auto;
  animation: ${fadeIn} 0.5s ease-out;

  @media (min-width: 640px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
`;

/* List View Styles */
const ListHeader = styled.div`
  margin-bottom: 3rem;
`;

const PageTitle = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const PostItem = styled(Link)`
  display: block;
  text-decoration: none;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.colors.backgroundAlt};
  padding-bottom: 2rem;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.border};
  }
`;

const PostTitleRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const PostTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.2s;

  ${PostItem}:hover & {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const PostDate = styled.span`
  font-size: 0.875rem;
  font-family: monospace;
  color: ${({ theme }) => theme.colors.textMuted};
  flex-shrink: 0;
  margin-left: 1rem;
  display: none;

  @media (min-width: 640px) {
    display: inline-block;
  }
`;

const Excerpt = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.75rem;
  line-height: 1.625;
`;

const PostFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ListTag = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: monospace;
`;

const ReadMore = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.accent};
  opacity: 0;
  transform: translateX(-0.5rem);
  transition: all 0.3s;
  display: none;

  ${PostItem}:hover & {
    opacity: 1;
    transform: translateX(0);
  }

  @media (min-width: 640px) {
    display: block;
  }
`;

const MobileReadMore = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  gap: 0.25rem;

  ${PostItem}:hover & {
    color: ${({ theme }) => theme.colors.text};
  }

  @media (min-width: 640px) {
    display: none;
  }
`;

const Blogs: React.FC<BlogsProps> = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <BackButton onClick={() => navigate("/")}>
        <ArrowLeft size={16} />
        Back to Home
      </BackButton>
      <ListHeader>
        <PageTitle>Writing</PageTitle>
        <Subtitle>
          Thoughts on software engineering, architecture, and design.
        </Subtitle>
      </ListHeader>

      <PostList>
        {BLOG_POSTS.map((post) => (
          <PostItem key={post.slug} to={`/blog/${post.slug}`}>
            <PostTitleRow>
              <PostTitle>{post.title}</PostTitle>
              <PostDate>{post.date}</PostDate>
            </PostTitleRow>
            <Excerpt>{post.excerpt}</Excerpt>
            <PostFooter>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {post.tags.map((tag) => (
                  <ListTag key={tag}>#{tag}</ListTag>
                ))}
              </div>
              <MobileReadMore>
                Read{" "}
                <ArrowLeft style={{ transform: "rotate(180deg)" }} size={14} />
              </MobileReadMore>
              <ReadMore>Read Article &rarr;</ReadMore>
            </PostFooter>
          </PostItem>
        ))}
      </PostList>
    </Container>
  );
};

export default Blogs;
