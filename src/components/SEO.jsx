import React from 'react';
import { Helmet } from 'react-helmet';

function SEO() {
  return (
    <Helmet>
      <html lang="en" />
      <title>Gemuna Gaming - Play, Connect, Compete</title>
      <meta name="description" content="Gemuna is the ultimate gaming website. Discover trending games, connect with the community, and stay updated with the latest in gaming." />
      <meta name="keywords" content="gaming, games, play, community, esports, online games" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <link rel="canonical" href="https://gemuna.com" />
      <meta property="og:title" content="Gemuna Gaming" />
      <meta property="og:description" content="Discover, play, and connect with the gaming community on Gemuna." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://gemuna.com" />
      <meta property="og:image" content="/og-image.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Gemuna Gaming" />
      <meta name="twitter:description" content="Discover, play, and connect with the gaming community on Gemuna." />
      <meta name="twitter:image" content="/og-image.png" />
      {/* Structured Data for SEO */}
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Gemuna Gaming",
          "url": "https://gemuna.com",
          "description": "Gemuna is the ultimate gaming website. Discover trending games, connect with the community, and stay updated with the latest in gaming.",
          "publisher": {
            "@type": "Organization",
            "name": "Gemuna",
            "url": "https://gemuna.com",
            "logo": {
              "@type": "ImageObject",
              "url": "/og-image.png"
            },
            "sameAs": [
              "https://twitter.com/gemuna",
              "https://discord.gg/gemuna"
            ]
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://gemuna.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }
      `}</script>
    </Helmet>
  );
}

export default SEO;
