import { motion } from "framer-motion";
import adminPfp from "../assets/icons/me.png";
import PondBackdrop from "../components/PondBackdrop";
import { fadeIn } from "../utils/motion.js";

const Home = () => {
  const coreStacks = [
    "Java",
    "Spring Boot",
    "React",
    "JavaScript",
    "TypeScript",
    "PostgreSQL",
    "C++",
    "Docker",
    "Python",
    "Unreal Engine",
    "Blender",
    "Linux",
    "Git",

  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <PondBackdrop />
      </div>

      <div className="relative z-10 px-6 py-10 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-14">
          <motion.div
            variants={fadeIn("up", "", 0.2, 0.8)}
            initial="hidden"
            animate="show"
            className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]"
          >
            <div className="text-left">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-sky-200/90">
                Software Engineer
              </p>
              <h1 className="text-4xl font-black tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
                Backend systems, automation, and interactive software.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
                Software developer focused on backend systems, automation, and creative technical projects.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {coreStacks.map((stack) => (
                  <span
                    key={stack}
                    className="rounded-full border border-sky-200/30 bg-sky-400/10 px-4 py-2 text-sm font-semibold text-sky-100"
                  >
                    {stack}
                  </span>
                ))}
              </div>
            </div>

            <motion.div
              variants={fadeIn("up", "", 0.25, 0.9)}
              initial="hidden"
              animate="show"
              className="flex justify-center lg:justify-end"
            >
              <div className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.45)] backdrop-blur-sm">
                <img
                  src={adminPfp}
                  alt="Portrait of the developer"
                  className="h-[280px] w-[280px] rounded-[1.5rem] object-cover sm:h-[320px] sm:w-[320px]"
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeIn("up", "", 0.3, 0.9)}
            initial="hidden"
            animate="show"
            className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]"
          >
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-6 backdrop-blur-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-100/85">
                Overview
              </p>
              <p className="mt-4 text-base leading-8 text-slate-100">
                Entry-level Software Engineer with experience building backend systems and full-stack applications using Java, Spring Boot, PostgreSQL, React, TypeScript, and Docker. Skilled in REST API development, workflow automation, and scalable application design, with additional experience in gameplay systems and tools development using Unreal Engine and C++.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-6 backdrop-blur-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-100/85">
                Focus areas
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <h2 className="text-lg font-bold text-slate-50">Backend engineering</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-200">
                    API design, database architecture, service reliability, and automation systems.
                  </p>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-50">Full-stack delivery</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-200">
                    TypeScript-heavy web apps with responsive interfaces and product-focused execution.
                  </p>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-50">Game dev</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-200">
                    Unreal Engine systems, gameplay programming, backend services, and dev tooling.
                  </p>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-50">Cloud + ops</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-200">
                    Dockerized deployments, scalable infrastructure, and practical system design.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn("up", "", 0.35, 0.9)}
            initial="hidden"
            animate="show"
            className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-6 backdrop-blur-sm"
          >
            <div className="mb-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-100/85">
                Quick actions
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <a
                href="/projects"
                className="group flex min-h-[92px] items-center justify-center rounded-[1.4rem] border border-cyan-200/40 bg-gradient-to-br from-cyan-300/15 via-sky-400/10 to-blue-500/15 px-5 text-center text-base font-semibold text-slate-50 shadow-[0_18px_40px_rgba(14,165,233,0.18)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-100/70 hover:bg-gradient-to-br hover:from-cyan-300/25 hover:via-sky-400/15 hover:to-blue-500/20 hover:shadow-[0_22px_48px_rgba(45,212,191,0.25)] sm:text-lg"
              >
                <span className="inline-flex items-center gap-3">
                  <span className="text-cyan-100"></span>
                  <span>go to my projects</span>
                </span>
              </a>
              <a
                href="/contactme"
                className="group flex min-h-[92px] items-center justify-center rounded-[1.4rem] border border-cyan-200/40 bg-gradient-to-br from-cyan-300/15 via-sky-400/10 to-blue-500/15 px-5 text-center text-base font-semibold text-slate-50 shadow-[0_18px_40px_rgba(14,165,233,0.18)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-100/70 hover:bg-gradient-to-br hover:from-cyan-300/25 hover:via-sky-400/15 hover:to-blue-500/20 hover:shadow-[0_22px_48px_rgba(45,212,191,0.25)] sm:text-lg"
              >
                <span className="inline-flex items-center gap-3">
                  <span className="text-cyan-100"></span>
                  <span>contact me</span>
                </span>
              </a>
              <a
                href="/resume/DevonBedenbaugh_Resume_May252026.pdf"
                download
                className="group flex min-h-[92px] items-center justify-center rounded-[1.4rem] border border-cyan-200/40 bg-gradient-to-br from-cyan-300/15 via-sky-400/10 to-blue-500/15 px-5 text-center text-base font-semibold text-slate-50 shadow-[0_18px_40px_rgba(14,165,233,0.18)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-100/70 hover:bg-gradient-to-br hover:from-cyan-300/25 hover:via-sky-400/15 hover:to-blue-500/20 hover:shadow-[0_22px_48px_rgba(45,212,191,0.25)] sm:text-lg"
              >
                <span className="inline-flex items-center gap-3">
                  <span className="text-cyan-100"></span>
                  <span>download my resume</span>
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Home;