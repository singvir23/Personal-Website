// Updated Navbar Component
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

type NavItem = {
  name: string;
  path: string;
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { name: "Home", path: "#home" },
    { name: "About", path: "#about" }, // Added About section
    { name: "Projects", path: "#projects" },
    { name: "Skills", path: "#skills" },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isMounted) return null;

  // Smooth Scroll Function
  const handleNavItemClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(path);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
    // Close mobile menu if open
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4 ${
        isScrolled ? "bg-white/80 backdrop-blur shadow-md" : "bg-[#fdfdfd]"
      }`}
    >
      <div className="w-full flex justify-between items-center px-6">
        {/* Logo */}
        <a href="#home" aria-label="Go to Home">
          <div className="w-16 h-16 z-[60] cursor-pointer transition-opacity duration-300">
            <img
              src="/finalscreen.png"
              alt="Navbar Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center flex-1 relative ml-8">
          <div className="flex justify-center gap-6 flex-1 relative">
            {navItems.map((item) => (
              <div key={item.path}>
                <a
                  href={item.path}
                  onClick={(e) => handleNavItemClick(e, item.path)}
                >
                  <motion.button
                    whileHover={{
                      scale: 1.1,
                      y: -2,
                      color: "#34D399",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 rounded-full text-base text-gray-600 hover:text-gray-800"
                  >
                    {item.name}
                  </motion.button>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden relative">
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-white/80 backdrop-blur-sm z-40"
                  onClick={() => setIsMobileMenuOpen(false)}
                />
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 20 }}
                  className="fixed right-0 top-0 h-screen w-64 bg-white shadow-lg z-50 pt-20"
                >
                  <div className="flex flex-col space-y-4 p-6">
                    {navItems.map((item) => (
                      <a
                        key={item.path}
                        href={item.path}
                        onClick={(e) => handleNavItemClick(e, item.path)}
                      >
                        <motion.div
                          whileHover={{ x: 4, color: "#34D399" }}
                          className="p-2 rounded-lg cursor-pointer text-gray-600 hover:text-gray-800"
                        >
                          {item.name}
                        </motion.div>
                      </a>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
