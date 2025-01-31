// components/About.tsx
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
        <h2 className={styles.title}>About Me</h2>
        
        <div className={styles.grid}>
          <div className={styles.imageContainer}>
            <motion.img
              src="./sideProfileNoBackground.png" // Add your profile image here
              alt="Profile"
              className={styles.image}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            />
          </div>
          
          <div className={styles.textContent}>
            <p className={styles.description}>
              Hi there! I'm a passionate Computer Science student at the University of Maryland, 
              where I blend technical expertise with creative storytelling. My journey in tech 
              is driven by a desire to create meaningful and innovative solutions.
            </p>
            
            <p className={styles.description}>
              When I'm not coding, you can find me exploring the intersection of technology 
              and digital narratives, working on personal projects, or learning about the 
              latest developments in software engineering.
            </p>
            
            <div className={styles.interests}>
              <h3 className={styles.subtitle}>Interests</h3>
              <div className={styles.interestTags}>
                {[
                  "Web Development",
                  "UI/UX Design",
                  "Digital Storytelling",
                  "Software Engineering",
                  "Creative Computing"
                ].map((interest, index) => (
                  <motion.span 
                    key={index}
                    className={styles.tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {interest}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}