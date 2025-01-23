"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react"; // Import icons for hamburger menu

// Define types
type NavItem = {
  name: string;
  path: string;
};

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [hideNav, setHideNav] = useState(true);
  const [skipNavAnimation, setSkipNavAnimation] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navItems: NavItem[] = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Skills", path: "/skills" },
  ];

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setIsMounted(true);
    const ran = localStorage.getItem("introRan");
    if (ran === "true") {
      setHideNav(false);
      setSkipNavAnimation(true);
    }
  }, []);

  useEffect(() => {
    function handleStorageChange() {
      const ran = localStorage.getItem("introRan");
      if (ran === "true") {
        setHideNav(false);
        setSkipNavAnimation(true);
      }
    }
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    if (pathname === "/projects" || pathname === "/skills") {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setIsScrolled(false);
    }
  }, [pathname]);

  if (!isMounted) return null;
  if (hideNav) return null;

  return (
    <nav
      className={`fixed top-0 w-full z-50 font-quicksand transition-all duration-300 px-6 py-4
        ${
          isScrolled && (pathname === "/projects" || pathname === "/skills")
            ? "bg-white/80 backdrop-blur shadow-md"
            : "bg-[#fdfdfd]"
        }`}
    >
      <div className="w-full flex justify-between items-center px-6">
        <Link href="/" aria-label="Go to Home">
          <div className="w-16 h-16 z-[60] cursor-pointer transition-opacity duration-300">
            <img
              src="/finalscreen.png"
              alt="Navbar Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="flex items-center flex-1 relative ml-8">
            {!skipNavAnimation ? (
              <AnimatePresence>
                <motion.div
                  className="flex justify-center gap-6 flex-1 relative"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    hidden: { opacity: 0, y: -20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                >
                  {navItems.map((item) => (
                    <motion.div
                      key={item.path}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                    >
                      <Link href={item.path}>
                        <motion.button
                          whileHover={{
                            scale: 1.1,
                            y: -2,
                            color: "#34D399", // light green
                          }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-6 py-2 rounded-full 
                            text-base z-10 relative
                            ${
                              pathname === item.path
                                ? "text-[#34D399]" // active route also green
                                : "text-gray-600 hover:text-gray-800"
                            }
                          `}
                        >
                          {item.name}
                        </motion.button>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="flex justify-center gap-6 flex-1 relative">
                {navItems.map((item) => (
                  <div key={item.path}>
                    <Link href={item.path}>
                      <button
                        className={`px-6 py-2 rounded-full text-base z-10 relative
                          ${
                            pathname === item.path
                              ? "text-[#34D399]"
                              : "text-gray-600 hover:text-gray-800"
                          }
                        `}
                      >
                        {item.name}
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Mobile Hamburger Menu */}
        {isMobile && (
          <div className="relative">
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
                        <Link
                          key={item.path}
                          href={item.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <motion.div
                            whileHover={{ x: 4, color: "#34D399" }}
                            className={`p-2 rounded-lg cursor-pointer ${
                              pathname === item.path
                                ? "bg-green-50 text-[#34D399]"
                                : "text-gray-600 hover:text-gray-800"
                            }`}
                          >
                            {item.name}
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </nav>
  );
}
