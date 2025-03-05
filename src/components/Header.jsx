import React from "react";
import logo from "../assets/logo.png";
import Search from "./Search";

const Header = () => {
  return (
    <header className="p-5  sticky top-0 bg-white">
      <div className="container mx-auto flex items-center px-2 justify-between">
        {/* Logo */}
        <div className="h-full">
          <img
            src={logo}
            width={170}
            height={60}
            alt="logo"
            className="hidden lg:block"
          />
          <img
            src={logo}
            width={120}
            height={60}
            alt="logo"
            className="lg:hidden"
          />
        </div>

        {/* Search */}
        <div>
            <Search/>
        </div>
        {/* Login and my cart */}
        <div>Login and my cart</div>
      </div>
    </header>
  );
};

export default Header;
