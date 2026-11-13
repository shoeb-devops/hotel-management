"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Diamond, Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/admin/dashboard", label: "Admin Portal" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <>
      {/* Top bar */}
      <div className="hidden lg:block bg-hotel-navy text-white/80 text-xs py-2">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3 h-3" />
              +880 1234-567890
            </span>
            <span>info@staysync.hotel</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Dhaka, Bangladesh</span>
            <span className="text-hotel-gold">★★★★★</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-500",
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-hotel-gold/10"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <Diamond className="w-8 h-8 text-hotel-gold transition-transform duration-300 group-hover:rotate-45" />
              <div className="flex flex-col">
                <span className="text-2xl font-heading font-bold tracking-tight text-hotel-navy">
                  StaySync
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-hotel-gold -mt-1">
                  Luxury Hotel
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium font-body transition-colors duration-200 rounded-lg",
                      isActive
                        ? "text-hotel-gold"
                        : isScrolled
                        ? "text-hotel-navy hover:text-hotel-gold"
                        : "text-hotel-navy/80 hover:text-hotel-gold"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-hotel-gold rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Link href="/rooms" className="hidden md:inline-flex">
                <Button variant="secondary" size="default" className="btn-gold rounded-full">
                  Book Now
                </Button>
              </Link>

              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden p-2 rounded-lg text-hotel-navy hover:bg-hotel-navy/5 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 lg:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Mobile header */}
                <div className="flex items-center justify-between p-6 border-b border-hotel-gold/10">
                  <div className="flex items-center gap-2">
                    <Diamond className="w-6 h-6 text-hotel-gold" />
                    <span className="text-xl font-heading font-bold text-hotel-navy">
                      StaySync
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5 text-hotel-navy" />
                  </button>
                </div>

                {/* Mobile nav links */}
                <nav className="flex-1 py-6 px-4">
                  {navLinks.map((link, index) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 + 0.1 }}
                      >
                        <Link
                          href={link.href}
                          className={cn(
                            "block px-4 py-3.5 rounded-xl text-base font-medium font-body transition-all duration-200 mb-1",
                            isActive
                              ? "bg-hotel-navy text-white"
                              : "text-hotel-navy hover:bg-hotel-cream"
                          )}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Mobile CTA */}
                <div className="p-6 border-t border-hotel-gold/10">
                  <Link href="/rooms" className="block">
                    <Button variant="secondary" className="w-full btn-gold rounded-full" size="lg">
                      Book Now
                    </Button>
                  </Link>
                  <div className="mt-4 text-center">
                    <a
                      href="tel:+8801234567890"
                      className="text-sm text-hotel-navy/60 hover:text-hotel-gold transition-colors flex items-center justify-center gap-2"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      +880 1234-567890
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
