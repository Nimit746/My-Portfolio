/* eslint-disable no-unused-vars */
import About from "./Pages/About";
import Home from "./Pages/Home";
import Projects from "./Pages/Projects";
import Navbar from "./Components/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Resume from "./Pages/Resume";
import Footer from "./Components/Footer";
import Contact from "./Pages/Contact";
import TailwindDebugWatchdog from "./Components/TailwindDebugWatchdog";
import "./App.css";
import Projectdetail from "./Components/Projectdetail";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar hunder="underline" pos="fixed" />
          <Home />
          <Footer />
        </>
      ),
    },
    {
      path: "/projects",
      element: (
        <>
          <Navbar punder="underline" pos="fixed" navcolor="white"/>
          <Projects />
          <Footer />
        </>
      ),
    },
    {
      path: "/about",
      element: (
        <>
          <Navbar aunder="underline" pos="fixed" />
          <About />
          <Footer />
        </>
      ),
    },
    {
      path: "/resume",
      element: (
        <>
          <Navbar runder="underline" pos="fixed" navcolor="white" />
          <Resume />
        </>
      ),
    },
    {
      path: "/contacts",
      element: (
        <>
          <Navbar cunder="underline" pos="fixed" />
          <Contact />
          <Footer />
        </>
      ),
    },
    // Fixed: Changed :projectId to :slug to match what Projectdetail component expects
    {
      path: "/projects/:slug",
      element: (
        <>
          <Navbar runder="underline" pos="fixed" />
          <Projectdetail />
          <Footer />
        </>
      ),
    },
  ]);

  return (
    <>
      {/* <TailwindDebugWatchdog /> */}
      <RouterProvider router={router} />
    </>
  );
};

export default App;
