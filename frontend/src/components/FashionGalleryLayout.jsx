import { useEffect, useState, useCallback, useMemo } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import {
  FaArrowLeft,
  FaArrowRight,
  FaTimes,
  FaShoppingBag,
  FaChevronLeft,
  FaChevronRight,
  FaCrown,
  FaExpand,
} from "react-icons/fa";

import { useLanguage } from "../context/LanguageContext.jsx";

import en from "../translations/en.json";
import am from "../translations/am.json";
import fallbackImage from "../assets/traditional1.jpg";

/*
=====================================================
CACHE SETTINGS
=====================================================
*/

const CACHE_KEY = "yigermal-fashion-gallery-v4";

const CACHE_TIME = 1000 * 60 * 15;

/*
=====================================================
IMAGE FALLBACK
=====================================================
*/

const FALLBACK_IMAGE = fallbackImage;

/*
=====================================================
SAFE STORAGE HELPERS
=====================================================
*/

const getStorage = (key) => {
  try {
    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.log("Storage read error:", error);

    return null;
  }
};

const setStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log("Storage save error:", error);
  }
};

/*
=====================================================
MAIN COMPONENT
=====================================================
*/

const FashionGalleryLayout = ({
  title,

  highlight,

  badge,

  icon,

  category,

  background = "bg-gradient-to-br from-[#fff5f8] via-white to-[#ffe8ef]",
}) => {
  const navigate = useNavigate();

  const { language } = useLanguage();

  /*
  =====================================================
  LANGUAGE SYSTEM
  =====================================================
  */

  const translations = {
    EN: en,

    AM: am,
  };

  const translate = useCallback(
    (text) => {
      if (!text) return "";

      return translations[language]?.[text] || text;
    },

    [language],
  );

  /*
  =====================================================
  STATES
  =====================================================
  */

  const [photos, setPhotos] = useState([]);

  const [loading, setLoading] = useState(true);

  const [previewIndex, setPreviewIndex] = useState(null);

  const [imageError, setImageError] = useState({});

  const categoryCacheKey = category ? `${CACHE_KEY}:${category}` : CACHE_KEY;

  /*
  =====================================================
  CACHE GET
  =====================================================
  */

  const getCache = useCallback(() => {
    try {
      const saved = localStorage.getItem(categoryCacheKey);

      if (!saved) return null;

      const parsed = JSON.parse(saved);

      if (Date.now() - parsed.time > CACHE_TIME) {
        localStorage.removeItem(categoryCacheKey);

        return null;
      }

      return parsed.data;
    } catch (error) {
      console.log("Cache error:", error);

      return null;
    }
  }, [categoryCacheKey]);

  /*
  =====================================================
  CACHE SAVE
  =====================================================
  */

  const saveCache = useCallback(
    (data) => {
      try {
        localStorage.setItem(
          categoryCacheKey,

          JSON.stringify({
            data,

            time: Date.now(),
          }),
        );
      } catch (error) {
        console.log("Cache save error:", error);
      }
    },

    [categoryCacheKey],
  );

  /*
  =====================================================
  FETCH GALLERY
  BACKEND LOGIC PRESERVED
  =====================================================
  */

  const fetchGallery = useCallback(async () => {
    const cached = getCache();

    if (cached) {
      setPhotos(cached);

      setLoading(false);
    }

    try {
      const endpoint = category
        ? `${import.meta.env.VITE_API_URL}/api/gallery/category/${category}`
        : `${import.meta.env.VITE_API_URL}/api/gallery`;

      const response = await axios.get(endpoint);

      const result = Array.isArray(response.data) ? response.data : [];

      setPhotos(result);

      saveCache(result);
    } catch (error) {
      console.log("Gallery loading error:", error);
    } finally {
      setLoading(false);
    }
  }, [category, getCache, saveCache]);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  /*
  =====================================================
  MEMO VALUES
  =====================================================
  */

  const totalImages = useMemo(() => photos.length, [photos.length]); /*
=====================================================
IMAGE NAVIGATION
=====================================================
*/

  const nextImage = useCallback(() => {
    setPreviewIndex((current) => {
      if (current === null || photos.length === 0) {
        return 0;
      }

      return current >= photos.length - 1 ? 0 : current + 1;
    });
  }, [photos.length]);

  const previousImage = useCallback(() => {
    setPreviewIndex((current) => {
      if (current === null || photos.length === 0) {
        return 0;
      }

      return current <= 0 ? photos.length - 1 : current - 1;
    });
  }, [photos.length]);

  /*
=====================================================
KEYBOARD SUPPORT
=====================================================
*/

  useEffect(() => {
    const handleKeyboard = (event) => {
      if (previewIndex === null) return;

      if (event.key === "Escape") {
        setPreviewIndex(null);
      }

      if (event.key === "ArrowRight") {
        nextImage();
      }

      if (event.key === "ArrowLeft") {
        previousImage();
      }
    };

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, [previewIndex, nextImage, previousImage]);

  /*
=====================================================
BODY SCROLL CONTROL
=====================================================
*/

  useEffect(() => {
    document.body.style.overflow = previewIndex !== null ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [previewIndex]);

  /*
=====================================================
CART SYSTEM
=====================================================
*/

  const addToCart = (item) => {
    const existingCart =
      JSON.parse(localStorage.getItem("fiyorina-cart")) || [];

    const product = {
      id: item._id || Date.now(),

      title: item.title || translate("Luxury Design"),

      image: item.imageUrl || FALLBACK_IMAGE,

      price: item.price || translate("Custom Price"),

      description: item.description || "",
    };

    const alreadyAdded = existingCart.some((cart) => cart.id === product.id);

    if (!alreadyAdded) {
      localStorage.setItem(
        "fiyorina-cart",

        JSON.stringify([...existingCart, product]),
      );
    }

    navigate("/cart");
  };
  return (
    <div
      className={`

min-h-screen

${background}

px-4

sm:px-8

py-10

overflow-hidden

`}
    >
      <div
        className="

max-w-7xl

mx-auto

"
      >
        {/*

=====================================================

BACK BUTTON

=====================================================

*/}
        <Link
          to="/gallery"
          aria-label={translate("Back to gallery")}
          className="

fixed

top-24

left-5

z-50

w-12

h-12

rounded-full

bg-white

shadow-xl

flex

items-center

justify-center

text-[#ff2d6f]

hover:scale-110

transition-all

duration-300

"
        >
          <FaArrowLeft />
        </Link>
        {/*

=====================================================

PREMIUM HEADER

=====================================================

*/}
        <section
          className="

relative

mb-14

"
        >
          <div
            className="

absolute

-top-20

left-1/2

-translate-x-1/2

w-[320px]

h-[320px]

rounded-full

bg-[#ff2d6f]/20

blur-[120px]

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
              duration: 0.7,
            }}
            className="

relative

text-center

max-w-4xl

mx-auto

"
          >
            <div
              className="

inline-flex

items-center

gap-3

px-6

py-2

rounded-full

bg-white

shadow-md

text-[#ff2d6f]

text-xs

font-black

uppercase

tracking-[0.3em]

"
            >
              {icon || <FaCrown />}

              {translate(badge)}
            </div>

            <h1
              className="

mt-7

text-4xl

sm:text-5xl

md:text-7xl

font-serif

font-black

leading-tight

"
            >
              {translate(title)}

              <span
                className="

block

text-[#ff2d6f]

"
              >
                {translate(highlight)}
              </span>
            </h1>

            <p
              className="

mt-6

text-gray-500

max-w-2xl

mx-auto

text-sm

sm:text-base

leading-relaxed

"
            >
              {translate(
                "Discover Yigermal Design Habesha clothing for women, men, couples, families, and children, created for meaningful celebrations and everyday cultural pride.",
              )}
            </p>
          </motion.div>
        </section>
        {/*

=====================================================

LOADING STATE

=====================================================

*/}
        {loading && (
          <div
            className="

py-24

text-center

"
          >
            <div
              className="

w-16

h-16

mx-auto

rounded-full

border-4

border-[#ff2d6f]

border-t-transparent

animate-spin

"
            />

            <p
              className="

mt-6

text-[#ff2d6f]

font-black

tracking-wide

"
            >
              {translate("Loading luxury collection...")}
            </p>
          </div>
        )}
        {/*

=====================================================

EMPTY COLLECTION

=====================================================

*/}
        {!loading && photos.length === 0 && (
          <motion.div
            initial={{
              opacity: 0,

              y: 30,
            }}
            animate={{
              opacity: 1,

              y: 0,
            }}
            className="

bg-white

rounded-[40px]

shadow-xl

border

border-[#f4dce5]

p-12

text-center

"
          >
            <div
              className="

text-6xl

"
            >
              ✨
            </div>

            <h2
              className="

mt-6

text-3xl

font-serif

font-black

"
            >
              {translate("No Designs Available")}
            </h2>

            <p
              className="

mt-3

text-gray-500

"
            >
              {translate("New luxury designs will appear soon.")}
            </p>
          </motion.div>
        )}

        <div
          className="

grid

grid-cols-2

sm:grid-cols-3

lg:grid-cols-4

gap-5

sm:gap-7

"
        >
          {photos.map((item, index) => (
            <motion.article
              key={item._id || index}
              initial={{
                opacity: 0,

                y: 50,
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

                delay: index * 0.04,
              }}
              whileHover={{
                y: -12,
              }}
              className="

group

relative

overflow-hidden

rounded-[35px]

bg-white

shadow-xl

border

border-[#f4dce5]

"
            >
              {/* IMAGE */}

              <div
                className="

relative

aspect-[3/4]

overflow-hidden

cursor-pointer

"
                onClick={() => setPreviewIndex(index)}
              >
                <img
                  src={item.imageUrl || FALLBACK_IMAGE}
                  alt={item.title || translate("Fiyorina Fashion")}
                  loading="lazy"
                  decoding="async"
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

from-black/80

via-black/20

to-transparent

"
                />

                {/* PREVIEW BUTTON */}

                <button
                  aria-label={translate("Preview image")}
                  onClick={(event) => {
                    event.stopPropagation();

                    setPreviewIndex(index);
                  }}
                  className="

absolute

top-4

right-4

w-11

h-11

rounded-full

bg-white

text-[#ff2d6f]

flex

items-center

justify-center

shadow-lg

hover:scale-110

transition

"
                >
                  <FaExpand />
                </button>
              </div>

              {/* PRODUCT INFO */}

              <div
                className="

absolute

bottom-0

left-0

right-0

p-4

text-white

"
              >
                <h2
                  className="

font-black

text-sm

sm:text-lg

line-clamp-2

"
                >
                  {item.title || translate("Luxury Design")}
                </h2>

                <div
                  className="

mt-3

inline-flex

px-4

py-1.5

rounded-full

bg-[#ff2d6f]

text-xs

font-black

"
                >
                  {item.price
                    ? `${item.price} Birr`
                    : translate("Custom Price")}
                </div>

                <button
                  onClick={(event) => {
                    event.stopPropagation();

                    addToCart(item);
                  }}
                  className="

mt-3

w-full

py-3

rounded-full

bg-white

text-[#ff2d6f]

font-black

text-xs

flex

items-center

justify-center

gap-2

hover:bg-[#ff2d6f]

hover:text-white

transition-all

"
                >
                  <FaShoppingBag />

                  {translate("Order Now")}
                </button>
              </div>
            </motion.article>
          ))}
        </div>
        <AnimatePresence>
          {previewIndex !== null && photos[previewIndex] && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="

fixed

inset-0

z-[9999]

bg-black/95

backdrop-blur-xl

flex

items-center

justify-center

p-4

"
              onClick={() => setPreviewIndex(null)}
            >
              {/* CLOSE */}

              <button
                aria-label="Close preview"
                onClick={() => setPreviewIndex(null)}
                className="

absolute

top-5

right-5

z-50

w-12

h-12

rounded-full

bg-white

text-black

flex

items-center

justify-center

shadow-xl

hover:scale-110

transition

"
              >
                <FaTimes />
              </button>

              {/* LEFT BUTTON */}

              <button
                aria-label="Previous image"
                onClick={(event) => {
                  event.stopPropagation();

                  previousImage();
                }}
                className="

absolute

left-3

md:left-10

top-1/2

-translate-y-1/2

z-40

w-12

md:w-14

h-12

md:h-14

rounded-full

bg-white/20

backdrop-blur-md

text-white

flex

items-center

justify-center

hover:bg-white/40

transition

"
              >
                <FaChevronLeft />
              </button>

              <motion.div
                initial={{
                  scale: 0.9,

                  opacity: 0,
                }}
                animate={{
                  scale: 1,

                  opacity: 1,
                }}
                transition={{
                  duration: 0.3,
                }}
                onClick={(event) => {
                  event.stopPropagation();
                }}
                className="

max-w-6xl

w-full

flex

flex-col

items-center

"
              >
                <img
                  src={photos[previewIndex].imageUrl || FALLBACK_IMAGE}
                  alt={
                    photos[previewIndex].title || translate("Fiyorina Design")
                  }
                  className="

max-h-[70vh]

max-w-full

object-contain

rounded-[35px]

shadow-2xl

"
                />

                <div
                  className="

mt-6

text-center

text-white

"
                >
                  <h2
                    className="

text-2xl

sm:text-4xl

font-serif

font-black

"
                  >
                    {photos[previewIndex].title || translate("Luxury Design")}
                  </h2>

                  <p
                    className="

mt-3

text-[#ff2d6f]

text-xl

font-black

"
                  >
                    {photos[previewIndex].price
                      ? `${photos[previewIndex].price} Birr`
                      : translate("Custom Price")}
                  </p>

                  <button
                    onClick={() => {
                      addToCart(photos[previewIndex]);
                    }}
                    className="

mt-6

px-10

py-4

rounded-full

bg-[#ff2d6f]

text-white

font-black

flex

items-center

gap-3

mx-auto

hover:scale-105

transition

"
                  >
                    <FaShoppingBag />

                    {translate("Order This Design")}
                  </button>
                </div>
              </motion.div>

              {/* RIGHT BUTTON */}

              <button
                aria-label="Next image"
                onClick={(event) => {
                  event.stopPropagation();

                  nextImage();
                }}
                className="

absolute

right-3

md:right-10

top-1/2

-translate-y-1/2

z-40

w-12

md:w-14

h-12

md:h-14

rounded-full

bg-white/20

backdrop-blur-md

text-white

flex

items-center

justify-center

hover:bg-white/40

transition

"
              >
                <FaChevronRight />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <section
          className="

mt-20

relative

overflow-hidden

rounded-[40px]

py-20

px-6

bg-gradient-to-br

from-[#ff2d6f]

to-[#f59e0b]

text-white

"
        >
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

w-72

h-72

bg-white/10

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
            className="

relative

max-w-3xl

mx-auto

text-center

"
          >
            <div
              className="

flex

justify-center

items-center

gap-3

uppercase

tracking-[0.4em]

text-xs

font-black

text-white/80

"
            >
              <FaCrown />

              {translate("Fiyorina Luxury")}
            </div>

            <h2
              className="

mt-6

text-3xl

sm:text-5xl

font-serif

font-black

leading-tight

"
            >
              {translate("Create Your Signature Style")}
            </h2>

            <p
              className="

mt-5

text-white/90

text-sm

sm:text-base

max-w-xl

mx-auto

"
            >
              {translate(
                "Discover premium chiffon fashion, exclusive designs and custom creations made for unforgettable moments.",
              )}
            </p>

            <Link
              to="/gallery"
              className="

inline-flex

items-center

gap-3

mt-8

px-10

py-4

rounded-full

bg-white

text-[#ff2d6f]

font-black

shadow-xl

hover:scale-105

transition

"
            >
              {translate("Back to gallery")}

              <FaArrowRight />
            </Link>
          </motion.div>
        </section>
        <div
          className="

h-20

md:hidden

"
        />
      </div>
    </div>
  );
};

export default FashionGalleryLayout;
