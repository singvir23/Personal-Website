"use client";

import React, { useRef, useState, memo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { ProjectModal, Project } from './ProjectModal';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import styles from './Projects.module.css';

// Define types for tech icons
type TechIconType = {
  src: string;
  preload: boolean;
};

type TechIconsType = {
  [key: string]: TechIconType;
};

// Define your tech icons (no need to preload here)
const techIcons: TechIconsType = {
  React: { src: '/icons/react.svg', preload: true },
  Node: { src: '/icons/node.svg', preload: true },
  Python: { src: '/icons/python.svg', preload: true },
  CSS: { src: '/icons/css.svg', preload: true },
  JavaScript: { src: '/icons/javascript.svg', preload: true },
  Ubuntu: { src: '/icons/ubuntu.png', preload: false },
  WireGuard: { src: '/icons/wireguard.png', preload: false },
  Jellyfin: { src: '/icons/jellyfin.svg', preload: false },
  AWS: { src: '/icons/AWS.svg', preload: true },
  BeautifulSoup: { src: '/icons/soup.png', preload: false },
  GCP: { src: '/icons/gcp.svg', preload: false },
  ChatGPT: { src: '/icons/chat.svg', preload: false },
};

const projects: Project[] = [
  {
    title: "AI Drum Lick Generator",
    description: "A tool that converts textual descriptions into sheet music, helping drum students learn rudiments—the building blocks of drumming.",
    longDescription: `I’ve always wanted to build something that blends my passion for music and technology. After ideating, I thought this one was the most applicable. When I started drumming, I was tasked with learning the “40 rudiments.” I like to describe these as the “words” of the drumming “language.” Most drumming phrases consist of these rudiments stitched together in different ways. When I was learning these rudiments, my teacher pointed me to online resources. However, it got much harder to locate online resources as we began adding variations, or "embellishments," to these rudiments. This resulted in my teacher writing down the patterns on sheets that I would lose the next day 😬😅.
  
  This brings me to the creation of the product. After experimenting with a variety of models, I concluded that fine-tuning an LLM would be the most effective strategy. It could easily process a user's textual input and produce an output I could fine-tune. I used musicXML and the Open Sheet Music Display API to write and display the sheet music. My LLM of choice had a foundation of musicXML, and I fine-tuned it on more data points to refine its skills. At the end of the training, the model could produce a measure of music reliably; however, it was EXTREMELY slow and expensive. The outputs would be 200 lines of code for only 8-16 notes. I knew that this wouldn’t be scalable.
  
  After giving it more thought and consulting some people with more experience than myself, I came to the approach the model is currently using. I developed my own custom drum notation, which maps a sequence of characters to a given note. That custom drum notation is what the LLM is fine-tuned on. From there, the sequence of characters is tokenized and then converted to musicXML. That musicXML is processed by the Open Sheet Music Display API and displayed to the user. This nifty approach resulted in times ranging from 5-10 seconds, meaning there was a significant reduction in the output time. It also became much cheaper as the outputs went from 200 lines to 200 characters.
  
  **Viraaj's Drum Notation**
  
  **Base Note Symbols:**
  - **W (Whole Note):** Occupies the entire 4/4 measure.
  - **H (Half Note):** Half of a 4/4 measure.
  - **Q (Quarter Note):** One-quarter of a 4/4 measure.
  - **E (Eighth Note):** One-eighth of a 4/4 measure.
  - **S (Sixteenth Note):** One-sixteenth of a 4/4 measure.
  - **T (Thirty-Second Note):** One thirty-second of a 4/4 measure.
  
  **Triplets (represented with a number suffix):**
  - **Q3 (Quarter-Note Triplet):** Three quarter triplets fit into the space of two normal quarter notes. Each Q3 takes up 1/6 of the measure.
  - **E3 (Eighth-Note Triplet):** Three eighth triplets fit into the space of two normal eighth notes. Each E3 takes up 1/12 of the measure.
  - **S3 (Sixteenth-Note Triplet):** Three sixteenth triplets fit into the space of two normal sixteenth notes. Each S3 takes up 1/24 of the measure.
  
  **Modifiers & Suffixes:**
  To modify how a note is played, the following suffixes are used:
  - **X (Accent):** Highlights the note with an accent (e.g., RQX).
  - **F (Flam):** Indicates a flam, where a grace note precedes the main note (e.g., LSF).
  - **D (Diddle):** Represents a diddle, where the note is played as a double stroke (e.g., REXD).
  - **G (Ghost):** Marks a ghost note, which is played at a softer dynamic (e.g., S3G).
  
  **Examples of Viraaj's Drum Notation:**
  
  - RQ RQ RE RE RS RS RS RS|LQ LQ LE LE LS LS LS LS
  - RQ RQ RQ RQ|RQ RQ RQ RQ
  - RQXFD RQXFD RQXFD RQXFD
  - RE3 LE3 RE3 RE3F  LE3 RE3 LE3 LE3F  RE3 LE3 RE3 RE3F`,
    technologies: ['React', 'Node', 'Python', 'CSS', 'JavaScript', 'AWS', 'ChatGPT'],
    image: '/drumAI.jpeg',
    workflowImage: '/drumAI.jpeg',
    github: 'https://github.com/singvir23/drum-AI-v1.5',
    demo: 'https://drum-ai-frontend.vercel.app/'
  },
  
  {
    title: "Home Network",
    description: "Created a home network for my family using Ubuntu Server and other open-source tools. Established a remote connection for global access",
    longDescription: `I decided to create a home server for my family because we were tired of paying $85 a year for Google Cloud storage. I had an old PC lying dormant from my gaming days, so repurposing it as a home server seemed like a good way to bring it back to its glory days. With all the open-source resources, I was able to do this for a grand total of $0 (excluding the original PC cost, of course).
  
  Below, I've outlined the main functionalities of the server along with the technologies I used to achieve them:
  
  
  **Ubuntu Server Installation:**
  I installed Ubuntu Server to build a lightweight and efficient home server. The process included configuring the BIOS and making sure the OS was set up for remote management and future customization. Ubuntu Server doesn't render a complicated UI, allowing for precious resources to be conserved.
  
  
  **Static IP Setup & SSH Access:**
  I set up a static IP address to keep the server accessible on the network and configured SSH for secure, remote access. This made managing the server from any device super convenient and straightforward.
  
  
  **SMB File Sharing:**
  Using Samba, I created a shared folder that works like a personal cloud for all my devices. It's secure, easy to use, and lets me transfer files across Windows, macOS, and Linux without any hassle.
  
  
  **Jellyfin Media Server:**
  I set up Jellyfin to turn the server into a personal streaming platform for music, movies, and shows. Now, I can organize and stream my media collection to any device on my network.
  
  
  **Wireguard VPN:**
  I configured Wireguard to set up a secure VPN that connects me to my home server from anywhere. It's fast, private, and works perfectly with the dynamic DNS I set up for remote access.
  
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
    longDescription: "The Sentimental Chatbot was created for my Professor's JOUR289i class with around 70 students. He told me that numerous students would ask him questions that could be directly answered by the syllabus. To solve this problem, he wanted me to create a chatbot which can answer these syllabus related questions for him. \n\tChatGPT has an Assistants API which allows the use of files as context for the model. Using the syllabus as the 'context,' the model is easily able to answer any questions related to the syllabus. One issue I ran into was having the model make up information which wasn't on the syllabus. To address this, I used some negative prompting to ensure that any non-answerable question is directed to the Professor's email.\n\tTo raise mental health awareness and provide useful resources, I incorporated sentiment analysis into the model. When the system detects that a student's mood is negative or sad it automatically provides UMD-specific resources to help them get the help they need. This ensures that students who might not know where to turn can easily access the support services available to them.",
    technologies: ['React', 'Node', 'GCP', 'ChatGPT'],
    image: '/chatbot.png',
    workflowImage: '/chatbot.png',
    github: 'https://github.com/singvir23/yaros-chatbot',
    demo: 'https://drive.google.com/file/d/1CdVCUjapCLYi-fSQipEHLb0fcyTg85CH/view?usp=sharing',
  },
];

const TechIcon = memo(({ tech, index }: { tech: string; index: number }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      className={styles.techIconWrapper}
      whileHover={{ scale: 1.1 }}
      data-tooltip-id={`tooltip-${tech}-${index}`}
      data-tooltip-content={tech}
    >
      <Image
        src={techIcons[tech].src}
        alt={tech}
        className={`${styles.techIcon} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
        onLoadingComplete={() => setIsLoaded(true)}
        width={32} // Adjust width as needed
        height={32} // Adjust height as needed
      />
      <Tooltip id={`tooltip-${tech}-${index}`} place="top" variant="dark" />
    </motion.div>
  );
});
TechIcon.displayName = 'TechIcon';

const ProjectImage = memo(({ project }: { project: Project }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={styles.imageContainer}>
      <motion.div className={`${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Image
          src={project.image}
          alt={project.title}
          className={`
            ${styles.projectImage} 
            ${project.title === 'AI Drum Lick Generator' ? styles.drumAIImage :
              project.title === 'News Webscraper' ? styles.newsWebscraperImage : ''}
          `}
          loading="lazy"
          onLoadingComplete={() => setIsLoaded(true)}
          width={600} // Adjust width as needed
          height={400} // Adjust height as needed
        />
      </motion.div>
      {!isLoaded && (
        <div className="animate-pulse bg-gray-200 w-full h-full absolute top-0 left-0" />
      )}
    </div>
  );
});
ProjectImage.displayName = 'ProjectImage';

const ProjectCard = memo(({ project, index, onSelect }: { 
  project: Project; 
  index: number; 
  onSelect: (project: Project) => void;
}) => {
  const cardVariants = {
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  };

  return (
    <div className={styles.projectCard}>
      <motion.div
        className={`${styles.projectContent} cursor-pointer`}
        variants={cardVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={() => onSelect(project)}
      >
        <ProjectImage project={project} />

        <div className={styles.projectDetails}>
          <h3 className={styles.projectTitle}>{project.title}</h3>
          <p className={styles.projectDescription}>{project.description}</p>

          <div className={styles.techStack}>
            {project.technologies.map((tech) => (
              <TechIcon key={tech} tech={tech} index={index} />
            ))}
          </div>

          {project.title !== "Home Network" && (
            <ProjectLinks github={project.github} demo={project.demo} />
          )}
        </div>
      </motion.div>
    </div>
  );
});
ProjectCard.displayName = 'ProjectCard';

const ProjectLinks = memo(({ github, demo }: { github: string; demo: string }) => (
  <div className={styles.projectLinks}>
    <motion.a
      whileHover={{ scale: 1.05, y: -2 }}
      className={styles.githubLink}
      href={github}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
    >
      <Github size={20} /> View Source
    </motion.a>
    <motion.a
      whileHover={{ scale: 1.05, y: -2 }}
      className={styles.demoLink}
      href={demo}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
    >
      <ExternalLink size={20} /> Live Demo
    </motion.a>
  </div>
));
ProjectLinks.displayName = 'ProjectLinks';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section ref={containerRef} className={styles.projectsContainer}>
      <h2 className={styles.projectsHeader}>Projects</h2>
      <div className={styles.projectsWrapper}>
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            onSelect={setSelectedProject}
          />
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
