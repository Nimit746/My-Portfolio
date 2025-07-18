/* eslint-disable no-unused-vars */
import React, { useRef } from 'react'
import Footer from '../Components/Footer';
import { Download } from "lucide-react";

const Resume = () => {
  const downloadresume = () => {
    const link = document.createElement("a");
    link.href = "../src/assets/Docs/CV.pdf";
    link.download = "Nimit_Gupta_Resume.pdf"; // filename when downloaded
    link.click();
  };




  return (
    <main className="min-h-[97vh] selection:bg-cyan-200 bg-[url('../src/assets/Background/bg2.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="pt-15 min-h-[97vh] flex flex-col justify-start items-center">
        <img
          src="../src/assets/Images/CV.png"
          alt=""
          className="w-[60%] h-[70%] mb-10 md:w-[30vw] md:h-[80vh] rounded-2xl"
        />
        <button className="bg-cyan-200 text-black px-5 py-2 rounded-md font-bold mb-30 cursor-pointer hover:scale-110 flex gap-3" onClick={downloadresume}>
          <p>Download Resume</p> <Download />
        </button>
      </div>
      <Footer resume={true} />
    </main>
  );
}

export default Resume
