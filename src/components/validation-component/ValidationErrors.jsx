import React from "react";

function ValidationErrors({ errors }) {
  if (!errors || errors.length === 0) return null;

  return (
    <div className="w-full max-w-md mx-auto mt-2 mb-4">
      <ul className="bg-red-100 border border-red-400 text-red-700 text-sm rounded px-4 py-3 space-y-1">
        {errors.map((error, index) => (
          <li key={index} className="list-disc list-inside">
            {error}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ValidationErrors;
