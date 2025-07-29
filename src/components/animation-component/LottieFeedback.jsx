import { Player } from "@lottiefiles/react-lottie-player";

function LottieFeedback({ type, width = 200, height = 200, loop = false }) {
  // Logic separated into a function
  const animationFilter = (type) => {
    switch (type) {
      case "cart":
        return {
          animationUrl: "/animations/cart.json",
          content: "Product added to cart successfully!",
          scale: 1.2,
        };
      case "favourite":
        return {
          animationUrl: "/animations/heart-filled.json",
          content: "Product added to favourites successfully!",
          scale: 0.8,
        };
      case "signup":
        return {
          animationUrl: "/animations/success.json",
          content: "Account created successfully!",
          scale: 1.2,
        };
      case "login":
        return {
          animationUrl: "/animations/success.json",
          content: "Login successful!",
          scale: 1.2,
        };
      case "remove-favourite":
        return {
          animationUrl: "/animations/heart-burst.json",
          content: "Removed from favourites successfully!",
          scale: 3, // Bigger because it's too small
        };
      case "payment-success":
        return {
          animationUrl: "/animations/payment-successful.json",
          // content: "Payment successful! Thank you for your order.",
          scale: 1.5,
        };
      case "payment-failed":
        return {
          animationUrl: "/animations/payment-failed.json",
          content: "Payment failed. Please try again.",
          scale: 1.2,
        };
      case "remove-from-cart":
        return {
          animationUrl: "/animations/remove-from-cart.json",
          content: "Product removed from cart successfully!",
          scale: 1,
        };
      case "empty-cart":
        return {
          animationUrl: "/animations/empty-cart.json",

          scale: 1,
        };
      case "404-error":
        return {
          animationUrl: "/animations/404-error.json",

          scale: 1,
        };

      default:
        return {
          animationUrl: "",
          content: "",
          scale: 1,
        };
    }
  };

  // Call the filter function to get animation and content
  const { animationUrl, content, scale } = animationFilter(type);
  console.log("Animation URL:", animationUrl);
  console.log("Content:", content);
  // If no animationUrl found, render nothing
  if (!animationUrl) return null;

  return (
    <div className="fixed flex items-center justify-center px-4">
      <div className="flex flex-col items-center justify-center w-full max-w-md text-center">
        {/* Fixed-size box */}
        <div
          className="relative flex items-center justify-center w-full overflow-hidden"
          style={{
            width: "100%",
            maxWidth: `${width}px`,
            height: `${height}px`,
          }}
        >
          {/* Scaling wrapper (only changes visual size, not layout box) */}
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Player
              autoplay
              loop={loop}
              keepLastFrame
              src={animationUrl}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        </div>

        {/* Content */}
        {content ? (
          <p className="px-2 mt-4 text-xl font-semibold text-gray-800 sm:text-2xl">
            {content}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default LottieFeedback;
