"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Shield,
  Star,
  Clock,
  Heart,
  Wifi,
  Car,
  UtensilsCrossed,
  Waves,
  Search,
  ChevronDown,
  Users,
  CalendarDays,
  BedDouble,
  MapPin,
  Quote,
  ArrowRight,
  Diamond,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ─────────────────────── Animations ─────────────────────── */
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

/* ─────────────────────── Hero Section ─────────────────────── */
function HeroSection() {
  const [guests, setGuests] = useState("2");
  const [roomType, setRoomType] = useState("deluxe");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80"
          alt="Luxury Hotel"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="hero-gradient absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32 md:py-0">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={fadeInUp} className="space-y-2">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-px bg-hotel-gold" />
                <Diamond className="w-4 h-4 text-hotel-gold" />
                <div className="w-12 h-px bg-hotel-gold" />
              </div>
              <span className="text-hotel-gold text-sm md:text-base uppercase tracking-[0.3em] font-body font-medium">
                Welcome to StaySync
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight"
            >
              Experience Luxury
              <br />
              <span className="text-gradient-gold">Beyond Imagination</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-white/70 font-body max-w-2xl mx-auto leading-relaxed"
            >
              Discover a world where elegance meets comfort. Our five-star hotel 
              offers an unparalleled experience of luxury, fine dining, and 
              impeccable service.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4 pt-2">
              <Link href="/rooms">
                <Button
                  variant="secondary"
                  size="lg"
                  className="btn-gold rounded-full text-base px-8"
                >
                  Explore Rooms
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full text-base px-8 border-white/30 text-white hover:bg-white/10 hover:text-white"
                >
                  Our Story
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Booking Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-16"
          >
            <div className="glass-card rounded-2xl p-6 md:p-8 max-w-5xl mx-auto bg-white/90 backdrop-blur-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-hotel-navy/60 font-body font-medium">
                    Check In
                  </label>
                  <div className="relative">
                    <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hotel-gold" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:ring-2 focus:ring-hotel-gold/50 focus:border-hotel-gold transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-hotel-navy/60 font-body font-medium">
                    Check Out
                  </label>
                  <div className="relative">
                    <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hotel-gold" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:ring-2 focus:ring-hotel-gold/50 focus:border-hotel-gold transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-hotel-navy/60 font-body font-medium">
                    Guests
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hotel-gold" />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full pl-10 pr-8 py-3 border border-gray-200 rounded-xl text-sm font-body appearance-none focus:outline-none focus:ring-2 focus:ring-hotel-gold/50 focus:border-hotel-gold transition-all bg-white"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5">5+ Guests</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-hotel-navy/60 font-body font-medium">
                    Room Type
                  </label>
                  <div className="relative">
                    <BedDouble className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hotel-gold" />
                    <select
                      value={roomType}
                      onChange={(e) => setRoomType(e.target.value)}
                      className="w-full pl-10 pr-8 py-3 border border-gray-200 rounded-xl text-sm font-body appearance-none focus:outline-none focus:ring-2 focus:ring-hotel-gold/50 focus:border-hotel-gold transition-all bg-white"
                    >
                      <option value="standard">Standard</option>
                      <option value="deluxe">Deluxe</option>
                      <option value="suite">Suite</option>
                      <option value="presidential">Presidential</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <Link href="/rooms">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full btn-gold rounded-xl text-sm h-[50px]"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Check Availability
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
        >
          <motion.div className="w-1 h-2 bg-hotel-gold rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────── Features Section ─────────────────────── */
const features = [
  {
    icon: Shield,
    title: "World-Class Security",
    description:
      "State-of-the-art security systems and 24/7 surveillance ensure your safety and peace of mind throughout your stay.",
  },
  {
    icon: Star,
    title: "Five-Star Service",
    description:
      "Our dedicated staff delivers personalized, anticipatory service that exceeds the highest standards of luxury hospitality.",
  },
  {
    icon: Clock,
    title: "24/7 Concierge",
    description:
      "Round-the-clock concierge service to fulfill every request, from restaurant reservations to private tours and transfers.",
  },
  {
    icon: Heart,
    title: "Curated Experiences",
    description:
      "Bespoke experiences tailored to your preferences, from spa treatments and wine tastings to cultural excursions.",
  },
];

function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-hotel-cream" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="space-y-4">
            <div className="divider-diamond max-w-xs mx-auto">
              <Diamond className="w-4 h-4 text-hotel-gold shrink-0" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-hotel-navy">
              Why Choose StaySync
            </h2>
            <p className="text-hotel-navy/60 font-body max-w-2xl mx-auto text-lg">
              We redefine luxury hospitality with attention to every detail, 
              ensuring an extraordinary experience for our discerning guests.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeInUp}
              className="glass-card rounded-2xl p-8 text-center hover-lift group cursor-default"
            >
              <div className="w-16 h-16 rounded-2xl bg-hotel-gold/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-hotel-gold/20 transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-hotel-gold" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-hotel-navy mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-hotel-navy/60 font-body leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────── Room Showcase ─────────────────────── */
const rooms = [
  {
    id: "standard",
    name: "Standard Room",
    price: 4500,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    amenities: ["King Bed", "City View", "Free WiFi", "Mini Bar"],
    description: "Elegantly appointed rooms with modern comforts and city views for the discerning traveler.",
  },
  {
    id: "deluxe",
    name: "Deluxe Suite",
    price: 8500,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    amenities: ["King Bed", "Ocean View", "Living Area", "Balcony"],
    description: "Spacious suites featuring separate living areas and panoramic views of the city skyline.",
  },
  {
    id: "presidential",
    name: "Presidential Suite",
    price: 25000,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    amenities: ["Master Bedroom", "Private Pool", "Butler Service", "Dining Room"],
    description: "The pinnacle of luxury — a sprawling suite with private pool, dedicated butler, and unmatched elegance.",
  },
];

function RoomShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="space-y-4">
            <div className="divider-diamond max-w-xs mx-auto">
              <Diamond className="w-4 h-4 text-hotel-gold shrink-0" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-hotel-navy">
              Our Exclusive Rooms
            </h2>
            <p className="text-hotel-navy/60 font-body max-w-2xl mx-auto text-lg">
              Each room is a sanctuary of elegance, designed to provide the 
              ultimate comfort and luxury experience.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {rooms.map((room) => (
            <motion.div
              key={room.id}
              variants={fadeInUp}
              className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-hotel-gold text-white text-xs font-body font-semibold px-3 py-1.5 rounded-full">
                    From ৳{room.price.toLocaleString()}/night
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-heading font-semibold text-hotel-navy">
                  {room.name}
                </h3>
                <p className="text-sm text-hotel-navy/60 font-body leading-relaxed">
                  {room.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="text-xs font-body bg-hotel-cream text-hotel-navy/70 px-3 py-1.5 rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
                <Link href={`/rooms/${room.id}`}>
                  <Button
                    variant="outline"
                    className="w-full mt-2 border-hotel-navy/20 text-hotel-navy hover:bg-hotel-navy hover:text-white rounded-xl"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="text-center mt-12"
        >
          <Link href="/rooms">
            <Button variant="secondary" size="lg" className="btn-gold rounded-full px-10">
              View All Rooms
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────── Testimonials Section ─────────────────────── */
const testimonials = [
  {
    name: "Sarah Mitchell",
    location: "New York, USA",
    rating: 5,
    text: "StaySync exceeded every expectation. The attention to detail, from the moment we arrived to checkout, was remarkable. The Presidential Suite was absolutely breathtaking.",
    avatar: "SM",
  },
  {
    name: "James Chen",
    location: "Singapore",
    rating: 5,
    text: "I've stayed at luxury hotels around the world, and StaySync ranks among the very best. The staff remembered my preferences from a previous visit. Truly personalized service.",
    avatar: "JC",
  },
  {
    name: "Amara Khan",
    location: "Dubai, UAE",
    rating: 5,
    text: "The spa experience alone was worth the trip. Combined with the stunning rooms and exquisite dining, StaySync delivers a flawless luxury experience every time.",
    avatar: "AK",
  },
];

function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-hotel-cream" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="space-y-4">
            <div className="divider-diamond max-w-xs mx-auto">
              <Diamond className="w-4 h-4 text-hotel-gold shrink-0" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-hotel-navy">
              What Our Guests Say
            </h2>
            <p className="text-hotel-navy/60 font-body max-w-2xl mx-auto text-lg">
              Hear from guests who have experienced the magic of StaySync hospitality.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={fadeInUp}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 relative"
            >
              <Quote className="w-10 h-10 text-hotel-gold/20 absolute top-6 right-6" />
              <div className="flex items-center gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-hotel-gold text-hotel-gold" />
                ))}
              </div>
              <p className="text-hotel-navy/70 font-body leading-relaxed mb-6 italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-hotel-navy flex items-center justify-center">
                  <span className="text-white text-sm font-heading font-semibold">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <p className="font-heading font-semibold text-hotel-navy">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-hotel-navy/50 font-body flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────── CTA Section ─────────────────────── */
function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 overflow-hidden" ref={ref}>
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1920&q=80"
          alt="Luxury Hotel Interior"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-hotel-navy/80" />
      </div>
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp} className="space-y-2 mb-6">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-px bg-hotel-gold" />
              <Diamond className="w-4 h-4 text-hotel-gold" />
              <div className="w-12 h-px bg-hotel-gold" />
            </div>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-heading font-bold text-white mb-6"
          >
            Ready to Experience
            <br />
            <span className="text-gradient-gold">True Luxury?</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-white/70 font-body mb-10 max-w-xl mx-auto"
          >
            Book your stay today and discover why discerning travelers choose 
            StaySync for their most memorable experiences.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/rooms">
              <Button
                variant="secondary"
                size="lg"
                className="btn-gold rounded-full text-base px-10"
              >
                Book Your Stay
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full text-base px-10 border-white/30 text-white hover:bg-white/10 hover:text-white"
              >
                Contact Us
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────── Home Page ─────────────────────── */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <RoomShowcase />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
