import { useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FaShoppingBag,
  FaTrash,
  FaMinus,
  FaPlus,
  FaRulerCombined,
  FaUser,
  FaMapMarkerAlt,
  FaCreditCard,
  FaCopy,
  FaUpload,
  FaImage,
  FaCheckCircle,
  FaGem,
  FaArrowRight,
} from "react-icons/fa";

import { useLanguage } from "../context/LanguageContext.jsx";

import enTranslations from "../translations/en.json";
import amTranslations from "../translations/am.json";
import womenMeasurementGuide from "../assets/measurment guide for women.jpg";
import menMeasurementGuide from "../assets/measurment guide for men.jpg";
const CartPage = () => {
  const { language } = useLanguage();

  const translate = useCallback(
    (text) => {
      const currentLanguage = language?.toUpperCase();

      if (currentLanguage === "AM") {
        return amTranslations[text] || text;
      }

      return enTranslations[text] || text;
    },
    [language],
  );

  const navigate = useNavigate();

  // ================================
  // CART
  // ================================

  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("fiyorina-cart");

    return saved ? JSON.parse(saved) : [];
  });

  const isMenOrder = items.some(
    (item) => item.category?.toLowerCase() === "men",
  );

  const [loading, setLoading] = useState(false);

  // ================================
  // PAYMENT METHODS
  // READY FOR FUTURE ADDITIONS
  // ================================

  const paymentMethods = {
    telebirr: {
      name: "Telebirr",

      number: "0933005058",

      accountName: "Yigermal Design",

      prepayment: 3000,
    },
  };

  const selectedPayment = "telebirr";

  const payment = paymentMethods[selectedPayment];

  const [copied, setCopied] = useState(false);

  const [paymentScreenshot, setPaymentScreenshot] = useState(null);

  // ================================
  // MEASUREMENTS
  // ================================

  const measurementFields = isMenOrder
    ? [
        { key: "chest", title: "Chest", description: "Chest" },
        { key: "waist", title: "Waist", description: "Waist" },
        { key: "hips", title: "Hips", description: "Hips" },
        {
          key: "shoulder",
          title: "Shoulder Width",
          description: "Shoulder Width",
        },
        {
          key: "sleeve",
          title: "Sleeve Length",
          description: "Sleeve Length",
        },
        { key: "fullHeight", title: "Full Height", description: "Full Height" },
        {
          key: "trouserInseam",
          title: "Trouser Inseam",
          description: "Trouser Inseam",
        },
      ]
    : [
        { key: "bust", title: "Bust", description: "Bust" },
        { key: "waist", title: "Waist", description: "Waist" },
        { key: "hips", title: "Hips", description: "Hips" },
        {
          key: "shoulder",
          title: "Shoulder Width",
          description: "Shoulder Width",
        },
        {
          key: "sleeve",
          title: "Sleeve Length",
          description: "Sleeve Length",
        },
        { key: "height", title: "Height", description: "Height" },
      ];

  const [measurements, setMeasurements] = useState({
    chest: "",
    shoulder: "",
    sleeve: "",
    bust: "",
    waist: "",
    hips: "",
    gownLength: "",
    waistHem: "",
    fullHeight: "",
    height: "",
    trouserInseam: "",
  });

  // ================================
  // CUSTOMER
  // ================================

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // ================================
  // CART FUNCTIONS
  // ================================

  const saveCart = (data) => {
    setItems(data);

    localStorage.setItem(
      "fiyorina-cart",

      JSON.stringify(data),
    );
  };

  const removeItem = (id) => {
    saveCart(items.filter((item) => item.id !== id));
  };

  const changeQuantity = (id, type) => {
    const updated = items.map((item) => {
      if (item.id !== id) return item;

      let quantity = item.quantity || 1;

      if (type === "plus") quantity++;

      if (type === "minus" && quantity > 1) quantity--;

      return {
        ...item,

        quantity,
      };
    });

    saveCart(updated);
  };

  const totalPrice = items.reduce((total, item) => {
    const price = Number(String(item.price).replace(/\D/g, "")) || 0;

    return total + price * (item.quantity || 1);
  }, 0);

  // ================================
  // INPUT HANDLERS
  // ================================

  const handleMeasurement = (e) => {
    setMeasurements({
      ...measurements,

      [e.target.name]: e.target.value,
    });
  };

  const handleCustomer = (e) => {
    setCustomer({
      ...customer,

      [e.target.name]: e.target.value,
    });
  };

  // ================================
  // PAYMENT
  // ================================

  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image")) {
      alert(translate("Please upload an image file"));
      return;
    }

    setPaymentScreenshot(file);
  };
  // ================================
  // VALIDATION
  // ================================
  // ================================
  // COPY PAYMENT NUMBER
  // ================================

  const copyNumber = () => {
    navigator.clipboard.writeText(payment.number);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  const validateOrder = () => {
    if (items.length === 0) {
      alert(translate("Your cart is empty"));
      return false;
    }

    if (!customer.name) {
      alert(translate("Please enter your name"));
      return false;
    }

    if (!customer.phone) {
      alert(translate("Please enter phone number"));
      return false;
    }

    if (!customer.address) {
      alert(translate("Please enter delivery address"));
      return false;
    }

    if (!paymentScreenshot) {
      alert(translate("Please upload payment screenshot"));
      return false;
    }

    return true;
  };

  // ================================
  // CONFIRM ORDER
  // ================================

  const confirmOrder = async () => {
    if (!validateOrder()) return;

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("customer", JSON.stringify(customer));

      formData.append("items", JSON.stringify(items));

      formData.append("measurements", JSON.stringify(measurements));

      formData.append(
        "payment",
        JSON.stringify({
          method: payment.name,
          number: payment.number,
          accountName: payment.accountName,
          prepayment: payment.prepayment,
        }),
      );
      formData.append("total", totalPrice);

      formData.append("paymentScreenshot", paymentScreenshot);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/orders`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log("ORDER CREATED", response.data);

      localStorage.removeItem("fiyorina-cart");

      localStorage.setItem("fiyorina-order", JSON.stringify(response.data));

      setItems([]);

      navigate("/order-success");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message || translate("Order failed. Try again."),
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="
min-h-screen
bg-[#fff8fb]
px-4
sm:px-6
lg:px-10
py-8
"
    >
      <div
        className="
max-w-7xl
mx-auto
"
      >
        {/* HEADER */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
text-center
mb-10
"
        >
          <div
            className="
inline-flex
items-center
gap-2
bg-white
border
border-pink-100
shadow-sm
rounded-full
px-5
py-2
text-[#d81b60]
font-bold
"
          >
            <FaGem />
            {translate("Yigermal Design Order")}
          </div>

          <h1
            className="
mt-5
text-3xl
sm:text-5xl
font-black
text-gray-900
"
          >
            {translate("Create Your Perfect Dress")}
          </h1>

          <p
            className="
mt-3
text-gray-600
"
          >
            {translate("Add measurements and complete your order")}
          </p>
        </motion.div>

        <div
          className="
grid
lg:grid-cols-3
gap-8
"
        >
          {/* CART */}

          <div
            className="
space-y-5
"
          >
            <div
              className="
flex
items-center
gap-3
"
            >
              <div
                className="
w-11
h-11
rounded-2xl
bg-pink-100
text-[#d81b60]
flex
items-center
justify-center
"
              >
                <FaShoppingBag />
              </div>

              <h2
                className="
text-xl
font-black
text-gray-900
"
              >
                {translate("Your Cart")}
              </h2>
            </div>

            {items.map((item) => (
              <div
                key={item.id}
                className="
bg-white
rounded-3xl
p-5
border
border-pink-100
shadow-sm
"
              >
                <div
                  className="
flex
gap-4
"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="
w-24
h-28
object-cover
rounded-2xl
"
                  />

                  <div
                    className="
flex-1
"
                  >
                    <h3
                      className="
font-black
text-gray-900
"
                    >
                      {translate(item.title)}
                    </h3>

                    <p
                      className="
mt-2
font-bold
text-[#d81b60]
"
                    >
                      {item.price}
                    </p>
                  </div>
                </div>

                <div
                  className="
flex
justify-between
items-center
mt-5
"
                >
                  <div
                    className="
flex
items-center
gap-3
bg-pink-50
rounded-full
p-1
"
                  >
                    <button
                      onClick={() => changeQuantity(item.id, "minus")}
                      className="
w-8
h-8
rounded-full
bg-white
text-gray-900
flex
items-center
justify-center
"
                    >
                      <FaMinus />
                    </button>

                    <span
                      className="
font-black
text-gray-900
"
                    >
                      {item.quantity || 1}
                    </span>

                    <button
                      onClick={() => changeQuantity(item.id, "plus")}
                      className="
w-8
h-8
rounded-full
bg-[#d81b60]
text-white
flex
items-center
justify-center
"
                    >
                      <FaPlus />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="
text-red-500
font-bold
flex
items-center
gap-2
"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT CONTENT */}

          <div
            className="
lg:col-span-2
flex
flex-col
gap-8
"
          >
            {/* MEASUREMENTS */}

            <div
              className="
bg-white
rounded-[35px]
border
border-pink-100
p-6
sm:p-8
order-2
"
            >
              <div
                className="
flex
items-center
gap-3
mb-7
"
              >
                <div
                  className="
w-12
h-12
rounded-2xl
bg-pink-100
text-[#d81b60]
flex
items-center
justify-center
"
                >
                  <FaRulerCombined />
                </div>

                <div>
                  <h2
                    className="
text-2xl
font-black
text-gray-900
"
                  >
                    {translate("Measurements")}
                  </h2>

                  <p
                    className="
text-sm
text-gray-500
"
                  >
                    {translate("Enter your body measurements in cm")}
                  </p>
                </div>
              </div>

              {/* TWO COLUMN MEASUREMENTS */}

              <div
                className="
grid
grid-cols-1
sm:grid-cols-2
gap-5
"
              >
                {measurementFields.map((field) => (
                  <div
                    key={field.key}
                    className="
bg-[#fff8fb]
rounded-2xl
p-4
border
border-pink-100
"
                  >
                    <label
                      className="
block
font-black
text-gray-900
text-sm
"
                    >
                      {translate(field.title)}
                    </label>

                    <p
                      className="
text-xs
text-gray-500
mt-1
"
                    >
                      {translate(field.description)}
                    </p>

                    <input
                      type="text"
                      name={field.key}
                      value={measurements[field.key]}
                      onChange={handleMeasurement}
                      placeholder={translate("Example: 40 cm")}
                      className="
mt-3
w-full
rounded-xl
border
border-gray-200
bg-white
px-4
py-3
text-black
placeholder:text-gray-400
appearance-none
outline-none
focus:ring-2
focus:ring-pink-300
"
                    />
                  </div>
                ))}
              </div>

              {/* GUIDE */}

              <div
                className="
mt-8
bg-[#fff8fb]
rounded-3xl
p-5
"
              >
                <div
                  className="
flex
items-center
gap-3
mb-4
"
                >
                  <FaRulerCombined
                    className="
text-[#d81b60]
"
                  />

                  <h3
                    className="
font-black
text-gray-900
"
                  >
                    {translate("Measurement Guide")}
                  </h3>
                </div>

                <img
                  src={isMenOrder ? menMeasurementGuide : womenMeasurementGuide}
                  alt={translate(
                    isMenOrder
                      ? "Men Measurement Guide"
                      : "Women Measurement Guide",
                  )}
                  className="max-h-[520px] w-full rounded-xl bg-white object-contain"
                  loading="lazy"
                />
              </div>
            </div>
            {/* CUSTOMER INFORMATION */}

            <div
              className="
bg-white
rounded-[35px]
border
border-pink-100
p-6
sm:p-8
order-1
"
            >
              <div
                className="
flex
items-center
gap-3
mb-7
"
              >
                <div
                  className="
w-12
h-12
rounded-2xl
bg-pink-100
text-[#d81b60]
flex
items-center
justify-center
"
                >
                  <FaUser />
                </div>

                <div>
                  <h2
                    className="
text-2xl
font-black
text-gray-900
"
                  >
                    {translate("Customer Details")}
                  </h2>

                  <p
                    className="
text-sm
text-gray-500
"
                  >
                    {translate("Where should we deliver your dress?")}
                  </p>
                </div>
              </div>

              <div
                className="
grid
sm:grid-cols-2
gap-5
"
              >
                <input
                  type="text"
                  name="name"
                  value={customer.name}
                  onChange={handleCustomer}
                  placeholder={translate("Full Name")}
                  className="
w-full
rounded-2xl
border
border-gray-200
bg-white
px-5
py-4
text-black
placeholder:text-gray-400
outline-none
focus:ring-2
focus:ring-pink-300
"
                />

                <input
                  type="text"
                  name="phone"
                  value={customer.phone}
                  onChange={handleCustomer}
                  placeholder={translate("Phone Number")}
                  className="
w-full
rounded-2xl
border
border-gray-200
bg-white
px-5
py-4
text-black
placeholder:text-gray-400
outline-none
focus:ring-2
focus:ring-pink-300
"
                />

                <div
                  className="
sm:col-span-2
relative
"
                >
                  <FaMapMarkerAlt
                    className="
absolute
left-5
top-5
text-[#d81b60]
"
                  />

                  <input
                    type="text"
                    name="address"
                    value={customer.address}
                    onChange={handleCustomer}
                    placeholder={translate("Delivery Address")}
                    className="
w-full
rounded-2xl
border
border-gray-200
bg-white
pl-12
px-5
py-4
text-black
placeholder:text-gray-400
outline-none
focus:ring-2
focus:ring-pink-300
"
                  />
                </div>
              </div>
            </div>

            {/* PAYMENT SECTION */}

            <div
              className="
bg-white
rounded-[35px]
border
border-pink-100
p-6
sm:p-8
order-3
"
            >
              <div
                className="
flex
items-center
gap-3
mb-6
"
              >
                <div
                  className="
w-12
h-12
rounded-2xl
bg-pink-100
text-[#d81b60]
flex
items-center
justify-center
"
                >
                  <FaCreditCard />
                </div>

                <div>
                  <h2
                    className="
text-2xl
font-black
text-gray-900
"
                  >
                    {translate("Payment Method")}
                  </h2>

                  <p
                    className="
text-sm
text-gray-500
"
                  >
                    {translate("Secure prepayment")}
                  </p>
                </div>
              </div>

              {/* TELEBIRR CARD */}

              <div
                className="
rounded-3xl
border
border-pink-200
bg-[#fff8fb]
p-5
"
              >
                <div
                  className="
flex
justify-between
items-center
"
                >
                  <div>
                    <p
                      className="
text-xs
uppercase
font-black
text-gray-400
"
                    >
                      {translate("Selected Payment")}
                    </p>

                    <h3
                      className="
text-xl
font-black
text-gray-900
mt-1
"
                    >
                      {payment.name}
                    </h3>
                  </div>

                  <div
                    className="
bg-green-100
text-green-600
px-3
py-1
rounded-full
text-xs
font-black
"
                  >
                    {translate("Active")}
                  </div>
                </div>

                <div
                  className="
grid
sm:grid-cols-2
gap-4
mt-5
"
                >
                  <div
                    className="
bg-white
rounded-2xl
p-4
"
                  >
                    <p
                      className="
text-xs
text-gray-400
font-bold
"
                    >
                      {translate("Account Name")}
                    </p>

                    <p
                      className="
font-black
text-gray-900
mt-1
"
                    >
                      {payment.accountName}
                    </p>
                  </div>

                  <div
                    className="
bg-white
rounded-2xl
p-4
"
                  >
                    <p
                      className="
text-xs
text-gray-400
font-bold
"
                    >
                      {translate("Telebirr Number")}
                    </p>

                    <div
                      className="
flex
justify-between
items-center
"
                    >
                      <p
                        className="
font-black
text-gray-900
mt-1
"
                      >
                        {payment.number}
                      </p>

                      <button
                        onClick={copyNumber}
                        className="
text-[#d81b60]
hover:scale-110
transition
"
                      >
                        <FaCopy />
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  className="
mt-5
flex
justify-between
items-center
bg-white
rounded-2xl
p-4
"
                >
                  <span
                    className="
font-bold
text-gray-600
"
                  >
                    {translate("Prepayment Required")}
                  </span>

                  <span
                    className="
font-black
text-[#d81b60]
"
                  >
                    {payment.prepayment.toLocaleString()} ETB
                  </span>
                </div>

                {copied && (
                  <p
                    className="
mt-3
text-green-600
text-sm
font-bold
"
                  >
                    {translate("Payment number copied")}
                  </p>
                )}
              </div>
            </div>

            {/* PAYMENT SCREENSHOT */}

            <div
              className="
bg-white
rounded-[35px]
border
border-pink-100
p-6
sm:p-8
order-4
"
            >
              <div
                className="
flex
items-center
gap-3
mb-5
"
              >
                <div
                  className="
w-12
h-12
rounded-2xl
bg-pink-100
text-[#d81b60]
flex
items-center
justify-center
"
                >
                  {paymentScreenshot ? <FaCheckCircle /> : <FaImage />}
                </div>

                <div>
                  <h2
                    className="
text-xl
font-black
text-gray-900
"
                  >
                    {translate("Payment Screenshot")}
                  </h2>

                  <p
                    className="
text-sm
text-gray-500
"
                  >
                    {translate("Upload your Telebirr receipt")}
                  </p>
                </div>
              </div>

              <label
                className="
cursor-pointer
flex
items-center
justify-between
border-2
border-dashed
border-pink-200
rounded-3xl
p-5
hover:bg-pink-50
transition
"
              >
                <div
                  className="
flex
items-center
gap-4
"
                >
                  <div
                    className="
w-11
h-11
rounded-full
bg-pink-100
text-[#d81b60]
flex
items-center
justify-center
"
                  >
                    <FaUpload />
                  </div>

                  <div>
                    <p
                      className="
font-black
text-gray-900
"
                    >
                      {paymentScreenshot
                        ? paymentScreenshot.name
                        : translate("Choose Screenshot")}
                    </p>

                    <p
                      className="
text-xs
text-gray-500
"
                    >
                      {translate("JPG or PNG image")}
                    </p>
                  </div>
                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  className="
hidden
"
                />
              </label>
            </div>
            {/* ORDER SUMMARY */}

            <div
              className="
bg-gray-900
rounded-[35px]
p-6
sm:p-8
text-white
order-5
"
            >
              <div
                className="
flex
items-center
justify-between
gap-4
"
              >
                <div>
                  <p
                    className="
text-gray-400
font-bold
text-sm
"
                  >
                    {translate("Order Total")}
                  </p>

                  <h2
                    className="
text-4xl
sm:text-5xl
font-black
mt-2
"
                  >
                    {totalPrice.toLocaleString()}

                    <span
                      className="
text-lg
ml-2
"
                    >
                      ETB
                    </span>
                  </h2>
                </div>

                <div
                  className="
w-14
h-14
rounded-2xl
bg-white/10
flex
items-center
justify-center
"
                >
                  <FaGem
                    className="
text-pink-300
text-3xl
"
                  />
                </div>
              </div>

              <div
                className="
mt-6
border-t
border-white/10
pt-5
"
              >
                <div
                  className="
flex
justify-between
text-sm
"
                >
                  <span
                    className="
text-gray-400
"
                  >
                    {translate("Prepayment")}
                  </span>

                  <span
                    className="
font-bold
"
                  >
                    {payment.prepayment.toLocaleString()} ETB
                  </span>
                </div>

                <div
                  className="
flex
justify-between
mt-3
text-sm
"
                >
                  <span
                    className="
text-gray-400
"
                  >
                    {translate("Payment Method")}
                  </span>

                  <span
                    className="
font-bold
"
                  >
                    {payment.name}
                  </span>
                </div>
              </div>

              <button
                onClick={confirmOrder}
                disabled={loading}
                className="
mt-7
w-full
rounded-2xl
py-4
bg-[#d81b60]
hover:bg-[#c2185b]
text-white
font-black
text-lg
flex
items-center
justify-center
gap-3
transition
disabled:opacity-60
"
              >
                {loading ? (
                  translate("Confirming Order...")
                ) : (
                  <>
                    {translate("Confirm Order")}
                    <FaArrowRight />
                  </>
                )}
              </button>

              <p
                className="
mt-4
text-center
text-xs
text-gray-400
"
              >
                {translate(
                  "By confirming, you agree that your payment proof is correct.",
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
