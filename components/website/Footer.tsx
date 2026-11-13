"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Diamond, Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const quickLinks = [
  { href: "/rooms", label: "Our Rooms" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/rooms", label: "Book a Room" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-hotel-navy text-white">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <Diamond className="w-7 h-7 text-hotel-gold transition-transform duration-300 group-hover:rotate-45" />
              <div className="flex flex-col">
                <span className="text-xl font-heading font-bold tracking-tight">
                  StaySync
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-hotel-gold -mt-1">
                  Luxury Hotel
                </span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed font-body">
              Experience unparalleled luxury at StaySync. Our world-class amenities, 
              exquisite dining, and personalized service create unforgettable memories 
              for every guest.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-hotel-gold hover:border-hotel-gold hover:text-white transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-heading font-semibold">
              Quick Links
            </h3>
            <div className="w-10 h-0.5 bg-hotel-gold rounded-full" />
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-hotel-gold text-sm font-body transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-hotel-gold/40 group-hover:bg-hotel-gold transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-heading font-semibold">
              Contact Info
            </h3>
            <div className="w-10 h-0.5 bg-hotel-gold rounded-full" />
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-hotel-gold mt-0.5 shrink-0" />
                <span className="text-sm text-white/60 font-body">
                  123 Luxury Avenue, Gulshan-2,
                  <br />
                  Dhaka 1212, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-hotel-gold shrink-0" />
                <div className="text-sm text-white/60 font-body">
                  <a href="tel:+8801234567890" className="hover:text-hotel-gold transition-colors block">
                    +880 1234-567890
                  </a>
                  <a href="tel:+8801234567891" className="hover:text-hotel-gold transition-colors block">
                    +880 1234-567891
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-hotel-gold shrink-0" />
                <a
                  href="mailto:info@staysync.hotel"
                  className="text-sm text-white/60 hover:text-hotel-gold transition-colors font-body"
                >
                  info@staysync.hotel
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-lg font-heading font-semibold">
              Newsletter
            </h3>
            <div className="w-10 h-0.5 bg-hotel-gold rounded-full" />
            <p className="text-sm text-white/60 font-body">
              Subscribe to our newsletter for exclusive deals, special offers, 
              and the latest updates from StaySync.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 pr-12 focus-visible:ring-hotel-gold/50 focus-visible:border-hotel-gold"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1/2 -translate-y-1/2 p-2 text-hotel-gold hover:text-hotel-gold-light transition-colors"
                  aria-label="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              {subscribed && (
                <p className="text-hotel-gold text-xs font-body animate-fade-in">
                  ✓ Thank you for subscribing!
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <Separator className="bg-white/10" />
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40 font-body">
            © {new Date().getFullYear()} StaySync. All rights reserved. Crafted with elegance.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-xs text-white/40 hover:text-hotel-gold transition-colors font-body"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-xs text-white/40 hover:text-hotel-gold transition-colors font-body"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-xs text-white/40 hover:text-hotel-gold transition-colors font-body"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
