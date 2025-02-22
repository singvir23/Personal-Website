"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import Navbar from "./components/Navbar";
import HomeSection from "./components/Home";
import ProjectsSection from "./components/Projects";
import SkillsSection from "./components/Skills";
import AboutSection from "./components/About";
import Footer from "./components/Footer";

// Preload images hook (only truly critical images)
const usePreloadImages = (imageUrls: string[]) => {
  useEffect(() => {
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, [imageUrls]);
};

export default function Page() {
  const [showContent, setShowContent] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [logoPosition, setLogoPosition] = useState<"center" | "navbar">("center");
  const [showNav, setShowNav] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const videoStartedRef = useRef(false);

  // Preload only the large hero images or critical content you want immediately
  usePreloadImages([
    "/drumAI.jpeg",
    "/server.jpeg",
    "/cnn.png",
    "/chatbot.png",
  ]);

  useEffect(() => {
    setIsMounted(true);
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    // Reset state for every new page load
    setShowContent(false);
    setLogoPosition("center");
    setShowNav(false);
  }, []);

  // Prevent scroll events while animating.
  useEffect(() => {
    if (!isAnimating) return;

    const preventDefault = (e: Event) => e.preventDefault();
    const preventKeyScroll = (e: KeyboardEvent) => {
      const keys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "];
      if (keys.includes(e.key)) e.preventDefault();
    };

    window.addEventListener("wheel", preventDefault, { passive: false });
    window.addEventListener("touchmove", preventDefault, { passive: false });
    window.addEventListener("keydown", preventKeyScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", preventDefault);
      window.removeEventListener("touchmove", preventDefault);
      window.removeEventListener("keydown", preventKeyScroll);
    };
  }, [isAnimating]);

  // Fallback: If the video doesn't start playing after 1 second, trigger the animation end.
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (!videoStartedRef.current) {
        console.warn("Video did not start playing within 1 second. Proceeding without video.");
        handleVideoEnd();
      }
    }, 500);

    return () => clearTimeout(fallbackTimer);
  }, []);

  const handleVideoEnd = () => {
    setTimeout(() => {
      setLogoPosition("navbar");
      setTimeout(() => {
        setShowNav(true);
        setTimeout(() => {
          setShowContent(true);
          setIsAnimating(false);
          document.body.style.overflow = "auto";
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 200);
      }, 800);
    }, 800);
  };

  if (!isMounted) return null;

  return (
    <>
      <Head>
        <link rel="preload" href="/drumAI.jpeg" as="image" />
        <link rel="preload" href="/server.jpeg" as="image" />
        <link rel="preload" href="/cnn.png" as="image" />
        <link rel="preload" href="/chatbot.png" as="image" />
      </Head>

      {isAnimating && (
        <div
          className="fixed inset-0 z-[999] bg-transparent"
          style={{ pointerEvents: "all" }}
          onClick={(e) => e.preventDefault()}
          onMouseDown={(e) => e.preventDefault()}
          onMouseUp={(e) => e.preventDefault()}
          onKeyDown={(e) => e.preventDefault()}
          onKeyUp={(e) => e.preventDefault()}
          tabIndex={-1}
        />
      )}

      <AnimatePresence mode="wait">
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
                      width: "62px",
                      height: "62px",
                      top: ".9rem",
                      left: "3.1rem",
                      x: 0,
                      y: 0,
                      borderRadius: "50%",
                    }
                  : {}
              }
              transition={{
                duration: 1,
                type: "spring",
                damping: 22,
                stiffness: 100,
              }}
            >
              <video
                autoPlay
                muted
                playsInline
                onPlay={() => {
                  // Mark that the video has started playing.
                  videoStartedRef.current = true;
                }}
                onEnded={handleVideoEnd}
                onError={(e) => {
                  console.error("Video error", e);
                  handleVideoEnd(); // Proceed if there is an error loading the video.
                }}
                className="w-full h-full object-cover rounded-full"
                onContextMenu={(e) => e.preventDefault()}
              >
                <source src="/viraajanimation.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <div
          className={`${showNav ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
        >
          <Navbar />
        </div>

        <div
          className={`${showContent ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
          style={{ pointerEvents: isAnimating ? "none" : "auto" }}
        >
          <section id="home">
            <HomeSection skipAnimation={true} />
          </section>
          <section id="about">
            <AboutSection />
          </section>
          <section id="projects">
            <ProjectsSection />
          </section>
          <section id="skills">
            <SkillsSection />
          </section>
          <Footer />
        </div>
      </div>
    </>
  );
}
