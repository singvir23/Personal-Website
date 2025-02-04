import React from "react";
import { motion } from "framer-motion";
import styles from "./About.module.css";

export default function AboutSection() {
  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className={styles.title}>About</h2>
        
        <div className={styles.grid}>      
          <div className={styles.textContent}>
            <p className={styles.description}>
              Hello, and welcome to my portfolio!
            </p>
            <p className={styles.description}>
              I&apos;m Viraaj, a developer and student at the University of Maryland with a passion for building software. Whether it be creating immersive digital stories, building tools for drummers, or optimizing business processes, I love to apply my software skills in creative and practical ways. I enjoy a challenge and am always looking for new ways to apply my software expertise.
            </p>
            <p className={styles.description}>
              Aside from coding, I am an avid drummer and frequent traveler.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
