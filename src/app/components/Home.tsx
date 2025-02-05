// components/Home.tsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import styles from "./Home.module.css";

interface HomeProps {
  skipAnimation?: boolean;
}

export default function Home({ skipAnimation = false }: HomeProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [text, setText] = useState<React.ReactNode[]>([]);
  const [showContent, setShowContent] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  const fullText =
    "Currently pursuing a BS in Computer Science with a minor in Digital Storytelling at the University of Maryland";

  // Define the phrases to highlight
  const highlights = [
    { phrase: "Computer Science" },
    { phrase: "Digital Storytelling" },
  ];

  useEffect(() => {
    setIsMounted(true);

    if (skipAnimation) {
      setShowContent(true);
      setAnimationComplete(true);
      const highlightedText = applyHighlights(fullText);
      setText(highlightedText);
      return;
    }

    // Start content after video animation
    const videoTimeout = setTimeout(() => {
      setShowContent(true);

      // Start name animation
      setTimeout(() => {
        setAnimationComplete(true);

        // Start streaming text only after name animation is complete
        let currentIndex = 0;
        const interval = setInterval(() => {
          if (currentIndex <= fullText.length) {
            const currentText = applyHighlights(fullText.slice(0, currentIndex));
            setText(currentText);
            currentIndex++;
          } else {
            clearInterval(interval);
          }
        }, 30);

        return () => clearInterval(interval);
      }, 800); // Duration of name animation
    }, 1000); // Delay for video animation

    return () => clearTimeout(videoTimeout);
  }, [skipAnimation]);

  // Function to apply highlights to the text
  const applyHighlights = (text: string): React.ReactNode[] => {
    const nodes: React.ReactNode[] = [];
    let remainingText = text;

    highlights.forEach((highlight, idx) => {
      const index = remainingText.indexOf(highlight.phrase);
      if (index !== -1) {
        if (index > 0) {
          nodes.push(remainingText.substring(0, index));
        }
        nodes.push(
          <span key={idx} className={styles.highlight}>
            {highlight.phrase}
          </span>
        );
        remainingText = remainingText.substring(index + highlight.phrase.length);
      }
    });

    if (remainingText.length > 0) {
      nodes.push(remainingText);
    }

    return nodes;
  };

  if (!isMounted) return null;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <motion.h1
          className={styles.nameText}
          initial={!skipAnimation ? { opacity: 0, y: 50 } : false}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Viraaj Singh
        </motion.h1>

        <div className={styles.description}>{text}</div>

        <motion.div
          className={styles.socialLinks}
          initial={!skipAnimation ? { opacity: 0 } : false}
          animate={{ opacity: animationComplete ? 1 : 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <a
            href="https://www.linkedin.com/in/viraaj-singh/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <FaLinkedin size={36} />
          </a>
          <a
            href="https://github.com/singvir23"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <FaGithub size={36} />
          </a>
          <a href="mailto:viraajsingh135@gmail.com" className={styles.socialLink}>
            <FaEnvelope size={36} />
          </a>
        </motion.div>
      </div>
    </div>
  );
}