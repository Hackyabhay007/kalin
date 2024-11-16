import Nav from "@/component/Nav";
import Footer from "@/component/Footer";
import Contact_us from "./Contact_us";
import Head from "next/head"; // Import next/head for SEO tags

export default function Contact() {
  return (
    <>
      {/* SEO Tags for Contact Us Page */}
      <Head>
        <title>Contact Us - Sannuri Rugs</title>
        <meta
          name="description"
          content="Get in touch with Sannuri Rugs for any inquiries, support, or product information. Our team is here to assist you with your needs."
        />
        <meta
          name="keywords"
          content="contact us, customer support, inquiries, Sannuri Rugs, contact, help, rug questions, rug orders"
        />
        <meta name="author" content="Sannuri Rugs" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Contact Us - Sannuri Rugs" />
        <meta
          property="og:description"
          content="Reach out to Sannuri Rugs for any inquiries or support. Our team is ready to assist you with your questions and orders."
        />
        <meta property="og:image" content="/local/images/logo.png" /> {/* Update with your preferred image */}
        <meta property="og:url" content="https://sanurrirugs.com/contact-us" />
        <meta property="og:type" content="website" />

        {/* Twitter Tags */}
        <meta name="twitter:title" content="Contact Us - Sannuri Rugs" />
        <meta
          name="twitter:description"
          content="Get in touch with Sannuri Rugs for inquiries, support, and more. We're here to assist you with your rug-related questions."
        />
        <meta name="twitter:image" content="/local/images/logo.png" /> {/* Update with your preferred image */}
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Nav />
      <Contact_us />
      <Footer />
    </>
  );
}
