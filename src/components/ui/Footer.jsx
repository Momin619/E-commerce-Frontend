import {
  RiWhatsappFill,
  FaFacebookF,
  PiXLogoFill,
  AiFillInstagram,
} from "../../icons";

function Footer() {
  return (
    <div>
      <footer className="w-full px-4 py-8 text-black bg-gray-300 sm:px-6">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="flex flex-wrap justify-center gap-6 text-base">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-blue-500"
            >
              <FaFacebookF size={30} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-pink-500"
            >
              <AiFillInstagram size={30} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-blue-400"
            >
              <PiXLogoFill size={30} />
            </a>
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-blue-400"
            >
              <RiWhatsappFill size={30} />
            </a>
          </div>
          <p className="text-sm text-gray-400">
            © 2025 CartPlus. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
