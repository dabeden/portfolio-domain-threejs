import {Suspense, React, useRef, useEffect, useState, forwardRef} from "react";
import {Canvas} from '@react-three/fiber';
import {Loader} from '../components/index.js';
//import Tilt from "react-tilt";
import { motion, useInView } from "framer-motion";
import { Sphere, OrbitControls, useTexture } from "@react-three/drei";

import Island from "../models/Island.jsx"
import Sky from "../models/Sky.jsx"
import Ufo from "../models/Ufo.jsx";
import HomeInfo from "../components/HomeInfo.js";
import CanvasBox from "../components/CanvasBox.js";

import { fadeIn, textVariant } from "../utils/motion.js";
import adminPfp from "../assets/icons/me.png";

const Home = () => {

  
    const images = [
        { src: "images/acme_spaceship.png", title: "Alien Spaceship", description: "Made in Blender for exporting into Unreal Engine"},
        { src: "images/sword_in_stone.png", title: "Sword in the Stone", description: "Made in Blender for animation and scene setting practice"},
      
    ];

    const cottageRef = useRef();
    

    const [currentStage, setCurrentStage] = useState(1);
    const [isRotating, setIsRotating] = useState(false);
    const [isPlayingMusic, setIsPlayingMusic] = useState(false);

    const adjustIslandForScreenSize = () => {
        let screenScale, screenPosition;
    
        if (window.innerWidth < 768) {
          screenScale = [10, 10, 10];
          screenPosition = [0, -6.5, -43.4];
        } else {
          screenScale = [15, 15, 15];
          screenPosition = [0, -6.5, -43.4];
        }
    
        return [screenScale, screenPosition];
      };
    
    
    const adjustUfoForScreenSize = () => {
        let screenScale, screenPosition;
    
        if(window.innerWidth < 768){
            screenScale = [1, 1, 1];
            screenPosition = [0, 5.2, -10];
        } else { 
            screenScale = [1, 1, 1];
            screenPosition = [0, 5.2, -10];
        }


        
        return [screenScale, screenPosition];
    
    }


    const aboutMeRef = useRef(null); // Create a ref for the About Me section
    const frameworkRef = useRef(null);
    // Scroll to About Me section
    const scrollToAboutMe = () => {
      if (aboutMeRef.current) {
        aboutMeRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    const scrollToFrameworks = () => {
      if (frameworkRef.current) {
        frameworkRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    //const [islandScale, islandPosition, islandRotation] = adjustModelForScreenSize();
    const [islandScale, islandPosition] = adjustIslandForScreenSize();
    const [ufoScale, ufoPosition] = adjustUfoForScreenSize();
  


    const icons = [
      "images/icon_react.png",
      "images/icon_git.png",
      "images/icon_js.png",
      "images/icon_python.png",
      "images/icon_sql.png",
      "images/icon_unreal.png",
      "images/icon_typescript.png",
      "images/icon_django.png",
      "images/icon_aws.png",
      "images/icon_django.png",
    ];

    
      

    return (
        <section className="w-fill h-screen relative">
            <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
                {currentStage && <HomeInfo currentStage={currentStage} onScrollToAbout={scrollToAboutMe} onScrollToFrameworks={scrollToFrameworks}/>}
            </div>
            <Canvas
                
                className={`we-full h-screen bg-transparent ${isRotating ? 
                'cursor-grabbing' : 'cursor-grab'}`}
                
                camera={{near: 0.1, far: 1000}}
                style={{marginTop:'-8px',
                  position: 'relative',
                  
                  pointerEvents: 'auto', // Ensure canvas can capture mouse events
                }}
            >
                <Suspense fallback={<Loader />}>
                    <directionalLight position={[1,1,1]} intensity={1} />
                    <ambientLight intensity={.5}/>
                    <pointLight />
                    <spotLight />
                    <hemisphereLight skycolor="#b1e1ff" groundColor="#000000" intensity={1}/>

                    
                    <Sky 
                    isRotating={isRotating}
                    rotation={[0,0,0]}
                    />;
                    
                    <Island
                        isRotating={isRotating}
                        setIsRotating={setIsRotating}
                        setCurrentStage={setCurrentStage}
                        position={islandPosition}
                        scale={[.7,.7,.7]}
                        rotation={[0.1, 4.7, 0]}
                        
                    />;
                    
                    <Ufo
                        isRotating={isRotating}
                        scale={ufoScale}
                        position={ufoPosition}
                        rotation={[.4, 5.2, -.2]}
                    />;
                    
                    
                </Suspense>
            </Canvas>
<div className="spacer wave-svg-layer-bluepurpletop">
  <div className="flex flex-col h-full justify-between"> {/* Ensure the container is full height and content is spaced */}
    {/* Content that should be at the top */}
    <div>
      {/* Any content you want at the top goes here */}
    </div>

    {/* 'Overview' text at the bottom */}
    <motion.div
      variants={fadeIn("up", "", 1, 1)}
      initial="hidden"
      animate="show"
      className="about-me-section px-10 text-blue-200 font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] nunito-bold justify-center"
      ref={aboutMeRef}
      

      style={{
        justifyContent: 'center',
        display: 'flex',
        zIndex: 20,

        
      }}
    >
      Overview.
    </motion.div>
  </div>
</div>

<div className="spacer wave-svg-layer-undersea-bottom">
  <div  className=" flex items-start justify-center w-full">
    {/* Left side - Text */}
    <div>
    <motion.p
      variants={fadeIn("up", "", 1, 1)}
      initial="hidden"
      animate="show"
      className="max-w-sm   text-blue-300 text-secondary text-[17px] max-w-3xl leading-[30px] nunito-bold "
      
      style={{
        justifyContent: 'center',
        display: 'flex',
        textAlign: 'center',
        
      }}
    >
      Entry-level Software Engineer with experience building backend systems and full-stack applications using Java, Spring Boot, PostgreSQL, React, TypeScript, and Docker. 
      Skilled in REST API development, workflow automation, and scalable application design, with additional experience in gameplay systems and tools development using Unreal Engine and C++. 
      Passionate about backend engineering, game development, and building clean, user-focused software solutions.
    

    </motion.p>
    <motion.p
      variants={fadeIn("up", "", 2, 1.2)}
      initial="hidden"
      animate="show"
      >
      <img
        src={adminPfp}
        alt="Dev Pfp"
        className="w-[300px] h-[300px] rounded-full border-[4px]  border-blue-300 transform  translate-x-5 translate-y-10"
      />
    </motion.p>
    </div>

    {/* Right side - Image */}
    
  </div>
  <motion.div
        variants={fadeIn("up", "", 3, 1)}
        initial="hidden"
        animate="show"
        ref={frameworkRef}
        style={{
          position: 'relative',
          display: 'flex',
          
          top: '50px',
          right: '',
          justifyContent: 'center', 
          
      }}
      >
      <CanvasBox
      icons={icons}
      />
      </motion.div>
</div>
  <div className="wave-svg-layer-undersea-below spacer "
    style={{marginTop:'-16px',
      position: "relative",
      zIndex: -1,
    }}>
      
</div>

        </section>


      
    );
  };

export default Home;

//title="Technologies"
      //description="Familiar Frameworks"