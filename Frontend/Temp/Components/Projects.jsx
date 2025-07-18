import React from 'react'
import Card from './Card'
import Toggleform from './Toggleform';


const Projects = (props) => {

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Custom Form submit logic here!");
  }


  return (
    <main
      className="bg-indigo-200 min-h-[97vh] w-full p-10 selection:bg-cyan-200"
      style={{
        padding: props.lp,
      }}
    >
      <div className="flex justify-between mt-17 flex-col md:flex-row transition-all ease-in-out duration-500">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-10 md:text-left text-center">
          My Projects
        </h1>
        <div className="flex gap-3 items-center md:flex-row flex-col ">
          <label className="text-md sm:text-lg md:text-xl lg:text-2xl font-bold">
            Add Projects:{" "}
          </label>

          <Toggleform
            buttonText="New"
            onSubmit={handleFormSubmit}
            initiallyOpen={false}
          />
        </div>
      </div>
    </main>
  );
}

export default Projects
