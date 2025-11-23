import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { BLOG_POSTS } from '../constants';
import { fetchBlogContent } from '../services/blogService';
import { BlogPost } from '../types';
import MarkdownRenderer from './MarkdownRenderer';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';

interface BlogsProps {
  onBack: () => void;
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
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
  max-width: 48rem;
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
  animation-delay: ${props => props.$delay};
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

const PostItem = styled.div`
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

const Blogs: React.FC<BlogsProps> = ({ onBack }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedPost) {
      setLoading(true);
      fetchBlogContent(selectedPost.slug)
        .then(text => {
          setContent(text);
          setLoading(false);
          window.scrollTo(0,0);
        });
    } else {
        setContent(null);
    }
  }, [selectedPost]);

  if (selectedPost) {
    return (
      <Container>
        <BackButton onClick={() => setSelectedPost(null)}>
            <ArrowLeft size={16} />
            Back to all posts
        </BackButton>

        <DetailHeader>
            <MetaInfo>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={14}/> {selectedPost.date}
                </span>
            </MetaInfo>
            <DetailTitle>{selectedPost.title}</DetailTitle>
            <TagList>
                {selectedPost.tags.map(tag => (
                    <DetailTag key={tag}>#{tag}</DetailTag>
                ))}
            </TagList>
        </DetailHeader>
        
        <div style={{ minHeight: '300px' }}>
            {loading ? (
                <LoadingSpinner>
                   <Dot $delay="0s" />
                   <Dot $delay="0.1s" />
                   <Dot $delay="0.2s" />
                </LoadingSpinner>
            ) : (
                <MarkdownRenderer content={content || ''} />
            )}
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <ListHeader>
        <PageTitle>Writing</PageTitle>
        <Subtitle>Thoughts on software engineering, architecture, and design.</Subtitle>
      </ListHeader>

      <PostList>
        {BLOG_POSTS.map(post => (
          <PostItem 
            key={post.slug} 
            onClick={() => setSelectedPost(post)}
          >
            <PostTitleRow>
                <PostTitle>{post.title}</PostTitle>
                <PostDate>{post.date}</PostDate>
            </PostTitleRow>
            <Excerpt>{post.excerpt}</Excerpt>
            <PostFooter>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {post.tags.map(tag => (
                        <ListTag key={tag}>#{tag}</ListTag>
                    ))}
                </div>
                <MobileReadMore>
                    Read <ArrowLeft style={{ transform: 'rotate(180deg)' }} size={14}/>
                </MobileReadMore>
                 <ReadMore>
                    Read Article &rarr;
                </ReadMore>
            </PostFooter>
          </PostItem>
        ))}
      </PostList>
    </Container>
  );
};

export default Blogs;
