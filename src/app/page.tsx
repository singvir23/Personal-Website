"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { Antonio } from 'next/font/google';
import styles from './page.module.css'; // Import the CSS module

const antonio = Antonio({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-antonio',
});

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [skipHomeAnimation, setSkipHomeAnimation] = useState(false);
  const [logoPosition, setLogoPosition] = useState<'center' | 'navbar'>('center');

  useEffect(() => {
    setIsMounted(true);
    const ran = localStorage.getItem("introRan");
    
    if (ran === "true") {
      setShowContent(true);
      setSkipHomeAnimation(true);
      setLogoPosition('navbar');
    } else {
      // First visit - hide scroll
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleVideoEnd = () => {
    
    // Wait longer after video ends before starting transition
    setTimeout(() => {
      // Start moving logo to navbar
      setLogoPosition('navbar');
      
      // Add delay before showing content and updating localStorage
      setTimeout(() => {
        setShowContent(true);
        
        // Additional delay before marking intro as complete
        setTimeout(() => {
          localStorage.setItem("introRan", "true");
          window.dispatchEvent(new Event("storage"));
          document.body.style.overflow = "auto";
        }, 500); // Delay after content starts showing
        
      }, 800); // Delay before showing content
      
    }, 800); // Delay after video ends
  };

  if (!isMounted) return null;

  return (
    <div className={antonio.className}>
      {/* Logo Animation */}
      {!skipHomeAnimation && (
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
            logoPosition === 'navbar'
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
            duration: .8, // Increased from 0.8 to 1.2
            type: "spring",
            damping: 22, // Reduced from 25 to 22 for smoother motion
            stiffness: 100, // Reduced from 120 to 100 for smoother motion
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
      )}

      {/* Main Content */}
      {showContent && (
        <motion.div
          className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#fdfdfd] via-[#f3faf7] to-[#d1eae3]"
          initial={!skipHomeAnimation ? { opacity: 0 } : {}}
          animate={!skipHomeAnimation ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <motion.div
            className="w-full max-w-7xl px-8 py-4"
            initial={!skipHomeAnimation ? { opacity: 0 } : {}}
            animate={!skipHomeAnimation ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="flex flex-col-reverse md:flex-row items-center gap-8 mt-16"
              initial={!skipHomeAnimation ? { opacity: 0, y: 20 } : {}}
              animate={!skipHomeAnimation ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            >
              {/* Left Column */}
              <div className="w-full md:w-1/2 text-center md:text-left">
                <motion.h1
                  className={`text-6xl sm:text-7xl md:text-8xl font-extrabold bg-gradient-to-r from-[#2dd4bf] to-[#10b981] bg-clip-text text-transparent drop-shadow-lg leading-none mb-4 ${styles.adjustedHeading}`}
                  initial={!skipHomeAnimation ? { opacity: 0, y: 20 } : {}}
                  animate={!skipHomeAnimation ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                >
                  Hello, I&apos;m Viraaj 
                </motion.h1>

                <motion.p
                  className={`text-lg text-gray-700 leading-relaxed mt-4 ${styles.indentedText}`}
                  initial={!skipHomeAnimation ? { opacity: 0, y: 20 } : {}}
                  animate={!skipHomeAnimation ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
                >
                  I am currently pursuing a BS in Computer Science with a minor
                  in Digital Storytelling at the University of Maryland
                </motion.p>

                {/* Contact Icons */}
                <motion.div
                  className={`flex justify-center md:justify-start space-x-8 mt-6 ${styles.indentedIcons}`}
                  initial={!skipHomeAnimation ? { opacity: 0, y: 20 } : {}}
                  animate={!skipHomeAnimation ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
                >
                  <a
                    href="https://www.linkedin.com/in/viraaj-singh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-emerald-600 transform hover:scale-110 transition-all duration-300"
                  >
                    <FaLinkedin size={36} />
                  </a>
                  <a
                    href="https://github.com/singvir23"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-emerald-600 transform hover:scale-110 transition-all duration-300"
                  >
                    <FaGithub size={36} />
                  </a>
                  <a
                    href="mailto:viraajsingh135@gmail.com"
                    className="text-gray-700 hover:text-emerald-600 transform hover:scale-110 transition-all duration-300"
                  >
                    <FaEnvelope size={36} />
                  </a>
                </motion.div>
              </div>

              {/* Right Column */}
              <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
                {/* Main Profile Image */}
                <motion.div
                  className={styles.profileImage}
                  initial={!skipHomeAnimation ? { opacity: 0, scale: 0.8 } : {}}
                  animate={!skipHomeAnimation ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                >
                  <img
                    src="/viraaj.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover object-[35%_50%]"
                  />


                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
