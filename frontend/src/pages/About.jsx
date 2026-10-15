import { motion } from "framer-motion";
import { useCallback } from "react";

import ceoPhoto from "../assets/ceo.jpg";

import {
  FaGem,
  FaTshirt,
  FaPalette,
  FaGlobe,
  FaLeaf,
  FaStar,
  FaHeart,
  FaAward,
} from "react-icons/fa";

import { useLanguage } from "../context/LanguageContext.jsx";

import en from "../translations/en.json";
import am from "../translations/am.json";

const About = () => {
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

  const values = [
    {
      icon: FaGem,
      title: translate("Authentic Ethiopian Fashion"),
      desc: translate(
        "We celebrate the beauty of Ethiopian traditional clothing and Habesha fashion by combining cultural heritage with elegant contemporary design.",
      ),
    },

    {
      icon: FaPalette,
      title: translate("Creative Cultural Design"),
      desc: translate(
        "Our designs bring together Ethiopian cultural identity, traditional patterns, beautiful details, and modern creativity to create distinctive clothing.",
      ),
    },

    {
      icon: FaTshirt,
      title: translate("Quality Craftsmanship"),
      desc: translate(
        "Every garment is carefully created with attention to fabric quality, tailoring, finishing, comfort, and the details that make Ethiopian clothing special.",
      ),
    },

    {
      icon: FaGlobe,
      title: translate("Sharing Ethiopian Culture"),
      desc: translate(
        "We are proud to share Ethiopian traditional clothing and Habesha fashion with customers in Ethiopia and fashion lovers around the world.",
      ),
    },
  ];

  const services = [
    {
      icon: FaLeaf,
      title: translate("Traditional Ethiopian Clothing"),
      text: translate(
        "Discover beautifully designed Ethiopian traditional clothes inspired by the rich cultural heritage and diverse traditions of Ethiopia.",
      ),
    },

    {
      icon: FaStar,
      title: translate("Habesha Clothing & Fashion"),
      text: translate(
        "We create elegant Habesha clothing for special occasions, celebrations, cultural events, weddings, holidays, and everyday cultural expression.",
      ),
    },

    {
      icon: FaHeart,
      title: translate("Custom Ethiopian Designs"),
      text: translate(
        "Our custom design experience allows customers to create clothing that reflects their personality, cultural identity, preferred style, and special occasion.",
      ),
    },
  ];

  return (
    <main className="bg-white text-[#181818] overflow-hidden">
      {/* =====================================================
          INTRO SECTION
      ===================================================== */}

      <section
        className="
          max-w-7xl
          mx-auto
          px-5
          sm:px-8
          pt-24
          pb-20
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="max-w-4xl"
        >
          <p
            className="
              uppercase
              tracking-[0.4em]
              text-sm
              font-semibold
              text-[#E91E63]
              mb-6
            "
          >
            {translate("About Yigermal Design")}
          </p>

          <h1
            className="
              text-4xl
              sm:text-5xl
              md:text-6xl
              font-bold
              leading-tight
            "
          >
            {translate("Celebrating Ethiopian Traditional Fashion")}

            <span
              className="
                block
                text-[#E91E63]
              "
            >
              {translate("Through Habesha Clothing & Culture")}
            </span>
          </h1>

          <p
            className="
              mt-8
              text-lg
              md:text-xl
              leading-relaxed
              text-gray-600
            "
          >
            {translate(
              "Yigermal Design is an Ethiopian fashion brand dedicated to creating beautiful traditional Ethiopian clothing, elegant Habesha clothes, and culturally inspired fashion for people who value heritage, beauty, and individuality.",
            )}

            <br />
            <br />

            {translate(
              "Our work is inspired by the rich cultural heritage of Ethiopia. From traditional details and patterns to contemporary silhouettes and custom designs, we create clothing that allows people to celebrate their Ethiopian identity with confidence and elegance.",
            )}
          </p>
        </motion.div>
      </section>

      {/* =====================================================
          FOUNDER & CEO SECTION
      ===================================================== */}

      <section
        className="
          bg-[#FFF4F7]
          py-20
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            px-5
            sm:px-8
            grid
            md:grid-cols-2
            gap-14
            items-center
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
            className="flex justify-center"
          >
            <img
              src={ceoPhoto}
              alt="Yigrem Sitotaw - Founder and CEO of Yigermal Design"
              className="
                w-full
                max-w-md
                h-[520px]
                object-cover
                rounded-[40px]
                shadow-2xl
              "
            />
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            <p
              className="
                uppercase
                tracking-widest
                text-sm
                text-[#E91E63]
                font-semibold
              "
            >
              {translate("Founder & CEO")}
            </p>

            <h2
              className="
                mt-4
                text-4xl
                md:text-5xl
                font-bold
              "
            >
              Yigrem Sitotaw
            </h2>

            <p
              className="
                mt-6
                text-gray-600
                text-lg
                leading-relaxed
              "
            >
              {translate(
                "Yigrem Sitotaw is the Founder and CEO of Yigermal Design, an Ethiopian fashion brand built around the beauty, identity, and cultural heritage of Ethiopian traditional clothing and Habesha fashion.",
              )}
            </p>

            <p
              className="
                mt-5
                text-gray-600
                text-lg
                leading-relaxed
              "
            >
              {translate(
                "Through Yigermal Design, Yigrem Sitotaw is passionate about creating clothing that respects Ethiopian traditions while bringing fresh, elegant, and contemporary ideas to traditional fashion.",
              )}
            </p>

            <p
              className="
                mt-5
                text-gray-600
                text-lg
                leading-relaxed
              "
            >
              {translate(
                "The vision is to make Ethiopian traditional clothing and Habesha fashion accessible, beautiful, and meaningful for every generation while proudly sharing Ethiopian culture with the world.",
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          MISSION & VISION
      ===================================================== */}

      <section
        className="
          max-w-7xl
          mx-auto
          px-5
          sm:px-8
          py-24
        "
      >
        <div
          className="
            grid
            md:grid-cols-2
            gap-8
          "
        >
          {/* MISSION */}

          <div
            className="
              p-10
              rounded-3xl
              bg-black
              text-white
            "
          >
            <FaAward
              className="
                text-4xl
                text-pink-400
                mb-6
              "
            />

            <h3
              className="
                text-3xl
                font-bold
                mb-5
              "
            >
              {translate("Our Mission")}
            </h3>

            <p
              className="
                text-gray-300
                leading-relaxed
              "
            >
              {translate(
                "Our mission is to create high-quality Ethiopian traditional clothing and Habesha fashion that celebrates culture, craftsmanship, individuality, and modern elegance while providing customers with a memorable fashion experience.",
              )}
            </p>
          </div>

          {/* VISION */}

          <div
            className="
              p-10
              rounded-3xl
              bg-[#FFE8F0]
            "
          >
            <FaGem
              className="
                text-4xl
                text-pink-600
                mb-6
              "
            />

            <h3
              className="
                text-3xl
                font-bold
                mb-5
              "
            >
              {translate("Our Vision")}
            </h3>

            <p
              className="
                text-gray-600
                leading-relaxed
              "
            >
              {translate(
                "Our vision is to become a recognized Ethiopian fashion brand known for beautiful traditional clothing, exceptional Habesha designs, quality craftsmanship, and the authentic representation of Ethiopian cultural fashion.",
              )}
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          VALUES
      ===================================================== */}

      <section
        className="
          bg-[#FFF8FA]
          py-24
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            px-5
            sm:px-8
          "
        >
          <div
            className="
              text-center
              mb-16
            "
          >
            <p
              className="
                uppercase
                tracking-[0.3em]
                text-sm
                font-semibold
                text-[#E91E63]
                mb-4
              "
            >
              {translate("Our Values")}
            </p>

            <h2
              className="
                text-4xl
                md:text-5xl
                font-bold
              "
            >
              {translate("What Makes")}

              <span
                className="
                  text-[#E91E63]
                "
              >
                {" "}
                {translate("Yigermal Design Different")}
              </span>
            </h2>

            <p
              className="
                max-w-3xl
                mx-auto
                mt-6
                text-gray-600
                text-lg
                leading-relaxed
              "
            >
              {translate(
                "Our values are rooted in Ethiopian culture, quality craftsmanship, creativity, and our commitment to preserving and celebrating traditional fashion.",
              )}
            </p>
          </div>

          <div
            className="
              grid
              sm:grid-cols-2
              lg:grid-cols-4
              gap-7
            "
          >
            {values.map((item, index) => (
              <motion.div
                key={index}
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
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -10,
                }}
                className="
                  bg-white
                  rounded-3xl
                  p-8
                  shadow-lg
                  border
                  border-gray-100
                "
              >
                <item.icon
                  className="
                    text-4xl
                    text-[#E91E63]
                    mb-6
                  "
                />

                <h3
                  className="
                    text-xl
                    font-bold
                    mb-4
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    text-gray-600
                    leading-relaxed
                  "
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          ETHIOPIAN CLOTHING SERVICES
      ===================================================== */}

      <section
        className="
          py-24
          max-w-7xl
          mx-auto
          px-5
          sm:px-8
        "
      >
        <div
          className="
            text-center
            max-w-3xl
            mx-auto
            mb-14
          "
        >
          <p
            className="
              uppercase
              tracking-[0.3em]
              text-sm
              font-semibold
              text-[#E91E63]
              mb-4
            "
          >
            {translate("What We Create")}
          </p>

          <h2
            className="
              text-4xl
              md:text-5xl
              font-bold
            "
          >
            {translate("Traditional Ethiopian")}

            <span
              className="
                block
                text-[#E91E63]
              "
            >
              {translate("Clothing & Habesha Fashion")}
            </span>
          </h2>

          <p
            className="
              mt-6
              text-gray-600
              text-lg
              leading-relaxed
            "
          >
            {translate(
              "From traditional Ethiopian cultural clothing to elegant Habesha fashion and custom creations, Yigermal Design brings Ethiopian heritage into beautiful modern fashion.",
            )}
          </p>
        </div>

        <div
          className="
            grid
            md:grid-cols-3
            gap-8
          "
        >
          {services.map((item, index) => (
            <motion.div
              key={index}
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
                duration: 0.6,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -8,
              }}
              className="
                p-8
                rounded-3xl
                border
                border-gray-100
                shadow-sm
                hover:shadow-xl
                transition-shadow
              "
            >
              <item.icon
                className="
                  text-4xl
                  text-[#E91E63]
                  mb-5
                "
              />

              <h3
                className="
                  text-2xl
                  font-bold
                  mb-4
                "
              >
                {item.title}
              </h3>

              <p
                className="
                  text-gray-600
                  leading-relaxed
                "
              >
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =====================================================
          CULTURAL HERITAGE SECTION
      ===================================================== */}

      <section
        className="
          bg-black
          text-white
          py-24
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            px-5
            sm:px-8
            grid
            md:grid-cols-2
            gap-12
            items-center
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            <p
              className="
                uppercase
                tracking-[0.3em]
                text-sm
                font-semibold
                text-pink-400
                mb-5
              "
            >
              {translate("Our Cultural Identity")}
            </p>

            <h2
              className="
                text-4xl
                md:text-5xl
                font-bold
                leading-tight
              "
            >
              {translate("Ethiopian Heritage")}

              <span
                className="
                  block
                  text-pink-400
                "
              >
                {translate("Woven Into Every Design")}
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            <p
              className="
                text-gray-300
                text-lg
                leading-relaxed
              "
            >
              {translate(
                "Ethiopia has a rich and diverse clothing heritage, with traditional garments carrying stories of community, celebration, identity, craftsmanship, and cultural pride.",
              )}
            </p>

            <p
              className="
                mt-6
                text-gray-300
                text-lg
                leading-relaxed
              "
            >
              {translate(
                "At Yigermal Design, we are inspired by this heritage and work to create clothing that respects tradition while giving customers a contemporary way to express their Ethiopian and Habesha identity.",
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section
        className="
          py-24
          bg-gradient-to-r
          from-[#E91E63]
          to-[#F59E0B]
          text-white
          text-center
          px-5
        "
      >
        <p
          className="
            uppercase
            tracking-[0.35em]
            text-sm
            font-semibold
            mb-5
          "
        >
          {translate("Yigermal Design")}
        </p>

        <h2
          className="
            text-4xl
            md:text-6xl
            font-bold
          "
        >
          {translate("Experience Ethiopian Beauty")}

          <span
            className="
              block
            "
          >
            {translate("Through Traditional Fashion")}
          </span>
        </h2>

        <p
          className="
            max-w-2xl
            mx-auto
            mt-6
            text-lg
            leading-relaxed
          "
        >
          {translate(
            "Explore beautiful Ethiopian traditional clothing, elegant Habesha designs, and custom fashion created with cultural pride and modern creativity.",
          )}
        </p>

        <a
          href="/gallery"
          className="
            inline-block
            mt-10
            bg-white
            text-[#E91E63]
            px-10
            py-4
            rounded-full
            font-bold
            hover:scale-105
            transition
            shadow-lg
          "
        >
          {translate("Explore Ethiopian Collection")}
        </a>
      </section>

      {/* Mobile bottom navigation spacing */}
      <div className="h-20 md:hidden" />
    </main>
  );
};

export default About;
