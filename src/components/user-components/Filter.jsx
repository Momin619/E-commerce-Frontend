import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const CATEGORIES = [
  "",
  "Electronics",
  "Clothing",
  "Food",
  "Accessories",
  "Other",
];

function Filter() {
  const navigate = useNavigate();
  const location = useLocation();

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [search, setSearch] = useState("");
  const [inStock, setInStock] = useState(false);
  const [sort, setSort] = useState("");
  const [productCategory, setProductCategory] = useState("");
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setMinPrice(Number(params.get("minPrice")) || 0);
    setMaxPrice(Number(params.get("maxPrice")) || 1000); // ✅ fixed
    setSearch(params.get("search") || "");
    setInStock(params.get("inStock") === "true");
    setSort(params.get("sort") || "");
    setProductCategory(params.get("category") || "");
  }, [location.search]);

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (inStock) params.set("inStock", "true");
    if (sort) params.set("sort", sort);
    if (productCategory) params.set("category", productCategory); // ✅ changed

    navigate(`/products?${params.toString()}`);
  };

  const resetFilters = () => {
    setMinPrice(0);
    setMaxPrice(1000);
    setSearch("");
    setInStock(false);
    setSort("");
    setProductCategory("");
    navigate("/products");
  };

  return (
    <div className="p-6 bg-white rounded-2xl w-full lg:w-[260px] shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-center text-gray-800">
        Filters
      </h2>

      {/* Search */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Search</label>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Product name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Category Select */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Category</label>
        <select
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat || "All Categories"}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">
          Min Price: ${minPrice}
        </label>
        <input
          type="range"
          min={0}
          max={10000}
          step={10}
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">
          Max Price: ${maxPrice}
        </label>
        <input
          type="range"
          min={0}
          max={10000}
          step={10}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* In Stock */}
      <div className="mb-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
            className="w-4 h-4"
          />
          Only show in-stock
        </label>
      </div>

      {/* Sort */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Sort by Price</label>
        <div className="flex flex-col gap-2 text-sm">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="sort"
              value="asc"
              checked={sort === "asc"}
              onChange={(e) => setSort(e.target.value)}
            />
            Low to High
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="sort"
              value="desc"
              checked={sort === "desc"}
              onChange={(e) => setSort(e.target.value)}
            />
            High to Low
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3 mt-6">
        <button
          onClick={applyFilters}
          className="w-full py-2 text-white bg-blue-600 rounded-md button hover:bg-blue-700"
        >
          Apply Filters
        </button>
        <button
          onClick={resetFilters}
          className="w-full py-2 text-sm bg-gray-200 rounded-md button hover:bg-gray-300"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}

export default Filter;
