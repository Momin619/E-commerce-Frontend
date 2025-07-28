import { Player } from "@lottiefiles/react-lottie-player";

function LottieFeedback({ type }) {
  let animationUrl = "";
  let content = "";

  if (type === "cart") {
    animationUrl = "/animations/cart.json";
    content = "Product added to cart successfully!";
  }
  if (type === "favourite") {
    animationUrl = "/animations/Heart Filled.json";
    content = "Product added to favourites successfully!";
  }
  if (type === "signup") {
    animationUrl = "/animations/success.json";
    content = "Account created successfully!";
  }
  if (type === "login") {
    animationUrl = "/animations/success.json";
    content = "Login successful!";
  }
  if (type === "remove-favourite") {
    animationUrl = "/animations/exploding heart.json";
    content = "Removed from favourites successfully!";
  }

  if (!animationUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm">
      <Player
        autoplay
        keepLastFrame
        loop={false}
        src={animationUrl}
        style={{ width: 200, height: 200 }}
      />
      <p className="mt-0 text-2xl font-semibold text-center text-gray-800">
        {content}
      </p>
    </div>
  );
}

export default LottieFeedback;
