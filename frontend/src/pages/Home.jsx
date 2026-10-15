import Hero from "../components/Hero";
import Services from "./Services";
import Gallery from "./Gallery";
import Reviews from "./Reviews";
import About from "./About";
import Contact from "./Contact";

import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      {/* ================= SEO ================= */}

      <Helmet>
        <title>
          Fiyorina Chiffon | Luxury Chiffon Fashion & Traditional Clothing
          Ethiopia
        </title>

        <meta
          name="description"
          content="
          Fiyorina Chiffon creates luxury chiffon dresses,
          Ethiopian traditional clothing, custom fashion designs,
          and premium textile materials with elegant craftsmanship.
          "
        />

        <meta
          name="keywords"
          content="
          Fiyorina Chiffon,
          chiffon dress Ethiopia,
          luxury fashion Ethiopia,
          traditional Ethiopian clothing,
          custom made clothes Addis Ababa,
          fashion designer Ethiopia,
          premium textile materials,
          chiffon fabric supplier,
          elegant dresses Ethiopia
          "
        />

        <meta name="author" content="Fiyorina Chiffon" />

        <meta name="robots" content="index, follow" />

        {/* CANONICAL */}

        <link rel="canonical" href="https://fiyorinachiffon.com/" />

        {/* ================= OPEN GRAPH ================= */}

        <meta
          property="og:title"
          content="
          Fiyorina Chiffon | Luxury Fashion & Custom Designs Ethiopia
          "
        />

        <meta
          property="og:description"
          content="
          Discover premium chiffon clothing,
          traditional fashion,
          custom designer outfits,
          and quality textile materials from Fiyorina Chiffon.
          "
        />

        <meta
          property="og:image"
          content="https://fiyorinachiffon.com/og-image.jpg"
        />

        <meta property="og:url" content="https://fiyorinachiffon.com/" />

        <meta property="og:type" content="website" />

        <meta property="og:site_name" content="Fiyorina Chiffon" />

        {/* ================= TWITTER ================= */}

        <meta name="twitter:card" content="summary_large_image" />

        <meta
          name="twitter:title"
          content="
          Fiyorina Chiffon | Premium Fashion Ethiopia
          "
        />

        <meta
          name="twitter:description"
          content="
          Luxury chiffon fashion,
          traditional clothing,
          custom designs,
          and premium textile collections.
          "
        />

        <meta
          name="twitter:image"
          content="https://fiyorinachiffon.com/og-image.jpg"
        />

        {/* ================= STRUCTURED DATA ================= */}

        <script type="application/ld+json">
          {`

        {
          "@context":"https://schema.org",

          "@type":"ClothingStore",

          "name":"Fiyorina Chiffon",

          "url":"https://fiyorinachiffon.com/",

          "image":
          "https://fiyorinachiffon.com/logo.png",


          "description":
          "Luxury chiffon clothing brand specializing in traditional Ethiopian fashion, custom designs, and premium textile materials.",


          "founder":
          {
            "@type":"Person",
            "name":"Zubiyda Hussen",
            "jobTitle":"Fashion Designer"
          },


          "telephone":
          "+251912441059",


          "address":
          {
            "@type":"PostalAddress",

            "streetAddress":
            "Merkato Arogaw Military Tera F143",

            "addressLocality":
            "Addis Ababa",

            "addressCountry":
            "Ethiopia"
          },


          "sameAs":
          [
            "https://instagram.com/",
            "https://facebook.com/"
          ]

        }

        `}
        </script>
      </Helmet>

      {/* ================= PAGE CONTENT ================= */}

      <Hero />

      <Services />

      <Gallery />

      <Reviews />

      <About />

      <Contact />
    </>
  );
};

export default Home;
