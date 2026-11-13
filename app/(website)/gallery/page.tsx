"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const GALLERY_ITEMS = [
  { id: 1, title: "Grand Lobby & Chandelier", category: "Lobby", img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80" },
  { id: 2, title: "Infinity Pool at Sunset", category: "Pool", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80" },
  { id: 3, title: "Presidential Bedroom Suite", category: "Rooms", img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80" },
  { id: 4, title: "The Royal Mirage Fine Dining", category: "Dining", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80" },
  { id: 5, title: "Holistic Herbal Spa & Sauna", category: "Spa", img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80" },
  { id: 6, title: "Executive Grand Ballroom", category: "Events", img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80" },
  { id: 7, title: "Italian Marble Bath & Jacuzzi", category: "Rooms", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80" },
  { id: 8, title: "Rooftop Sky Lounge", category: "Dining", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80" },
  { id: 9, title: "State-of-the-Art Fitness Center", category: "Wellness", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80" },
  { id: 10, title: "Private Garden Terrace", category: "Lobby", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80" },
  { id: 11, title: "Master Chef Culinary Art", category: "Dining", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80" },
  { id: 12, title: "Luxury Honeymoon Canopy Bed", category: "Rooms", img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80" },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const categories = ["All", "Rooms", "Dining", "Pool", "Spa", "Lobby", "Events"];

  const filteredItems = GALLERY_ITEMS.filter((item) =>
    activeCategory === "All" ? true : item.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-[#FDFBF9] pt-24 pb-20">
      {/* Header */}
      <div className="relative bg-hotel-navy py-16 text-white text-center mb-12">
        <div className="container mx-auto px-4">
          <span className="text-hotel-gold text-xs tracking-widest uppercase font-semibold">
            Visual Journey
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-heading mt-2 mb-4">
            Our World in Pictures
          </h1>
          <p className="max-w-xl mx-auto text-gray-300 text-sm">
            Immerse yourself in the architecture, gastronomy, and bespoke luxury that define StaySync.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Categories Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
                activeCategory === cat
                  ? "bg-hotel-navy text-hotel-gold shadow"
                  : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={() => setLightboxImg(item.img)}
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-md bg-stone-100"
            >
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <Badge className="bg-hotel-gold text-stone-900 w-fit mb-2 text-[10px] font-bold">
                  {item.category}
                </Badge>
                <h3 className="font-heading font-bold text-lg leading-tight">{item.title}</h3>
                <span className="text-xs text-stone-300 mt-1 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> Click to enlarge
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightboxImg(null)}
          >
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-6 right-6 text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative max-w-4xl max-h-[85vh] w-full h-[600px]">
              <Image src={lightboxImg} alt="Enlarged gallery view" fill className="object-contain" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
