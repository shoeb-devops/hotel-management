"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Wifi,
  Tv,
  Wind,
  Bath,
  Coffee,
  Users,
  Maximize2,
  BedDouble,
  SlidersHorizontal,
  Star,
  Check,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

const ALL_ROOMS = [
  {
    id: "standard-room",
    name: "Deluxe Standard Room",
    slug: "standard-room",
    category: "Standard",
    price: 4500,
    rating: 4.8,
    reviews: 124,
    size: "280 sq ft",
    bed: "Queen Bed",
    capacity: 2,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80",
    description: "Ideal for solo travelers and couples. Combines comfortable bedding, a work desk, smart entertainment, and modern bath accessories.",
    amenities: ["Free High-speed Wi-Fi", "Smart HD TV", "Climate Control AC", "Rain Shower", "Work Desk", "Complimentary Water"],
    popular: false,
  },
  {
    id: "deluxe-king-suite",
    name: "Luxury Deluxe King",
    slug: "deluxe-king-suite",
    category: "Deluxe",
    price: 7500,
    rating: 4.9,
    reviews: 210,
    size: "380 sq ft",
    bed: "King Bed",
    capacity: 3,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    description: "Spacious luxury room overlooking the scenic skyline. Equipped with Italian marble bathroom, mini bar, and plush king bed.",
    amenities: ["City View Balcony", "Free Wi-Fi", "Mini Bar & Coffee", "Bathtub & Jacuzzi Shower", "Breakfast Included", "Smart TV"],
    popular: true,
  },
  {
    id: "executive-suite",
    name: "Royal Executive Suite",
    slug: "executive-suite",
    category: "Suite",
    price: 12000,
    rating: 5.0,
    reviews: 89,
    size: "520 sq ft",
    bed: "King Bed + Lounge",
    capacity: 4,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
    description: "Designed for discerning executives and families. Features a distinct living lounge, personalized concierge, and access to VIP club.",
    amenities: ["VIP Lounge Access", "Separate Living Room", "Espresso Machine", "Panoramic Views", "Airport Pickup", "Breakfast Buffet"],
    popular: false,
  },
  {
    id: "presidential-suite",
    name: "Grand Presidential Suite",
    slug: "presidential-suite",
    category: "Presidential",
    price: 25000,
    rating: 5.0,
    reviews: 56,
    size: "950 sq ft",
    bed: "Master King + Guest Bed",
    capacity: 5,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
    description: "The peak of 5-star elegance. Includes 24/7 dedicated butler, private dining suite, jacuzzi spa, and unrivaled panoramic vista.",
    amenities: ["24/7 Butler Service", "Private Jacuzzi & Spa", "Private Dining Room", "Luxury Chauffeur Service", "Complimentary Champagne", "High-End Sound System"],
    popular: true,
  },
  {
    id: "family-suite",
    name: "Grand Family Residence",
    slug: "family-suite",
    category: "Family",
    price: 9000,
    rating: 4.8,
    reviews: 95,
    size: "450 sq ft",
    bed: "2 Queen Beds",
    capacity: 4,
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80",
    description: "A comfortable family haven with child-friendly amenities, connected rooms option, gaming console, and spacious closets.",
    amenities: ["Two Queen Beds", "Child Safety Features", "Family Breakfast", "Smart Entertainment", "Pool Access", "Free Parking"],
    popular: false,
  },
  {
    id: "honeymoon-villa",
    name: "Romantic Honeymoon Suite",
    slug: "honeymoon-villa",
    category: "Suite",
    price: 15000,
    rating: 5.0,
    reviews: 142,
    size: "480 sq ft",
    bed: "Canopy King Bed",
    capacity: 2,
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
    description: "Curated specially for romantic getaways. Rose-petal decoration, candlelit terrace dining setup, and complimentary spa package.",
    amenities: ["Rose Petal Turndown", "Terrace Sunset View", "Couples Massage Discount", "Breakfast in Bed", "Champagne Bottle", "Deep Soaking Tub"],
    popular: false,
  },
];

export default function RoomsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(30000);

  const categories = ["All", "Standard", "Deluxe", "Suite", "Presidential", "Family"];

  const filteredRooms = ALL_ROOMS.filter((room) => {
    const matchesCategory = selectedCategory === "All" || room.category === selectedCategory;
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = room.price <= maxPrice;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-[#FDFBF9] pt-24 pb-20">
      {/* Page Header */}
      <div className="relative bg-hotel-navy py-16 text-white overflow-hidden mb-12">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C5A55A_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block text-hotel-gold font-semibold tracking-widest text-xs uppercase mb-3">
            Luxury Accommodations
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-white">
            Discover Our Rooms & Suites
          </h1>
          <p className="max-w-2xl mx-auto text-gray-300 text-sm md:text-base">
            Every room at StaySync is an oasis of tranquility and refined taste, designed with premium materials and modern 5-star amenities.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200/60 mb-10">
          <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center justify-between">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-hotel-navy text-hotel-gold shadow"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search and Price Slider */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search rooms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-hotel-gold/50"
                />
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto text-xs text-stone-600">
                <SlidersHorizontal className="w-4 h-4 text-hotel-gold" />
                <span>Max: {formatCurrency(maxPrice)}</span>
                <input
                  type="range"
                  min="4000"
                  max="30000"
                  step="1000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="accent-hotel-navy cursor-pointer w-24"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden rounded-2xl border-stone-200/80 hover:shadow-xl transition-all duration-300 bg-white flex flex-col h-full">
                {/* Image & Badges */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  
                  {room.popular && (
                    <Badge className="absolute top-4 left-4 bg-hotel-gold text-stone-900 font-semibold border-none">
                      Most Popular
                    </Badge>
                  )}
                  
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 text-xs font-semibold text-stone-800">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{room.rating}</span>
                    <span className="text-stone-400">({room.reviews})</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs tracking-wider uppercase text-hotel-gold-light font-medium">
                      {room.category}
                    </span>
                    <h3 className="text-xl font-bold font-heading leading-snug">{room.name}</h3>
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Specifications */}
                    <div className="flex items-center justify-between text-xs text-stone-500 py-3 border-b border-stone-100 mb-4">
                      <div className="flex items-center gap-1.5">
                        <Maximize2 className="w-4 h-4 text-hotel-gold" />
                        <span>{room.size}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BedDouble className="w-4 h-4 text-hotel-gold" />
                        <span>{room.bed}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-hotel-gold" />
                        <span>Up to {room.capacity} Guests</span>
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 line-clamp-2 mb-4 leading-relaxed">
                      {room.description}
                    </p>

                    {/* Key Amenities */}
                    <div className="space-y-1.5 mb-6">
                      {room.amenities.slice(0, 3).map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                          <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price & Actions */}
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-stone-400 block">Starting from</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-hotel-navy">
                          {formatCurrency(room.price)}
                        </span>
                        <span className="text-xs text-stone-500">/ night</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/rooms/${room.slug}`}>
                        <Button variant="outline" size="sm" className="border-stone-300 text-stone-700 hover:bg-stone-50">
                          Details
                        </Button>
                      </Link>
                      <Link href={`/booking?room=${room.slug}`}>
                        <Button size="sm" className="bg-hotel-navy hover:bg-hotel-navy-light text-hotel-gold font-semibold">
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
