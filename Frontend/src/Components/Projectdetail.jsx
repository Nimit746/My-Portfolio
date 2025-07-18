import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useProjects } from "./context/ProjectContext";
import { Github, ExternalLink, ArrowLeft, Edit, Trash2, Eye, EyeOff } from "lucide-react";

const Projectdetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { getProjectBySlug, deleteProject, toggleVisibility, isAuthenticated, password } = useProjects();
  const project = getProjectBySlug(slug);

  console.log("Current slug:", slug);
  console.log("Found project:", project);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 pt-20">
        <h1 className="text-3xl text-red-500 font-bold mb-4">
          Project Not Found
        </h1>
        <p className="text-gray-700 mb-6">No such project exists.</p>
        <Link
          to="/projects"
          className="text-indigo-600 underline flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Go back to Projects
        </Link>
      </div>
    );
  }

  // Check if project is private and user is not authenticated
  if (!project.isPublic && !isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 pt-20">
        <h1 className="text-3xl text-red-500 font-bold mb-4">
          Private Project
        </h1>
        <p className="text-gray-700 mb-6">This project is set to private.</p>
        <Link
          to="/projects"
          className="text-indigo-600 underline flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Go back to Projects
        </Link>
      </div>
    );
  }

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${project.title}"?`)) {
      try {
        const success = await deleteProject(project._id, password);
        if (success) {
          alert("Project deleted successfully");
          navigate('/projects');
        } else {
          alert("Failed to delete project");
        }
      } catch (error) {
        console.error("Error deleting project", error);
        alert("An error occurred while deleting the project");
      }
    }
  };

  const handleEdit = () => {
    // Navigate to projects page with a query parameter to indicate which project to edit
    navigate(`/projects?edit=${project._id}`);
  };

  return (
    <main className="px-6 py-16 min-h-[97vh] pt-20 gradient">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Project Image */}
        {project.image && (
          <div className="w-full h-64 md:h-80 overflow-hidden relative">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            
            {/* Admin Controls */}
            {isAuthenticated && (
              <div className="absolute top-4 right-4 flex gap-2">
                <button 
                  onClick={() => toggleVisibility(project._id, password)}
                  className={`p-2 rounded-full ${project.isPublic ? 'bg-green-500' : 'bg-red-500'} text-white hover:bg-opacity-80`}
                  title={project.isPublic ? "Public - Click to make private" : "Private - Click to make public"}
                >
                  {project.isPublic ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                
                <button 
                  onClick={handleEdit}
                  className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
                  title="Edit project"
                >
                  <Edit size={16} />
                </button>
                
                <button 
                  onClick={handleDelete}
                  className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700"
                  title="Delete project"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </div>
        )}

        <div className="p-8">
          {/* Project Title */}
          <h1 className="text-4xl font-bold mb-4 text-indigo-600">
            {project.title}
          </h1>

          {/* Project Description */}
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            {project.description}
          </p>

          {/* Technologies Used */}
          {project.tech && project.tech.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-indigo-200 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Project Links */}
          <div className="flex flex-wrap gap-4 mb-8">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Github size={20} />
                View Code
              </a>
            )}

            {(project.projectUrl || project.liveLink) && (
              <a
                href={project.projectUrl || project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <ExternalLink size={20} />
                Live Demo
              </a>
            )}
          </div>

          {/* Back Button */}
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Projectdetail;
