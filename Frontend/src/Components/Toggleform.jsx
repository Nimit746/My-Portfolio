// import { useState } from "react";
// import { X, Plus, Minus } from "lucide-react";

// const ToggleFormModal = ({ onFormSubmit }) => {
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     image: "",
//     githubLink: "",
//     liveLink: "",
//     tech: [""],
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setFormData((prev) => ({ ...prev, image: reader.result }));
//     };
//     reader.readAsDataURL(file);
//   };

//   // Handle technology array changes
//   const handleTechChange = (index, value) => {
//     const newTech = [...formData.tech];
//     newTech[index] = value;
//     setFormData((prev) => ({ ...prev, tech: newTech }));
//   };

//   const addTechField = () => {
//     setFormData((prev) => ({ ...prev, tech: [...prev.tech, ""] }));
//   };

//   const removeTechField = (index) => {
//     if (formData.tech.length > 1) {
//       const newTech = formData.tech.filter((_, i) => i !== index);
//       setFormData((prev) => ({ ...prev, tech: newTech }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Filter out empty tech fields
//     const filteredTech = formData.tech.filter((tech) => tech.trim() !== "");

//     const projectData = {
//       ...formData,
//       tech: filteredTech,
//     };

//     onFormSubmit(projectData);
//     setFormData({
//       title: "",
//       description: "",
//       image: "",
//       githubLink: "",
//       liveLink: "",
//       tech: [""],
//     });
//     setShowForm(false);
//   };

//   return (
//     <>
//       <button
//         onClick={() => setShowForm(true)}
//         className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
//       >
//         Add Project
//       </button>

//       {showForm && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
//           <div className="relative bg-white rounded-xl shadow-lg p-8 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
//             <button
//               onClick={() => setShowForm(false)}
//               className="absolute top-3 right-3 text-gray-500 hover:text-red-500 cursor-pointer"
//             >
//               <X size={20} />
//             </button>

//             <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//               <h2 className="text-2xl font-bold mb-2 text-center">
//                 Add Project
//               </h2>

//               {/* Title */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Project Title *
//                 </label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                   placeholder="Enter project title"
//                   required
//                   className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>

//               {/* Description */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Description *
//                 </label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   placeholder="Describe your project"
//                   required
//                   rows="3"
//                   className="w-full border border-gray-300 p-2 rounded resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>

//               {/* GitHub Link */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   GitHub Repository Link
//                 </label>
//                 <input
//                   type="url"
//                   name="githubLink"
//                   value={formData.githubLink}
//                   onChange={handleChange}
//                   placeholder="https://github.com/username/repository"
//                   className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>

//               {/* Live Demo Link */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Live Demo Link
//                 </label>
//                 <input
//                   type="url"
//                   name="liveLink"
//                   value={formData.liveLink}
//                   onChange={handleChange}
//                   placeholder="https://your-project-demo.com"
//                   className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>

//               {/* Technologies */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Technologies Used
//                 </label>
//                 {formData.tech.map((tech, index) => (
//                   <div key={index} className="flex gap-2 mb-2">
//                     <input
//                       type="text"
//                       value={tech}
//                       onChange={(e) => handleTechChange(index, e.target.value)}
//                       placeholder="e.g., React, Node.js, MongoDB"
//                       className="flex-1 border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                     {formData.tech.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => removeTechField(index)}
//                         className="p-2 text-red-500 hover:bg-red-50 rounded"
//                       >
//                         <Minus size={16} />
//                       </button>
//                     )}
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={addTechField}
//                   className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
//                 >
//                   <Plus size={16} />
//                   Add Technology
//                 </button>
//               </div>

//               {/* Image Upload */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Project Image
//                 </label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 {formData.image && (
//                   <img
//                     src={formData.image}
//                     alt="Preview"
//                     className="w-full rounded-lg border mt-2 h-40 object-cover"
//                   />
//                 )}
//               </div>

//               <button
//                 type="submit"
//                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition font-bold mt-4"
//               >
//                 Create Project
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ToggleFormModal;




import { useState, useEffect } from "react";
import { X, Plus, Minus } from "lucide-react";

const ToggleFormModal = ({ onFormSubmit, projectToEdit = null }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    githubLink: "",
    liveLink: "",
    tech: [""],
  });

  // If projectToEdit is provided, populate the form with its data
  useEffect(() => {
    if (projectToEdit) {
      setFormData({
        ...projectToEdit,
        tech: projectToEdit.tech.length > 0 ? projectToEdit.tech : [""],
      });
      setShowForm(true);
    }
  }, [projectToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Handle technology array changes
  const handleTechChange = (index, value) => {
    const newTech = [...formData.tech];
    newTech[index] = value;
    setFormData((prev) => ({ ...prev, tech: newTech }));
  };

  const addTechField = () => {
    setFormData((prev) => ({ ...prev, tech: [...prev.tech, ""] }));
  };

  const removeTechField = (index) => {
    if (formData.tech.length > 1) {
      const newTech = formData.tech.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, tech: newTech }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Filter out empty tech fields
    const filteredTech = formData.tech.filter((tech) => tech.trim() !== "");

    const projectData = {
      ...formData,
      tech: filteredTech,
    };

    onFormSubmit(projectData);
    setFormData({
      title: "",
      description: "",
      image: "",
      githubLink: "",
      liveLink: "",
      tech: [""],
    });
    setShowForm(false);
  };

  return (
    <>
      <button
        onClick={() => setShowForm(true)}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
      >
        {projectToEdit ? "Edit Project" : "Add Project"}
      </button>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="relative bg-white rounded-xl shadow-lg p-8 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 cursor-pointer"
            >
              <X size={20} />
            </button>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold mb-2 text-center">
                {projectToEdit ? "Edit Project" : "Add Project"}
              </h2>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter project title"
                  required
                  className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your project"
                  required
                  rows="3"
                  className="w-full border border-gray-300 p-2 rounded resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* GitHub Link */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GitHub Repository Link
                </label>
                <input
                  type="url"
                  name="githubLink"
                  value={formData.githubLink}
                  onChange={handleChange}
                  placeholder="https://github.com/username/repository"
                  className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Live Demo Link */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Live Demo Link
                </label>
                <input
                  type="url"
                  name="liveLink"
                  value={formData.liveLink}
                  onChange={handleChange}
                  placeholder="https://your-project-demo.com"
                  className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Technologies Used
                </label>
                {formData.tech.map((tech, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={tech}
                      onChange={(e) => handleTechChange(index, e.target.value)}
                      placeholder="e.g., React, Node.js, MongoDB"
                      className="flex-1 border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {formData.tech.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTechField(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded"
                      >
                        <Minus size={16} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addTechField}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <Plus size={16} />
                  Add Technology
                </button>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full rounded-lg border mt-2 h-40 object-cover"
                  />
                )}
              </div>

              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition font-bold mt-4"
              >
                {projectToEdit ? "Update Project" : "Create Project"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ToggleFormModal;