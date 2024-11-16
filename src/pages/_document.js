import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/local/images/logo.png" type="image/png" />

        {/* Global SEO Tags */}
        <meta name="description" content="Sannuri Rugs offers luxurious hand-knotted rugs and carpets. Experience the craftsmanship of 2500 years-old weaving traditions combined with modern designs and customizable options." />
        <meta name="keywords" content="hand-knotted rugs, customizable carpets, premium rugs, wool rugs, silk rugs, cotton rugs, Sannuri Rugs, sustainable rugs, luxury rugs, Indian rugs, high-quality carpets" />
        <meta name="author" content="Sannuri Rugs" />

        {/* Open Graph Metadata */}
        <meta property="og:title" content="Sannuri Rugs - Premium Hand-Knotted Rugs & Carpets" />
        <meta property="og:description" content="Discover the finest hand-knotted rugs that blend traditional craftsmanship with contemporary designs. Customizable by color, size, shape, and category." />
        <meta property="og:image" content="/images/logo.jpeg" />
        <meta property="og:url" content="https://sanurrirugs.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Metadata */}
        <meta name="twitter:title" content="Sannuri Rugs - Premium Hand-Knotted Rugs & Carpets" />
        <meta name="twitter:description" content="Explore luxurious hand-knotted rugs with customizable options, crafted from premium wool, silk, and cotton." />
        <meta name="twitter:image" content="/images/logo.jpeg" />
        <meta name="twitter:card" content="summary_large_image" />

        
  
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
