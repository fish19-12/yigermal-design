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
        <title>Yigermal Design | Habesha Clothing</title>
        <meta
          name="description"
          content="Yigermal Design creates traditional Habesha clothing for women, men, couples, and families."
        />
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
