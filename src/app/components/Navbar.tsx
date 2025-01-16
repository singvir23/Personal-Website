"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Define types
type NavItem = {
  name: string;
  path: string;
};

type NavRefs = {
  [key: string]: HTMLDivElement | null;
};

type HighlightStyle = {
  left: number;
  width: number;
};

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [hideNav, setHideNav] = useState(true);
  const [skipNavAnimation, setSkipNavAnimation] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const navItems: NavItem[] = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Skills", path: "/skills" },
  ];

  const navRefs = useRef<NavRefs>({});

  const [highlightStyle, setHighlightStyle] = useState<HighlightStyle>({
    left: 0,
    width: 0,
  });

  const updateHighlight = useCallback(() => {
    const activeItem = navItems.find((item) => item.path === pathname) || navItems[0];
    const activeRef = navRefs.current[activeItem.path];
    const containerRect = containerRef.current?.getBoundingClientRect();

    if (activeRef && containerRect) {
      const rect = activeRef.getBoundingClientRect();
      setHighlightStyle({
        left: rect.left - containerRect.left,
        width: rect.width,
      });
    }
  }, [pathname]);

  // Modified to prevent screen refresh
  useEffect(() => {
    setIsMounted(true);
    const ran = localStorage.getItem("introRan");
    if (ran === "true") {
      setHideNav(false);
      setSkipNavAnimation(true);
      // Delay the highlight update to ensure DOM is ready
      requestAnimationFrame(() => {
        updateHighlight();
      });
    }
  }, [updateHighlight]);

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

  useEffect(() => {
    // Delay the highlight update to ensure proper positioning
    const timer = setTimeout(() => {
      updateHighlight();
    }, 100);
    return () => clearTimeout(timer);
  }, [pathname, isMounted, updateHighlight]);

  useEffect(() => {
    const handleResize = () => {
      updateHighlight();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateHighlight]);

  if (!isMounted) return null;
  if (hideNav) return null;

  return (
    <nav
      className={`fixed top-0 w-full z-50 font-quicksand transition-all duration-300 px-6 py-4
        ${isScrolled && (pathname === "/projects" || pathname === "/skills")
          ? "bg-white/80 backdrop-blur shadow-md"
          : "bg-[#fdfdfd]"
        }`}
    >
      <div className="w-full flex justify-between items-center px-6">
        <div className="flex items-center flex-1 relative" ref={containerRef}>
          <Link href="/" aria-label="Go to Home">
            <div className="mr-auto w-16 h-16 z-[60] cursor-pointer transition-opacity duration-300">
              <img
                src="/finalscreen.png"
                alt="Navbar Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </Link>

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
                    ref={(el) => {
                      if (el) navRefs.current[item.path] = el;
                    }}
                  >
                    <Link href={item.path}>
                      <motion.button
                        whileHover={{
                          scale: 1.1,
                          y: -2,
                          backgroundColor: "rgb(220 252 231)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-6 py-2 rounded-full text-gray-600 hover:text-gray-800 bg-transparent border-none cursor-pointer text-base z-10 relative
                          ${pathname === item.path ? "text-gray-800" : ""}`}
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
                <div
                  key={item.path}
                  ref={(el) => {
                    if (el) navRefs.current[item.path] = el;
                  }}
                >
                  <Link href={item.path}>
                    <button
                      className={`px-6 py-2 rounded-full text-gray-600 hover:text-gray-800 bg-transparent border-none cursor-pointer text-base z-10 relative
                        ${pathname === item.path ? "text-gray-800" : ""}`}
                    >
                      {item.name}
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          )}

          <motion.div
            className="absolute top-1/2 -translate-y-1/2 rounded-full bg-black/5 shadow-inner pointer-events-none z-[5]"
            layout
            initial={false}
            animate={{
              left: highlightStyle.left,
              width: highlightStyle.width,
              height: "40px",
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </div>
      </div>
    </nav>
  );
}