import React,{useState} from 'react'
import "../app.css";

const Contact = () => {
  const [Pname, setPname] = useState('');
  const [email, setEmail] = useState('');
  const [Pmessage, setPmessage] = useState('');



  const submit = () => {
    if (Pname.trim() === "" || email.trim() === "" || Pmessage.trim() === "") {
      alert("Please fill the complete form");
    } else {
      alert(`Form Submitted Successfully!`);
    }
  }




  
return (
  <main className="min-h-[97vh] bg-indigo-200 flex justify-center items-center flex-col selection:bg-cyan-200">
    <h1>Contact</h1>
    <form className="flex flex-col gap-4 w-[60%] md:w-[20%]">
      <input
        type="text"
        placeholder="Name"
        className="p-2 border-2 border-black"
        required
        onChange={(e) => setPname(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="p-2 border-2 border-black"
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <textarea
        placeholder="Message"
        className="p-2 border-2 border-black"
        required
        onChange={(e) => setPmessage(e.target.value)}
      />
      <button
        className="bg-indigo-500 text-white p-2 rounded-lg cursor-pointer"
        onClick={submit}
      >
        Submit
      </button>
    </form>
  </main>
);
}

export default Contact
