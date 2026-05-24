import React, { useState, useEffect, useRef } from 'react';
import ParticlesComponent from '../components/Particles';
import Particles from '@tsparticles/react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";

const Project = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const swiperRef = useRef(null);
  

  const projects = [
    {
      title: "Multiplayer Backend Server",
      description: "A blender project created to practice lighting, environment building, animation, and asset creation",
      techStack: ["Java, Springboot, PostgreSQL, Docker"],
      image:"images/sword_in_stone.png",
    },
    {
      title: "NEFP Multilingual Database Solution",
      description: "A Fullstack webapp with a PostgreSQL database. This was a hands on experiment to create a unified asset for the Northeast Food Program food bank",
      techStack: ["React", "Django", "Chart.js"],
      image:"images/NEFP_Showcase.png",
    },
    {
      title: "Portfolio Website",
      description: "A personal portfolio showcasing my projects, skills, and contact information in a responsive design.",
      techStack: ["React", "CSS", "JavaScript", "Threejs"],
      image:"images/website_showcase_ph.png",
    },
    {
      title: "Tech Ninja",
      description: "A 2d platformer roguelike. This was built from the ground up using SDL and other basic libraries",
      techStack: ["C++", "SDL2", "Aseprite"],
      image:"images/techninja.png",
    },
    {
      title: "Acme Spaceship",
      description: "Amateur project to test how capable I was with 3d modeling without referring to any resources",
      techStack: ["Blender"],
      image:"images/acme_spaceship.png",
      
    }
    
  ];

  const handleImageClick = (project) => {

    setSelectedProject(project);
    
  };

  const closeModal = () => {
    console.log("modalclosed");
    setSelectedProject(null); // Close the modal
  };

  return (
    <div style={{ textAlign: "center", padding: "0px", display: "flex", alignItems: "center",height: "100vh"}}>
      <h1>My Projects</h1>
      <Swiper
        ref={swiperRef}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 15,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
          opacity: 0.5,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
        style={{
          display: "flex",
          justifyContent: "center", // Center the swiper container
          alignItems: "center", // Align slides vertically (if necessary)
          
        }}
        >
        {projects.map((project, index) => (
           <SwiperSlide
           key={index}
           style={{
             width: "400px", // Increase the width of the slide
             height: "550px",
             display: "flex", // Enable flexbox for centering
             justifyContent: "center", // Center card horizontally
             alignItems: "center", // Center card vertically
             backgroundColor: "#10264A",
             borderRadius: "30px",
             height: '95%',
             border: '1px solid #5f838a',
             
           }}
         >
           <div
             style={{
               
               padding: "40px", // Increase padding for a larger card
               borderRadius: "10px",
               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
               width: "100%", // Card width matches slide width
               height: "90%", // Card height matches slide height
               textAlign: "center", // Center text inside the card
             }}
           >
            <img
                src={project.image}
                alt={project.title}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  marginBottom: '20px',
                }}
              />
              <h3 className="text-blue-100">{project.title}</h3> {/* Apply white-text class */}
    <p className="text-blue-100">{project.description}</p> {/* Apply white-text class */}
    <p className="text-blue-100">
                <strong>Tech:</strong> {project.techStack.join(", ")}
              </p>
              <button
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  border: "none",
                  borderRadius: "5px",
                  background: "#3f6075",
                  color: "#10264a",
                  cursor: "pointer",
                  width: "10rem",
                }}
                onClick={() => handleImageClick(project)} // Open modal when clicked
              >
                View 
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedProject && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 3,
           
          }}
          onClick={closeModal}
        >
          <div
    style={{
      background: '#000',
      padding: '30px',
      borderRadius: '10px',
      border: '2px solid white',
      width: 'auto', // Allow content to define the width
      maxWidth: '900px', // Set a reasonable max width for large screens
      height: 'auto', // Adjust the height based on the content
      textAlign: 'center',
      overflow: 'auto', // Make sure content scrolls if it's too long
    }}
    onClick={(e) => e.stopPropagation()} // Prevent click event from closing the modal
  >
            <h2>
              <span style={{ color: '#fff', fontSize: '2rem'}}>
                {selectedProject.title}
              </span>
            </h2>
            <button
              onClick={closeModal}
              style={{
                position: 'relative',
                top: '10px',
                right: '10px',
                background: 'none',
                border: 'none',
                color: '#000',
                fontSize: '24px',
                cursor: 'pointer',
              }}
            >
              
            </button>
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              style={{
                width: '100%',        // Makes the image as wide as the container
                height: 'auto',       // Adjusts height to maintain aspect ratio
                maxWidth: '800px',    // Optional: Limits the width of the image
                maxHeight: '500px',   // Optional: Limits the height of the image
                objectFit: 'contain', // Prevents distortion by preserving aspect ratio
                borderRadius: '10px',
                marginBottom: '20px',
                border: '1px solid white',
                
              }}
            />
            <p>
            <span style={{ color: '#fff'}}>
            {selectedProject.description}
            </span>
            </p>
            <p>
            <span style={{ color: '#fff'}}>
              <strong>Tech:</strong> {selectedProject.techStack.join(', ')}
              </span>
            </p>
            <button
              onClick={closeModal}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#000',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                border: '1px solid white',
              }}
            >
              Close
            </button>
          </div>
          </div>
      )}
        



      <ParticlesComponent id="particles"
           />
           <div style={{ 
  display: 'grid', 
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
  gap: '20px', 
  padding: '20px', 
  position: 'relative',
  zIndex: 2,
}}></div>
    </div>
  );
};

  export default Project;