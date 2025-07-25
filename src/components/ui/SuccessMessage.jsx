import { useEffect, useState } from "react";

function SuccessMessage({ message, onClose = () => {}, duration = 3000 }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Start fade out before actual close
    const fadeOutTimer = setTimeout(() => setVisible(false), duration - 500); // leave 500ms for transition
    const removeTimer = setTimeout(() => onClose(), duration);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
    };
  }, [duration, onClose]);

  if (!message) return null;

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md px-4 py-2 rounded-lg shadow-lg z-50 text-center transition-all duration-500 ease-in-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
        bg-green-500 text-white`}
    >
      {message}
    </div>
  );
}

export default SuccessMessage;
