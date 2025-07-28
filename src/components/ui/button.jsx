// src/components/ui/button.jsx
import React from "react";

export const Button = ({ children, className = "", ...props }) => (
  <button
    className={`px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 transition-all disabled:opacity-50 ${className}`}
    {...props}
  >
    {children}
  </button>
);
