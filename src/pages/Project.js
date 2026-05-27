import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
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

  const defaultProjectImage = "images/github_icon_hires.png";

  const getProjectImage = (project) => project.image || defaultProjectImage;

  const projects = [
    {
      title: "Multiplayer Backend Server",
      description: "A scalable multiplayer backend server built to explore API design, database integration, and containerized deployment. The leaderboard function is currently linked to an ongoing godot project.",
      techStack: ["Java", "Spring Boot", "PostgreSQL", "Docker"],
      image: "",
      githubUrl: "https://github.com/dabeden/springboot-server-backend-api",
    },
    {
      title: "Portfolio Website",
      description: "A personal portfolio showcasing my projects, skills, and contact information in a responsive design.",
      techStack: ["React", "CSS", "JavaScript", "Threejs"],
      image: "images/portfolio_thumbnail.png",
      githubUrl: "https://github.com/dabeden/portfolio-domain-threejs",
    },
    {

      title: "Traffic QA Toolset",
      description: "One of many various traffic QA tools made to assist workflow for various departments at my current position as a QA analyst for traffic data at QC.",
      techStack: ["Python", "Pandas", "Matplotlib"],
      image: "",
      githubUrl: "https://github.com/dabeden/dlqc-qa-toolbox",
    },
    {
      title: "NEFP Multilingual Database Solution Capstone Project",
      description: "A Fullstack webapp with a PostgreSQL database. This was a hands on experiment to create a unified asset for reporting, diverse client processing and was meant to aid in real-life queueing processes forthe Northeast Food Program food bank",
      techStack: ["React", "Django", "Chart.js"],
      image: "images/NEFP_Showcase.png",
      githubUrl: "",
    },
    {
      title: "Tech Ninja",
      description: "A basic 2d platformer made for a game design class project. This was built from the ground up using SDL and other basic libraries",
      techStack: ["C++", "SDL2", "Aseprite"],
      image: "images/techninja.png",
      githubUrl: "",
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
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      style={{
        textAlign: "center",
        padding: "0px",
        display: "flex",
        alignItems: "center",
        minHeight: "100vh",
        fontFamily: '"Nunito", "Inter", "Segoe UI", sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ width: '100%', position: 'relative', zIndex: 2 }}>
        <h1
          style={{
            fontFamily: '"Nunito", "Inter", "Segoe UI", sans-serif',
            fontSize: 'clamp(2rem, 3vw, 2.6rem)',
            fontWeight: 800,
            letterSpacing: '0.04em',
            color: '#f8fbff',
            marginBottom: '1.5rem',
          }}
        >
          My Projects
        </h1>
        <Swiper
          ref={swiperRef}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 12,
            stretch: 0,
            depth: 90,
            modifier: 1,
            slideShadows: false,
            opacity: 0.9,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: '2rem',
          }}
        >
          {projects.map((project, index) => (
             <SwiperSlide
             key={index}
             style={{
               width: "380px",
               height: "100%",
               display: "flex",
               justifyContent: "center",
               alignItems: "stretch",
               background: 'transparent',
               padding: '12px',
             }}
           >
             <div
               style={{
                 padding: "26px",
                 borderRadius: "24px",
                 width: "100%",
                 minHeight: "540px",
                 textAlign: "left",
                 color: "#eff6ff",
                 background: "linear-gradient(180deg, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.7))",
                 border: '1px solid rgba(148, 163, 184, 0.24)',
                 boxShadow: '0 24px 60px rgba(15, 23, 42, 0.42), inset 0 1px 0 rgba(255,255,255,0.06)',
                 backdropFilter: 'blur(18px)',
                 display: 'flex',
                 flexDirection: 'column',
                 gap: '16px',
               }}
             >
              <img
                  src={getProjectImage(project)}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '210px',
                    objectFit: 'cover',
                    borderRadius: '18px',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    boxShadow: '0 16px 40px rgba(8, 15, 35, 0.28)',
                  }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                  <h3 style={{
                    fontFamily: '"Nunito", "Inter", "Segoe UI", sans-serif',
                    fontSize: '1.18rem',
                    fontWeight: 800,
                    color: '#f8fbff',
                    margin: 0,
                    lineHeight: 1.2,
                  }}>{project.title}</h3>
                  <p style={{
                    fontFamily: '"Nunito", "Inter", "Segoe UI", sans-serif',
                    fontSize: '0.98rem',
                    lineHeight: 1.7,
                    color: '#dbeafe',
                    margin: 0,
                  }}>{project.description}</p>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginTop: '2px',
                  }}>
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '999px',
                          background: 'rgba(59, 130, 246, 0.18)',
                          color: '#e0f2fe',
                          border: '1px solid rgba(125, 211, 252, 0.22)',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          letterSpacing: '0.02em',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'stretch', marginTop: 'auto' }}>
                  <button
                    style={{
                      padding: "12px 16px",
                      border: "1px solid rgba(191, 219, 254, 0.32)",
                      borderRadius: "999px",
                      background: "linear-gradient(135deg, rgba(96, 165, 250, 0.9), rgba(59, 130, 246, 0.75))",
                      color: "#0f172a",
                      cursor: "pointer",
                      fontWeight: 800,
                      fontFamily: '"Nunito", "Inter", "Segoe UI", sans-serif',
                      letterSpacing: '0.02em',
                      boxShadow: '0 14px 32px rgba(37, 99, 235, 0.28)',
                    }}
                    onClick={() => handleImageClick(project)}
                  >
                    View Details
                  </button>
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: 'inline-flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: "12px 16px",
                        borderRadius: "999px",
                        background: "rgba(15, 23, 42, 0.95)",
                        color: "#f8fbff",
                        textDecoration: 'none',
                        border: '1px solid rgba(147, 197, 253, 0.35)',
                        fontWeight: 800,
                        fontFamily: '"Nunito", "Inter", "Segoe UI", sans-serif',
                      }}
                    >
                      View on GitHub
                    </a>
                  ) : null}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {selectedProject && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 3,
            padding: '24px',
          }}
          onClick={closeModal}
        >
          <div
            style={{
              background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.92))',
              padding: '28px',
              borderRadius: '24px',
              border: '1px solid rgba(148, 163, 184, 0.28)',
              width: 'min(900px, 100%)',
              maxHeight: '85vh',
              textAlign: 'left',
              overflow: 'auto',
              boxShadow: '0 30px 80px rgba(15, 23, 42, 0.45)',
              color: '#eff6ff',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
              <h2 style={{
                fontFamily: '"Nunito", "Inter", "Segoe UI", sans-serif',
                fontSize: '1.8rem',
                fontWeight: 800,
                color: '#f8fbff',
                margin: 0,
              }}>
                {selectedProject.title}
              </h2>
              <button
                onClick={closeModal}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#e2e8f0',
                  fontSize: '28px',
                  cursor: 'pointer',
                  lineHeight: 1,
                }}
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
            <img
              src={getProjectImage(selectedProject)}
              alt={selectedProject.title}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '360px',
                objectFit: 'cover',
                borderRadius: '20px',
                margin: '20px 0',
                border: '1px solid rgba(148, 163, 184, 0.2)',
              }}
            />
            <p style={{
              fontFamily: '"Nunito", "Inter", "Segoe UI", sans-serif',
              fontSize: '1rem',
              lineHeight: 1.75,
              color: '#dbeafe',
              marginBottom: '16px',
            }}>
              {selectedProject.description}
            </p>
            <p style={{
              fontFamily: '"Nunito", "Inter", "Segoe UI", sans-serif',
              fontSize: '1rem',
              lineHeight: 1.75,
              color: '#dbeafe',
              marginBottom: '20px',
            }}>
              <strong style={{ color: '#f8fbff' }}>Tech:</strong> {selectedProject.techStack.join(', ')}
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '12px', flexWrap: 'wrap' }}>
              {selectedProject.githubUrl ? (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    padding: '12px 18px',
                    backgroundColor: 'rgba(15, 23, 42, 0.98)',
                    color: '#f8fbff',
                    borderRadius: '999px',
                    textDecoration: 'none',
                    border: '1px solid rgba(147, 197, 253, 0.35)',
                    fontFamily: '"Nunito", "Inter", "Segoe UI", sans-serif',
                    fontWeight: 800,
                  }}
                >
                  View on GitHub
                </a>
              ) : null}
              <button
                onClick={closeModal}
                style={{
                  padding: '12px 18px',
                  backgroundColor: 'transparent',
                  color: '#f8fbff',
                  borderRadius: '999px',
                  cursor: 'pointer',
                  border: '1px solid rgba(191, 219, 254, 0.32)',
                  fontFamily: '"Nunito", "Inter", "Segoe UI", sans-serif',
                  fontWeight: 800,
                }}
              >
                Close
              </button>
            </div>
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
    </motion.div>
  );
};

  export default Project;