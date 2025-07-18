/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'

const Footer = (props) => {

  const [glass, setGlass] = useState(false)

  const ref = useRef(null)

  useEffect(() => {
    if (props.resume) {
      setGlass(true);
    } else {
      setGlass(false);
    }
  }, [props.resume]);

  
  return (
    <main className={` bottom-0 flex justify-center items-center font-medium text-xl bg-gray-500 h-[6vh] w-full p-7 selection:bg-cyan-200 ${glass ? 'glass' : ''} `} ref={ref}>
    <h1 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
      Copyright &copy; {new Date().getFullYear()} | Nimit Gupta
      </h1>
  </main>
  );
}
export default Footer
