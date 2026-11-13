"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Wifi,
  Tv,
  Wind,
  Bath,
  Coffee,
  Users,
  Maximize2,
  BedDouble,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Clock,
  Car,
  Wine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

const ROOM_DATA = {
  name: "Luxury Deluxe King Suite",
  tagline: "Unparalleled comfort with sweeping skyline panoramas",
  price: 7500,
  size: "380 sq ft",
  bed: "1 King Plush Bed",
  occupancy: "3 Guests (2 Adults, 1 Child)",
  floor: "Floors 4 - 8",
  rating: 4.9,
  reviewsCount: 218,
  images: [
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80",
  ],
  description:
    "Immerse yourself in elevated luxury. The Luxury Deluxe King Suite has been masterfully crafted for guests who demand sophistication and supreme ease. Boasting an Italian marble bathroom with rain shower and soaking tub, dedicated workspace with high-speed internet, and expansive floor-to-ceiling windows granting breathtaking city views.",
  features: [
    { icon: Wifi, title: "High-Speed Wi-Fi", desc: "Complimentary gigabit internet" },
    { icon: Wind, title: "Dual Climate Control", desc: "Whisper-quiet air conditioning" },
    { icon: Tv, title: "55-inch OLED TV", desc: "With Netflix & International channels" },
    { icon: Bath, title: "Marble Bathroom", desc: "Soaking tub & premium organic toiletries" },
    { icon: Coffee, title: "Nespresso Coffee Bar", desc: "Fresh capsules restocked daily" },
    { icon: Wine, title: "Gourmet Mini Bar", desc: "Curated snacks & beverages" },
    { icon: Car, title: "Valet Parking", desc: "Secure 24/7 underground parking" },
    { icon: ShieldCheck, title: "Electronic Safe", desc: "Fits laptop & valuables" },
  ],
  policies: [
    "Check-in: From 2:00 PM (Early check-in subject to availability)",
    "Check-out: Until 12:00 PM (Late checkout upon request)",
    "Cancellation: Free cancellation up to 24 hours prior to arrival",
    "Smoking: Strictly 100% non-smoking inside rooms",
    "Children: Children under 6 stay free when utilizing existing bedding",
  ],
};

export default function RoomDetailClient({ slug }: { slug: string }) {
  const [selectedImg, setSelectedImg] = useState(0);
  const [nights, setNights] = useState(2);
  const [guests, setGuests] = useState(2);
  const [includeBreakfast, setIncludeBreakfast] = useState(true);

  const breakfastCost = includeBreakfast ? 600 * nights * guests : 0;
  const roomCost = ROOM_DATA.price * nights;
  const taxAmount = (roomCost + breakfastCost) * 0.15;
  const totalCost = roomCost + breakfastCost + taxAmount;

  return (
    <div className="min-h-screen bg-[#FBF9F6] pt-24 pb-20">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <Link href="/" className="hover:text-hotel-navy">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/rooms" className="hover:text-hotel-navy">Rooms</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-stone-800 font-medium">{ROOM_DATA.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Title & Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge className="bg-hotel-navy text-hotel-gold border-none">5-Star Luxury</Badge>
              <div className="flex items-center text-xs font-semibold text-amber-600">
                ★ {ROOM_DATA.rating} ({ROOM_DATA.reviewsCount} verified reviews)
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-heading text-hotel-navy">
              {ROOM_DATA.name}
            </h1>
            <p className="text-stone-600 text-sm mt-1">{ROOM_DATA.tagline}</p>
          </div>

          <div className="text-left lg:text-right">
            <span className="text-xs text-stone-500">Nightly Rate</span>
            <div className="text-3xl font-bold text-hotel-navy">
              {formatCurrency(ROOM_DATA.price)}{" "}
              <span className="text-sm font-normal text-stone-500">/ night</span>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-12">
          {/* Main Large Image */}
          <div className="lg:col-span-3 relative h-[380px] md:h-[500px] rounded-2xl overflow-hidden shadow-md">
            <Image
              src={ROOM_DATA.images[selectedImg]}
              alt={ROOM_DATA.name}
              fill
              priority
              className="object-cover transition-all duration-300"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
            {ROOM_DATA.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImg(idx)}
                className={`relative flex-1 min-w-[100px] h-24 rounded-xl overflow-hidden border-2 transition-all ${
                  selectedImg === idx ? "border-hotel-gold scale-95 shadow-md" : "border-transparent opacity-75 hover:opacity-100"
                }`}
              >
                <Image src={img} alt="Thumbnail" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Main Content & Booking Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Details Column */}
          <div className="lg:col-span-2 space-y-10">
            {/* Quick Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-white rounded-2xl border border-stone-200">
              <div>
                <span className="text-xs text-stone-400 block mb-1">Room Area</span>
                <span className="text-sm font-semibold text-stone-800 flex items-center gap-1.5">
                  <Maximize2 className="w-4 h-4 text-hotel-gold" /> {ROOM_DATA.size}
                </span>
              </div>
              <div>
                <span className="text-xs text-stone-400 block mb-1">Bed Configuration</span>
                <span className="text-sm font-semibold text-stone-800 flex items-center gap-1.5">
                  <BedDouble className="w-4 h-4 text-hotel-gold" /> {ROOM_DATA.bed}
                </span>
              </div>
              <div>
                <span className="text-xs text-stone-400 block mb-1">Max Guests</span>
                <span className="text-sm font-semibold text-stone-800 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-hotel-gold" /> Up to 3
                </span>
              </div>
              <div>
                <span className="text-xs text-stone-400 block mb-1">Floor Level</span>
                <span className="text-sm font-semibold text-stone-800 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-hotel-gold" /> {ROOM_DATA.floor}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-bold font-heading text-hotel-navy mb-4">
                About The Residence
              </h2>
              <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-line">
                {ROOM_DATA.description}
              </p>
            </div>

            {/* Key Amenities */}
            <div>
              <h2 className="text-xl font-bold font-heading text-hotel-navy mb-5">
                Premium Amenities & Inclusions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ROOM_DATA.features.map((feat, idx) => {
                  const Icon = feat.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-xl bg-white border border-stone-100 shadow-sm"
                    >
                      <div className="p-2 rounded-lg bg-hotel-cream text-hotel-navy">
                        <Icon className="w-5 h-5 text-hotel-gold" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-stone-800">{feat.title}</h4>
                        <p className="text-xs text-stone-500 mt-0.5">{feat.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hotel Policies */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200">
              <h3 className="text-lg font-bold font-heading text-hotel-navy mb-4">
                House Rules & Policies
              </h3>
              <ul className="space-y-2 text-xs text-stone-600">
                {ROOM_DATA.policies.map((policy, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{policy}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Sticky Booking Calculator Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-2xl border border-stone-200 shadow-xl p-6">
              <div className="flex items-baseline justify-between pb-4 border-b border-stone-100 mb-6">
                <div>
                  <span className="text-2xl font-bold text-hotel-navy">
                    {formatCurrency(ROOM_DATA.price)}
                  </span>
                  <span className="text-xs text-stone-500"> / night</span>
                </div>
                <Badge variant="outline" className="border-emerald-500 text-emerald-600 text-xs">
                  Instant Confirmation
                </Badge>
              </div>

              {/* Form Controls */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-xs font-semibold text-stone-600 block mb-1.5">
                    Stay Duration (Nights)
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setNights(Math.max(1, nights - 1))}
                      className="w-9 h-9 rounded-lg border border-stone-300 font-bold hover:bg-stone-100 flex items-center justify-center text-stone-700"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-semibold text-sm">{nights} Nights</span>
                    <button
                      onClick={() => setNights(nights + 1)}
                      className="w-9 h-9 rounded-lg border border-stone-300 font-bold hover:bg-stone-100 flex items-center justify-center text-stone-700"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-600 block mb-1.5">
                    Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full text-sm py-2 px-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-hotel-gold/50"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests (Max)</option>
                  </select>
                </div>

                {/* Add-on: Breakfast */}
                <div className="pt-2">
                  <label className="flex items-center gap-3 p-3 rounded-xl border border-stone-200 cursor-pointer hover:bg-stone-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={includeBreakfast}
                      onChange={(e) => setIncludeBreakfast(e.target.checked)}
                      className="accent-hotel-navy w-4 h-4 rounded"
                    />
                    <div className="text-xs">
                      <span className="font-semibold text-stone-800 block">Buffet Breakfast</span>
                      <span className="text-stone-500">+৳600 per guest / day</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 py-4 border-t border-b border-stone-100 text-xs text-stone-600 mb-6">
                <div className="flex justify-between">
                  <span>
                    {formatCurrency(ROOM_DATA.price)} × {nights} nights
                  </span>
                  <span>{formatCurrency(roomCost)}</span>
                </div>
                {includeBreakfast && (
                  <div className="flex justify-between">
                    <span>Breakfast ({guests} guests)</span>
                    <span>{formatCurrency(breakfastCost)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Govt Tax & Service Charge (15%)</span>
                  <span>{formatCurrency(taxAmount)}</span>
                </div>
                <div className="flex justify-between pt-2 text-sm font-bold text-hotel-navy">
                  <span>Total Amount</span>
                  <span className="text-hotel-gold text-lg">{formatCurrency(totalCost)}</span>
                </div>
              </div>

              {/* Action Button */}
              <Link
                href={`/booking?room=${slug}&nights=${nights}&guests=${guests}&breakfast=${includeBreakfast}`}
                className="w-full block"
              >
                <Button className="w-full py-6 bg-hotel-navy hover:bg-hotel-navy-light text-hotel-gold text-sm font-bold shadow-lg">
                  Proceed to Secure Booking
                </Button>
              </Link>

              <div className="mt-4 flex items-center justify-center gap-2 text-stone-400 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>SSL Encrypted • bKash, Cards, Stripe Accepted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
