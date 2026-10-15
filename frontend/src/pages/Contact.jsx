import {
  FaPhone,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaClock,
  FaInstagram,
  FaArrowRight,
} from "react-icons/fa";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCallback } from "react";

import { useLanguage } from "../context/LanguageContext.jsx";

import en from "../translations/en.json";
import am from "../translations/am.json";

const Contact = () => {
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

  const contactItems = [
    {
      icon: <FaPhone />,

      title: "Phone",

      content: (
        <div className="flex flex-col gap-1">
          <a
            href="tel:+251920106669"
            className="hover:text-[#FF2D6F] transition"
          >
            0920 106 669
          </a>

          <a
            href="tel:+251912622011"
            className="hover:text-[#FF2D6F] transition"
          >
            0912 622 011
          </a>

          <a
            href="tel:+251952755068"
            className="hover:text-[#FF2D6F] transition"
          >
            0952 755 068
          </a>
        </div>
      ),

      bg: "bg-[#FFE6EE]",

      color: "text-[#FF2D6F]",
    },

    {
      icon: <FaWhatsapp />,

      title: "WhatsApp",

      content: (
        <a
          href="https://wa.me/251920106669"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-600 transition"
        >
          {translate("Chat With Yigermal Design")}
        </a>
      ),

      bg: "bg-green-100",

      color: "text-green-600",
    },

    {
      icon: <FaInstagram />,

      title: "Instagram",

      content: "Yigermal Design",

      bg: "bg-pink-100",

      color: "text-pink-500",
    },

    {
      icon: <FaMapMarkerAlt />,

      title: "Address",

      content: (
        <span className="leading-relaxed">
          {translate(
            "Addisu Gebeya, Sheger Grand Mall, Shop No. AF-79, Addis Ababa, Ethiopia",
          )}
        </span>
      ),

      bg: "bg-[#FFE6EE]",

      color: "text-[#FF2D6F]",
    },

    {
      icon: <FaClock />,

      title: "Opening Hours",

      content: "Daily: 9:00 AM - 8:00 PM",

      bg: "bg-[#FFE6EE]",

      color: "text-[#FF2D6F]",
    },
  ];

  return (
    <div
      className="
      min-h-screen
      bg-[#FFF7FA]
      text-[#1A1A1A]
      overflow-hidden
      "
    >
      {/* =====================================================
          HERO
      ====================================================== */}

      <section
        className="
        relative
        pt-28
        pb-20
        px-5
        "
      >
        <div
          className="
          absolute
          top-0
          left-1/2
          -translate-x-1/2
          w-[320px]
          h-[320px]
          bg-[#FF2D6F]/10
          blur-[120px]
          rounded-full
          "
        />

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
          className="
          relative
          max-w-5xl
          mx-auto
          text-center
          "
        >
          <p
            className="
            uppercase
            tracking-[0.5em]
            text-xs
            font-bold
            text-[#FF2D6F]
            "
          >
            {translate("Yigermal Design")}
          </p>

          <h1
            className="
            mt-5
            text-4xl
            sm:text-5xl
            md:text-7xl
            font-serif
            font-bold
            leading-tight
            "
          >
            {translate("Contact Our")}

            <span
              className="
              block
              text-[#FF2D6F]
              "
            >
              {translate("Habesha Fashion Studio")}
            </span>
          </h1>

          <p
            className="
            mt-6
            max-w-3xl
            mx-auto
            text-sm
            md:text-lg
            text-[#6B7280]
            leading-relaxed
            "
          >
            {translate(
              "Connect with Yigermal Design for beautiful Habesha clothing, traditional Ethiopian cultural clothes, custom designs, and elegant fashion inspired by Ethiopian heritage.",
            )}
          </p>
        </motion.div>
      </section>

      {/* =====================================================
          CONTACT CONTENT
      ====================================================== */}

      <section
        className="
        max-w-7xl
        mx-auto
        px-5
        pb-24
        grid
        lg:grid-cols-2
        gap-8
        "
      >
        {/* ===================================================
            INFORMATION CARD
        ==================================================== */}

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
          className="
          bg-white
          rounded-[35px]
          p-6
          sm:p-10
          border
          border-[#F1DCE3]
          shadow-xl
          "
        >
          <div
            className="
            mb-10
            "
          >
            <h2
              className="
              text-3xl
              md:text-4xl
              font-serif
              font-bold
              "
            >
              {translate("Get In Touch")}
            </h2>

            <p
              className="
              mt-3
              text-sm
              md:text-base
              text-[#6B7280]
              leading-relaxed
              "
            >
              {translate(
                "We would love to help you find or create the perfect Habesha clothing and traditional Ethiopian design for you.",
              )}
            </p>
          </div>

          <div
            className="
            space-y-5
            "
          >
            {contactItems.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{
                  x: 8,
                }}
                className="
                flex
                items-center
                gap-4
                p-4
                rounded-2xl
                border
                border-[#F1DCE3]
                bg-white
                transition
                "
              >
                <div
                  className={`
                  w-14
                  h-14
                  shrink-0
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  text-xl
                  ${item.bg}
                  ${item.color}
                  `}
                >
                  {item.icon}
                </div>

                <div className="min-w-0">
                  <p
                    className="
                    text-xs
                    uppercase
                    tracking-wide
                    text-[#6B7280]
                    font-semibold
                    "
                  >
                    {translate(item.title)}
                  </p>

                  <div
                    className="
                    mt-1
                    font-semibold
                    text-sm
                    sm:text-base
                    "
                  >
                    {typeof item.content === "string"
                      ? translate(item.content)
                      : item.content}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* =================================================
              ACTION BUTTONS
          ================================================== */}

          <div
            className="
            mt-10
            grid
            sm:grid-cols-2
            gap-4
            "
          >
            <a
              href="tel:+251920106669"
              className="
              flex
              items-center
              justify-center
              gap-3
              py-4
              rounded-full
              bg-[#FF2D6F]
              text-white
              font-bold
              shadow-lg
              hover:scale-105
              transition
              "
            >
              <FaPhone />

              {translate("Call Now")}
            </a>

            <a
              href="https://wa.me/251920106669"
              target="_blank"
              rel="noopener noreferrer"
              className="
              flex
              items-center
              justify-center
              gap-3
              py-4
              rounded-full
              bg-green-500
              text-white
              font-bold
              shadow-lg
              hover:scale-105
              transition
              "
            >
              <FaWhatsapp />

              {translate("WhatsApp")}
            </a>
          </div>
        </motion.div>

        {/* =====================================================
            MAP
        ====================================================== */}

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
          className="
          min-h-[450px]
          lg:min-h-[650px]
          rounded-[35px]
          overflow-hidden
          border
          border-[#F1DCE3]
          shadow-xl
          "
        >
          <iframe
            title="Yigermal Design Location"
            className="
            w-full
            h-full
            min-h-[450px]
            lg:min-h-[650px]
            "
            src="https://maps.google.com/maps?q=Sheger%20Grand%20Mall%20Addis%20Ababa%20Ethiopia&t=&z=16&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
          />
        </motion.div>
      </section>

      {/* =====================================================
          PREMIUM CTA
      ====================================================== */}

      <section
        className="
        relative
        overflow-hidden
        py-20
        md:py-28
        px-5
        bg-gradient-to-br
        from-[#FF2D6F]
        via-[#FF6394]
        to-[#F59E0B]
        text-white
        "
      >
        {/* BACKGROUND LIGHT EFFECTS */}

        <div
          className="
          absolute
          top-0
          right-0
          w-80
          h-80
          bg-white/20
          rounded-full
          blur-3xl
          "
        />

        <div
          className="
          absolute
          bottom-0
          left-0
          w-80
          h-80
          bg-white/20
          rounded-full
          blur-3xl
          "
        />

        <motion.div
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
            duration: 0.8,
          }}
          className="
          relative
          max-w-4xl
          mx-auto
          text-center
          "
        >
          <p
            className="
            uppercase
            tracking-[0.5em]
            text-xs
            font-bold
            text-white/80
            "
          >
            {translate("YIGERMAL DESIGN")}
          </p>

          <h2
            className="
            mt-5
            text-4xl
            sm:text-5xl
            md:text-6xl
            font-serif
            font-bold
            leading-tight
            "
          >
            {translate("Discover Your")}

            <span
              className="
              block
              "
            >
              {translate("Dream Habesha Look")}
            </span>
          </h2>

          <p
            className="
            mt-6
            max-w-2xl
            mx-auto
            text-sm
            md:text-lg
            text-white/90
            leading-relaxed
            "
          >
            {translate(
              "Visit Yigermal Design and discover beautiful Habesha clothing and a variety of traditional Ethiopian cultural clothes, carefully designed to celebrate your heritage and style.",
            )}
          </p>

          <Link
            to="/gallery"
            className="
            inline-flex
            items-center
            gap-3
            mt-10
            px-10
            py-4
            rounded-full
            bg-white
            text-[#FF2D6F]
            font-bold
            shadow-xl
            hover:scale-105
            transition
            "
          >
            {translate("Explore Habesha Collection")}

            <FaArrowRight />
          </Link>
        </motion.div>
      </section>

      {/* =====================================================
          MOBILE SPACE
      ====================================================== */}

      <div
        className="
        h-24
        md:hidden
        "
      />
    </div>
  );
};

export default Contact;
