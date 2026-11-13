"use client";

import React, { useState } from "react";
import {
  Settings,
  Star,
  Building,
  CreditCard,
  Percent,
  Clock,
  ShieldCheck,
  Save,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export default function AdminSettingsPage() {
  const [starRating, setStarRating] = useState<3 | 4 | 5>(5);
  const [saved, setSaved] = useState(false);

  // General settings
  const [hotelName, setHotelName] = useState("StaySync Grand Hotel & Resort");
  const [address, setAddress] = useState("Road 45, Plot 12, Gulshan-2, Dhaka 1212");
  const [checkInTime, setCheckInTime] = useState("14:00");
  const [checkOutTime, setCheckOutTime] = useState("12:00");
  const [vatRate, setVatRate] = useState(15);
  const [serviceChargeRate, setServiceChargeRate] = useState(10);

  // Dynamic modules toggle (Adapts to 3-star, 4-star, 5-star)
  const [modules, setModules] = useState({
    presidentialSuites: true,
    butlerService: true,
    spaWellness: true,
    fineDiningRestaurant: true,
    valetParking: true,
    vipLoyaltyProgram: true,
    multilingual: true,
    roomService247: true,
  });

  const handleStarChange = (stars: 3 | 4 | 5) => {
    setStarRating(stars);
    if (stars === 3) {
      setModules({
        presidentialSuites: false,
        butlerService: false,
        spaWellness: false,
        fineDiningRestaurant: true,
        valetParking: false,
        vipLoyaltyProgram: false,
        multilingual: false,
        roomService247: false,
      });
    } else if (stars === 4) {
      setModules({
        presidentialSuites: false,
        butlerService: false,
        spaWellness: true,
        fineDiningRestaurant: true,
        valetParking: true,
        vipLoyaltyProgram: true,
        multilingual: true,
        roomService247: true,
      });
    } else {
      setModules({
        presidentialSuites: true,
        butlerService: true,
        spaWellness: true,
        fineDiningRestaurant: true,
        valetParking: true,
        vipLoyaltyProgram: true,
        multilingual: true,
        roomService247: true,
      });
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-hotel-navy">
            Property Configuration & Star Rating Presets
          </h1>
          <p className="text-xs text-stone-500">
            Customize modules and operational rules for 3-star, 4-star, or 5-star properties.
          </p>
        </div>

        <Button
          onClick={handleSave}
          className="bg-hotel-navy hover:bg-hotel-navy-light text-hotel-gold font-semibold text-xs gap-2"
        >
          <Save className="w-4 h-4" /> Save Changes
        </Button>
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Configuration saved successfully. System modules updated.</span>
        </div>
      )}

      {/* Star Rating Preset Selector */}
      <Card className="border-stone-200 bg-white shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold text-hotel-navy flex items-center gap-2">
            <Star className="w-4 h-4 text-hotel-gold fill-hotel-gold" /> Hotel Classification Preset
          </CardTitle>
          <p className="text-xs text-stone-500">
            Selecting a star tier automatically adapts available room categories, service tiers, and pricing algorithms.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* 3-Star */}
            <div
              onClick={() => handleStarChange(3)}
              className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                starRating === 3
                  ? "border-hotel-navy bg-stone-50 shadow-md"
                  : "border-stone-200 hover:border-stone-300"
              }`}
            >
              <div className="flex items-center gap-1 text-amber-500 mb-2">
                <Star className="w-4 h-4 fill-amber-500" />
                <Star className="w-4 h-4 fill-amber-500" />
                <Star className="w-4 h-4 fill-amber-500" />
              </div>
              <h4 className="font-bold text-sm text-stone-800">3-Star Economy / Boutique</h4>
              <p className="text-[11px] text-stone-500 mt-1">
                Essential room management, standard booking engine, fast check-in.
              </p>
            </div>

            {/* 4-Star */}
            <div
              onClick={() => handleStarChange(4)}
              className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                starRating === 4
                  ? "border-hotel-navy bg-stone-50 shadow-md"
                  : "border-stone-200 hover:border-stone-300"
              }`}
            >
              <div className="flex items-center gap-1 text-amber-500 mb-2">
                <Star className="w-4 h-4 fill-amber-500" />
                <Star className="w-4 h-4 fill-amber-500" />
                <Star className="w-4 h-4 fill-amber-500" />
                <Star className="w-4 h-4 fill-amber-500" />
              </div>
              <h4 className="font-bold text-sm text-stone-800">4-Star Premium Business</h4>
              <p className="text-[11px] text-stone-500 mt-1">
                Executive suites, restaurant POS, valet, loyalty points system.
              </p>
            </div>

            {/* 5-Star */}
            <div
              onClick={() => handleStarChange(5)}
              className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                starRating === 5
                  ? "border-hotel-gold bg-hotel-cream shadow-md"
                  : "border-stone-200 hover:border-stone-300"
              }`}
            >
              <div className="flex items-center gap-1 text-amber-500 mb-2">
                <Star className="w-4 h-4 fill-amber-500" />
                <Star className="w-4 h-4 fill-amber-500" />
                <Star className="w-4 h-4 fill-amber-500" />
                <Star className="w-4 h-4 fill-amber-500" />
                <Star className="w-4 h-4 fill-amber-500" />
              </div>
              <h4 className="font-bold text-sm text-hotel-navy flex items-center gap-1">
                5-Star Ultra Luxury <Sparkles className="w-3.5 h-3.5 text-hotel-gold" />
              </h4>
              <p className="text-[11px] text-stone-600 mt-1">
                Presidential suites, dedicated butler, spa, VIP CRM, international Stripe & SSLCommerz.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature Modules Matrix */}
      <Card className="border-stone-200 bg-white shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold text-hotel-navy">
            Active Feature Modules for this Hotel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: "presidentialSuites", label: "Presidential & Penthouse Suites Support" },
              { key: "butlerService", label: "Dedicated Butler & Turndown Module" },
              { key: "spaWellness", label: "Spa, Sauna & Wellness Scheduling" },
              { key: "fineDiningRestaurant", label: "Restaurant Dining & Room Service" },
              { key: "valetParking", label: "Valet & Airport Luxury Chauffeur" },
              { key: "vipLoyaltyProgram", label: "Guest Loyalty & Reward Points" },
              { key: "multilingual", label: "Multi-Language Support (Bangla & English)" },
              { key: "roomService247", label: "24/7 Front Desk & Night Audit" },
            ].map((item) => (
              <div
                key={item.key}
                className="p-3.5 rounded-xl border border-stone-200 flex items-center justify-between"
              >
                <span className="text-xs font-semibold text-stone-700">{item.label}</span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded ${
                    (modules as any)[item.key]
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-stone-100 text-stone-400"
                  }`}
                >
                  {(modules as any)[item.key] ? "Enabled" : "Disabled"}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Operational Policies & Tax Setup */}
      <Card className="border-stone-200 bg-white shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold text-hotel-navy">
            Statutory Rates & Schedules
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-stone-600 block mb-1">
                Property Name
              </label>
              <input
                type="text"
                value={hotelName}
                onChange={(e) => setHotelName(e.target.value)}
                className="w-full text-xs p-2.5 border rounded-lg"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-600 block mb-1">
                Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full text-xs p-2.5 border rounded-lg"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-600 block mb-1">
                Default Check-in Time
              </label>
              <input
                type="text"
                value={checkInTime}
                onChange={(e) => setCheckInTime(e.target.value)}
                className="w-full text-xs p-2.5 border rounded-lg"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-600 block mb-1">
                Default Check-out Time
              </label>
              <input
                type="text"
                value={checkOutTime}
                onChange={(e) => setCheckOutTime(e.target.value)}
                className="w-full text-xs p-2.5 border rounded-lg"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-600 block mb-1">
                Govt VAT / Tax (%)
              </label>
              <input
                type="number"
                value={vatRate}
                onChange={(e) => setVatRate(Number(e.target.value))}
                className="w-full text-xs p-2.5 border rounded-lg"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-600 block mb-1">
                Service Charge (%)
              </label>
              <input
                type="number"
                value={serviceChargeRate}
                onChange={(e) => setServiceChargeRate(Number(e.target.value))}
                className="w-full text-xs p-2.5 border rounded-lg"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
