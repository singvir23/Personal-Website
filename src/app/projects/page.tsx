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
    longDescription: "I've always wanted to build something that blends my love of music and technology. After considering several options, I decided on this project. When I initially started drumming, learning to read sheet music presented a huge difficulty for me. Us drummers refer to clusters of notes as 'rudiments,' which serve as the foundation or 'words' of the drumming language. To properly master drumming, you must learn these rudiments and variations.\n    While there is a wealth of available sheet music focusing on various rudiments, obtaining music tailored to your individual needs or ideas can be quite challenging. This difficulty prompted the development of my project.\n    This tool allows users to enter unique requests and receive personalized results that may not be available anywhere else on the internet. This is made possible by fine-tuning GPT-4 and utilizing 'Viraaj's Drumming Notation.' The notation is the training data for the LLM, and it is processed by a Python script(using AWS Lamda instances) that converts it to musicXML(sheet music coding language). This musicXML code is then converted into sheet music, allowing drummers to access custom exercises and compositions.\n    Above is a flow chart that shows my thought process throughout this project, as well as the next steps in its growth.\n\n    **Viraaj’s Drum Notation**\n\n    **Base Durations:**\n    - Whole: W\n    - Half: H\n    - Quarter: Q\n    - Eighth: E\n    - Sixteenth: S\n    - Thirty-second: T\n\n    **Rests:**\n    - Whole rest: RW\n    - Half rest: RH\n    - Quarter rest: RQ\n    - Eighth rest: RE\n    - Sixteenth rest: RS\n    - Thirty-second rest: RT\n\n    **Embellishment Tags (append to note):**\n    - Diddle: D\n    - Flam: F\n    - Accent: X\n    - Ghost: G",
    technologies: ['React', 'Node', 'Python', 'CSS', 'JavaScript', 'AWS', 'ChatGPT'],
    image: '/drumAI.jpeg',
    workflowImage: 'https://embed.figma.com/board/KouIzsSKkXAtlWrBVWQG0a/Drum-AI?node-id=0-1&embed-host=share',
    github: 'https://github.com/singvir23/drum-AI-v1.5',
    demo: 'https://drum-ai-frontend.vercel.app/',
  },
  {
    title: "Home Network",
    description: "Created a home network for my family using Ubuntu Server and other open-source tools. Established a remote connection for global access",
    longDescription: `I decided to create a home server for my family because we were tired of paying $85 a year for Google Cloud storage. I had an old PC lying dormant from my gaming days, so repurposing it as a home server seemed like a good way to bring it back to its glory days. With all the open-source resources, I was able to do this for a grand total of $0 (excluding the original PC cost, of course).
  
  Below, I’ve outlined the main functionalities of the server along with the technologies I used to achieve them:
  
  
  **Ubuntu Server Installation:**
  I installed Ubuntu Server to build a lightweight and efficient home server. The process included configuring the BIOS and making sure the OS was set up for remote management and future customization. Ubuntu Server doesn’t render a complicated UI, allowing for precious resources to be conserved.
  
  
  **Static IP Setup & SSH Access:**
  I set up a static IP address to keep the server accessible on the network and configured SSH for secure, remote access. This made managing the server from any device super convenient and straightforward.
  
  
  **SMB File Sharing:**
  Using Samba, I created a shared folder that works like a personal cloud for all my devices. It’s secure, easy to use, and lets me transfer files across Windows, macOS, and Linux without any hassle.
  
  
  **Jellyfin Media Server:**
  I set up Jellyfin to turn the server into a personal streaming platform for music, movies, and shows. Now, I can organize and stream my media collection to any device on my network.
  
  
  **Wireguard VPN:**
  I configured Wireguard to set up a secure VPN that connects me to my home server from anywhere. It’s fast, private, and works perfectly with the dynamic DNS I set up for remote access.
  
  `,
    technologies: ['Ubuntu', 'WireGuard', 'Jellyfin'],
    image: '/server.jpeg',
    workflowImage: '/serverwork.jpeg',
    github: 'https://github.com/singvir23/News-Webscraper',
    demo: 'https://news-webscraper-red.vercel.app/',
  },
 
  {
    title: "News Webscraper",
    description: "A webscraper designed to compare FOX and CNN in their images and word counts. Developed for the UMD Digital Engagement Lab",
    longDescription: "This project is intended to further the research in the Digital Engagement Lab at UMD. The Digital Engagement Lab, run by Professor Ronald Yaros, aims to refine a research-based digital content structure model.",
    technologies: ['React', 'Python', 'BeautifulSoup'],
    image: '/cnn.png',
    workflowImage: '/cnn.png',
    github: 'https://github.com/singvir23/News-Webscraper',
    demo: 'https://news-webscraper-red.vercel.app/',
  },
  {
    title: "Sentimental Chatbot",
    description: "A syllabus chatbot for 70 JOUR289i students using LLMs and sentiment analysis to address queries and direct those with negativity to UMD resources.",
    longDescription: "The Sentimental Chatbot was created for my Professor’s JOUR289i class with around 70 students. He told me that numerous students would ask him questions that could be directly answered by the syllabus. To solve this problem, he wanted me to create a chatbot which can answer these syllabus related questions for him. \n\tChatGPT has an Assistants API which allows the use of files as context for the model. Using the syllabus as the “context,” the model is easily able to answer any questions related to the syllabus. One issue I ran into was having the model make up information which wasn’t on the syllabus. To address this, I used some negative prompting to ensure that any non-answerable question is directed to the Professor’s email.\n\tTo raise mental health awareness and provide useful resources, I incorporated sentiment analysis into the model. When the system detects that a student's mood is negative or sad it automatically provides UMD-specific resources to help them get the help they need. This ensures that students who might not know where to turn can easily access the support services available to them.",
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
                    project.title === 'AI Drum Lick Generator' ? styles.drumAIImage :
                    project.title === 'News Webscraper' ? styles.newsWebscraperImage : ''
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

                {project.title !== "Home Network" ? (
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
                ) : null}
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
