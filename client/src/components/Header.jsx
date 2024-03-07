import React from "react";
import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar>
      <Link to="/">
        <span className="px-2 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Jitendra
        </span>
        Blog
      </Link>
    </Navbar>
  );
};

export default Header;
