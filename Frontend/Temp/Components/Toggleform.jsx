/* eslint-disable no-unused-vars */
import { useState } from "react";
import { X } from "lucide-react";

const ToggleFormModal = ({ onFormSubmit }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(formData); // Pass data to App
    setFormData({ title: "", description: "", image: "" }); // Clear form
    setShowForm(false);
  };

  return (
    <>
      <button
        onClick={() => setShowForm(true)}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
      >
        Add Project
      </button>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 selection:bg-cyan-200">
          <div className="relative bg-white rounded-xl shadow-lg p-8 w-full max-w-md mx-4">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 cursor-pointer"
            >
              <X size={20} />
            </button>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold mb-2 text-center">
                Add Project
              </h2>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Project Title"
                required
                className="border border-gray-300 p-2 rounded"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Project Description"
                required
                className="border border-gray-300 p-2 rounded resize-none"
              />
              <input
                type="file"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Image URL"
                className="border border-gray-300 p-2 rounded"
              />

              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition cursor-pointer text-sm sm:text-md md:text-lg lg:text-xl font-bold"
                onClick={() => {
                  setShowForm(false);
                  alert("Form Submitted!");
                }}
              >
                Create Card
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ToggleFormModal;
