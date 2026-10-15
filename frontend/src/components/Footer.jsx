import {
  FaWhatsapp,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
  FaFacebook,
} from "react-icons/fa";

import { SiTiktok } from "react-icons/si";

import { useCallback } from "react";

import { useLanguage } from "../context/LanguageContext.jsx";

import en from "../translations/en.json";
import am from "../translations/am.json";

const Footer = () => {
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
    <footer
      className="
      relative
      overflow-hidden
      bg-white
      text-[#1A1A1A]
      border-t
      border-[#E5E7EB]
      "
    >
      {/* =====================================================
          SOFT BACKGROUND EFFECT
      ====================================================== */}

      <div
        className="
        absolute
        -top-32
        -right-32
        w-[350px]
        h-[350px]
        rounded-full
        bg-[#FFE6EE]
        blur-[120px]
        pointer-events-none
        "
      />

      <div
        className="
        absolute
        -bottom-32
        -left-32
        w-[300px]
        h-[300px]
        rounded-full
        bg-[#FF2D6F]/10
        blur-[120px]
        pointer-events-none
        "
      />

      {/* =====================================================
          MAIN FOOTER
      ====================================================== */}

      <div
        className="
        relative
        z-10
        max-w-6xl
        mx-auto
        px-5
        sm:px-8
        py-12
        md:py-14
        "
      >
        <div
          className="
          grid
          md:grid-cols-3
          gap-10
          md:gap-12
          "
        >
          {/* =================================================
              BRAND
          ================================================== */}

          <div>
            <h2
              className="
              text-2xl
              md:text-3xl
              font-bold
              tracking-[4px]
              text-[#1A1A1A]
              "
            >
              YIGERMAL
            </h2>

            <p
              className="
              mt-1
              tracking-[5px]
              text-xs
              font-semibold
              text-[#FF2D6F]
              "
            >
              DESIGN
            </p>

            <p
              className="
              mt-5
              max-w-sm
              text-sm
              leading-relaxed
              text-[#6B7280]
              "
            >
              {translate(
                "Habesha clothing and a variety of traditional Ethiopian cultural clothes, designed with elegance and inspired by Ethiopian heritage.",
              )}
            </p>
          </div>

          {/* =================================================
              CONTACT
          ================================================== */}

          <div>
            <h3
              className="
              text-lg
              font-bold
              mb-5
              "
            >
              {translate("Contact Us")}
            </h3>

            <div className="space-y-4">
              {/* PHONE */}

              <div className="flex items-start gap-3">
                <div
                  className="
                  w-9
                  h-9
                  rounded-full
                  bg-[#FFE6EE]
                  flex
                  items-center
                  justify-center
                  text-[#FF2D6F]
                  shrink-0
                  "
                >
                  <FaPhone className="text-sm" />
                </div>

                <div>
                  <p
                    className="
                    text-xs
                    text-[#9CA3AF]
                    mb-1
                    "
                  >
                    {translate("Phone")}
                  </p>

                  <div
                    className="
                    flex
                    flex-col
                    gap-0.5
                    text-sm
                    font-medium
                    "
                  >
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
                </div>
              </div>

              {/* ADDRESS */}

              <div className="flex items-start gap-3">
                <div
                  className="
                  w-9
                  h-9
                  rounded-full
                  bg-[#FFE6EE]
                  flex
                  items-center
                  justify-center
                  text-[#FF2D6F]
                  shrink-0
                  "
                >
                  <FaMapMarkerAlt className="text-sm" />
                </div>

                <div>
                  <p
                    className="
                    text-xs
                    text-[#9CA3AF]
                    mb-1
                    "
                  >
                    {translate("Address")}
                  </p>

                  <p
                    className="
                    text-sm
                    leading-relaxed
                    text-[#4B5563]
                    "
                  >
                    {translate(
                      "Addisu Gebeya, Sheger Grand Mall, Shop No. AF-79, Addis Ababa, Ethiopia",
                    )}
                  </p>
                </div>
              </div>

              {/* HOURS */}

              <div className="flex items-start gap-3">
                <div
                  className="
                  w-9
                  h-9
                  rounded-full
                  bg-[#FFE6EE]
                  flex
                  items-center
                  justify-center
                  text-[#FF2D6F]
                  shrink-0
                  "
                >
                  <FaClock className="text-sm" />
                </div>

                <div>
                  <p
                    className="
                    text-xs
                    text-[#9CA3AF]
                    mb-1
                    "
                  >
                    {translate("Opening Hours")}
                  </p>

                  <p
                    className="
                    text-sm
                    text-[#4B5563]
                    "
                  >
                    {translate("Daily: 9:00 AM - 8:00 PM")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              SOCIAL / CONNECT
          ================================================== */}

          <div>
            <h3
              className="
              text-lg
              font-bold
              mb-5
              "
            >
              {translate("Follow Us")}
            </h3>

            <p
              className="
              text-sm
              leading-relaxed
              text-[#6B7280]
              max-w-sm
              "
            >
              {translate(
                "Follow Yigermal Design for beautiful Habesha clothing, traditional Ethiopian designs, and new collections.",
              )}
            </p>

            {/* SOCIAL ICONS */}

            <div
              className="
              flex
              items-center
              gap-3
              mt-5
              "
            >
              {/* INSTAGRAM */}

              <a
                href="#"
                aria-label="Yigermal Design Instagram"
                className="
                w-10
                h-10
                rounded-full
                bg-[#FFE6EE]
                flex
                items-center
                justify-center
                text-[#FF2D6F]
                hover:bg-[#FF2D6F]
                hover:text-white
                hover:-translate-y-1
                transition-all
                "
              >
                <FaInstagram />
              </a>

              {/* WHATSAPP */}

              <a
                href="https://wa.me/251920106669"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Yigermal Design WhatsApp"
                className="
                w-10
                h-10
                rounded-full
                bg-[#FFE6EE]
                flex
                items-center
                justify-center
                text-[#FF2D6F]
                hover:bg-[#FF2D6F]
                hover:text-white
                hover:-translate-y-1
                transition-all
                "
              >
                <FaWhatsapp />
              </a>

              {/* TIKTOK */}

              <a
                href="#"
                aria-label="Yigermal Design TikTok"
                className="
                w-10
                h-10
                rounded-full
                bg-[#FFE6EE]
                flex
                items-center
                justify-center
                text-[#FF2D6F]
                hover:bg-[#FF2D6F]
                hover:text-white
                hover:-translate-y-1
                transition-all
                "
              >
                <SiTiktok />
              </a>

              {/* FACEBOOK */}

              <a
                href="#"
                aria-label="Yigermal Design Facebook"
                className="
                w-10
                h-10
                rounded-full
                bg-[#FFE6EE]
                flex
                items-center
                justify-center
                text-[#FF2D6F]
                hover:bg-[#FF2D6F]
                hover:text-white
                hover:-translate-y-1
                transition-all
                "
              >
                <FaFacebook />
              </a>
            </div>

            {/* WHATSAPP CTA */}

            <a
              href="https://wa.me/251920106669"
              target="_blank"
              rel="noopener noreferrer"
              className="
              inline-flex
              items-center
              gap-2
              mt-6
              px-5
              py-2.5
              rounded-full
              bg-[#FF2D6F]
              text-white
              text-sm
              font-semibold
              hover:scale-105
              transition
              "
            >
              <FaWhatsapp />

              {translate("Chat With Us")}
            </a>
          </div>
        </div>

        {/* =====================================================
            BOTTOM BAR
        ====================================================== */}

        <div
          className="
          mt-10
          pt-6
          border-t
          border-[#E5E7EB]
          flex
          flex-col
          sm:flex-row
          justify-between
          items-center
          gap-3
          text-center
          "
        >
          <p
            className="
            text-xs
            sm:text-sm
            text-[#6B7280]
            "
          >
            {translate("© 2026 Yigermal Design. All Rights Reserved.")}
          </p>

          <p
            className="
            text-xs
            text-[#9CA3AF]
            "
          >
            {translate("Traditional Ethiopian & Habesha Clothing")}
          </p>
        </div>
      </div>

      {/* MOBILE BOTTOM NAVIGATION SPACE */}

      <div className="h-20 md:hidden" />
    </footer>
  );
};

export default Footer;
