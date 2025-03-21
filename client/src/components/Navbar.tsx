import { useState, useEffect, useRef } from "react";
import { Menu, X, User, Heart } from "lucide-react";
import "../styles/Navbar.css";
import { NavLink, Link } from "react-router";
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleCloseMenu = () => {
    setIsOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };


    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`bg-gradient-to-r from-[#210036] via-[#7038ed] to-[#210036] fixed w-full 
      ${isScrolled ? "top-0" : "top-8"} z-50 p-4 border-b border-gray-400 text-white 
      transition-all duration-300 shadow-sm`}
    >
      <div className="container flex justify-between items-center">
        {/* Left Section - Logo */}
        <img src="/img/EmeyLogo.webp" alt="Emey's Store logo" className={`absolute md:left-1/2 left-0 translate-x-0 md:-translate-x-1/2 ${isScrolled || isOpen ? "h-14" : "h-28"} transition-all duration-300`} style={{ zIndex: "2" }} />

        {/* Center Section - Navigation Links (Hidden on Mobile) */}
        <div className="hidden md:flex space-x-6 font-medium">
          <NavLink to="/" className={({ isActive }) => `${isActive ? "active-link" : ""} hover:text-gray-400 transition`}>HOME</NavLink>

          <NavLink to="/about" className={({ isActive }) => `${isActive ? "active-link" : ""} hover:text-gray-400 transition`}>ABOUT</NavLink>

          <NavLink to="/shop" className={({ isActive }) => `${isActive ? "active-link" : ""} hover:text-gray-400 transition`}>SHOP</NavLink>

          <NavLink to="/contact" className={({ isActive }) => `${isActive ? "active-link" : ""} hover:text-gray-400 transition`}>CONTACT</NavLink>
        </div>


        {/* Right Section - Icons */}
        <div className="flex items-center space-x-4 ml-auto">
          <Link to="/cart">
            <Badge badgeContent={0} color="primary">
              <ShoppingCartOutlinedIcon fontSize="medium" className="cursor-pointer hover:text-gray-400" />
            </Badge>
          </Link>
          <User className="w-6 h-6 text-white cursor-pointer hover:text-gray-400" />
          <Heart className="w-6 h-6 text-white cursor-pointer hover:text-gray-400" />
          {/* Hamburger Menu Button (Mobile) */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>

      <div
        ref={menuRef}
        className={`md:hidden shadow-md border-b border-gray-300 text-white bg-gradient-to-r from-[#210036] via-[#7038ed] to-[#210036]
        absolute right-0 top-14 w-full flex flex-col space-y-4 p-4 
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <NavLink to="/" className={({ isActive }) => `${isActive ? "active-link" : ""} hover:text-gray-600 transition`} onClick={handleCloseMenu}>HOME</NavLink>

        <NavLink to="/about" className={({ isActive }) => `${isActive ? "active-link" : ""} hover:text-gray-600 transition`} onClick={handleCloseMenu}>ABOUT</NavLink>

        <NavLink to="/shop" className={({ isActive }) => `${isActive ? "active-link" : ""} hover:text-gray-600 transition`} onClick={handleCloseMenu}>SHOP</NavLink>

        <NavLink to="/contact" className={({ isActive }) => `${isActive ? "active-link" : ""} hover:text-gray-600 transition`} onClick={handleCloseMenu}>CONTACT</NavLink>
      </div>

    </nav>
  );
}
