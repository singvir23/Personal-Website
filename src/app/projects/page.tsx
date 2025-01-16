"use client";

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { ProjectModal, Project } from './ProjectModal';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'; 
import styles from './Projects.module.css';

const techIcons: { [key: string]: string } = {
  React: '/icons/react.svg',
  Node: '/icons/node.svg',
  Python: '/icons/python.svg',
  CSS: '/icons/css.svg',
  JavaScript: '/icons/javascript.svg',
  Ubuntu: '/icons/ubuntu.png',
  WireGuard: '/icons/wireguard.png',
  Jellyfin: '/icons/jellyfin.svg',
  AWS: '/icons/AWS.svg',
  BeautifulSoup: '/icons/soup.png',
  GCP: '/icons/gcp.svg',
  ChatGPT: '/icons/chat.svg',
  // Add more technologies and their corresponding icons here
};

const projects: Project[] = [
  {
    title: "AI Drum Lick Generator",
    description: "A tool that converts textual descriptions into sheet music, helping drum students learn rudiments—the building blocks of drumming.",
    longDescription: "I&apos;ve always wanted to build something that blends my love of music and technology. After considering several options, I decided on this project. When I initially started drumming, learning to read sheet music presented a huge difficulty for me. Us drummers refer to clusters of notes as &apos;rudiments,&apos; which serve as the foundation or &apos;words&apos; of the drumming language. To properly master drumming, you must learn these rudiments and variations.\n    While there is a wealth of available sheet music focusing on various rudiments, obtaining music tailored to your individual needs or ideas can be quite challenging. This difficulty prompted the development of my project.\n    This tool allows users to enter unique requests and receive personalized results that may not be available anywhere else on the internet. This is made possible by fine-tuning GPT-4 and utilizing &apos;Viraaj&apos;s Drumming Notation.&apos; The notation is the training data for the LLM, and it is processed by a Python script that converts it to MusicXML. This musicXML code is then converted into sheet music, allowing drummers to access custom exercises and compositions.\n    Above is a flow chart that shows my thought process throughout this project, as well as the next steps in its growth.",
    technologies: ['React', 'Node', 'Python', 'CSS', 'JavaScript', 'AWS', 'ChatGPT'],
    image: '/drumAI.png',
    workflowImage: 'https://embed.figma.com/board/KouIzsSKkXAtlWrBVWQG0a/Drum-AI?node-id=0-1&embed-host=share',
    github: 'https://github.com/singvir23/drum-AI-v1.5',
    demo: 'https://drum-ai-frontend.vercel.app/',
  },
  {
    title: "Home Network",
    description: "Created a home network for my family using Ubuntu Server and other open-source tools. Established a remote connection for global access",
    longDescription: "The AI Drum Lick Generator utilizes deep learning models to create unique and musically coherent drum patterns. Built with a React frontend and Node.js backend, the application processes MIDI data to train a neural network that can generate realistic drum sequences. Users can specify parameters like tempo, complexity, and style to influence the generated patterns.",
    technologies: ['Ubuntu', 'WireGuard', 'Jellyfin'],
    image: '/api/placeholder/600/400',
    workflowImage: '/api/placeholder/800/400',
    github: 'https://github.com/singvir23/drum-AI-v1.5',
    demo: 'https://drum-ai-frontend.vercel.app/',
  },
  {
    title: "News Webscraper",
    description: "A webscraper designed to compare FOX and CNN in their images and word counts. Developed for the UMD Digital Engagement Lab",
    longDescription: "This project is intended to further the research in the Digital Engagement Lab at UMD. The Digital Engagement Lab, run by Professor Ronald Yaros, aims to refine a research-based digital content structure model.",
    technologies: ['React', 'Python', 'BeautifulSoup'],
    image: '/cnn.png',
    workflowImage: '/api/placeholder/800/400',
    github: 'https://github.com/singvir23/News-Webscraper',
    demo: 'https://news-webscraper-red.vercel.app/',
  },
  {
    title: "SentiMental Chatbot",
    description: "A syllabus chatbot for 70 journalism students combines LLM&apos;s with sentiment analysis to address queries and guide those with negative emotions to UMD mental health resources.",
    longDescription: "The Sentimental Chatbot is for my Professor&apos;s journalism class with around 70 students. He told me that he was getting a lot of questions that could be easily be answered by the syllabus. After hearing this, I realized that I could utilize ChatGPT&apos;s assistants API to create a syllabus chatbot for him. I provided the syllabus as context, and the assistants API utulizes RAG to find the answer to the query. To solve the issue of hallucinations, I employed heavy negative prompting to ensure the model only answers questions directly related to the syllabus or class. In the case that the query doesn&apos;t meet these parameters, the chatbot instructs the student to email the Professor.",
    technologies: ['React', 'Node', 'GCP', 'ChatGPT'],
    image: 'chatbot.png',
    workflowImage: 'chatbot.png',
    github: 'https://github.com/singvir23/yaros-chatbot',
    demo: 'https://drive.google.com/file/d/1CdVCUjapCLYi-fSQipEHLb0fcyTg85CH/view?usp=sharing',
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section ref={containerRef} className={styles.projectsContainer}>
      <div className={styles.projectsWrapper}>
        {projects.map((project, index) => (
          <div key={project.title} className={styles.projectCard}>
            <motion.div
              className={`${styles.projectContent} cursor-pointer`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedProject(project)}
            >
              <div className={styles.imageContainer}>
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className={`${styles.projectImage} ${
                    project.title === 'AI Drum Lick Generator' ? styles.drumAIImage : ''
                  }`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <div className={styles.projectDetails}>
                <h3 className={styles.projectTitle}>{project.title}</h3>

                <p className={styles.projectDescription}>{project.description}</p>

                <div className={styles.techStack}>
                  {project.technologies.map((tech) => (
                    <motion.div
                      key={tech}
                      className={styles.techIconWrapper}
                      whileHover={{ scale: 1.1 }}
                      data-tooltip-id={`tooltip-${tech}-${index}`}
                      data-tooltip-content={tech}
                    >
                      <img
                        src={techIcons[tech]}
                        alt={tech}
                        className={styles.techIcon}
                      />
                      <Tooltip
                        id={`tooltip-${tech}-${index}`}
                        place="top"
                        variant="dark"
                      />
                    </motion.div>
                  ))}
                </div>

                <div className={styles.projectLinks}>
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={styles.githubLink}
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github size={20} /> View Source
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={styles.demoLink}
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={20} /> Live Demo
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}