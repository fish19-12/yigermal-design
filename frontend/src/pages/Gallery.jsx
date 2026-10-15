import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { FaArrowRight, FaStar } from "react-icons/fa";

import { useCallback } from "react";

import { useLanguage } from "../context/LanguageContext.jsx";

import en from "../translations/en.json";
import am from "../translations/am.json";
import { collections } from "../data/galleryData.js";

const Gallery = () => {
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

  return (
    <div
      className="
      min-h-screen
      bg-[#FFE6EE]
      text-[#1A1A1A]
      overflow-hidden
      "
    >
      {/* HEADER */}

      <section
        className="
        pt-16
        pb-10
        px-5
        sm:px-8
        "
      >
        <div
          className="
          max-w-7xl
          mx-auto
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className="
            flex
            flex-col
            md:flex-row
            md:items-end
            justify-between
            gap-6
            "
          >
            <div>
              <div
                className="
                inline-flex
                items-center
                gap-2
                px-5
                py-2
                rounded-full
                bg-white
                shadow-sm
                text-[#FF2D6F]
                text-xs
                font-bold
                uppercase
                tracking-widest
                "
              >
                <FaStar />

                {translate("Yigermal Design Gallery")}
              </div>

              <h1
                className="
                mt-5
                text-3xl
                sm:text-5xl
                font-serif
                font-bold
                leading-tight
                "
              >
                {translate("Habesha Clothing")}

                <span
                  className="
                  block
                  text-[#FF2D6F]
                  "
                >
                  {translate("Collections")}
                </span>
              </h1>
            </div>

            <p
              className="
              max-w-md
              text-gray-600
              text-sm
              sm:text-base
              leading-relaxed
              "
            >
              {translate(
                "Explore Habesha clothing collections for women, men, couples, families, and children. Each piece celebrates Ethiopian heritage through thoughtful design and handcrafted detail.",
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* COLLECTION CARDS */}

      <section
        className="
        px-5
        sm:px-8
        pb-24
        "
      >
        <div
          className="
          max-w-7xl
          mx-auto
          "
        >
          <div
            className="
            grid
            grid-cols-2
            md:grid-cols-3
            xl:grid-cols-5
            gap-4
            sm:gap-6
            "
          >
            {collections.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -12,
                }}
                className="
                group
                relative
                h-[300px]
                sm:h-[420px]
                rounded-[30px]
                overflow-hidden
                shadow-xl
                bg-white
                "
              >
                <img
                  src={item.image}
                  alt={translate(item.title)}
                  loading="lazy"
                  className="
                  absolute
                  inset-0
                  w-full
                  h-full
                  object-cover
                  transition
                  duration-700
                  group-hover:scale-110
                  "
                />

                <div
                  className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/90
                  via-black/40
                  to-transparent
                  "
                />

                <div
                  className="
                  absolute
                  top-4
                  right-4
                  sm:top-6
                  sm:right-6
                  w-10
                  h-10
                  sm:w-14
                  sm:h-14
                  rounded-2xl
                  bg-white
                  flex
                  items-center
                  justify-center
                  text-[#FF2D6F]
                  text-lg
                  sm:text-2xl
                  shadow-lg
                  group-hover:rotate-12
                  transition
                  "
                >
                  <item.icon />
                </div>

                <div
                  className="
                  absolute
                  bottom-0
                  p-4
                  sm:p-6
                  text-white
                  "
                >
                  <p
                    className="
                    text-[10px]
                    sm:text-xs
                    uppercase
                    tracking-widest
                    text-[#FFD6E3]
                    font-bold
                    "
                  >
                    {translate(item.category)}
                  </p>

                  <h2
                    className="
                    mt-2
                    text-base
                    sm:text-xl
                    font-bold
                    "
                  >
                    {translate(item.title)}
                  </h2>

                  <p
                    className="
                    hidden
                    sm:block
                    mt-3
                    text-sm
                    text-white/80
                    line-clamp-3
                    "
                  >
                    {translate(item.description)}
                  </p>

                  <Link
                    to={item.link}
                    className="
                    mt-4
                    inline-flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-full
                    bg-white
                    text-[#FF2D6F]
                    text-xs
                    sm:text-sm
                    font-bold
                    hover:scale-105
                    transition
                    "
                  >
                    {translate("Explore")}

                    <FaArrowRight />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PREMIUM MESSAGE */}

      <section
        className="
        bg-white
        py-20
        px-5
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="
          max-w-4xl
          mx-auto
          text-center
          "
        >
          <h2
            className="
            text-3xl
            sm:text-5xl
            font-serif
            font-bold
            "
          >
            {translate("Where Fashion Becomes Art")}
          </h2>

          <p
            className="
            mt-5
            text-gray-600
            max-w-2xl
            mx-auto
            "
          >
            {translate(
              "Every Yigermal Design creation celebrates Ethiopian heritage through carefully chosen fabrics, thoughtful design, and beautiful craftsmanship.",
            )}
          </p>

          <Link
            to="/contact"
            className="
            inline-flex
            mt-8
            px-10
            py-4
            rounded-full
            bg-[#FF2D6F]
            text-white
            font-bold
            shadow-xl
            hover:scale-105
            transition
            "
          >
            {translate("Contact Designer")}
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Gallery;
