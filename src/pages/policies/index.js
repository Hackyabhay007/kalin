import Nav from "@/component/Nav";
import Footer from "@/component/Footer";
import Policy from "./Policy";
import Head from "next/head"; // Import next/head for SEO tags

export default function PolicyPage() {
  return (
    <>
      {/* SEO Tags for Policy Page */}
      <Head>
        <title>Policies - Sannuri Rugs</title>
        <meta
          name="description"
          content="Read the privacy and policies for Sannuri Rugs. Understand how we protect your data and the terms for using our website and services."
        />
        <meta
          name="keywords"
          content="privacy policy, terms and conditions, user agreement, data protection, privacy, Sannuri Rugs, website terms"
        />
        <meta name="author" content="Sannuri Rugs" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Privacy & Policy - Sannuri Rugs" />
        <meta
          property="og:description"
          content="Learn about the privacy and policies of Sannuri Rugs. We prioritize your privacy and explain how we protect your information."
        />
        <meta property="og:image" content="/local/images/logo.png" /> {/* Update with your preferred image */}
        <meta property="og:url" content="https://sanurrirugs.com/policy" />
        <meta property="og:type" content="website" />

        {/* Twitter Tags */}
        <meta name="twitter:title" content="Privacy & Policy - Sannuri Rugs" />
        <meta
          name="twitter:description"
          content="Read the privacy and policies of Sannuri Rugs. Discover how we handle and protect your personal data."
        />
        <meta name="twitter:image" content="/local/images/logo.png" /> {/* Update with your preferred image */}
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Nav />
      <Policy />
      <Footer />
    </>
  );
}
