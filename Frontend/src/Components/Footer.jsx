/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { Mail } from 'lucide-react';



const Footer = (props) => {

  const [glass, setGlass] = useState(false)

  const ref = useRef(null)

  useEffect(() => {
    if (props.resume) {
      setGlass(true);
      // ref.current.scrollIntoView({ behavior: 'smooth' });  //This helps in scrolling the page to the place of footer by adding animation effect of scrolling
    } else {
      setGlass(false);
    }
  }, [props.resume]);


  return (
    <main
      className={`bottom-0 flex justify-around items-start gap-4 font-medium text-xl bg-gray-700 md:h-[6vh] w-full p-7 selection:bg-cyan-200 ${
        glass ? "glass" : ""
      } flex-col md:flex-row h-auto md:items-center `}
      ref={ref}
    >
      <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
        Copyright &copy; {new Date().getFullYear()} | Nimit Gupta
      </div>

      <div className="flex items-center gap-4 justify-center">
        <a href="https://github.com/Nimit746" target="_blank" rel="noreferrer">
          <FaGithub className="hover:text-black hover:bg-white rounded-full hover:scale-120 transition-all duration-150" />
        </a>

        <a
          href="https://www.linkedin.com/in/nimit-gupta-482734285"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin className="hover:text-blue-700 hover:scale-120 transition-all duration-150 hover:bg-white" />
        </a>

        <a
          href="https://instagram.com/your-profile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 hover:scale-110 transition-transform" />
        </a>
        <a
          href="mailto:guptanimit062@gmail.com"
          rel="noopener noreferrer"
        >
          <Mail size={20} className="hover:text-red-600 hover:bg-white hover:scale-120 transition-all duration-150"  />
        </a>
      </div>
    </main>
  );
}
export default Footer
