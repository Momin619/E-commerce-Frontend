// src/components/ui/select.jsx
import React from "react";

export const Select = ({ children, className = "", ...props }) => (
  <select
    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  >
    {children}
  </select>
);

export const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
);
