import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownRendererProps {
  content: string;
}

const StyledArticle = styled.article`
  width: 100%;
  max-width: 100%;
  overflow-wrap: break-word;
  word-wrap: break-word;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.75;
  
  h1 {
    font-size: 1.75rem;
    font-weight: 800;
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.2;
    
    @media (min-width: 640px) {
      font-size: 2.25rem;
      margin-bottom: 2rem;
    }
  }

  h2 {
    font-size: 1.25rem;
    font-weight: 700;
    margin-top: 2rem;
    margin-bottom: 0.75rem;
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.3;
    padding-top: 0.5rem;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    
    @media (min-width: 640px) {
      font-size: 1.5rem;
      margin-top: 2.5rem;
      margin-bottom: 1rem;
    }
  }

  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-top: 1.25rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.text};
    
    @media (min-width: 640px) {
      font-size: 1.25rem;
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
    }
  }

  p {
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-size: 0.9375rem;
    
    @media (min-width: 640px) {
      font-size: 1rem;
      margin-top: 1.25rem;
      margin-bottom: 1.25rem;
    }
  }

  ul {
    list-style-type: disc;
    padding-left: 1.25rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    
    @media (min-width: 640px) {
      padding-left: 1.625rem;
      margin-top: 1.25rem;
      margin-bottom: 1.25rem;
    }
  }

  li {
    margin-top: 0.375rem;
    margin-bottom: 0.375rem;
    font-size: 0.9375rem;
    
    @media (min-width: 640px) {
      font-size: 1rem;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
  }

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: underline;
    font-weight: 500;
    word-break: break-word;
    &:hover {
        color: ${({ theme }) => theme.colors.text};
    }
  }

  blockquote {
    font-weight: 500;
    font-style: italic;
    color: ${({ theme }) => theme.colors.textSecondary};
    border-left-width: 0.25rem;
    border-left-style: solid;
    border-left-color: ${({ theme }) => theme.colors.border};
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
    margin-left: 0;
    margin-right: 0;
    padding-left: 0.75rem;
    font-size: 0.9375rem;
    
    @media (min-width: 640px) {
      margin-top: 1.6rem;
      margin-bottom: 1.6rem;
      padding-left: 1rem;
      font-size: 1rem;
    }
  }

  code {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
    font-size: 0.875rem;
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
    word-break: break-word;
    
    @media (min-width: 640px) {
      font-size: 1rem;
      padding: 0.125rem 0.375rem;
    }
  }

  pre {
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
    margin-left: -1rem;
    margin-right: -1rem;
    border-radius: 0;
    overflow: hidden;
    
    @media (min-width: 640px) {
      margin-top: 1.7rem;
      margin-bottom: 1.7rem;
      margin-left: 0;
      margin-right: 0;
      border-radius: 0.75rem;
    }
    
    code {
      background-color: transparent;
      padding: 0;
      font-weight: 400;
      font-size: 0.8125rem;
      word-break: normal;
      
      @media (min-width: 640px) {
        font-size: 1rem;
      }
    }
  }
  
  img {
    border-radius: 0.5rem;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    max-width: 100%;
    height: auto;
    
    @media (min-width: 640px) {
      margin-top: 2rem;
      margin-bottom: 2rem;
    }
  }
`;

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <StyledArticle>
      <ReactMarkdown
        components={{
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match;
            
            if (isInline) {
              return <code className={className} {...props}>{children}</code>;
            }
            
            return (
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
                customStyle={{
                  margin: 0,
                  padding: '1rem',
                  fontSize: 'inherit',
                  lineHeight: '1.6',
                  borderRadius: 'inherit',
                }}
                codeTagProps={{
                  style: {
                    fontSize: 'inherit',
                    fontFamily: "'Fira Code', 'Monaco', 'Consolas', monospace",
                  }
                }}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </StyledArticle>
  );
};

export default MarkdownRenderer;
