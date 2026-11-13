"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Shield,
  Heart,
  Users,
  Compass,
  CheckCircle,
  Star,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  const stats = [
    { label: "Years of Luxury Excellence", value: "15+" },
    { label: "Bespoke Rooms & Suites", value: "120" },
    { label: "Happy Global Guests", value: "85K+" },
    { label: "International Awards", value: "24" },
  ];

  const values = [
    {
      icon: Shield,
      title: "Uncompromising Integrity",
      desc: "Every guest interaction is grounded in transparent communication, unyielding security, and dedicated discretion.",
    },
    {
      icon: Sparkles,
      title: "Artisanal Hospitality",
      desc: "From handpicked flowers in your suite to customized culinary pairings, no detail is ever left unattended.",
    },
    {
      icon: Heart,
      title: "Warmth & Genuine Care",
      desc: "We believe true luxury is how you are made to feel. Our team anticipates your needs before you ever have to ask.",
    },
    {
      icon: Compass,
      title: "Eco-Conscious Stewardship",
      desc: "Committed to sustainable luxury with zero single-use plastics, solar water heating, and locally sourced organic ingredients.",
    },
  ];

  const leadership = [
    {
      name: "Jean-Pierre Laurent",
      role: "Managing Director",
      bio: "Over 25 years of luxury hospitality leadership at Four Seasons & Ritz-Carlton worldwide.",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Chef Tariq Al-Mansoor",
      role: "Executive Master Chef",
      bio: "Michelin-trained culinary artist fusing Mediterranean and contemporary South Asian fine gastronomy.",
      img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Sarah Chowdhury",
      role: "Head of Guest Experience",
      bio: "Dedicated to designing personalized VIP moments and seamless stays for international dignitaries.",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF9] pt-24 pb-20">
      {/* Hero Section */}
      <div className="relative bg-hotel-navy py-20 text-white overflow-hidden mb-16">
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="text-hotel-gold text-xs uppercase tracking-widest font-semibold">
            Our Heritage & Story
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-heading mt-3 mb-6">
            A Legacy of Refined Hospitality
          </h1>
          <p className="max-w-2xl mx-auto text-stone-300 text-sm md:text-base leading-relaxed">
            StaySync was founded with a singular, unbending purpose: to redefine five-star hospitality by seamlessly weaving classic architectural majesty with the latest digital guest comfort.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl space-y-20">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80"
              alt="StaySync Hotel Architecture"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <span className="text-hotel-gold font-bold text-xs uppercase tracking-wider">
              Where Elegance Meets Comfort
            </span>
            <h2 className="text-3xl font-bold font-heading text-hotel-navy">
              Crafted For Those Who Appreciate the Finer Nuances
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              Situated in the prestigious diplomatic quarter of Gulshan, StaySync Grand Hotel stands as an iconic landmark of grandeur. Designed by world-renowned interior architects, our retreat balances the vibrancy of Dhaka with an atmosphere of serene seclusion.
            </p>
            <p className="text-stone-600 text-sm leading-relaxed">
              Whether you are here for a strategic boardroom conclave, a romantic honeymoon escapade, or a rejuvenating weekend spa sanctuary, every single dimension of your stay is curated to leave an indelible impression.
            </p>

            <div className="pt-2">
              <Link href="/rooms">
                <Button className="bg-hotel-navy hover:bg-hotel-navy-light text-hotel-gold font-semibold px-6">
                  Explore Accommodations
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-3xl p-10 border border-stone-200 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, idx) => (
            <div key={idx} className="space-y-1">
              <span className="text-3xl md:text-5xl font-bold font-heading text-hotel-navy">
                {s.value}
              </span>
              <p className="text-xs text-stone-500 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Core Values */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-hotel-gold font-bold text-xs uppercase tracking-wider">
              Our Core Pillars
            </span>
            <h2 className="text-3xl font-bold font-heading text-hotel-navy mt-2">
              The Standards We Live By
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-hotel-cream text-hotel-gold flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold font-heading text-hotel-navy mb-2">
                    {v.title}
                  </h3>
                  <p className="text-stone-600 text-xs leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Leadership Team */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-hotel-gold font-bold text-xs uppercase tracking-wider">
              Hospitality Artisans
            </span>
            <h2 className="text-3xl font-bold font-heading text-hotel-navy mt-2">
              Meet Our Executive Leadership
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm text-center"
              >
                <div className="relative h-64">
                  <Image src={member.img} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h4 className="font-bold font-heading text-base text-hotel-navy">
                    {member.name}
                  </h4>
                  <span className="text-xs text-hotel-gold font-medium block mb-2">
                    {member.role}
                  </span>
                  <p className="text-stone-500 text-xs leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
