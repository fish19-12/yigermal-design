import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCallback } from "react";

import { useLanguage } from "../context/LanguageContext.jsx";

import en from "../translations/en.json";
import am from "../translations/am.json";

import {
  FaGem,
  FaTshirt,
  FaPalette,
  FaCrown,
  FaLeaf,
  FaHeart,
  FaArrowRight,
  FaStar,
  FaCheck,
} from "react-icons/fa";

/* ================= IMAGES ================= */

import chiffonImg from "../assets/chiffon.jpg";
import bridalImg from "../assets/bridal.jpg";
import customImg from "../assets/custom.jpg";
import traditionalImg from "../assets/traditional.jpg";
import textileImg from "../assets/textile.jpg";
import stylingImg from "../assets/styling.jpg";

/* =====================================================
 FIYORINA PREMIUM SERVICES DATA
===================================================== */

const services = [
  {
    title: "Luxury Chiffon Collection",

    subtitle: "Signature Feminine Elegance",

    description:
      "Exclusive chiffon designs created with premium fabrics, elegant colors, and timeless beauty.",

    image: chiffonImg,

    icon: <FaGem />,

    badge: "Featured",

    features: [
      "Premium Chiffon",
      "Luxury Colors",
      "Elegant Finish",
      "Soft Fabric",
    ],
  },

  {
    title: "Bridal Luxury Collection",

    subtitle: "Your Dream Wedding Look",

    description:
      "Beautiful bridal creations designed with luxury details, perfect finishing, and unforgettable elegance.",

    image: bridalImg,

    icon: <FaCrown />,

    badge: "Bridal",

    features: [
      "Wedding Style",
      "Custom Design",
      "Luxury Details",
      "Perfect Fit",
    ],
  },

  {
    title: "Ethiopian Heritage Wear",

    subtitle: "Tradition Meets Modern Luxury",

    description:
      "Modern Ethiopian fashion inspired by culture, craftsmanship, and premium artistic details.",

    image: traditionalImg,

    icon: <FaTshirt />,

    badge: "Heritage",

    features: [
      "Habesha Style",
      "Premium Embroidery",
      "Event Wear",
      "Modern Touch",
    ],
  },

  {
    title: "Custom Fashion Design",

    subtitle: "Created Only For You",

    description:
      "Transform your personal vision into a unique fashion piece designed around your style.",

    image: customImg,

    icon: <FaPalette />,

    badge: "Bespoke",

    features: [
      "Personal Design",
      "Custom Size",
      "Unique Style",
      "Luxury Finish",
    ],
  },

  {
    title: "Premium Textile Collection",

    subtitle: "Luxury Materials Selection",

    description:
      "High-quality chiffon and fashion textiles selected for designers and fashion lovers.",

    image: textileImg,

    icon: <FaLeaf />,

    badge: "Premium",

    features: [
      "Designer Fabric",
      "Quality Material",
      "Bulk Supply",
      "Luxury Choice",
    ],
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
    <div
      className="
min-h-screen
bg-[#FFF7FA]
text-[#1A1A1A]
overflow-hidden
"
    >
      {/* ================= INTRO ================= */}

      <section
        className="
relative
pt-10
pb-6
px-5
"
      >
        <div
          className="
absolute
top-0
left-1/2
-translate-x-1/2
w-[260px]
h-[260px]
bg-[#FF2D6F]/10
blur-[100px]
rounded-full
"
        />

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
          className="
relative
max-w-xl
mx-auto
text-center
"
        >
          <p
            className="
flex
items-center
justify-center
gap-2
text-[10px]
uppercase
tracking-[0.45em]
font-bold
text-[#FF2D6F]
"
          >
            <FaStar className="text-[#F59E0B]" />

            {translate("FIYORINA COLLECTION")}
          </p>

          <h1
            className="
mt-3
text-3xl
sm:text-4xl
font-serif
font-bold
leading-tight
"
          >
            {translate("Luxury Fashion")}

            <span
              className="
block
text-[#FF2D6F]
"
            >
              {translate("Created For You")}
            </span>
          </h1>

          <p
            className="
mt-3
text-sm
text-[#6B7280]
max-w-md
mx-auto
leading-relaxed
"
          >
            {translate(
              "Discover elegant chiffon, bridal beauty, traditional designs and custom creations.",
            )}
          </p>
        </motion.div>
      </section>
      {/* ================= SERVICES GRID ================= */}

      <section
        className="
max-w-7xl
mx-auto
px-5
pb-20
"
      >
        <div
          className="
flex
items-center
justify-between
mb-8
"
        >
          <h2
            className="
text-2xl
sm:text-3xl
font-serif
font-bold
"
          >
            {translate("Our Designs")}
          </h2>

          <Link
            to="/gallery"
            className="
text-xs
uppercase
tracking-widest
font-bold
text-[#FF2D6F]
hover:opacity-70
transition
"
          >
            {translate("View All")}
          </Link>
        </div>

        <div
          className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
gap-6
"
        >
          {services.map((service, index) => (
            <motion.article
              key={index}
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
              whileHover={{
                y: -8,
              }}
              className="
group
bg-white
rounded-[28px]
overflow-hidden
border
border-[#F1DCE3]
shadow-sm
hover:shadow-xl
transition-all
duration-500
"
            >
              {/* IMAGE */}

              <div
                className="
relative
h-[320px]
sm:h-[350px]
overflow-hidden
"
              >
                <img
                  src={service.image}
                  alt={translate(service.title)}
                  loading="lazy"
                  className="
w-full
h-full
object-cover
group-hover:scale-110
transition-transform
duration-700
"
                />

                <div
                  className="
absolute
inset-0
bg-gradient-to-t
from-black/70
via-black/10
to-transparent
"
                />

                {/* BADGE */}

                <div
                  className="
absolute
top-4
left-4
px-4
py-2
rounded-full
bg-white/95
text-[#FF2D6F]
text-[11px]
font-bold
flex
items-center
gap-2
shadow-md
"
                >
                  <FaStar className="text-[#F59E0B]" />

                  {translate(service.badge)}
                </div>

                {/* ICON */}

                <div
                  className="
absolute
bottom-4
right-4
w-14
h-14
rounded-2xl
bg-white
flex
items-center
justify-center
text-[#FF2D6F]
text-2xl
shadow-lg
group-hover:rotate-12
transition-transform
"
                >
                  {service.icon}
                </div>
              </div>

              {/* CONTENT */}

              <div
                className="
p-5
"
              >
                <h3
                  className="
text-xl
font-serif
font-bold
group-hover:text-[#FF2D6F]
transition-colors
"
                >
                  {translate(service.title)}
                </h3>

                <p
                  className="
mt-2
text-sm
font-semibold
text-[#F59E0B]
"
                >
                  {translate(service.subtitle)}
                </p>

                <p
                  className="
mt-3
text-sm
text-[#6B7280]
leading-relaxed
"
                >
                  {translate(service.description)}
                </p>

                {/* FEATURES */}

                <div
                  className="
mt-5
flex
flex-wrap
gap-2
"
                >
                  {service.features.map((feature, i) => (
                    <span
                      key={i}
                      className="
flex
items-center
gap-1.5
px-3
py-1.5
rounded-full
bg-[#FFF3F7]
text-[11px]
font-semibold
"
                    >
                      <FaCheck
                        className="
text-[#FF2D6F]
text-[9px]
"
                      />

                      {translate(feature)}
                    </span>
                  ))}
                </div>

                {/* BUTTON */}

                <Link
                  to="/gallery"
                  className="
mt-6
flex
items-center
justify-center
gap-3
w-full
py-3.5
rounded-full
bg-[#1A1A1A]
text-white
text-sm
font-semibold
hover:bg-[#FF2D6F]
transition-all
"
                >
                  {translate("View Collection")}

                  <FaArrowRight />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
      {/* ================= WHY FIYORINA ================= */}

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
              {translate("WHY FIYORINA")}
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
              {translate("More Than Fashion")}

              <span
                className="
block
text-[#FF2D6F]
"
              >
                {translate("A Luxury Experience")}
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
                "Every creation combines premium fabrics, creative design, and careful craftsmanship to make your style unforgettable.",
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

                title: "Premium Quality",

                text: "Luxury fabrics and carefully selected materials for every design.",
              },

              {
                icon: <FaHeart />,

                title: "Personal Style",

                text: "Fashion created around your personality, beauty and vision.",
              },

              {
                icon: <FaCrown />,

                title: "Expert Craftsmanship",

                text: "Professional finishing with attention to every detail.",
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
            {translate("FIYORINA CHIFFON")}
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
            {translate("Create Your")}

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
              "Choose luxury chiffon, bridal elegance, traditional beauty or a custom design created especially for you.",
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
