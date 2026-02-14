import React, { useState, useMemo } from "react";
import styled, { keyframes } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { BLOG_POSTS } from "../constants";
import { ArrowLeft, X } from "lucide-react";

interface BlogsProps {}

const AVAILABLE_TAGS = ["oop", "databases", "distributed-systems", "event-driven", "design-patterns"];

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  padding: 7.5rem 1rem 5rem;
  max-width: 980px;
  margin: 0 auto;
  animation: ${fadeIn} 0.45s ease-out;

  @media (min-width: 768px) {
    padding: 8.2rem 1.5rem 5.5rem;
  }
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  font-size: 0.84rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1.4rem;
  transition: 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  &:hover svg {
    transform: translateX(-3px);
  }

  svg {
    margin-right: 0.45rem;
    transition: transform 0.2s;
  }
`;

const ListHeader = styled.div`
  margin-bottom: 1.4rem;
`;

const PageTitle = styled.h1`
  font-size: clamp(2rem, 4vw, 3rem);
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const TagFilterSection = styled.div`
  margin-bottom: 1.3rem;
`;

const TagFilterContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.2rem;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TagFilterLabel = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  flex-shrink: 0;
`;

const FilterTag = styled.button<{ $active: boolean }>`
  font-size: 0.78rem;
  font-weight: 700;
  padding: 0.4rem 0.8rem;
  border-radius: 9999px;
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.border)};
  background-color: ${({ theme, $active }) => ($active ? theme.colors.primary : `${theme.colors.cardBg}a0`)};
  color: ${({ theme, $active }) => ($active ? theme.colors.primaryInverse : theme.colors.textSecondary)};
  transition: all 0.16s;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    border-color: ${({ theme }) => theme.colors.text};
    color: ${({ theme, $active }) => ($active ? theme.colors.primaryInverse : theme.colors.text)};
  }
`;

const ClearFilter = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  font-size: 0.72rem;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 0.24rem 0.45rem;
  flex-shrink: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const PostList = styled.div`
  display: grid;
  gap: 0.95rem;
`;

const PostItem = styled(Link)`
  display: block;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 18px;
  padding: 1rem;
  background: ${({ theme }) => `${theme.colors.cardBg}f3`};
  transition: 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }

  @media (min-width: 768px) {
    padding: 1.3rem;
  }
`;

const PostTitleRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 0.45rem;
  gap: 0.7rem;
`;

const PostTitle = styled.h2`
  font-size: 1.15rem;
  color: ${({ theme }) => theme.colors.text};
`;

const PostDate = styled.span`
  font-size: 0.79rem;
  font-family: "Space Grotesk", monospace;
  color: ${({ theme }) => theme.colors.textMuted};
  flex-shrink: 0;
  display: none;

  @media (min-width: 640px) {
    display: inline-block;
  }
`;

const Excerpt = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.75rem;
  line-height: 1.65;
`;

const PostFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 0.45rem;
  flex-wrap: wrap;
`;

const ListTag = styled.span`
  font-size: 0.72rem;
  color: ${({ theme }) => theme.colors.textMuted};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  padding: 0.21rem 0.5rem;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const ReadMore = styled.span`
  font-size: 0.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
`;

const NoResults = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  padding: 1.7rem 0;
`;

const Blogs: React.FC<BlogsProps> = () => {
  const navigate = useNavigate();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    if (!selectedTag) return BLOG_POSTS;
    return BLOG_POSTS.filter((post) => post.tags.includes(selectedTag));
  }, [selectedTag]);

  const handleTagClick = (tag: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  return (
    <Container>
      <BackButton onClick={() => navigate("/")}>
        <ArrowLeft size={16} />
        Back to Home
      </BackButton>

      <ListHeader>
        <PageTitle>Writing</PageTitle>
        <Subtitle>Thoughts on software engineering, architecture, and design.</Subtitle>
      </ListHeader>

      <TagFilterSection>
        <TagFilterContainer>
          <TagFilterLabel>Filter</TagFilterLabel>
          {AVAILABLE_TAGS.map((tag) => (
            <FilterTag key={tag} $active={selectedTag === tag} onClick={() => handleTagClick(tag)}>
              {tag}
            </FilterTag>
          ))}
          {selectedTag && (
            <ClearFilter onClick={() => setSelectedTag(null)}>
              <X size={12} /> Clear
            </ClearFilter>
          )}
        </TagFilterContainer>
      </TagFilterSection>

      <PostList>
        {filteredPosts.length === 0 ? (
          <NoResults>No posts found with tag "{selectedTag}"</NoResults>
        ) : (
          filteredPosts.map((post) => (
            <PostItem key={post.slug} to={`/blog/${post.slug}`}>
              <PostTitleRow>
                <PostTitle>{post.title}</PostTitle>
                <PostDate>{post.date}</PostDate>
              </PostTitleRow>
              <Excerpt>{post.excerpt}</Excerpt>
              <PostFooter>
                <TagsContainer>
                  {post.tags.map((tag) => (
                    <ListTag key={tag} onClick={(e) => handleTagClick(tag, e)}>
                      #{tag}
                    </ListTag>
                  ))}
                </TagsContainer>
                <ReadMore>Read Article →</ReadMore>
              </PostFooter>
            </PostItem>
          ))
        )}
      </PostList>
    </Container>
  );
};

export default Blogs;
