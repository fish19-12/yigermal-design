import { Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { FaArrowRight, FaGem } from "react-icons/fa";

import { useLanguage } from "../context/LanguageContext.jsx";

import en from "../translations/en.json";
import am from "../translations/am.json";

import hero from "../assets/hero.jpg";

const Hero = () => {
  const { language } = useLanguage();

  const translations = {
    EN: en,
    AM: am,
  };

  const translate = useCallback(
    (text) => {
      return translations[language]?.[text] || text;
    },
    [language],
  );

  const [description, setDescription] = useState("");

  useEffect(() => {
    setDescription(
      translate(
        "Habesha clothing for women, men, couples, and families, designed by Yigermal Design.",
      ),
    );
  }, [language, translate]);

  const [text] = useTypewriter({
    words: [
      translate("Habesha Clothing"),

      translate("Women's Habesha Wear"),

      translate("Men's Habesha Wear"),

      translate("Couples and Family Styles"),
    ],

    loop: true,

    typeSpeed: 70,

    deleteSpeed: 40,

    delaySpeed: 1800,
  });

  return (
    <section
      className="
relative
h-[620px]
sm:h-[700px]
w-full
overflow-hidden
"
    >
      {/* SEO */}

      <h1 className="sr-only">
        {translate("Yigermal Design Habesha Clothing")}
      </h1>

      {/* IMAGE */}

      <div
        className="
absolute
inset-0
bg-cover
bg-center
"
        style={{
          backgroundImage: `url(${hero})`,
        }}
      />

      {/* PREMIUM IMAGE GRADIENT */}

      <div
        className="
absolute
inset-0
bg-gradient-to-r
from-black/70
via-black/35
to-transparent
"
      />

      <div
        className="
absolute
inset-0
bg-gradient-to-t
from-black/70
via-transparent
to-transparent
"
      />

      {/* CONTENT */}

      <div
        className="
relative
z-10
h-full
max-w-7xl
mx-auto
px-5
sm:px-8
flex
items-center
"
      >
        <motion.div
          initial={{
            opacity: 0,

            x: -40,
          }}
          animate={{
            opacity: 1,

            x: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
max-w-xl
text-white
mt-10
"
        >
          {/* BADGE */}

          <div
            className="
inline-flex
items-center
gap-2
px-4
py-2
rounded-full
bg-white/20
backdrop-blur-lg
border
border-white/30
text-xs
font-bold
uppercase
tracking-widest
"
          >
            <FaGem />

            {translate("YIGERMAL DESIGN")}
          </div>

          {/* TITLE */}

          <h2
            className="
mt-5
text-4xl
sm:text-5xl
md:text-6xl
font-black
leading-tight
"
          >
            {translate("Yigermal Design")}

            <span
              className="
block
text-[#FF4F91]
"
            >
              {text}

              <Cursor cursorStyle="|" />
            </span>
          </h2>

          {/* DESCRIPTION */}

          <p
            className="
mt-5
text-sm
sm:text-base
text-white/85
max-w-md
leading-relaxed
"
          >
            {description}
          </p>

          {/* BUTTONS */}

          <div
            className="
mt-7
flex
gap-3
"
          >
            <Link
              to="/gallery"
              className="
flex
items-center
gap-2
px-7
py-3
rounded-full
bg-[#FF2D6F]
text-white
font-bold
text-sm
shadow-xl
hover:scale-105
transition
"
            >
              {translate("Explore")}

              <FaArrowRight />
            </Link>

            <Link
              to="/contact"
              className="
px-7
py-3
rounded-full
bg-white/20
backdrop-blur-md
border
border-white/40
text-white
font-bold
text-sm
hover:bg-white
hover:text-[#FF2D6F]
transition
"
            >
              {translate("Designer")}
            </Link>
          </div>

          {/* FEATURES */}

          <div
            className="
mt-8
flex
gap-5
text-xs
font-semibold
text-white/80
"
          >
            <span>{translate("Women")}</span>

            <span>{translate("Men")}</span>

            <span>{translate("Couples & Family")}</span>
          </div>
        </motion.div>
      </div>

      {/* SCROLL */}

      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,

          repeat: Infinity,
        }}
        className="
absolute
bottom-6
left-1/2
-translate-x-1/2
text-white
text-xs
tracking-widest
hidden
sm:block
"
      >
        {translate("SCROLL ↓")}
      </motion.div>
    </section>
  );
};

export default Hero;
