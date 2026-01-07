import React, { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { List, X } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
}

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
  
  @media (min-width: 1024px) {
    flex-direction: row;
    gap: 2rem;
  }
`;

const TableOfContents = styled.nav<{ $isOpen: boolean }>`
  /* Mobile: collapsible, minimal style */
  max-height: ${({ $isOpen }) => ($isOpen ? '500px' : '0')};
  overflow: hidden;
  margin-bottom: ${({ $isOpen }) => ($isOpen ? '1.5rem' : '0')};
  padding-left: 1rem;
  border-left: 2px solid ${({ theme }) => theme.colors.border};
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  transition: max-height 0.1s, opacity 0.1s, margin-bottom 0.1s;
  
  @media (min-width: 1024px) {
    position: sticky;
    top: 6rem;
    min-width: 200px;
    max-width: 220px;
    max-height: calc(100vh - 8rem);
    overflow-y: auto;
    flex-shrink: 0;
    margin-bottom: 0;
    opacity: 1;
  }
`;

const TOCToggle = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: transparent;
  border: none;
  padding: 0;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: color 0.1s;
  
  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
  
  @media (min-width: 1024px) {
    display: none;
  }
`;

const TOCTitle = styled.h4`
  font-size: 0.6875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const TOCList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TOCItem = styled.li<{ $level: number }>`
  margin-left: ${({ $level }) => ($level - 2) * 0.625}rem;
  margin-bottom: 0.25rem;
  
  a {
    font-size: 0.8125rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    text-decoration: none;
    transition: color 0.2s;
    display: block;
    line-height: 1.5;
    padding: 0.125rem 0;
    
    &:hover {
      color: ${({ theme }) => theme.colors.text};
    }
  }
`;

const ArticleContent = styled.div`
  flex: 1;
  min-width: 0;
  max-width: 100%;
`;

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

// Helper to generate slug from heading text
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Extract headings from markdown content
function extractHeadings(content: string): HeadingItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: HeadingItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    headings.push({
      id: generateSlug(text),
      text,
      level,
    });
  }

  return headings;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const [tocOpen, setTocOpen] = useState(false);
  const headings = useMemo(() => extractHeadings(content), [content]);
  
  const handleTOCClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTocOpen(false); // Close TOC on mobile after clicking
    }
  };

  return (
    <>
      {headings.length > 0 && (
        <TOCToggle onClick={() => setTocOpen(!tocOpen)}>
          {tocOpen ? <X size={16} /> : <List size={16} />}
          {tocOpen ? 'Hide Contents' : 'Show Contents'}
        </TOCToggle>
      )}
      
      <Container>
        {headings.length > 0 && (
          <TableOfContents $isOpen={tocOpen}>
            <TOCTitle>Contents</TOCTitle>
            <TOCList>
              {headings.map((heading, index) => (
                <TOCItem key={index} $level={heading.level}>
                  <a 
                    href={`#${heading.id}`}
                    onClick={(e) => handleTOCClick(e, heading.id)}
                  >
                    {heading.text}
                  </a>
                </TOCItem>
              ))}
            </TOCList>
          </TableOfContents>
        )}
        
        <ArticleContent>
          <StyledArticle>
            <ReactMarkdown
              components={{
                h2: ({ children, ...props }) => {
                  const text = String(children);
                  const id = generateSlug(text);
                  return <h2 id={id} {...props}>{children}</h2>;
                },
                h3: ({ children, ...props }) => {
                  const text = String(children);
                  const id = generateSlug(text);
                  return <h3 id={id} {...props}>{children}</h3>;
                },
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
        </ArticleContent>
      </Container>
    </>
  );
};

export default MarkdownRenderer;
