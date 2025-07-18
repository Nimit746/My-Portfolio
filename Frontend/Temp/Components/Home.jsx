/* eslint-disable no-unused-vars */
import React from 'react'
import Card from './Card';
import { Link } from 'react-router-dom';

const Home = (props) => {
  return (
    <main
      className="h-full w-full p-5 bg-[url('../src/assets/Background/bg.jpg')] bg-cover bg-center bg-no-repeat selection:bg-cyan-200"
      style={{
        padding: props.hp,
      }}
    >
      <Card
        cw="80vw"
        ch="25vh"
        cbg="transparent"
        name="Nimit Gupta"
        namewid="29%"
        message="
        I’m a creative problem-solver blending code with design to build intuitive digital experiences. Currently exploring the edges of frontend tech, AI, and real-world impact.
      "
        gap="20px"
        cflexwrap="wrap"
        message_width="70%"
        manimation="slideIn 0.5s ease-in-out forwards"
        nanimation="slideIn 0.5s ease-in-out "
        cmg="6% auto 0 auto"
        ctxt="left"
        namecol="white"
      />

      <div className="flex gap-30 mt-30">
        <div className="w-[85vw] mx-auto glass z-25 rounded-2xl p-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-start text-white">
            Few Projects
          </h1>
          <div className="flex justify-around items-center gap-5 flex-wrap mt-20">
            <div className="md:w-[90%] md:mt-10 lg:mt-20 mt-10">
              <Link to="/projects">
                <Card
                  cw="70%"
                  ch="auto"
                  nmg="30px auto"
                  ntxt="left"
                  name="Project 1"
                  message="This is a project about the Todo list made on React.Js"
                  cflex="column"
                  gap="0"
                  namecol="black"
                  canimation="slidel 0.5s ease-in-out forwards"
                  glass="glass"
                  image="https://imageio.forbes.com/specials-images/imageserve/5d3703e2f1176b00089761a6/2020-Chevrolet-Corvette-Stingray/0x0.jpg?crop=4560,2565,x836,y799,safe&height=399&width=711&fit=bounds"
                  image_width="100%"
                  image_height="30px"
                  mcol="black"
                />
              </Link>
            </div>

            <div className="md:w-[90%] md:mt-10 lg:mt-20 mt-10">
              <Link to="/projects">
                <Card
                  cw="70%"
                  ch="auto"
                  nmg="30px auto"
                  ntxt="left"
                  name="Project 2"
                  message="Project on Spotify Clone"
                  cflex="column"
                  gap="0"
                  namecol="black"
                  canimation="slidel 0.5s ease-in-out forwards"
                  glass="glass"
                  image="https://imageio.forbes.com/specials-images/imageserve/5d3703e2f1176b00089761a6/2020-Chevrolet-Corvette-Stingray/0x0.jpg?crop=4560,2565,x836,y799,safe&height=399&width=711&fit=bounds"
                  image_width="100%"
                  image_height="30px"
                  mcol="black"
                />
              </Link>
            </div>

            <div className="md:w-[90%] md:mt-10 lg:mt-20 mt-10">
              <Link to="/projects">
                <Card
                  cw="70%"
                  ch="auto"
                  nmg="30px auto"
                  ntxt="left"
                  name="Project 3"
                  message="A gaming website"
                  cflex="column"
                  gap="0"
                  namecol="black"
                  image="https://imageio.forbes.com/specials-images/imageserve/5d3703e2f1176b00089761a6/2020-Chevrolet-Corvette-Stingray/0x0.jpg?crop=4560,2565,x836,y799,safe&height=399&width=711&fit=bounds"
                  image_width="100%"
                  image_height="30px"
                  canimation="slidel 0.5s ease-in-out forwards"
                  glass="glass"
                  mcol="black"
                />
              </Link>
            </div>
            <div className="md:w-[90%] md:mt-10 lg:mt-20 mt-10">
              <Link to="/projects">
                <Card
                  cw="70%"
                  ch="auto"
                  nmg="30px auto"
                  ntxt="left"
                  name="Project 4"
                  message="Fitness AI Chatbot"
                  cflex="column"
                  gap="0"
                  namecol="black"
                  canimation="slidel 0.5s ease-in-out forwards"
                  glass="glass"
                  image="https://imageio.forbes.com/specials-images/imageserve/5d3703e2f1176b00089761a6/2020-Chevrolet-Corvette-Stingray/0x0.jpg?crop=4560,2565,x836,y799,safe&height=399&width=711&fit=bounds"
                  image_width="100%"
                  image_height="30px"
                  mcol="black"
                />
              </Link>
            </div>
          </div>
          <div className="flex justify-end items-center mt-10">
            <Link
              to="/projects"
              className="list-none text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-bold transform transition-all hover:scale-110 hover:text-blue-500 text-white"
            >
              <li>More Projects</li>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home
