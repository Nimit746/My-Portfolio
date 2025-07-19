import React, { useState } from "react";
import { useProjects } from "../Components/context/ProjectContext";
import Toggleform from "../Components/Toggleform";
import Card from "../Components/Card";
import { Link } from "react-router-dom";
import slugify from "slugify";
import { Eye, EyeOff, Edit, Trash2, Lock, LogOut } from "lucide-react";

const Projects = (props) => {
  const {
    projects,
    visibleProjects,
    addProject,
    editProject,
    deleteProject,
    toggleVisibility,
    authenticate,
    logout,
    isAuthenticated,
    fetchProjects,
    authenticatedPassword
  } = useProjects();

  const [password, setPassword] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [error, setError] = useState("");
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const isValid = await authenticate(password);
      if (!isValid) {
        setError("Invalid password");
      } else {
        setError("");
        setShowPasswordModal(false);
        alert("Login successful");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setPassword("");
    setProjectToEdit(null);
  };

  const handleEditProject = (project) => {
    setProjectToEdit(project);
  };

  const handleFormSubmit = async (projectData) => {
    if (isLoading) return; // Prevent multiple submissions

    setIsLoading(true);

    try {
      // Ensure we have a password
      if (!password && !isAuthenticated) {
        alert("Please login first to manage projects");
        setIsLoading(false);
        return;
      }

      let success = false;

      if (projectToEdit) {
        // If we're editing an existing project
        console.log("Editing project:", projectToEdit._id, "with data:", projectData);
        success = await editProject(projectToEdit._id, projectData, password);

        if (success) {
          alert("Project updated successfully");
          setProjectToEdit(null);
        } else {
          alert("Failed to update project. Please check your credentials and try again.");
        }
      } else {
        // If we're adding a new project
        console.log("Adding new project with data:", projectData);
        success = await addProject(projectData, password);

        if (success) {
          alert("Project added successfully");
        } else {
          alert("Failed to add project. Please check your credentials and try again.");
        }
      }

      // Only refresh if the operation was successful
      if (success) {
        await fetchProjects();
      }

    } catch (error) {
      console.error("Error submitting project form:", error);
      const errorMessage = error.response?.data?.message || error.message || "An unexpected error occurred";
      alert(`Error: ${errorMessage}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };


  // Updated handleDeleteProject function in Projects.jsx
  const handleDeleteProject = async (id) => {
    console.log("handleDeleteProject called with ID:", id);

    if (isLoading) {
      console.log("handleDeleteProject - Already loading, preventing duplicate request");
      return;
    }

    // Validate inputs
    if (!id) {
      alert("Error: No project ID provided");
      return;
    }

    // Find the project to get its name for confirmation
    const projectToDelete = projects.find(p => p._id === id);
    const projectName = projectToDelete ? projectToDelete.title : "this project";

    // Confirm deletion
    const confirmMessage = `Are you sure you want to delete "${projectName}"?\n\nThis action cannot be undone.`;
    if (!window.confirm(confirmMessage)) {
      console.log("handleDeleteProject - User cancelled deletion");
      return;
    }

    setIsLoading(true);

    try {
      // Ensure we have authentication
      const passwordToUse = password || (isAuthenticated ? authenticatedPassword : null);

      if (!passwordToUse) {
        throw new Error("Please login first to delete projects");
      }

      console.log("handleDeleteProject - Attempting to delete project:", {
        id,
        projectName,
        hasPassword: !!passwordToUse
      });

      const success = await deleteProject(id, passwordToUse);

      if (success) {
        console.log("handleDeleteProject - Project deleted successfully");
        alert(`"${projectName}" has been deleted successfully`);

        // Refresh the projects list to ensure UI is in sync
        await fetchProjects();
      } else {
        throw new Error("Delete operation returned false");
      }
    } catch (error) {
      console.error("handleDeleteProject - Error:", error);

      let errorMessage = "Failed to delete project";

      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      alert(`Error deleting project: ${errorMessage}\n\nPlease try again or check your credentials.`);
    } finally {
      setIsLoading(false);
    }
  };
  const handleToggleVisibility = async (projectId) => {
    if (isLoading) return; // Prevent multiple toggles

    setIsLoading(true);

    try {
      if (!password && !isAuthenticated) {
        alert("Please login first to toggle visibility");
        setIsLoading(false);
        return;
      }

      console.log("Toggling visibility for project:", projectId);
      const success = await toggleVisibility(projectId, password);

      if (success) {
        await fetchProjects();
      } else {
        alert("Failed to toggle visibility. Please check your credentials and try again.");
      }
    } catch (error) {
      console.error("Error toggling visibility:", error);
      const errorMessage = error.response?.data?.message || error.message || "An unexpected error occurred";
      alert(`Error toggling visibility: ${errorMessage}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const projectsToDisplay = isAuthenticated ? projects : visibleProjects;

  return (
    <main
      className="bg-[url('../src/assets/Images/Project.jpg')] bg-cover bg-center bg-no-repeat min-h-[97vh] w-full p-10 "
      style={{ padding: props.lp }}
    >
      <div className="flex justify-between mt-17 flex-col md:flex-row">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-10 text-center md:text-left text-white">
          My Projects
        </h1>
        <div className="flex gap-3 items-center justify-center">
          {isAuthenticated ? (
            <div className="flex flex-col gap-2 items-center md:flex-row">
              <label className="text-xl font-bold text-white">
                Add Projects:
              </label>
              <Toggleform
                onFormSubmit={handleFormSubmit}
                projectToEdit={projectToEdit}
                isLoading={isLoading}
              />
              <button
                onClick={handleLogout}
                disabled={isLoading}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowPasswordModal(true)}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Lock size={16} />
              Admin Login
            </button>
          )}
        </div>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="bg-white rounded-lg p-6 flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span>Processing...</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
        {projectsToDisplay.map((project) => (
          <div key={project._id} className="relative group">
            <Link to={`/projects/${slugify(project.title, { lower: true })}`}>
              <Card
                cw="70%"
                ch="auto"
                name={project.title}
                message={project.description}
                image={project.image}
                image_width="100%"
                image_height="30px"
                glass="glass"
                cflex="column"
                canimation="slidel 0.5s ease-in-out forwards"
                namecol="white"
                mcol="white"
                projectUrl={project.projectUrl || project.liveLink}
              />
            </Link>

            {/* Admin Controls - Only visible when authenticated */}
            {isAuthenticated && (
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleToggleVisibility(project._id);
                  }}
                  disabled={isLoading}
                  className={`p-2 rounded-full ${project.isPublic ? "bg-green-500" : "bg-red-500"
                    } text-white hover:bg-opacity-80 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                  title={
                    project.isPublic
                      ? "Public - Click to make private"
                      : "Private - Click to make public"
                  }
                >
                  {project.isPublic ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleEditProject(project);
                  }}
                  disabled={isLoading}
                  className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Edit project"
                >
                  <Edit size={16} />
                </button>

                <button
                  onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation(); // Prevent event bubbling
                    await handleDeleteProject(project._id);
                  }}
                  disabled={isLoading}
                  className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Delete project"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md mx-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  disabled={isLoading}
                  className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setError("");
                  }}
                  disabled={isLoading}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Projects;