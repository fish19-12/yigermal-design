import { useEffect, useState, useCallback } from "react";

import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import {
  FaCheckCircle,
  FaGem,
  FaHome,
  FaShoppingBag,
  FaClock,
  FaPhoneAlt,
  FaArrowRight,
  FaCreditCard,
  FaRulerCombined,
} from "react-icons/fa";

import { useLanguage } from "../context/LanguageContext.jsx";

import enTranslations from "../translations/en.json";

import amTranslations from "../translations/am.json";

const OrderSuccess = () => {
  const navigate = useNavigate();

  const { language } = useLanguage();

  const translations = {
    EN: enTranslations,
    AM: amTranslations,
  };

  const translate = useCallback(
    (text) => {
      return translations[language]?.[text] || text;
    },
    [language],
  );

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("fiyorina-order");

    if (saved) {
      const parsed = JSON.parse(saved);

      setOrder(parsed);

      localStorage.removeItem("fiyorina-cart");
    }
  }, []);

  if (!order) {
    return (
      <div
        className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-pink-50
        "
      >
        <div
          className="
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
            border-pink-200
            border-t-[#d81b60]
            animate-spin
            "
          />

          <p
            className="
            mt-5
            font-bold
            text-gray-700
            "
          >
            {translate("Loading your order...")}
          </p>
        </div>
      </div>
    );
  }

  const data = order.order;

  const orderId = data?._id
    ? "FY-" + data._id.slice(-6).toUpperCase()
    : "FY-PENDING";

  const paymentConfirmed = data?.paymentStatus === "confirmed";

  return (
    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-[#fff5fa]
      via-white
      to-[#ffe4ef]
      flex
      items-center
      justify-center
      px-4
      py-8
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
        className="
        w-full
        max-w-lg
        bg-white
        rounded-[35px]
        shadow-2xl
        border
        border-pink-100
        overflow-hidden
        "
      >
        {/* TOP SUCCESS */}
        <div
          className="
          bg-gradient-to-r
          from-[#d81b60]
          to-pink-400
          p-7
          text-center
          text-white
          "
        >
          <div
            className="
            w-20
            h-20
            mx-auto
            bg-white
            rounded-full
            flex
            items-center
            justify-center
            shadow-lg
            "
          >
            <FaCheckCircle
              className="
              text-green-500
              text-5xl
              "
            />
          </div>

          <h1
            className="
            mt-4
            text-3xl
            font-black
            "
          >
            {translate("Order Received 🎉")}
          </h1>

          <p
            className="
            text-white/90
            mt-2
            "
          >
            {translate("Thank you for choosing Fiyorina")}
          </p>
        </div>{" "}
        <div className="p-6">
          {/* CUSTOMER */}
          <div
            className="
            text-center
            "
          >
            <p
              className="
              text-xs
              uppercase
              tracking-widest
              text-gray-400
              font-bold
              "
            >
              {translate("Customer")}
            </p>

            <h2
              className="
              mt-2
              text-3xl
              font-black
              text-[#d81b60]
              "
            >
              {data?.customer?.name || translate("Customer")}
            </h2>

            <p
              className="
              mt-2
              text-sm
              text-gray-500
              "
            >
              {translate("Order ID")} : {orderId}
            </p>

            <p
              className="
              text-sm
              text-gray-500
              "
            >
              📞 {data?.customer?.phone}
            </p>
          </div>
          {/* PAYMENT STATUS */}
          <div
            className={`

            mt-5

            rounded-3xl

            p-4

            flex

            items-center

            gap-4


            ${
              paymentConfirmed
                ? "bg-green-50 border border-green-200"
                : "bg-orange-50 border border-orange-200"
            }

            `}
          >
            <div
              className="
              w-12
              h-12
              rounded-full
              bg-white
              flex
              items-center
              justify-center
              "
            >
              {paymentConfirmed ? (
                <FaCheckCircle
                  className="
                    text-green-600
                    text-xl
                    "
                />
              ) : (
                <FaClock
                  className="
                    text-orange-500
                    text-xl
                    "
                />
              )}
            </div>

            <div>
              <h3
                className="
                font-black
                text-gray-900
                "
              >
                {paymentConfirmed
                  ? translate("Payment Confirmed")
                  : translate("Payment Pending")}
              </h3>

              <p
                className="
                text-sm
                text-gray-600
                "
              >
                {paymentConfirmed
                  ? translate("Payment received successfully")
                  : translate("We are checking your payment")}
              </p>
            </div>
          </div>
          {/* SUMMARY */}
          <div
            className="
            mt-5
            grid
            grid-cols-2
            gap-4
            "
          >
            <div
              className="
              bg-gray-900
              text-white
              rounded-3xl
              p-5
              "
            >
              <FaShoppingBag
                className="
                text-pink-300
                text-xl
                "
              />

              <p
                className="
                text-xs
                text-gray-400
                mt-3
                "
              >
                {translate("ITEMS")}
              </p>

              <p
                className="
                text-2xl
                font-black
                "
              >
                {data?.items?.length || 0}
              </p>
            </div>

            <div
              className="
              bg-[#d81b60]
              text-white
              rounded-3xl
              p-5
              "
            >
              <FaGem
                className="
                text-pink-200
                text-xl
                "
              />

              <p
                className="
                text-xs
                text-white/70
                mt-3
                "
              >
                {translate("TOTAL")}
              </p>

              <p
                className="
                text-xl
                font-black
                "
              >
                {data?.total?.toLocaleString() || 0} ETB
              </p>
            </div>
          </div>
          {/* DETAILS */}
          <div
            className="
            mt-5
            space-y-3
            "
          >
            <div
              className="
              flex
              items-center
              gap-4
              bg-pink-50
              rounded-2xl
              p-4
              "
            >
              <FaCreditCard
                className="
                text-[#d81b60]
                "
              />

              <span
                className="
                font-bold
                text-gray-800
                "
              >
                {data?.payment?.method || "Telebirr"}
              </span>
            </div>

            <div
              className="
              flex
              items-center
              gap-4
              bg-pink-50
              rounded-2xl
              p-4
              "
            >
              <FaRulerCombined
                className="
                text-[#d81b60]
                "
              />

              <span
                className="
                font-bold
                text-gray-800
                "
              >
                {translate("Custom measurements submitted")}
              </span>
            </div>
          </div>{" "}
          {/* CONTACT */}
          <div
            className="
            mt-5
            rounded-3xl
            bg-gray-900
            text-white
            p-5
            flex
            gap-4
            items-center
            "
          >
            <div
              className="
              w-12
              h-12
              rounded-full
              bg-[#d81b60]
              flex
              items-center
              justify-center
              "
            >
              <FaPhoneAlt />
            </div>

            <div>
              <h3
                className="
                font-black
                "
              >
                {translate("We will contact you")}
              </h3>

              <p
                className="
                text-sm
                text-gray-300
                "
              >
                {translate("Delivery and measurements confirmation")}
              </p>
            </div>
          </div>
          {/* BUTTON */}
          <button
            onClick={() => navigate("/")}
            className="
            mt-6
            w-full
            py-4
            rounded-2xl
            bg-[#d81b60]
            hover:bg-[#c2185b]
            text-white
            font-black
            flex
            justify-center
            items-center
            gap-3
            transition
            "
          >
            <FaHome />

            {translate("Back To Home")}

            <FaArrowRight />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
