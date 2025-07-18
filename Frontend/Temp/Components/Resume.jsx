/* eslint-disable no-unused-vars */
import React,{useRef} from 'react'
import Footer from './Footer';
import { jsPDF } from 'jspdf';

const Resume = () => {


  const imgRef = useRef(null);
  const handleDownload = async () => {
    const img = imgRef.current;
    if (!img) return;

    const pdf = new jsPDF({
      orientation: 'potrait',
      unit: 'px',
      format: [img.naturalWidth, img.naturalHeight],
    });

    pdf.addImage(
      img.src,
      'JPEG',
      0,
      0,
      img.naturalWidth,
      img.naturalHeight
    );

    pdf.save('Resume.pdf');
  }



  return (
    <main className="min-h-[97vh] selection:bg-cyan-200 bg-[url('../src/assets/Background/bg2.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="pt-15 min-h-[97vh] flex flex-col justify-start items-center">
        <img
          src="../src/assets/Images/image.jpg"
          alt=""
          className="w-[60%] h-[70%] mb-10 md:w-[30vw] md:h-[80vh] rounded-2xl"
          ref={imgRef}
        />
        <button className="bg-cyan-200 text-black px-5 py-2 rounded-md font-bold mb-30 cursor-pointer hover:scale-110" onClick={handleDownload}>
          Download PDF
        </button>
      </div>
      <Footer resume={true}/>
    </main>
  );
}

export default Resume
