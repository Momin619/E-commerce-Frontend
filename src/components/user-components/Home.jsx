import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import api from "../../api/api";
import { useNavigate, useLocation } from "react-router-dom";
import { AiFillFire } from "react-icons/ai";
const categories = ["All", "Electronics", "Clothing", "Accessories", "Food"];
import RatingStars from "../ui/RatingStars";
import {
  BiSolidCategoryAlt,
  BiSolidQuoteAltLeft,
  BiSolidQuoteAltRight,
  BiRecycle,
  PiLightningBold,
  TbDiscount,
  TbSparkles,
  TbTruckReturn,
  TbWorld,
  MdOutlineVerifiedUser,
  MdSupportAgent,
  MdEmail,
  MdPhoneIphone,
  LuPackageSearch,
  FaRegHandPeace,
  FaMapMarkedAlt,
  FaPhoneAlt,
  FaLocationDot,
  VscFeedback,
} from "../../icons";
import Footer from "../ui/Footer";
function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [topSales, setTopSales] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("");

  const fetchTopSales = async () => {
    try {
      const res = await api.get("/home");
      setTopSales(res.data.topsales_products || []);
    } catch (err) {
      console.error("Error fetching top sales:", err);
    }
  };

  const fetchCategoryProducts = async (cat) => {
    try {
      const res = await api.get(`/home/category?category=${cat}`);
      setFilteredProducts(res?.data?.filtered_products || []);
    } catch (err) {
      console.error("Error fetching filtered products:", err);
    }
  };

  useEffect(() => {
    const selected = new URLSearchParams(location.search).get("category") || "";
    setCategory(selected);
    fetchTopSales();
    if (selected) fetchCategoryProducts(selected);
    else setFilteredProducts([]);
  }, [location.search]);

  const applyCategory = (cat) => {
    const params = new URLSearchParams();
    params.set("category", cat);
    navigate(`/home/category?${params.toString()}`);
  };

  const handleLearnMore = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOnClick = () => navigate("/products");

  const reviews = [
    {
      name: "Ayesha",
      text: "Absolutely loved the packaging and attention to detail!",
      avatar: "https://i.pravatar.cc/100?img=47",
      rating: 4.2,
    },
    {
      name: "Hamza",
      text: "Top-notch quality, loved it!",
      avatar: "https://i.pravatar.cc/100?img=7",
      rating: 3.8,
    },
    {
      name: "Zara",
      text: "Customer support was really helpful and polite.",
      avatar: "https://i.pravatar.cc/100?img=32",
      rating: 3.5,
    },
    {
      name: "Momin",
      text: "Great service and fast delivery!",
      avatar: "https://i.pravatar.cc/100?img=1",
      rating: 4.5,
    },
    {
      name: "Fatima",
      text: "I got exactly what I ordered. Will shop again!",
      avatar: "https://i.pravatar.cc/100?img=49",
      rating: 4.9,
    },
    {
      name: "Ali",
      text: "Highly recommend their store.",
      avatar: "https://i.pravatar.cc/100?img=12",
      rating: 3,
    },
    {
      name: "Sara",
      text: "Smooth experience from browsing to checkout.",
      avatar: "https://i.pravatar.cc/100?img=41",
      rating: 4.5,
    },
    {
      name: "Usman",
      text: "Product arrived before the expected date. Impressive!",
      avatar: "https://i.pravatar.cc/100?img=14",
      rating: 3.7,
    },
  ];

  const services = [
    {
      icon: <PiLightningBold size={30} />,
      title: "Lightning Fast Delivery",
      color: "#ff6b6b", // energetic red (lightning fast energy)
    },
    {
      icon: <TbDiscount size={30} />,
      title: "Exclusive Discounts",
      color: "#feca57", // golden-yellow (feels like "deal/sale" tag)
    },
    {
      icon: <MdOutlineVerifiedUser size={30} />,
      title: "Trusted Sellers",
      color: "#48dbfb", // reliable blue (trust/security tone)
    },
    {
      icon: <LuPackageSearch size={30} />,
      title: "Real-time Tracking",
      color: "#1e90ff", // vibrant blue (tech and live tracking)
    },
    {
      icon: <BiRecycle size={30} />,
      title: "Eco-Friendly Packaging",
      color: "#00b894", // eco green (matches sustainability vibe)
    },
    {
      icon: <FaRegHandPeace size={30} />,
      title: "Hassle-Free Shopping",
      color: "#a29bfe", // soft purple (relaxed, peaceful tone)
    },
    {
      icon: <TbWorld size={30} />,
      title: "Global Delivery",
      color: "#5f27cd", // royal violet (global reach, premium tone)
    },
    {
      icon: <MdSupportAgent size={30} />,
      title: "24/7 Support",
      color: "#ff9ff3", // friendly pink (approachable & helpful)
    },
    {
      icon: <TbTruckReturn size={30} />,
      title: "Easy Returns",
      color: "#ff793f", // orange-red (actionable & quick return)
    },
  ];

  const [reviewIndex, setReviewIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    let timeoutId;

    const cycleReviews = () => {
      setFade(false);
      timeoutId = setTimeout(() => {
        setReviewIndex((prev) => (prev + 1) % reviews.length);
        setFade(true);
        timeoutId = setTimeout(cycleReviews, 3100); // 3s per review
      }, 300); // transition fade
    };

    cycleReviews();

    return () => clearTimeout(timeoutId); // cleanup on unmount
  }, []);

  const nextReview = () => {
    setFade(false);
    setTimeout(() => {
      setReviewIndex((prev) => (prev + 1) % reviews.length);
      setFade(true);
    }, 300);
  };

  const prevReview = () => {
    setFade(false);
    setTimeout(() => {
      setReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
      setFade(true);
    }, 300);
  };

  return (
    <div className="font-sans text-gray-800">
      <section
        className="relative flex flex-col items-center justify-center min-h-[70vh] p-6 sm:p-8 md:p-12 text-white bg-center bg-cover group"
        style={{ backgroundImage: "url('/images/hero.avif')" }}
      >
        <div className="absolute inset-0 filter bg-black/60 group-hover:bg-black/30" />
        <div className="relative z-10 max-w-2xl space-y-4 text-center">
          <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
            Upgrade Your Style Today
          </h1>
          <p className="text-base text-gray-200 sm:text-lg">
            Discover top deals on our most popular products.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleOnClick}
              className="px-4 py-2 font-semibold text-black transition bg-white rounded button sm:px-5 hover:scale-105"
            >
              Shop Now
            </button>
            <button
              onClick={handleLearnMore}
              className="px-4 py-2 font-semibold text-white transition border border-white rounded button sm:px-5 hover:bg-white hover:text-black"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 bg-white sm:px-6 md:py-12">
        <h2 className="flex items-center justify-center gap-2 mb-10 text-2xl font-semibold text-center sm:text-3xl">
          <AiFillFire className="text-3xl text-red-600" />
          <span>Top Sales</span>
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {topSales.map((item, i) => (
            <div
              key={i}
              className="p-4 transition transform rounded-lg bg-gray-50 hover:shadow-xl hover:scale-105"
            >
              <img
                src={`${import.meta.env.VITE_API_URL}${item.productImage}`}
                alt={item.productName}
                className="object-cover w-full h-40 mb-3 rounded"
              />
              <h3 className="text-lg font-medium line-clamp-1">
                {item.productName}
              </h3>
              <p className="text-gray-600">${item.productPrice}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="px-4 py-10 sm:px-6 md:py-12 bg-gray-50">
        <h2 className="flex items-center justify-center gap-2 mb-10 text-2xl font-semibold text-center sm:text-3xl">
          <BiSolidCategoryAlt />
          <span>Categories</span>
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat, i) => (
            <button
              key={i}
              className={`button px-4 py-2 font-medium border rounded transition hover:bg-black hover:text-white ${
                cat === category ? "bg-black text-white" : ""
              }`}
              onClick={() => applyCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 md:grid-cols-3">
            {filteredProducts.map((item, i) => (
              <div
                key={i}
                className="p-4 transition transform bg-white rounded-lg hover:shadow-xl hover:scale-105"
              >
                <img
                  src={`${import.meta.env.VITE_API_URL}${item.productImage}`}
                  alt={item.productName}
                  className="object-cover w-full h-40 mb-3 rounded"
                />
                <h3 className="text-lg font-medium">{item.productName}</h3>
                <p className="text-gray-600">${item.productPrice}</p>
              </div>
            ))}
          </div>
        )}
      </section>
      <section className="px-4 py-10 bg-white sm:px-6 md:py-12">
        <h2 className="flex items-center justify-center gap-2 mb-10 text-2xl font-semibold text-center sm:text-3xl">
          <TbSparkles />
          <span>What we offer</span>
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {services.map((service, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center p-6 text-center transition-transform rounded-lg group bg-gray-50 hover:shadow-lg hover:scale-105"
            >
              <div
                className="mb-4 text-5xl text-black transition-colors duration-300"
                style={{
                  color: "black",
                }}
              >
                <span
                  className="transition-colors duration-300 group-hover:text-[color:var(--hover-color)]"
                  style={{ "--hover-color": service.color }}
                >
                  {service.icon}
                </span>
              </div>
              <h3 className="text-lg font-medium">{service.title}</h3>
            </div>
          ))}
        </div>
      </section>
      <section className="px-4 py-10 bg-gray-100 sm:px-6 md:py-12">
        <h2 className="flex items-center justify-center gap-2 mb-10 text-2xl font-semibold text-center sm:text-3xl">
          <VscFeedback />
          <span>Customers Reviews</span>
        </h2>
        <div className="relative max-w-xl p-6 mx-auto bg-white rounded-lg shadow-lg">
          <div
            className={`transition-opacity duration-500 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <img
                src={reviews[reviewIndex].avatar}
                className="w-16 h-16 rounded-full"
                alt={reviews[reviewIndex].name}
              />
              <div>
                <h4 className="text-lg font-bold">
                  {reviews[reviewIndex].name}
                </h4>
                <div className="text-yellow-400">
                  {<RatingStars rating={reviews[reviewIndex].rating} />}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center px-4 text-center text-gray-600">
              <p className="flex items-center max-w-xl gap-2 italic">
                <BiSolidQuoteAltLeft className="text-xl text-primary" />
                <span className="mx-2">{reviews[reviewIndex].text}</span>
                <BiSolidQuoteAltRight className="text-xl text-primary" />
              </p>
            </div>
          </div>
          <div className="absolute left-0 transform -translate-y-1/2 top-1/2">
            <button
              onClick={prevReview}
              className="p-2 text-gray-600 button hover:text-black"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          <div className="absolute right-0 transform -translate-y-1/2 top-1/2">
            <button
              onClick={nextReview}
              className="p-2 text-gray-600 button hover:text-black"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>
      <section className="px-4 py-10 bg-white sm:px-6 md:py-12">
        <h2 className="flex items-center justify-center gap-2 mb-10 text-2xl font-semibold text-center sm:text-3xl">
          <FaMapMarkedAlt className="text-3xl" />
          <span>Our Location</span>
        </h2>
        <div className="overflow-hidden rounded-lg shadow-lg aspect-video">
          <iframe
            title="Map"
            src="https://maps.google.com/maps?q=Bahria%20Town%20Phase%208&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>
      <section className="px-4 py-10 bg-gray-100 sm:px-6 md:py-12">
        <h2 className="flex items-center justify-center gap-3 mb-8 text-xl font-semibold text-center sm:text-2xl md:text-3xl">
          <FaPhoneAlt className="text-lg text-primary sm:text-xl md:text-2xl" />
          <span>Contact Us</span>
        </h2>

        <div className="max-w-xl mx-auto space-y-6 text-center">
          {/* Email */}
          <div className="flex items-center justify-center gap-2 text-base font-medium sm:text-lg md:text-xl">
            <MdEmail className="text-lg text-primary sm:text-xl md:text-2xl" />
            <span>cartplus@gmail.com</span>
          </div>

          {/* Phone */}
          <div className="flex items-center justify-center gap-0.5 text-base font-medium sm:text-lg md:text-xl">
            <MdPhoneIphone className="text-lg text-primary sm:text-xl md:text-2xl" />
            <span>+923218340987</span>
          </div>

          {/* Location */}
          <div className="flex items-center justify-center gap-2 text-base font-medium sm:text-lg md:text-xl">
            <FaLocationDot className="text-lg text-primary sm:text-xl md:text-2xl" />
            <span>Bahria Town, Phase 8, Rawalpindi</span>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
