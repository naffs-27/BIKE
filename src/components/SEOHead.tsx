import { useEffect } from 'react';
import { Article } from '../types/article';

interface SEOHeadProps {
  article?: Article;
}

export function SEOHead({ article }: SEOHeadProps) {
  useEffect(() => {
    const siteTitle = 'ApexLine Moto – Motorcycle Horsepower & Performance Guide';
    const siteDesc = 'Master motorcycle horsepower, engine categories from 10 to 200+ HP, power-to-weight ratios, and expert buyer guides for every riding level.';
    const appUrl = window.location.origin;

    if (article) {
      document.title = `${article.title} | ApexLine Moto`;

      // Update meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', article.metaDescription);
      }

      // Update OpenGraph
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', article.metaTitle);

      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', article.metaDescription);

      let ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) {
        ogUrl.setAttribute('content', `${appUrl}/blog/${article.slug}`);
      }

      // Schema.org Article & FAQPage JSON-LD
      const schemaScriptId = 'article-json-ld';
      let existingSchema = document.getElementById(schemaScriptId);
      if (existingSchema) existingSchema.remove();

      const jsonLdData = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'TechArticle',
            'headline': article.title,
            'description': article.excerpt,
            'image': article.image.startsWith('http') ? article.image : `${appUrl}${article.image}`,
            'datePublished': article.publishDate,
            'author': {
              '@type': 'Person',
              'name': article.author.name,
              'jobTitle': article.author.role,
            },
            'publisher': {
              '@type': 'Organization',
              'name': 'ApexLine Moto',
              'logo': {
                '@type': 'ImageObject',
                'url': `${appUrl}/favicon.ico`,
              },
            },
            'mainEntityOfPage': {
              '@type': 'WebPage',
              '@id': `${appUrl}/blog/${article.slug}`,
            },
          },
          {
            '@type': 'FAQPage',
            'mainEntity': article.faqs.map((faq) => ({
              '@type': 'Question',
              'name': faq.question,
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': faq.answer,
              },
            })),
          },
        ],
      };

      const script = document.createElement('script');
      script.id = schemaScriptId;
      script.type = 'application/ld+json';
      script.text = JSON.stringify(jsonLdData);
      document.head.appendChild(script);
    } else {
      document.title = siteTitle;
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', siteDesc);

      const existingSchema = document.getElementById('article-json-ld');
      if (existingSchema) existingSchema.remove();
    }
  }, [article]);

  return null;
}
