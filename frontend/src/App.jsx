import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NatiAIChat from "./components/NatiAIChat";

/* ================= PAGES ================= */

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Reviews from "./pages/Reviews";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";

import CartPage from "./pages/CartPage";
import OrderSuccess from "./pages/OrderSuccess";

/* ================= GALLERY CATEGORY PAGES ================= */

import ChiffonGallery from "./pages/gallery/ChiffonGallery";
import BridalGallery from "./pages/gallery/BridalGallery";
import TraditionalGallery from "./pages/gallery/TraditionalGallery";
import ModernGallery from "./pages/gallery/ModernGallery";
import TextileGallery from "./pages/gallery/TextileGallery";

/* ================= SCROLL TO TOP ================= */

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}

/* ================= APP ================= */

function App() {
  return (
    <Router>
      <div
        className="
bg-white
text-[#1A1A1A]
overflow-x-hidden
"
      >
        <ScrollToTop />

        <Navbar />

        <main
          className="
min-h-screen
"
        >
          <Routes>
            {/* MAIN PAGES */}

            <Route path="/" element={<Home />} />

            <Route path="/about" element={<About />} />

            <Route path="/services" element={<Services />} />

            <Route path="/gallery" element={<Gallery />} />

            <Route path="/reviews" element={<Reviews />} />

            <Route path="/booking" element={<Booking />} />

            <Route path="/contact" element={<Contact />} />

            {/* ================= FIYORINA GALLERY CATEGORY ROUTES ================= */}

            <Route path="/gallery/women" element={<ChiffonGallery />} />

            <Route path="/gallery/couples" element={<BridalGallery />} />

            <Route path="/gallery/men" element={<TraditionalGallery />} />

            <Route path="/gallery/family" element={<ModernGallery />} />

            <Route path="/gallery/children" element={<TextileGallery />} />

            {/* CART */}

            <Route path="/cart" element={<CartPage />} />

            <Route path="/order-success" element={<OrderSuccess />} />

            {/* FALLBACK */}

            <Route
              path="*"
              element={
                <div
                  className="
min-h-screen
flex
items-center
justify-center
text-3xl
font-bold
"
                >
                  404 - Page Not Found
                </div>
              }
            />
          </Routes>
        </main>

        <Footer />

        <NatiAIChat />
      </div>
    </Router>
  );
}

export default App;
