import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [openNav, setOpenNav] = useState(false);

  return (
    <header className="sticky top-0 left-0 w-full h-[50px] flex justify-between items-center px-2 bg-[#0A061B]/75 backdrop-blur-sm">
      <Link to="/admin/home">
        <img src={Logo} alt="Logo" />
      </Link>

      <nav className="lg:flex hidden">
        <ul className="flex justify-center items-center gap-10">
          <li className="transform transition-all easy-in-out duration-200 hover:text-[#5E43D5] cursor-pointer">
            <Link to="#skills">Skills</Link>
          </li>

          <li className="transform transition-all easy-in-out duration-200 hover:text-[#5E43D5] cursor-pointer">
            <Link to="#projects">Projects</Link>
          </li>

          <li className="transform transition-all easy-in-out duration-200 hover:text-[#5E43D5] cursor-pointer">
            <Link to="#contacts">Contacts</Link>
          </li>
        </ul>
      </nav>

      {user && (
        <div className="flex justify-center items-center gap-3">
          <strong className="text-right">Logged in as {user.email.slice(0, 6)}</strong>
          <button
            onClick={() => {
              logout();
              navigate("/");
              location.reload();
            }}
            className="sm:flex hidden border border-[#5E43D5] py-1 px-5 rounded-md text-[#5E43D5] transform transition-all easy-in-out duration-200 hover:bg-[#5E43D5] hover:text-[#fff] cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
