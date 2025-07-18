// import { createContext, useContext, useState } from "react";
// import slugify from "slugify";

// const ProjectContext = createContext();

// // Updated default projects with GitHub links and technologies
// const defaultProjects = [];

// export const ProjectProvider = ({ children }) => {
//   const [projects, setProjects] = useState(defaultProjects);

//   const addProject = (project) => {
//     setProjects((prev) => [...prev, project]);
//   };

//   const getProjectBySlug = (slug) => {
//     console.log("Looking for slug:", slug);
//     console.log(
//       "Available projects:",
//       projects.map((p) => ({
//         title: p.title,
//         slug: slugify(p.title, { lower: true }),
//       }))
//     );
//     return projects.find((p) => slugify(p.title, { lower: true }) === slug);
//   };

//   return (
//     <ProjectContext.Provider value={{ projects, addProject, getProjectBySlug }}>
//       {children}
//     </ProjectContext.Provider>
//   );
// };

// export const useProjects = () => useContext(ProjectContext);


import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import slugify from "slugify";

const ProjectContext = createContext();

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authenticatedPassword, setAuthenticatedPassword] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      console.log("Fetching projects from backend...");
      const response = await axios.get(`${API_BASE_URL}/projects`);
      console.log("Projects fetched:", response.data);
      setProjects(response.data);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    }
  };

  const authenticate = async (password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/admin/login`, { password });
      if (response.data.success) {
        setIsAuthenticated(true);
        setAuthenticatedPassword(password);
        return true;
      }
    } catch (error) {
      console.error("Authentication failed", error);
    }
    setIsAuthenticated(false);
    setAuthenticatedPassword("");
    return false;
  };

  const addProject = async (project, password) => {
    try {
      console.log("addProject - sending password:", password);
      // Map liveLink to projectUrl to match backend field
      const projectData = { ...project, projectUrl: project.liveLink, password };
      const response = await axios.post(`${API_BASE_URL}/admin/projects`, projectData);
      setProjects((prev) => [...prev, response.data]);
      return true;
    } catch (error) {
      if (error.response) {
        console.error("Failed to add project - response error:", error.response.data, error.response.status);
      } else if (error.request) {
        console.error("Failed to add project - no response received:", error.request);
      } else {
        console.error("Failed to add project - error:", error.message);
      }
      return false;
    }
  };

  const editProject = async (id, updatedProject, password) => {
    try {
      console.log("editProject - sending password:", password);
      console.log("editProject - updatedProject data:", updatedProject);
      // Map liveLink to projectUrl to match backend field
      const projectData = { ...updatedProject, projectUrl: updatedProject.liveLink, password };
      const response = await axios.put(`${API_BASE_URL}/admin/projects/${id}`, projectData);
      setProjects((prev) => prev.map((p) => (p._id === id ? response.data : p)));
      return true;
    } catch (error) {
      console.error("Failed to edit project", error);
      return false;
    }
  };

  const deleteProject = async (id, password) => {
    try {
      await axios.delete(`${API_BASE_URL}/admin/projects/${id}`, { data: { password } });
      setProjects((prev) => prev.filter((p) => p._id !== id));
      return true;
    } catch (error) {
      console.error("Failed to delete project", error);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAuthenticatedPassword("");
  };

  const getProjectBySlug = (slug) => {
    return projects.find((p) => slugify(p.title, { lower: true }) === slug);
  };

  // Get visible projects (for non-admin users)
  const getVisibleProjects = () => {
    return projects.filter(project => project.isPublic || isAuthenticated);
  };

  const toggleVisibility = async (projectId, password) => {
    try {
      console.log("toggleVisibility called with projectId:", projectId, "password:", password);
      const project = projects.find((p) => p._id === projectId);
      if (!project) {
        console.error("Project not found for toggleVisibility:", projectId);
        return false;
      }
      const updatedProject = { ...project, isPublic: !project.isPublic, password };
      console.log("toggleVisibility - updatedProject:", updatedProject);
      // Send update request to backend with password
      const response = await axios.put(`${API_BASE_URL}/admin/projects/${projectId}`, updatedProject);
      console.log("toggleVisibility - response data:", response.data);
      // Update projects state with updated project
      setProjects((prev) =>
        prev.map((p) => (p._id === projectId ? response.data : p))
      );
      return true;
    } catch (error) {
      console.error("Failed to toggle project visibility", error);
      return false;
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        visibleProjects: getVisibleProjects(),
        addProject,
        editProject,
        deleteProject,
        getProjectBySlug,
        authenticate,
        logout,
        isAuthenticated,
        fetchProjects,
        toggleVisibility,
        password: authenticatedPassword,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);
