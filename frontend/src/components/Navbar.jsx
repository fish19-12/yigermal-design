import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

import logo from "../assets/logo.jpg";

import {
  FaHome,
  FaImages,
  FaStar,
  FaBars,
  FaInfoCircle,
  FaTimes,
  FaPhoneAlt,
  FaGem,
} from "react-icons/fa";

import { GiDress } from "react-icons/gi";

import { useLanguage } from "../context/LanguageContext.jsx";

import { Globe, ChevronDown } from "lucide-react";

import en from "../translations/en.json";
import am from "../translations/am.json";

const Navbar = () => {
  const location = useLocation();

  const { language, setLanguage } = useLanguage();

  // =====================================================
  // JSON TRANSLATION SYSTEM
  // =====================================================

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

  // =====================================================
  // STATES
  // =====================================================

  const [scrolled, setScrolled] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [languageOpen, setLanguageOpen] = useState(false);

  // =====================================================
  // DESKTOP LINKS
  // =====================================================

  const desktopLinks = [
    {
      name: "Home",
      path: "/",
    },

    {
      name: "Gallery",
      path: "/gallery",
    },

    {
      name: "Reviews",
      path: "/reviews",
    },

    {
      name: "About",
      path: "/about",
    },

    {
      name: "Services",
      path: "/services",
    },

    {
      name: "Contact",
      path: "/contact",
    },
  ];

  // =====================================================
  // MOBILE LINKS
  // =====================================================

  const mobileMenuLinks = [
    {
      name: "Home",
      path: "/",
      icon: <FaHome />,
    },

    {
      name: "Services",
      path: "/services",
      icon: <FaGem />,
    },

    {
      name: "Reviews",
      path: "/reviews",
      icon: <FaStar />,
    },

    {
      name: "About",
      path: "/about",
      icon: <FaInfoCircle />,
    },

    {
      name: "Gallery",
      path: "/gallery",
      icon: <FaImages />,
    },

    {
      name: "Contact",
      path: "/contact",
      icon: <FaPhoneAlt />,
    },
  ];

  // =====================================================
  // TRANSLATION STATES
  // =====================================================

  const [translatedDesktop, setTranslatedDesktop] = useState(
    desktopLinks.map((item) => ({
      ...item,
      translated: item.name,
    })),
  );

  const [mobileTranslatedLinks, setMobileTranslatedLinks] = useState(
    mobileMenuLinks.map((item) => ({
      ...item,
      translated: item.name,
    })),
  );

  // =====================================================
  // LOCAL JSON TRANSLATION EFFECT
  // =====================================================

  useEffect(() => {
    const updateTranslations = () => {
      setTranslatedDesktop(
        desktopLinks.map((item) => ({
          ...item,
          translated: translate(item.name),
        })),
      );

      setMobileTranslatedLinks(
        mobileMenuLinks.map((item) => ({
          ...item,
          translated: translate(item.name),
        })),
      );
    };

    updateTranslations();
  }, [language, translate]);

  // =====================================================
  // SCROLL
  // =====================================================

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // =====================================================
  // CLOSE MOBILE MENU WHEN ROUTE CHANGES
  // =====================================================

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // =====================================================
  // BODY LOCK
  // =====================================================

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <>
      {/* =====================================================
          DESKTOP NAVBAR
      ===================================================== */}

      <nav
        className={`
          fixed
          top-0
          left-0
          right-0
          z-50
          hidden
          md:block
          transition-all
          duration-500

          ${
            scrolled
              ? "bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-200"
              : "bg-transparent"
          }
        `}
      >
        <div
          className="
            max-w-7xl
            mx-auto
            px-6
            lg:px-10
          "
        >
          <div
            className="
              h-24
              flex
              items-center
              justify-between
            "
          >
            {/* =====================================================
                YIGERMAL DESIGN LOGO
            ===================================================== */}

            <Link
              to="/"
              className="
                flex
                items-center
                gap-4
                group
              "
            >
              <img
                src={logo}
                alt="Yigermal Design"
                className="
                  h-14
                  w-14
                  rounded-full
                  object-cover
                  border-2
                  border-[#FF2D6F]
                  shadow-lg
                  group-hover:scale-105
                  transition
                  duration-300
                "
              />

              <div>
                <h1
                  className="
                    text-xl
                    font-bold
                    tracking-[4px]
                    text-gray-900
                  "
                >
                  YIGERMAL
                </h1>

                <p
                  className="
                    text-[10px]
                    uppercase
                    tracking-[5px]
                    text-[#FF2D6F]
                  "
                >
                  DESIGN
                </p>
              </div>
            </Link>

            {/* =====================================================
                DESKTOP LINKS
            ===================================================== */}

            <div
              className="
                flex
                items-center
                gap-7
              "
            >
              {translatedDesktop.map((link) => {
                const active = location.pathname === link.path;

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`
                      relative
                      text-sm
                      uppercase
                      tracking-[1.5px]
                      font-medium
                      transition

                      ${
                        active
                          ? "text-[#FF2D6F]"
                          : "text-gray-900 hover:text-[#FF2D6F]"
                      }
                    `}
                  >
                    {link.translated}

                    {active && (
                      <motion.span
                        layoutId="active-link"
                        className="
                          absolute
                          left-0
                          -bottom-3
                          w-full
                          h-[3px]
                          rounded-full
                          bg-[#FF2D6F]
                        "
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* =====================================================
                DESKTOP LANGUAGE
            ===================================================== */}

            <div className="relative">
              <button
                onClick={() => setLanguageOpen(!languageOpen)}
                className="
                  flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-full
                  border
                  border-pink-200
                  bg-white
                  shadow
                "
              >
                <Globe size={18} className="text-[#FF2D6F]" />

                {language}

                <ChevronDown size={15} />
              </button>

              <AnimatePresence>
                {languageOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                    }}
                    className="
                      absolute
                      right-0
                      mt-3
                      bg-white
                      rounded-xl
                      shadow-xl
                      overflow-hidden
                      w-40
                      border
                      border-pink-100
                      z-[999]
                    "
                  >
                    <button
                      onClick={() => {
                        setLanguage("EN");
                        setLanguageOpen(false);
                      }}
                      className="
                        w-full
                        px-5
                        py-3
                        text-left
                        hover:bg-pink-50
                      "
                    >
                      🇺🇸 English
                    </button>

                    <button
                      onClick={() => {
                        setLanguage("AM");
                        setLanguageOpen(false);
                      }}
                      className="
                        w-full
                        px-5
                        py-3
                        text-left
                        hover:bg-pink-50
                      "
                    >
                      🇪🇹 አማርኛ
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>

      {/* =====================================================
          MOBILE TOP NAVBAR
      ===================================================== */}

      <div
        className="
          fixed
          top-0
          left-0
          right-0
          z-50
          md:hidden
          bg-white/95
          backdrop-blur-xl
          border-b
          border-gray-200
          shadow-sm
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            gap-2
            px-3
            sm:px-5
            py-3
            sm:py-4
          "
        >
          {/* =====================================================
              MOBILE YIGERMAL DESIGN BRAND
          ===================================================== */}

          <Link
            to="/"
            className="
              flex
              items-center
              gap-2
              min-w-0
              shrink
            "
          >
            <img
              src={logo}
              alt="Yigermal Design"
              className="
                h-10
                w-10
                sm:h-11
                sm:w-11
                shrink-0
                rounded-full
                object-cover
                border-2
                border-[#FF2D6F]
              "
            />

            <div>
              <h2
                className="
                  text-[15px]
                  sm:text-lg
                  font-bold
                  tracking-[1px]
                  sm:tracking-[2px]
                  text-gray-900
                  whitespace-nowrap
                  leading-tight
                "
              >
                YIGERMAL
              </h2>

              <p
                className="
                  text-[8px]
                  sm:text-[9px]
                  uppercase
                  tracking-[2.5px]
                  sm:tracking-[4px]
                  text-[#FF2D6F]
                  whitespace-nowrap
                  leading-tight
                "
              >
                DESIGN
              </p>
            </div>
          </Link>

          {/* =====================================================
              MOBILE ACTION BUTTONS
          ===================================================== */}

          <div
            className="
              flex
              items-center
              gap-2
              shrink-0
            "
          >
            {/* =====================================================
                MOBILE LANGUAGE
            ===================================================== */}

            <div className="relative">
              <button
                onClick={() => setLanguageOpen(!languageOpen)}
                className="
                  flex
                  items-center
                  gap-1.5
                  px-3
                  sm:px-4
                  py-2.5
                  shrink-0
                  rounded-full
                  bg-white
                  border-2
                  border-pink-300
                  shadow-md
                "
              >
                <Globe size={18} className="text-[#FF2D6F]" />

                <span className="text-sm font-bold">{language}</span>

                <ChevronDown
                  size={16}
                  className={
                    languageOpen ? "rotate-180 transition" : "transition"
                  }
                />
              </button>

              <AnimatePresence>
                {languageOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -10,
                      scale: 0.95,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                      scale: 0.95,
                    }}
                    className="
                      absolute
                      right-0
                      mt-3
                      w-44
                      bg-white
                      rounded-2xl
                      shadow-2xl
                      border
                      border-pink-200
                      overflow-hidden
                      z-[999]
                    "
                  >
                    <button
                      onClick={() => {
                        setLanguage("EN");
                        setLanguageOpen(false);
                      }}
                      className="
                        w-full
                        px-5
                        py-3
                        text-left
                        hover:bg-pink-50
                      "
                    >
                      🇺🇸 English
                    </button>

                    <button
                      onClick={() => {
                        setLanguage("AM");
                        setLanguageOpen(false);
                      }}
                      className="
                        w-full
                        px-5
                        py-3
                        text-left
                        hover:bg-pink-50
                      "
                    >
                      🇪🇹 አማርኛ
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* =====================================================
                MOBILE MENU BUTTON
            ===================================================== */}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="
                p-2.5
                sm:p-3
                rounded-full
                bg-[#FF2D6F]
                text-white
                shadow-lg
              "
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -30,
            }}
            className="
              fixed
              top-[75px]
              left-0
              right-0
              bottom-0
              z-40
              md:hidden
              bg-white/95
              backdrop-blur-xl
              overflow-y-auto
            "
          >
            <div
              className="
                px-5
                py-6
                flex
                flex-col
                gap-4
              "
            >
              {mobileTranslatedLinks.map((link, index) => {
                const active = location.pathname === link.path;

                return (
                  <motion.div
                    key={`${link.path}-${index}`}
                    initial={{
                      opacity: 0,
                      x: -30,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: index * 0.05,
                    }}
                  >
                    <Link
                      to={link.path}
                      className={`
                          flex
                          items-center
                          justify-between
                          px-5
                          py-4
                          rounded-2xl
                          font-semibold

                          ${
                            active
                              ? "bg-[#FF2D6F] text-white shadow-lg"
                              : "bg-white text-gray-900 border border-gray-200"
                          }
                        `}
                    >
                      <div
                        className="
                            flex
                            items-center
                            gap-4
                          "
                      >
                        <span className="text-xl">{link.icon}</span>

                        <span>{link.translated}</span>
                      </div>

                      {active && (
                        <span
                          className="
                              w-2
                              h-2
                              rounded-full
                              bg-white
                            "
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          MOBILE BOTTOM NAVIGATION
      ===================================================== */}

      <div
        className="
          fixed
          bottom-0
          left-0
          right-0
          z-40
          md:hidden
        "
      >
        <div
          className="
            relative
            bg-white/95
            backdrop-blur-xl
            border-t
            border-gray-200
            rounded-t-[30px]
            px-6
            py-4
            flex
            items-center
            justify-between
            shadow-xl
          "
        >
          {[
            mobileTranslatedLinks[0],
            mobileTranslatedLinks[2],
            mobileTranslatedLinks[3],
            mobileTranslatedLinks[5],
          ].map((link, index) => {
            if (!link) return null;

            const active = location.pathname === link.path;

            return (
              <Link
                key={`${link.path}-${index}`}
                to={link.path}
                className={`
                  flex
                  flex-col
                  items-center
                  gap-1
                  text-xs
                  transition-all

                  ${active ? "text-[#FF2D6F] scale-110" : "text-gray-500"}
                `}
              >
                <span className="text-xl">{link.icon}</span>

                <span>{link.translated}</span>
              </Link>
            );
          })}

          {/* =====================================================
              CENTER FLOATING DRESS BUTTON
          ===================================================== */}

          <Link
            to="/gallery"
            className="
              absolute
              left-1/2
              -translate-x-1/2
              -top-8
              w-[68px]
              h-[68px]
              rounded-full
              flex
              items-center
              justify-center
              bg-gradient-to-r
              from-[#FF2D6F]
              to-[#F59E0B]
              text-white
              text-2xl
              border-4
              border-white
              shadow-xl
              hover:scale-110
              transition
            "
            aria-label="Yigermal Design Gallery"
          >
            <GiDress />
          </Link>
        </div>
      </div>

      {/* =====================================================
          MOBILE BOTTOM SPACE
      ===================================================== */}

      <div
        className="
          h-20
          md:hidden
        "
      />
    </>
  );
};

export default Navbar;
