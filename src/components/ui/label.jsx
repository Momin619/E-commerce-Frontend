// src/components/ui/label.jsx
import React from "react";

export const Label = ({ htmlFor, children, className = "" }) => (
  <label
    htmlFor={htmlFor}
    className={`block mb-1 text-sm font-medium text-gray-700 ${className}`}
  >
    {children}
  </label>
);
