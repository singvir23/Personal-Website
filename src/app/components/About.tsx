import React from "react";
import { motion } from "framer-motion";
import styles from "./About.module.css";
import Image from 'next/image';

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
              I&apos;m Viraaj, a developer and student at the University of Maryland with a passion for building software. Whether it be creating immersive digital stories, building tools for drummers, or optimizing business processes, I love to apply my software skills in creative and practical ways. I enjoy a challenge and am always looking for new ways to apply my software expertise.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Aside from coding, I am an avid drummer and frequent traveler.
            </p>
          </div>
          
          {/* Polaroid Images */}
          <div className="relative flex justify-center md:justify-end lg:translate-x-0 xl:translate-x-8 items-center pt-2 md:pt-4">
            <Image
              src="/sideprofile.jpeg"
              alt="Side profile"
              width={400}
              height={400}
              className="object-cover opacity-90 w-[300px] md:w-[400px] rounded-xl shadow-lg"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutSection;