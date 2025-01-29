"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { Antonio } from "next/font/google";
import styles from "./Home.module.css";

const antonio = Antonio({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-antonio",
});

interface HomeProps {
  skipAnimation?: boolean;
}

export default function Home({ skipAnimation = false }: HomeProps) {
  const [showContent, setShowContent] = useState(skipAnimation);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    window.scrollTo(0, 0);

    if (skipAnimation) {
      setShowContent(true);
    }
  }, [skipAnimation]);

  if (!isMounted) return null;

  return (
    <div className={antonio.className}>
      {/* Main Content */}
      <motion.div
        className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#fdfdfd] via-[#f3faf7] to-[#d1eae3]"
        initial={!skipAnimation ? { opacity: 0 } : {}}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        <motion.div
          className="w-full max-w-7xl px-8 py-4"
          initial={!skipAnimation ? { opacity: 0 } : {}}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="flex flex-col-reverse md:flex-row items-center gap-8 mt-16"
            initial={!skipAnimation ? { opacity: 0, y: 20 } : {}}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          >
            {/* Left Column */}
            <div className="w-full md:w-1/2 text-center md:text-left">
            <motion.h1
              className={`text-5xl sm:text-6xl md:text-7xl font-extrabold 
                            bg-gradient-to-r from-[#2dd4bf] to-[#10b981] 
                            bg-clip-text text-transparent drop-shadow-lg leading-none mb-4 
                            ${styles.adjustedHeading} shadowHandFont`}
              initial={!skipAnimation ? { opacity: 0, y: 20 } : {}}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            >
              Hello, I&apos;m Viraaj
            </motion.h1>


              <motion.p
                className={`text-lg text-gray-700 leading-relaxed mt-4 ${styles.indentedText}`}
                initial={!skipAnimation ? { opacity: 0, y: 20 } : {}}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
              >
                I am currently pursuing a BS in Computer Science with a minor
                in Digital Storytelling at the University of Maryland
              </motion.p>

              {/* Contact Icons */}
              <motion.div
                className={`flex justify-center md:justify-start space-x-8 mt-6 ${styles.indentedIcons}`}
                initial={!skipAnimation ? { opacity: 0, y: 20 } : {}}
                animate={{ opacity: 1, y: 0 }}
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
              <motion.div
                className={styles.profileImage}
                initial={!skipAnimation ? { opacity: 0, scale: 0.8 } : {}}
                animate={{ opacity: 1, scale: 1 }}
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
    </div>
  );
}