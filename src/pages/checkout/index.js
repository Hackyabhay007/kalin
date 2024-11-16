import Nav from "@/component/Nav";
import Footer from "@/component/Footer";
import Checkout from "./Checkout";
import Head from "next/head"; // Import next/head for SEO tags

export default function Billing() {
  return (
    <>
      {/* SEO Tags for Checkout Page */}
      <Head>
        <title>Checkout - Sannuri Rugs</title>
        <meta
          name="description"
          content="Complete your purchase at Sannuri Rugs. Securely checkout your selected hand-knotted rugs and carpets with our easy-to-use payment system."
        />
        <meta
          name="keywords"
          content="checkout, purchase, payment, Sannuri Rugs, secure checkout, rug purchase, order confirmation, hand-knotted rugs, carpets"
        />
        <meta name="author" content="Sannuri Rugs" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Checkout - Sannuri Rugs" />
        <meta
          property="og:description"
          content="Finalize your order at Sannuri Rugs with a secure and easy checkout process. Order your premium hand-knotted rugs and carpets today."
        />
        <meta property="og:image" content="/local/images/logo.png" /> {/* Update with your preferred image */}
        <meta property="og:url" content="https://sanurrirugs.com/checkout" />
        <meta property="og:type" content="website" />

        {/* Twitter Tags */}
        <meta name="twitter:title" content="Checkout - Sannuri Rugs" />
        <meta
          name="twitter:description"
          content="Secure checkout at Sannuri Rugs. Complete your rug order and enjoy premium hand-knotted rugs delivered to your doorstep."
        />
        <meta name="twitter:image" content="/local/images/logo.png" /> {/* Update with your preferred image */}
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Nav />
      <Checkout />
      <Footer />
    </>
  );
}
