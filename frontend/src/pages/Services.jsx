import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCallback } from "react";

import { useLanguage } from "../context/LanguageContext.jsx";

import en from "../translations/en.json";
import am from "../translations/am.json";

import {
  FaGem,
  FaCrown,
  FaHeart,
  FaArrowRight,
  FaStar,
  FaCheck,
  FaFemale,
  FaUserTie,
  FaUsers,
} from "react-icons/fa";

/* ================= IMAGES ================= */

import womenImg from "../assets/womens.jpg";
import menImg from "../assets/mens.jpg";
import couplesImg from "../assets/copule.jpg";
import familyImg from "../assets/family.jpg";

/* =====================================================
 YIGERMAL HABESHA CLOTHING SERVICES
===================================================== */

const services = [
  {
    title: "Habesha Women",
    subtitle: "Traditional clothing for women",
    description:
      "Custom-fitted Habesha dresses with thoughtful finishing for celebrations and special moments.",
    image: womenImg,
    icon: <FaFemale />,
    badge: "Women",
    features: ["Custom Fit", "Hand-finished", "Made to Order"],
  },
  {
    title: "Habesha Men",
    subtitle: "Traditional clothing for men",
    description:
      "Refined traditional menswear tailored for gatherings, celebrations, and everyday pride.",
    image: menImg,
    icon: <FaUserTie />,
    badge: "Men",
    features: ["Custom Fit", "Traditional Detail", "Made to Order"],
  },
  {
    title: "Habesha Couples",
    subtitle: "Coordinated looks for two",
    description:
      "Matching Habesha outfits designed for couples to celebrate together in style.",
    image: couplesImg,
    icon: <FaHeart />,
    badge: "Couples",
    features: ["Matching Looks", "Custom Fit", "Made to Order"],
  },
  {
    title: "Habesha Family",
    subtitle: "Coordinated clothing for family",
    description:
      "Complementary Habesha styles made for family gatherings and lasting memories.",
    image: familyImg,
    icon: <FaUsers />,
    badge: "Family",
    features: ["Coordinated Style", "Custom Fit", "Made to Order"],
  },
];

const Services = () => {
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
    <div className="min-h-screen overflow-hidden bg-[#fffaf8] text-[#211d1c]">
      {/* ================= INTRO ================= */}

      <section className="px-5 pb-5 pt-8 sm:px-8 sm:pb-7 sm:pt-12">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mx-auto grid max-w-7xl grid-cols-1 items-end gap-5 border-b border-[#e9dfdc] pb-6 md:grid-cols-[minmax(0,1fr)_16rem] md:gap-10 md:pb-7"
        >
          <div className="min-w-0">
            <p className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#a8445d] sm:text-[11px]">
              <span className="h-px w-6 bg-[#a8445d]" />
              {translate("YIGERMAL DESIGN SERVICES")}
            </p>

            <h1 className="mt-3 max-w-3xl font-serif text-3xl font-medium leading-[1.08] sm:text-5xl lg:text-6xl">
              {translate("Habesha Clothing")}

              <span className="mt-1 block text-2xl leading-tight text-[#a8445d] sm:text-4xl lg:text-5xl">
                {translate("Made for Every Generation")}
              </span>
            </h1>
          </div>

          <p className="max-w-sm border-l-[3px] border-[#d47a56] bg-white/75 px-4 py-3 text-sm leading-relaxed text-[#705956] shadow-sm md:mb-1 md:max-w-none">
            {translate("Women, men, couples, and family styles.")}
          </p>
        </motion.div>
      </section>
      {/* ================= SERVICES GRID ================= */}

      <section className="mx-auto max-w-7xl px-5 pb-14 pt-5 sm:px-8 sm:pb-20 sm:pt-7">
        <div className="mb-5 flex items-end justify-between border-b border-[#e9dfdc] pb-4 sm:mb-7">
          <h2 className="font-serif text-2xl font-medium sm:text-3xl">
            {translate("Our Services")}
          </h2>

          <Link
            to="/gallery"
            className="inline-flex items-center gap-1 text-xs font-semibold uppercase text-[#a8445d] transition-opacity hover:opacity-70"
          >
            {translate("View All")}
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
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
                delay: index * 0.08,
              }}
              whileHover={{ y: -4 }}
              className="group flex min-w-0 flex-col overflow-hidden rounded-md border border-[#ead7da] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* IMAGE */}

              <div className="relative aspect-[4/3] overflow-hidden bg-[#2b2022] sm:aspect-[4/5]">
                <img
                  src={service.image}
                  alt={translate(service.title)}
                  loading="lazy"
                  className={`h-full w-full transition-transform duration-700 group-hover:scale-[1.035] ${service.title === "Habesha Men" ? "object-contain" : "object-cover"}`}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/5" />

                {/* BADGE */}

                <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/70 bg-white/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-[#a8445d] shadow-sm sm:left-4 sm:top-4 sm:text-[11px]">
                  <FaStar aria-hidden="true" />

                  {translate(service.badge)}
                </div>

                {/* ICON */}

                <div className="absolute bottom-3 right-3 grid size-10 place-items-center rounded-full bg-white text-lg text-[#a8445d] shadow-md transition-transform group-hover:rotate-12 sm:bottom-4 sm:right-4 sm:size-12">
                  {service.icon}
                </div>
              </div>

              {/* CONTENT */}

              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <h3 className="font-serif text-xl font-semibold leading-tight text-[#211d1c] transition-colors group-hover:text-[#a8445d] sm:text-2xl">
                  {translate(service.title)}
                </h3>

                <p className="mt-2 text-sm font-semibold text-[#a8445d]">
                  {translate(service.subtitle)}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-[#766b68]">
                  {translate(service.description)}
                </p>

                {/* FEATURES */}

                <div className="mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                  {service.features.map((feature, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#fff2f5] px-2.5 py-1.5 text-[10px] font-semibold text-[#644b50] sm:px-3 sm:text-[11px]"
                    >
                      <FaCheck
                        className="text-[9px] text-[#a8445d]"
                        aria-hidden="true"
                      />

                      {translate(feature)}
                    </span>
                  ))}
                </div>

                {/* BUTTON */}

                <Link
                  to="/gallery"
                  className="mt-auto flex w-full items-center justify-center gap-2 rounded-sm bg-[#a8445d] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#87354a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a8445d]"
                >
                  {translate("View Collection")}

                  <FaArrowRight />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
      {/* ================= WHY YIGERMAL DESIGN ================= */}

      <section
        className="
relative
bg-white
py-16
px-5
overflow-hidden
"
      >
        <div
          className="
absolute
right-0
top-0
w-[300px]
h-[300px]
bg-[#FF2D6F]/10
blur-3xl
rounded-full
"
        />

        <div
          className="
relative
max-w-6xl
mx-auto
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
text-center
"
          >
            <p
              className="
text-[10px]
uppercase
tracking-[0.45em]
font-bold
text-[#FF2D6F]
"
            >
              {translate("WHY YIGERMAL DESIGN")}
            </p>

            <h2
              className="
mt-4
text-3xl
sm:text-4xl
font-serif
font-bold
"
            >
              {translate("Habesha Clothing")}

              <span
                className="
block
text-[#FF2D6F]
"
              >
                {translate("Traditional Style")}
              </span>
            </h2>

            <p
              className="
mt-4
max-w-xl
mx-auto
text-sm
text-[#6B7280]
leading-relaxed
"
            >
              {translate(
                "Women's, men's, couple, and family clothing made with care for your occasion and fit.",
              )}
            </p>
          </motion.div>

          <div
            className="
grid
md:grid-cols-3
gap-6
mt-10
"
          >
            {[
              {
                icon: <FaGem />,

                title: "Custom Fit",

                text: "Habesha clothing tailored to your measurements.",
              },

              {
                icon: <FaHeart />,

                title: "Couples and Family",

                text: "Coordinated styles for gatherings and celebrations.",
              },

              {
                icon: <FaCrown />,

                title: "Habesha Detail",

                text: "Traditional Ethiopian clothing with thoughtful finishing.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -8,
                }}
                className="
bg-[#FFF7FA]
rounded-[28px]
p-7
text-center
border
border-[#F1DCE3]
shadow-sm
hover:shadow-lg
transition-all
"
              >
                <div
                  className="
w-14
h-14
mx-auto
rounded-full
bg-white
flex
items-center
justify-center
text-[#FF2D6F]
text-2xl
shadow
"
                >
                  {item.icon}
                </div>

                <h3
                  className="
mt-5
text-lg
font-bold
"
                >
                  {translate(item.title)}
                </h3>

                <p
                  className="
mt-3
text-sm
text-[#6B7280]
leading-relaxed
"
                >
                  {translate(item.text)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}

      <section
        className="
relative
overflow-hidden
py-16
px-5
bg-gradient-to-br
from-[#FF2D6F]
via-[#FF6394]
to-[#F59E0B]
text-white
"
      >
        <div
          className="
absolute
top-0
left-0
w-72
h-72
bg-white/20
blur-3xl
rounded-full
"
        />

        <div
          className="
absolute
bottom-0
right-0
w-72
h-72
bg-white/20
blur-3xl
rounded-full
"
        />

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
          transition={{
            duration: 0.7,
          }}
          className="
relative
max-w-3xl
mx-auto
text-center
"
        >
          <p
            className="
text-[10px]
uppercase
tracking-[0.5em]
font-bold
text-white/80
"
          >
            {translate("YIGERMAL DESIGN")}
          </p>

          <h2
            className="
mt-4
text-3xl
sm:text-4xl
md:text-5xl
font-serif
font-bold
leading-tight
"
          >
            {translate("Create a Look")}

            <span
              className="
block
"
            >
              {translate("Signature Style")}
            </span>
          </h2>

          <p
            className="
mt-4
max-w-xl
mx-auto
text-sm
text-white/90
leading-relaxed
"
          >
            {translate(
              "Discover Habesha clothing for women, men, couples, and families.",
            )}
          </p>

          <div
            className="
mt-8
flex
flex-col
sm:flex-row
justify-center
gap-4
"
          >
            <Link
              to="/contact"
              className="
px-8
py-3.5
rounded-full
bg-white
text-[#FF2D6F]
font-bold
text-sm
shadow-xl
hover:scale-105
transition
"
            >
              {translate("Book Your Design")}
            </Link>

            <Link
              to="/gallery"
              className="
px-8
py-3.5
rounded-full
border-2
border-white
font-bold
text-sm
hover:bg-white
hover:text-[#FF2D6F]
transition
"
            >
              {translate("Explore Gallery")}
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Services;
