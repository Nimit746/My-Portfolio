/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="w-full bg-indigo-500 text-black z-50 px-5 glass selection:bg-cyan-200 font-bold" style={{
      position: props.pos,
      color: props.navcolor,
    }}>
      <div className="flex justify-between items-center h-[7vh]">
        <h1 className="font-bold text-xl">PORTFOLIO</h1>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-4">
          <NavLinks props={props} />
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={toggleMenu}
        >
          ☰
        </button>
      </div>

      {/* Mobile Nav Links */}
      {isMenuOpen && (
        <ul className="md:hidden flex flex-col gap-2 py-2 text-white">
          <NavLinks props={props} />
        </ul>
      )}
    </nav>
  );
};

const NavLinks = ({ props}) => (
  <>
    <Link
      to="/"
      className="hover:text-sky-900 transition-all duration-200 hover:scale-110"
      style={{ textDecoration: props.hunder }}
    >
      <li>Home</li>
    </Link>
    <Link
      to="/about"
      className="hover:text-sky-900 transition-all duration-200 hover:scale-110"
      style={{ textDecoration: props.aunder }}
      onClick={props.toggleMenu}
    >
      <li>About</li>
    </Link>
    <Link
      to="/resume"
      className="hover:text-sky-900 transition-all duration-200 hover:scale-110"
      style={{ textDecoration: props.runder }}
      onClick={props.toggleMenu}
    >
      <li>Resume</li>
    </Link>
    <Link
      to="/projects"
      className="hover:text-sky-900 transition-all duration-200 hover:scale-110"
      style={{ textDecoration: props.punder }}
      onClick={props.toggleMenu}
    >
      <li>Projects</li>
    </Link>
    {/* <Link
      to="/contacts"
      className="hover:text-sky-900 transition-all duration-200 hover:scale-110"
      style={{ textDecoration: props.cunder }}
      onClick={props.toggleMenu}
    >
      <li>Contact Me</li>
    </Link> */}
  </>
);

export default Navbar;
