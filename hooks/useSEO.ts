import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  article?: {
    publishedTime?: string;
    author?: string;
    tags?: string[];
  };
}

const DEFAULT_TITLE = 'Sounak Gupta | Senior Software Engineer';
const DEFAULT_DESCRIPTION = 'Sounak Gupta is a Senior Software Engineer specializing in distributed systems, backend engineering, and customer-facing products.';
const DEFAULT_IMAGE = 'https://github.com/sounak07.png';
const SITE_URL = 'https://sounak-97.vercel.app';

function updateMetaTag(property: string, content: string, isProperty = true) {
  const attribute = isProperty ? 'property' : 'name';
  let element = document.querySelector(`meta[${attribute}="${property}"]`);
  
  if (element) {
    element.setAttribute('content', content);
  } else {
    element = document.createElement('meta');
    element.setAttribute(attribute, property);
    element.setAttribute('content', content);
    document.head.appendChild(element);
  }
}

function updateJsonLd(data: object) {
  const existingScript = document.querySelector('script[data-seo="dynamic"]');
  if (existingScript) {
    existingScript.remove();
  }
  
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-seo', 'dynamic');
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

export function useSEO({
  title,
  description,
  image,
  url,
  type = 'website',
  article,
}: SEOProps = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | Sounak Gupta` : DEFAULT_TITLE;
    const metaDescription = description || DEFAULT_DESCRIPTION;
    const metaImage = image || DEFAULT_IMAGE;
    const metaUrl = url ? `${SITE_URL}${url}` : SITE_URL;

    // Update document title
    document.title = fullTitle;

    // Update meta tags
    updateMetaTag('description', metaDescription, false);
    updateMetaTag('og:title', fullTitle);
    updateMetaTag('og:description', metaDescription);
    updateMetaTag('og:image', metaImage);
    updateMetaTag('og:url', metaUrl);
    updateMetaTag('og:type', type);
    updateMetaTag('twitter:title', fullTitle, false);
    updateMetaTag('twitter:description', metaDescription, false);
    updateMetaTag('twitter:image', metaImage, false);
    updateMetaTag('twitter:url', metaUrl, false);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', metaUrl);
    }

    // Add BlogPosting schema for articles
    if (type === 'article' && article) {
      const blogPostingSchema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description: metaDescription,
        image: metaImage,
        url: metaUrl,
        datePublished: article.publishedTime,
        author: {
          '@type': 'Person',
          name: article.author || 'Sounak Gupta',
          url: SITE_URL,
        },
        publisher: {
          '@type': 'Person',
          name: 'Sounak Gupta',
          url: SITE_URL,
        },
        keywords: article.tags?.join(', '),
      };
      updateJsonLd(blogPostingSchema);
    }

    // Cleanup function to restore defaults
    return () => {
      document.title = DEFAULT_TITLE;
      // Remove dynamic JSON-LD
      const dynamicScript = document.querySelector('script[data-seo="dynamic"]');
      if (dynamicScript) {
        dynamicScript.remove();
      }
    };
  }, [title, description, image, url, type, article]);
}

export default useSEO;
