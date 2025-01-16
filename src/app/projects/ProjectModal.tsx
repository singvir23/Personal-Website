"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, X } from 'lucide-react';

export interface Project {
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  image: string;
  workflowImage?: string;
  github: string;
  demo: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-4xl w-full bg-white rounded-lg shadow-xl z-60 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
          >
            <div className="relative p-6">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </button>

              <h2 className="text-2xl font-bold mb-4 pr-8">{project.title}</h2>
              
              <div className="space-y-6">
                {/* Display Workflow Image or Embedded Content */}
                {project.workflowImage ? (
                  project.workflowImage.includes('embed.figma.com') ? (
                    <iframe
                      style={{
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        width: "100%",
                        height: "450px",
                      }}
                      src={project.workflowImage}
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="aspect-video relative rounded-lg overflow-hidden">
                      <img
                        src={project.workflowImage}
                        alt={`${project.title} workflow`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )
                ) : (
                  <div className="aspect-video relative rounded-lg overflow-hidden">
                    <img
                      src="/api/placeholder/800/400"
                      alt={`${project.title} workflow`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}

                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    {project.longDescription || `${project.description} This is a longer description of the project that would go into detail about the technical challenges, solutions, and outcomes.`}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 transition-colors"
                    >
                      <Github size={20} /> View Source
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                      <ExternalLink size={20} /> Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
