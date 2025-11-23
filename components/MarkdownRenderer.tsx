import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

interface MarkdownRendererProps {
  content: string;
}

const StyledArticle = styled.article`
  width: 100%;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.75;
  
  h1 {
    font-size: 2.25rem;
    font-weight: 800;
    margin-top: 0;
    margin-bottom: 2rem;
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.1;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.3;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
  }

  ul {
    list-style-type: disc;
    padding-left: 1.625rem;
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
  }

  li {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: underline;
    font-weight: 500;
    &:hover {
        color: ${({ theme }) => theme.colors.text};
    }
  }

  blockquote {
    font-weight: 500;
    font-style: italic;
    color: ${({ theme }) => theme.colors.textSecondary};
    border-left-width: 0.25rem;
    border-left-color: ${({ theme }) => theme.colors.border};
    margin-top: 1.6rem;
    margin-bottom: 1.6rem;
    padding-left: 1rem;
  }

  code {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
    font-size: 0.875em;
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-family: monospace;
  }

  pre {
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
    overflow-x: auto;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-top: 1.7rem;
    margin-bottom: 1.7rem;
    border: 1px solid ${({ theme }) => theme.colors.border};

    code {
      background-color: transparent;
      border-width: 0;
      border-radius: 0;
      padding: 0;
      font-weight: 400;
      color: inherit;
      font-size: 0.875em;
      line-height: 1.7;
    }
  }
  
  img {
    border-radius: 0.5rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    max-width: 100%;
    height: auto;
  }
`;

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <StyledArticle>
      <ReactMarkdown>{content}</ReactMarkdown>
    </StyledArticle>
  );
};

export default MarkdownRenderer;
