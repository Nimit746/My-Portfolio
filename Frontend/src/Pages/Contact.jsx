import React, { useState } from "react";
import "../app.css";

const Contact = () => {
  const [Pname, setPname] = useState("");
  const [email, setEmail] = useState("");
  const [Pmessage, setPmessage] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (Pname.trim() === "" || email.trim() === "" || Pmessage.trim() === "") {
      alert("Please fill the complete form");
    } else {
      alert("Form Submitted Successfully!");
    }
  };

  return (
    <main className="min-h-screen bg-indigo-200 flex justify-center items-center py-10 px-4 gradient">
      <div className="flex flex-col md:flex-row p-6 gap-10 w-full max-w-6xl items-center justify-center glass rounded-4xl mt-20 md:mt-0" style={{
        animation: "slideIn 1s ease-in-out"
      }}>
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="../src/assets/Images/Contact.jpg"
            alt="Contact"
            className="w-3/4 max-w-sm mix-blend-multiply rounded-4xl"
          />
        </div>
        {/* Form Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <h1 className="text-3xl font-semibold mb-4">Contact</h1>
          <form
            className="flex flex-col gap-4 w-full max-w-sm"
            onSubmit={submit}
          >
            <input
              type="text"
              placeholder="Name"
              className="p-2 border-2 border-black rounded"
              onChange={(e) => setPname(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="p-2 border-2 border-black rounded"
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              placeholder="Message"
              className="p-2 border-2 border-black rounded resize-none"
              rows={4}
              onChange={(e) => setPmessage(e.target.value)}
            />
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 transition-colors text-white p-2 rounded-lg cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Contact;
