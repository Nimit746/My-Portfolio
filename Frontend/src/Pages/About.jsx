import React from 'react'
import '../app.css'

const About = () => {
  return (
    <section className="min-h-screen px-8 py-20 flex flex-col justify-start items-center text-gray-900 text-center selection:bg-cyan-200 gradient">
      <h2
        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6 mt-10"
        style={{
          animation: "slideIn 0.5s ease-in-out forwards",
        }}
      >
        About Me
      </h2>

      <p
        className="max-w-3xl text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl leading-relaxed text-left md:text-center"
        style={{
          animation: "slideIn 1s ease-in-out forwards",
        }}
      >
        Hi, I'm{" "}
        <span className="font-semibold text-indigo-600">Nimit Gupta</span>, a
        passionate full-stack developer and tech enthusiast with a drive to
        build intuitive and impactful digital experiences.
      </p>

      <p
        className="mt-4 max-w-3xl text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl leading-relaxed text-left md:text-center"
        style={{
          animation: "slideIn 1.5s ease-in-out forwards",
        }}
      >
        I specialize in building clean, scalable web applications using modern
        tools like{" "}
        <span className="font-semibold">React, Next.js, Node.js</span>, and
        more. I enjoy turning creative ideas into live projects that solve real
        problems.
      </p>

      <p
        className="mt-4 max-w-3xl text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl leading-relaxed text-left md:text-center"
        style={{
          animation: "slideIn 2s ease-in-out forwards",
        }}
      >
        My mission is to keep learning, collaborate with great minds, and
        contribute to projects that make a difference. This portfolio is a
        glimpse into my journey — and it's only just getting started.
      </p>
    </section>
  );
}

export default About
