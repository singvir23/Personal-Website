"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import HomeSection from "./components/Home";
import ProjectsSection from "./components/Projects";
import SkillsSection from "./components/Skills";

export default function Page() {
  const [showContent, setShowContent] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [logoPosition, setLogoPosition] = useState<"center" | "navbar">("center");
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden"; // Prevent scrolling during animation

    const hasAnimated = localStorage.getItem("introRan");
    if (hasAnimated === "true") {
      setShowContent(true);
      setLogoPosition("navbar");
      setShowNav(true);
      document.body.style.overflow = "auto"; // Re-enable scrolling
    }
  }, []);

  const handleVideoEnd = () => {
    setTimeout(() => {
      setLogoPosition("navbar");
      
      setTimeout(() => {
        setShowNav(true); // Show navbar before content
        
        setTimeout(() => {
          setShowContent(true);
          localStorage.setItem("introRan", "true");
          document.body.style.overflow = "auto"; // Re-enable scrolling
        }, 200);
      }, 800);
    }, 800);
  };

  if (!isMounted) return null;

  return (
    <>
      {/* Intro Animation */}
      <AnimatePresence>
        {!showContent && (
          <motion.div
            className="fixed inset-0 bg-[#fdfdfd] z-50 flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="fixed z-100"
              initial={{
                width: "600px",
                height: "600px",
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
                borderRadius: "50%",
              }}
              animate={
                logoPosition === "navbar"
                  ? {
                      width: "64px",
                      height: "64px",
                      top: "1rem",
                      left: "3rem",
                      x: 0,
                      y: 0,
                      borderRadius: "50%",
                    }
                  : {}
              }
              transition={{
                duration: 0.8,
                type: "spring",
                damping: 22,
                stiffness: 100,
              }}
            >
              <video
                autoPlay
                muted
                playsInline
                onEnded={handleVideoEnd}
                className="w-full h-full object-cover rounded-full"
                src="/viraajanimation.mp4"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <AnimatePresence>
        {showNav && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <section id="home">
          <HomeSection skipAnimation={true} />
        </section>

        <section id="projects">
          <ProjectsSection />
        </section>

        <section id="skills">
          <SkillsSection />
        </section>
      </motion.div>
    </>
  );
}