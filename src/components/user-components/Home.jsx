import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import api from "../../api/api";
import { useNavigate, useLocation } from "react-router-dom";

const categories = ["All", "Electronics", "Clothing", "Accessories", "Food"];

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [topSales, setTopSales] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("");

  // Fetch top sales
  const fetchTopSales = async () => {
    try {
      const res = await api.get("/home");
      setTopSales(res.data.topsales_products || []);
    } catch (err) {
      console.error("Error fetching top sales:", err);
    }
  };

  // Fetch category-based products
  const fetchCategoryProducts = async (cat) => {
    try {
      const res = await api.get(`/home/category?category=${cat}`);
      setFilteredProducts(res?.data?.filtered_products || []);
    } catch (err) {
      console.error("Error fetching filtered products:", err);
    }
  };

  // Watch for URL change (category)
  useEffect(() => {
    const selected = new URLSearchParams(location.search).get("category") || "";
    setCategory(selected);
    fetchTopSales();

    if (selected) {
      fetchCategoryProducts(selected);
    } else {
      setFilteredProducts([]);
    }
  }, [location.search]);

  const applyCategory = (cat) => {
    const params = new URLSearchParams();
    params.set("category", cat);
    navigate(`/home/category?${params.toString()}`);
  };

  const reviews = [
    {
      name: "Momin",
      text: "Great service and fast delivery!",
      avatar: "https://i.pravatar.cc/100?img=1",
    },
    {
      name: "Hamza",
      text: "Top-notch quality, loved it!",
      avatar: "https://i.pravatar.cc/100?img=2",
    },
    {
      name: "Ali",
      text: "Highly recommend their store.",
      avatar: "https://i.pravatar.cc/100?img=3",
    },
  ];

  const services = [
    { icon: "🚚", title: "Free Shipping" },
    { icon: "💳", title: "Secure Payment" },
    { icon: "↩️", title: "Easy Returns" },
  ];

  const [reviewIndex, setReviewIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setReviewIndex((prev) => (prev + 1) % reviews.length);
        setFade(true);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
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
      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center min-h-[70vh] p-8 text-white bg-center bg-cover transition duration-500 group"
        style={{ backgroundImage: "url('/images/hero.avif')" }}
      >
        <div className="absolute inset-0 transition bg-black/60 group-hover:bg-black/30" />
        <div className="relative z-10 max-w-2xl space-y-4 text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">
            Upgrade Your Style Today
          </h1>
          <p className="text-lg text-gray-200">
            Discover top deals on our most popular products.
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-5 py-2 font-semibold text-black transition bg-white rounded hover:scale-105">
              Shop Now
            </button>
            <button className="px-5 py-2 font-semibold text-white transition border border-white rounded hover:bg-white hover:text-black">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Top Sales */}
      <section className="px-6 py-12 bg-white">
        <h2 className="mb-6 text-3xl font-semibold text-center">
          🔥 Top Sales
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
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

              <h3 className="text-lg font-medium">{item.productName}</h3>
              <p className="text-gray-600">${item.productPrice}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 py-12 bg-gray-50">
        <h2 className="mb-6 text-3xl font-semibold text-center">
          🗂️ Categories
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat, i) => (
            <button
              key={i}
              className={`px-4 py-2 font-medium border rounded transition hover:bg-black hover:text-white ${
                cat === category ? "bg-black text-white" : ""
              }`}
              onClick={() => applyCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredProducts.length > 0 && (
          <div className="grid gap-6 mt-8 md:grid-cols-3">
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

      {/* Services */}
      <section className="px-6 py-12 bg-white">
        <h2 className="mb-6 text-3xl font-semibold text-center">
          💼 What We Offer
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, i) => (
            <div
              key={i}
              className="p-6 text-center transition transform rounded-lg bg-gray-50 hover:shadow-lg hover:scale-105"
            >
              <div className="mb-2 text-5xl">{service.icon}</div>
              <h3 className="text-lg font-medium">{service.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="px-6 py-12 bg-gray-100">
        <h2 className="mb-6 text-3xl font-semibold text-center">
          💬 Customer Reviews
        </h2>
        <div className="relative max-w-xl p-6 mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
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
                <div className="text-yellow-400">★★★★★</div>
              </div>
            </div>
            <div className="relative px-2 text-center text-gray-600">
              <Quote className="mx-auto mb-2 opacity-30" size={36} />
              <p className="italic">"{reviews[reviewIndex].text}"</p>
            </div>
          </div>
          <div className="absolute left-0 transform -translate-y-1/2 top-1/2">
            <button
              onClick={prevReview}
              className="p-2 text-gray-600 transition hover:text-black"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          <div className="absolute right-0 transform -translate-y-1/2 top-1/2">
            <button
              onClick={nextReview}
              className="p-2 text-gray-600 transition hover:text-black"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
