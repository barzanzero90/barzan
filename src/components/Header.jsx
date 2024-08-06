import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import Logo from "../assets/images/logo.png";
import { Link, useLocation } from "react-router-dom";
import { RiMenu3Fill } from "react-icons/ri";
import { CgClose } from "react-icons/cg";

export default function Header() {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const location = useLocation();

  if (
    location.pathname.includes("/admin") ||
    location.pathname.includes("/auth")
  ) {
    return null;
  }

  const handleScroll = () => setIsVisible(window.scrollY > 10);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="sticky top-0 left-0 w-full h-[50px] flex justify-between items-center px-2 bg-[#0A061B]/75 backdrop-blur-sm"
      style={{ zIndex: 999 }}
    >
      <button onClick={scrollToTop}>
        <img src={Logo} alt="Logo" className="h-[40px]" />
      </button>

      <nav className="hidden lg:flex">
        <ul className="flex justify-center items-center gap-12">
          <li className="transform transition-all easy-in-out duration-200 hover:text-[#5E43D5] cursor-pointer">
            <a href="#home">Home</a>
          </li>

          <li className="transform transition-all easy-in-out duration-200 hover:text-[#5E43D5] cursor-pointer">
            <a href="#about">About</a>
          </li>

          <li className="transform transition-all easy-in-out duration-200 hover:text-[#5E43D5] cursor-pointer">
            <a href="#skills">Skills</a>
          </li>

          <li className="transform transition-all easy-in-out duration-200 hover:text-[#5E43D5] cursor-pointer">
            <a href="#projects">Projects</a>
          </li>

          {user && (
            <li className="transform transition-all easy-in-out duration-200 hover:text-[#5E43D5] cursor-pointer">
              <Link to="/admin/home">Admin</Link>
            </li>
          )}
        </ul>
      </nav>

      {openNav && (
        <nav className="flex lg:hidden">
          <ul className="absolute top-12 left-2 w-full bg-[#0A061B]/75 backdrop-blur-md flex flex-col justify-start items-start gap-4">
            <li className="transform transition-all easy-in-out duration-200 hover:text-[#5E43D5] cursor-pointer">
              <a href="#home">Home</a>
            </li>

            <li className="transform transition-all easy-in-out duration-200 hover:text-[#5E43D5] cursor-pointer">
              <a href="#about">About</a>
            </li>

            <li className="transform transition-all easy-in-out duration-200 hover:text-[#5E43D5] cursor-pointer">
              <a href="#skills">Skills</a>
            </li>

            <li className="transform transition-all easy-in-out duration-200 hover:text-[#5E43D5] cursor-pointer">
              <a href="#projects">Projects</a>
            </li>

            {user && (
              <li className="transform transition-all easy-in-out duration-200 hover:text-[#5E43D5] cursor-pointer">
                <Link to="/admin/home">Admin</Link>
              </li>
            )}

            <li className="transform transition-all easy-in-out duration-200 hover:text-[#5E43D5] cursor-pointer">
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
      )}

      <div className="flex justify-center items-center gap-3">
        <a
          href="#contact"
          className="border border-[#5E43D5] py-1 px-5 rounded-md text-[#5E43D5] transform transition-all easy-in-out duration-200 hover:bg-[#5E43D5] hover:text-[#fff] cursor-pointer hidden lg:flex"
        >
          Contact
        </a>

        <button onClick={() => setOpenNav(!openNav)} className="flex lg:hidden">
          {openNav ? <CgClose size={22} /> : <RiMenu3Fill size={22} />}
        </button>
      </div>
    </header>
  );
}
