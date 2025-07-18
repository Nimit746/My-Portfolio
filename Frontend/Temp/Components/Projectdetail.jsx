/* eslint-disable no-unused-vars */
import React from "react";
import { useParams, Link } from "react-router-dom";

// 🔧 Mock project data (replace or import from your data file)
const projects = [
  {
    id: "project1",
    title: "Portfolio Website",
    description:
      "A personal portfolio built with React, Tailwind CSS, and React Router.",
    tech: ["React", "Tailwind", "Vite"],
    image: "../src/Assets/Background/bg.jpg",
  },
  {
    id: "project2",
    title: "E-Commerce App",
    description:
      "A full-stack MERN application with admin panel and payment integration.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    image: "../src/Assets/Background/bg.jpg",
  },
  // Add more projects here...
];

const Projectdetail = () => {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-3xl text-red-500 font-bold mb-4">
          Project Not Found
        </h1>
        <p className="text-gray-700 mb-6">
          The project you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/projects" className="text-indigo-600 underline">
          ← Go back to Projects
        </Link>
      </div>
    );
  }

  return (
    <main className=" bg-gray-50 px-6 py-16 text-gray-900 min-h-[87vh]">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-64 object-cover rounded-md mb-6 border"
        />

        <h2 className="text-4xl font-bold mb-4 text-indigo-600">
          {project.title}
        </h2>

        <p className="text-lg mb-4 leading-relaxed">{project.description}</p>

        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-2">
            Technologies Used:
          </h4>
          <ul className="flex flex-wrap gap-2">
            {project.tech.map((tech, index) => (
              <li
                key={index}
                className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <Link
          to="/projects"
          className="inline-block mt-4 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          ← Back to Projects
        </Link>
      </div>
    </main>
  );
};

export default Projectdetail;
