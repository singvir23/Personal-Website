import React from "react";
import { motion } from "framer-motion";
import styles from "./About.module.css";

const AboutSection = () => {
  return (
    <div className={styles.container}>
      <motion.div
        className="max-w-7xl mx-auto w-full"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className={styles.title}>
          About
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
          {/* Text Content */}
          <div className="flex flex-col gap-6 text-left">
            <p className="text-lg text-gray-700 leading-relaxed">
              Hello, and welcome to my portfolio!
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              I'm Viraaj, a developer and student at the University of Maryland with a passion for building software. Whether it be creating immersive digital stories, building tools for drummers, or optimizing business processes, I love to apply my software skills in creative and practical ways. I enjoy a challenge and am always looking for new ways to apply my software expertise.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Aside from coding, I am an avid drummer and frequent traveler.
            </p>
          </div>
          
          {/* Polaroid Images */}
          <div className="relative flex justify-center items-center gap-16">
            {/* First Polaroid */}
            <div className="transform -rotate-6">
              <div className="bg-white p-6 shadow-xl rounded-sm border border-gray-100" style={{ background: '#f8f8f5' }}>
                <div className="border-8 border-white shadow-inner">
                  <img
                    src="/sideprofile.jpeg"
                    alt="Placeholder 1"
                    className="w-48 h-48 object-cover grayscale opacity-90"
                  />
                </div>
              </div>
            </div>
            
            {/* Second Polaroid */}
            <div className="transform rotate-6">
              <div className="bg-white p-6 shadow-xl rounded-sm border border-gray-100" style={{ background: '#f8f8f5' }}>
                <div className="border-8 border-white shadow-inner">
                  <img
                    src="/liljit.jpg"
                    alt="Placeholder 2"
                    className="w-48 h-48 object-cover grayscale opacity-90"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutSection;