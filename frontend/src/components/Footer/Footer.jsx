import { NavLink } from "react-router-dom";
import { handleScrollToTop } from "@/helper";
import darkLogo from "@/assets/images/dark-logo.png";
import { navData } from "@/data";

const creators = [
  { name: "Ahmed", github: "https://github.com/ahmed-abdelhameed1706" },
  { name: "Mahmoud", github: "https://github.com/MahmoudEasa" },
  { name: "Ayoub", github: "https://github.com/ElGaharbiAyoub" },
  { name: "Abdulrahman", github: "https://github.com/alidrisy" },
];

const Footer = () => {
  return (
    <footer className="bg-gray-600 relative py-4 px-7">
      <div className="absolute end-4 top-4 lg:-top-3/4">
        <NavLink
          className="inline-block rounded-full p-2 text-white shadow transition sm:p-3 lg:p-4 bg-gray-700 hover:opacity-80"
          to="#"
          onClick={handleScrollToTop}
        >
          <span className="sr-only">Back to top</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </NavLink>
      </div>

      <div className="lg:flex flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex justify-center lg:justify-start">
            <NavLink to="/">
              <img
                className="h-12 w-auto sm:h-14"
                src={darkLogo}
                alt="ijar logo"
              />{" "}
            </NavLink>
          </div>
        </div>
        <p className="mt-2 text-center text-sm lg:text-center text-gray-400">
          Copyright &copy; 2024.
          <br />
          Created By{" "}
          {creators.map((creator, index) => (
            <span key={index}>
              <a
                href={creator.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:underline"
              >
                {creator.name}
              </a>
              {index < creators.length - 1 && ", "}
            </span>
          ))}
        </p>

        <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-4">
          {navData.map((item) => (
            <li key={item.name}>
              <NavLink
                className="transition text-white hover:text-white/75"
                to={item.href}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
