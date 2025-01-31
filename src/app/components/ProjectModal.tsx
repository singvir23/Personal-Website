import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export interface Project {
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  image: string;
  workflowImage: string;
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
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!project || !isOpen) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center p-4"
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
          >
            <div className="p-6">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>

              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 pr-8">{project.title}</h2>

                {project.workflowImage && (
                  <div className="relative w-full h-96 mb-6 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={project.workflowImage}
                      alt={`${project.title} workflow`}
                      className="w-full h-full object-contain rounded-lg"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="prose max-w-none">
                  <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                    {project.longDescription}
                  </div>
                </div>

                {(project.github || project.demo) && (
                  <div className="flex flex-wrap gap-4 mt-6">
                    {project.github && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 rounded-md bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors"
                      >
                        <span className="mr-2">View Source</span>
                      </motion.a>
                    )}
                    {project.demo && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 rounded-md bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors"
                      >
                        <span className="mr-2">Live Demo</span>
                      </motion.a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Use createPortal to render the modal at the document body level
  return createPortal(modalContent, document.body);
}