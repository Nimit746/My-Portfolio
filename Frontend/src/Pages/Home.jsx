import React from "react";
import { useProjects } from "../Components/context/ProjectContext";
import Card from "../Components/Card";
import { Link } from "react-router-dom";
import slugify from "slugify";

const Home = (props) => {
  const { visibleProjects } = useProjects();

  return (
    <main className="min-h-[97vh] w-full p-5 bg-[url('../src/assets/Background/bg.jpg')] bg-cover bg-center bg-no-repeat" style={{ padding: props.hp }}>
      <Card
        cw="80vw"
        ch="25vh"
        cbg="transparent"
        name="Nimit Gupta"
        namewid="29%"
        message="I’m a creative problem-solver blending code with design to build intuitive digital experiences."
        gap="20px"
        cflexwrap="wrap"
        message_width="70%"
        cmg="6% auto 0 auto"
        ctxt="left"
        namecol="white"
        nanimation="slidel 0.5s ease-in-out forwards"
        manimation="slideIn 0.5s ease-in-out forwards"
      />

      <div className="w-[85vw] mx-auto glass z-25 rounded-2xl p-6 mt-20">
        <h1 className="text-4xl font-bold text-white">Few Projects</h1>
        <div className="flex flex-wrap justify-around items-center gap-5 mt-10">
          {visibleProjects.slice(0, 3).map((p, idx) => (
            <Link key={idx} to={`/projects/${slugify(p.title, { lower: true })}`}>
              <Card
                cw="70%"
                ch="auto"
                name={p.title}
                message={p.description}
                image={p.image}
                image_width="100%"
                image_height="30px"
                glass="glass"
                cflex="column"
                namecol="black"
                mcol="black"
                canimation="slidel 0.5s ease-in-out forwards"
              />
            </Link>
          ))}
        </div>

        <div className="flex justify-end mt-10">
          <Link to="/projects" className="text-xl font-bold text-black hover:text-blue-400 list-none">
            <li>More Projects →</li>
          </Link>
        </div>
      </div>
    </main>

  );
};

export default Home;