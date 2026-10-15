import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { ArrowUpRight } from "lucide-react";

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
    <div className="min-h-screen overflow-hidden bg-[#fff7fa] text-[#211d1c]">
      {/* HEADER */}

      <section className="px-4 pb-4 pt-8 sm:px-8 sm:pb-10 sm:pt-16">
        <div className="mx-auto max-w-7xl">
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
            className="flex flex-col gap-4 border-b border-[#f0dce2] pb-4 sm:gap-6 sm:pb-7 md:flex-row md:items-end md:justify-between md:pb-9"
          >
            <div>
              <div className="flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.13em] text-[#a8445d] sm:text-[11px] sm:tracking-[0.16em]">
                  <span className="h-px w-7 bg-[#a8445d]" />
                  {translate("Yigermal Design Gallery")}
                </div>
                <div className="flex shrink-0 items-center gap-2 rounded-full border border-[#f0dce2] bg-white px-2.5 py-1 sm:px-3 sm:py-1.5">
                  <span className="font-serif text-lg leading-none text-[#a8445d] sm:text-xl">
                    04
                  </span>
                  <span className="text-[8px] font-semibold uppercase tracking-[0.1em] text-[#766b68] sm:text-[9px]">
                    {translate("Habesha styles")}
                  </span>
                </div>
              </div>

              <h1 className="mt-3 max-w-3xl font-serif text-3xl font-medium leading-[1.04] sm:mt-4 sm:text-5xl lg:text-[3.5rem]">
                {translate("Habesha Clothing")}

                <span className="mt-1 block text-[#c34f70]">
                  {translate("Collections")}
                </span>
              </h1>
              <div className="mt-3 flex max-w-xl items-start gap-2.5 rounded-md border-l-[3px] border-[#d47a56] bg-white/75 px-3 py-2.5 shadow-sm sm:mt-5 sm:gap-3 sm:px-4 sm:py-3">
                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-[#d47a56] ring-4 ring-[#f7e5df]" />
                <p className="text-xs font-medium leading-relaxed text-[#705956] sm:text-base">
                  {translate(
                    "Explore traditional Habesha styles for every generation and occasion.",
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* COLLECTION CARDS */}

      <section className="px-3 pb-28 sm:px-8 sm:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-2.5 sm:gap-5 xl:grid-cols-4">
            {collections.map((item, index) => (
              <motion.article
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
                whileHover={{ y: -5 }}
                className="group min-w-0 overflow-hidden rounded-lg border border-[#f0dce2] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <Link
                  to={item.link}
                  className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a8445d]"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#2c2023]">
                    <img
                      src={item.image}
                      alt={translate(item.title)}
                      loading="lazy"
                      className={`h-full w-full transition-transform duration-700 group-hover:scale-[1.045] ${item.id === "men" ? "object-contain" : "object-cover"}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1d1116]/90 via-[#1d1116]/15 to-black/10" />
                    <span className="absolute left-2 top-2 inline-flex items-center gap-1.5 rounded-full border border-white/50 bg-black/30 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm sm:left-4 sm:top-4 sm:gap-2 sm:px-3 sm:text-[10px] sm:tracking-[0.16em]">
                      <span className="size-1.5 rounded-full bg-[#f5b6c8]" />
                      {String(index + 1).padStart(2, "0")} / 04
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-2.5 text-white sm:p-5">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#ffd4e0] sm:text-[10px] sm:tracking-[0.2em]">
                        {translate(item.category)}
                      </p>
                      <h2 className="mt-1 font-serif text-base font-medium leading-tight sm:mt-2 sm:text-2xl">
                        {translate(item.title)}
                      </h2>
                      <div className="mt-3 flex items-center justify-between border-t border-white/30 pt-2.5 sm:mt-4 sm:pt-3">
                        <span className="text-[9px] font-semibold uppercase tracking-[0.1em] sm:text-[10px] sm:tracking-[0.12em]">
                          {translate("Explore style")}
                        </span>
                        <span className="grid size-7 place-items-center rounded-full bg-white text-[#a8445d] transition-transform group-hover:rotate-45 sm:size-9">
                          <ArrowUpRight size={15} aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* PREMIUM MESSAGE */}

      <section className="px-5 pb-12 sm:px-8 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
          }}
          className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-[#f0dce2] pt-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <h2 className="font-serif text-2xl font-medium sm:text-3xl">
            {translate("Where Fashion Becomes Art")}
          </h2>

          <Link
            to="/contact"
            className="inline-flex w-fit items-center gap-2 bg-[#a8445d] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#87354a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a8445d]"
          >
            {translate("Contact Designer")}
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Gallery;
