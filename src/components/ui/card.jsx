// src/components/ui/card.jsx
import React from "react";

export const Card = ({
  image,
  title,
  description,
  price,
  onAction,
  actionLabel = "Buy Now",
}) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 max-w-sm">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-blue-600 font-bold text-lg">${price}</span>
          <button
            onClick={onAction}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-all"
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
