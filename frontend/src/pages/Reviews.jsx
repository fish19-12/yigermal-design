import { useEffect, useState, useCallback, useMemo } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  FaStar,
  FaRegStar,
  FaQuoteLeft,
  FaCheckCircle,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaExpand,
  FaArrowRight,
  FaCrown,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import api from "../services/api";

import { useLanguage } from "../context/LanguageContext.jsx";

import en from "../translations/en.json";
import am from "../translations/am.json";

/* =====================================================
   CACHE SETTINGS
===================================================== */

const REVIEW_CACHE_KEY = "fiyorina_reviews_cache_v3";

const CACHE_DURATION = 1000 * 60 * 15;

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330";

const Reviews = () => {
  /* =====================================================
   LANGUAGE SYSTEM
===================================================== */

  const { language } = useLanguage();

  const translations = useMemo(
    () => ({
      EN: en,
      AM: am,
    }),
    [],
  );

  const translate = useCallback(
    (text) => {
      return translations?.[language]?.[text] || text;
    },
    [language, translations],
  );

  /* =====================================================
   STATES
===================================================== */

  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedReview, setSelectedReview] = useState(null);

  const [selectedIndex, setSelectedIndex] = useState(0);

  /* =====================================================
   CACHE READ
===================================================== */

  const getCache = useCallback(() => {
    try {
      const cached = localStorage.getItem(REVIEW_CACHE_KEY);

      if (!cached) return null;

      const parsed = JSON.parse(cached);

      if (Date.now() - parsed.time > CACHE_DURATION) {
        localStorage.removeItem(REVIEW_CACHE_KEY);

        return null;
      }

      return parsed.data;
    } catch (error) {
      return null;
    }
  }, []);

  /* =====================================================
   CACHE SAVE
===================================================== */

  const saveCache = useCallback((data) => {
    try {
      localStorage.setItem(
        REVIEW_CACHE_KEY,

        JSON.stringify({
          data,

          time: Date.now(),
        }),
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  /* =====================================================
   LOAD REVIEWS
===================================================== */

  useEffect(() => {
    let mounted = true;

    const loadReviews = async () => {
      const cached = getCache();

      if (cached && mounted) {
        setReviews(cached);

        setLoading(false);
      }

      try {
        const response = await api.get("/api/reviews");

        const freshReviews = Array.isArray(response.data) ? response.data : [];

        if (mounted) {
          setReviews(freshReviews);

          saveCache(freshReviews);
        }
      } catch (error) {
        console.log(error);

        if (!cached && mounted) {
          setError(translate("Unable to load reviews"));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadReviews();

    return () => {
      mounted = false;
    };
  }, [getCache, saveCache, translate]);

  /* =====================================================
   MODAL FUNCTIONS
===================================================== */

  const openReview = (review, index) => {
    setSelectedReview(review);

    setSelectedIndex(index);

    document.body.style.overflow = "hidden";
  };

  const closeReview = () => {
    setSelectedReview(null);

    document.body.style.overflow = "auto";
  };

  /* =====================================================
   NAVIGATION
===================================================== */

  const nextReview = useCallback(() => {
    if (!reviews.length) return;

    const next = (selectedIndex + 1) % reviews.length;

    setSelectedIndex(next);

    setSelectedReview(reviews[next]);
  }, [reviews, selectedIndex]);

  const previousReview = useCallback(() => {
    if (!reviews.length) return;

    const previous = (selectedIndex - 1 + reviews.length) % reviews.length;

    setSelectedIndex(previous);

    setSelectedReview(reviews[previous]);
  }, [reviews, selectedIndex]);

  /* =====================================================
   KEYBOARD CONTROL
===================================================== */

  useEffect(() => {
    const handleKey = (event) => {
      if (!selectedReview) return;

      if (event.key === "Escape") closeReview();

      if (event.key === "ArrowRight") nextReview();

      if (event.key === "ArrowLeft") previousReview();
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [selectedReview, nextReview, previousReview]);

  /* =====================================================
   IMAGE PRELOAD
===================================================== */

  useEffect(() => {
    if (!selectedReview) return;

    const next = reviews[(selectedIndex + 1) % reviews.length];

    const previous =
      reviews[(selectedIndex - 1 + reviews.length) % reviews.length];

    [next, previous].forEach((item) => {
      if (item?.photoUrl) {
        const img = new Image();

        img.src = item.photoUrl;
      }
    });
  }, [selectedReview, selectedIndex, reviews]);

  /* =====================================================
   STARS
===================================================== */

  const renderStars = (rating = 5) => {
    return Array.from(
      {
        length: 5,
      },
      (_, index) =>
        index < rating ? (
          <FaStar key={index} className="text-yellow-500" />
        ) : (
          <FaRegStar key={index} className="text-yellow-500" />
        ),
    );
  };

  /* =====================================================
   LOADING SCREEN
===================================================== */

  if (loading && reviews.length === 0) {
    return (
      <div
        className="
min-h-screen
flex
items-center
justify-center
bg-[#fff8fb]
"
      >
        <div
          className="
w-12
h-12
rounded-full
border-4
border-[#ff2d6f]
border-t-transparent
animate-spin
"
        />
      </div>
    );
  }
  return (
    <div
      className="
min-h-screen
bg-[#fff8fb]
text-[#111]
overflow-hidden
"
    >
      {/* =====================================================
    HERO SECTION
===================================================== */}

      <section
        className="
relative
pt-20
pb-8
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
bg-[#ff2d6f]/20
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
max-w-2xl
mx-auto
text-center
"
        >
          <p
            className="
flex
justify-center
items-center
gap-2
text-xs
uppercase
tracking-[0.35em]
font-bold
text-[#ff2d6f]
"
          >
            <FaCrown />

            {translate("VIP CLIENT EXPERIENCES")}
          </p>

          <h1
            className="
mt-5
text-3xl
sm:text-4xl
md:text-5xl
font-serif
font-bold
leading-tight
"
          >
            {translate("Loved by")}

            <span
              className="
block
text-[#ff2d6f]
"
            >
              {translate("1000+ Clients")}
            </span>
          </h1>

          <p
            className="
mt-4
max-w-md
mx-auto
text-sm
text-gray-500
leading-relaxed
"
          >
            {translate(
              "Luxury fashion stories from our customers, celebrities and influencers.",
            )}
          </p>
        </motion.div>
      </section>

      {/* =====================================================
    QUICK STATS
===================================================== */}

      <section
        className="
max-w-6xl
mx-auto
px-5
pb-12
grid
grid-cols-2
md:grid-cols-4
gap-4
"
      >
        {[
          {
            number: "1000+",
            label: "Happy Clients",
          },

          {
            number: "500+",
            label: "Luxury Designs",
          },

          {
            number: "100%",
            label: "Premium Quality",
          },

          {
            number: reviews.length
              ? (
                  reviews.reduce(
                    (total, item) => total + Number(item.rating || 0),
                    0,
                  ) / reviews.length
                ).toFixed(1) + "★"
              : "5★",

            label: "Average Rating",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{
              y: -6,
            }}
            className="
bg-white
rounded-[28px]
p-5
text-center
border
border-[#f2dce5]
shadow-sm
"
          >
            <h2
              className="
text-3xl
font-bold
text-[#ff2d6f]
"
            >
              {item.number}
            </h2>

            <p
              className="
mt-2
text-[11px]
uppercase
tracking-widest
font-semibold
text-gray-500
"
            >
              {translate(item.label)}
            </p>
          </motion.div>
        ))}
      </section>

      {/* =====================================================
    REVIEWS HEADER
===================================================== */}

      <section
        className="
max-w-7xl
mx-auto
px-5
pb-8
"
      >
        <div
          className="
flex
items-end
justify-between
gap-5
flex-wrap
"
        >
          <div>
            <p
              className="
text-xs
uppercase
tracking-[0.35em]
font-bold
text-[#ff2d6f]
"
            >
              {translate("Customer Stories")}
            </p>

            <h2
              className="
mt-3
text-3xl
md:text-4xl
font-serif
font-bold
"
            >
              {translate("Real Luxury Experiences")}
            </h2>
          </div>

          <p
            className="
max-w-sm
text-sm
text-gray-500
"
          >
            {translate("From loyal clients to celebrities and influencers.")}
          </p>
        </div>
      </section>

      {/* ERROR */}

      {error && (
        <p
          className="
text-center
text-red-500
font-semibold
mb-8
"
        >
          {translate(error)}
        </p>
      )}

      {/* EMPTY STATE */}

      {!error && reviews.length === 0 && (
        <p
          className="
text-center
py-20
text-gray-500
"
        >
          {translate("No reviews available yet.")}
        </p>
      )}

      {/* =====================================================
    REVIEW CARDS
===================================================== */}

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
grid
sm:grid-cols-2
lg:grid-cols-3
gap-6
"
        >
          {reviews.map((review, index) => (
            <motion.article
              key={review._id || index}
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

                delay: index * 0.05,
              }}
              whileHover={{
                y: -8,
              }}
              className="
group
bg-white
rounded-[32px]
overflow-hidden
border
border-[#f1dce5]
shadow-sm
hover:shadow-xl
transition-all
"
            >
              {/* IMAGE */}

              <div
                className="
relative
h-[300px]
overflow-hidden
"
              >
                <img
                  src={review.photoUrl || DEFAULT_IMAGE}
                  alt={review.name || "Fiyorina Fashion"}
                  loading="lazy"
                  decoding="async"
                  className="
w-full
h-full
object-cover
group-hover:scale-105
transition-transform
duration-700
"
                />

                <div
                  className="
absolute
inset-0
bg-gradient-to-t
from-black/50
to-transparent
"
                />

                <button
                  onClick={() => openReview(review, index)}
                  aria-label={translate("Preview image")}
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

              {/* CONTENT */}

              <div
                className="
p-6
"
              >
                <div
                  className="
flex
items-center
gap-2
text-[#ff2d6f]
text-[10px]
uppercase
tracking-widest
font-bold
"
                >
                  <FaQuoteLeft />

                  {translate("Verified Experience")}
                </div>

                <h3
                  className="
mt-4
font-bold
text-lg
flex
items-center
gap-2
"
                >
                  {review.name}

                  <FaCheckCircle
                    className="
text-green-500
text-sm
"
                  />
                </h3>

                <p
                  className="
text-sm
text-gray-400
mt-1
"
                >
                  {review.role || translate("Luxury Fashion Client")}
                </p>

                <div
                  className="
flex
gap-1
mt-4
"
                >
                  {renderStars(review.rating)}
                </div>

                <p
                  className="
mt-4
text-sm
leading-relaxed
text-gray-600
line-clamp-3
"
                >
                  "{review.comment}"
                </p>

                <button
                  onClick={() => openReview(review, index)}
                  className="
mt-5
flex
items-center
gap-2
text-sm
font-bold
text-[#ff2d6f]
hover:gap-4
transition-all
"
                >
                  {translate("View Full Story")}

                  <FaArrowRight />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
      {/* =====================================================
    FULL SCREEN REVIEW MODAL
===================================================== */}

      <AnimatePresence>
        {selectedReview && (
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
bg-black/90
backdrop-blur-xl
flex
items-center
justify-center
p-4
"
          >
            {/* CLOSE BUTTON */}

            <button
              onClick={closeReview}
              aria-label={translate("Close preview")}
              className="
absolute
top-5
right-5
z-50
w-12
h-12
rounded-full
bg-white
text-gray-900
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

            {/* PREVIOUS BUTTON */}

            <button
              onClick={previousReview}
              aria-label={translate("Previous image")}
              className="
absolute
left-4
md:left-10
top-1/2
-translate-y-1/2
z-40
w-12
h-12
md:w-14
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

            {/* NEXT BUTTON */}

            <button
              onClick={nextReview}
              aria-label={translate("Next image")}
              className="
absolute
right-4
md:right-10
top-1/2
-translate-y-1/2
z-40
w-12
h-12
md:w-14
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

            <motion.div
              initial={{
                scale: 0.92,

                opacity: 0,
              }}
              animate={{
                scale: 1,

                opacity: 1,
              }}
              exit={{
                scale: 0.92,

                opacity: 0,
              }}
              transition={{
                duration: 0.3,
              }}
              className="
relative
max-w-6xl
w-full
max-h-[90vh]
bg-white
rounded-[35px]
overflow-hidden
grid
md:grid-cols-2
"
            >
              {/* CUSTOMER PHOTO */}

              <div
                className="
bg-black
flex
items-center
justify-center
min-h-[350px]
md:min-h-[650px]
"
              >
                <img
                  src={selectedReview.photoUrl || DEFAULT_IMAGE}
                  alt={selectedReview.name || "Customer"}
                  className="
w-full
h-full
max-h-[650px]
object-cover
"
                />
              </div>

              {/* REVIEW INFORMATION */}

              <div
                className="
p-7
md:p-12
overflow-y-auto
flex
flex-col
justify-center
"
              >
                <p
                  className="
text-xs
uppercase
tracking-[0.35em]
font-bold
text-[#ff2d6f]
"
                >
                  {translate("VIP CLIENT")}
                </p>

                <h2
                  className="
mt-5
text-3xl
md:text-5xl
font-serif
font-bold
"
                >
                  {selectedReview.name}
                </h2>

                <p
                  className="
mt-2
text-gray-500
"
                >
                  {selectedReview.role || translate("Luxury Fashion Client")}
                </p>

                <div
                  className="
flex
gap-1
mt-5
"
                >
                  {renderStars(selectedReview.rating)}
                </div>

                <p
                  className="
mt-7
text-gray-600
leading-relaxed
text-base
"
                >
                  "{selectedReview.comment}"
                </p>

                <div
                  className="
mt-8
flex
items-center
gap-2
text-green-600
font-semibold
text-sm
"
                >
                  <FaCheckCircle />

                  {translate("Verified Customer Experience")}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
    PREMIUM CTA SECTION
===================================================== */}

      <section
        className="
relative
overflow-hidden
py-20
px-5
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
bg-white/20
rounded-full
blur-3xl
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
          className="
relative
max-w-3xl
mx-auto
text-center
"
        >
          <p
            className="
text-xs
uppercase
tracking-[0.45em]
font-bold
text-white/80
"
          >
            {translate("Fiyorina Luxury Fashion")}
          </p>

          <h2
            className="
mt-5
text-3xl
sm:text-4xl
md:text-5xl
font-serif
font-bold
leading-tight
"
          >
            {translate("Create Your Signature Style")}
          </h2>

          <p
            className="
mt-5
max-w-xl
mx-auto
text-sm
md:text-base
text-white/90
leading-relaxed
"
          >
            {translate(
              "Join our luxury fashion community with custom designs, premium chiffon collections, and unforgettable elegance.",
            )}
          </p>

          <Link
            to="/contact"
            className="
inline-flex
items-center
gap-3
mt-8
px-8
py-4
rounded-full
bg-white
text-[#ff2d6f]
font-bold
shadow-xl
hover:scale-105
transition-all
"
          >
            {translate("Book Your Design")}

            <FaArrowRight />
          </Link>
        </motion.div>
      </section>
      {/* =====================================================
    MOBILE BOTTOM SPACE
===================================================== */}

      <div
        className="
h-20
md:hidden
"
      />
    </div>
  );
};

export default Reviews;
