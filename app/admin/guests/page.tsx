"use client";

import React, { useState } from "react";
import {
  Users,
  Search,
  Plus,
  Shield,
  Star,
  Award,
  Phone,
  Mail,
  FileCheck,
  Ban,
  MoreVertical,
  History,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";

interface GuestRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  nationality: string;
  vipTier: "VIP" | "PLATINUM" | "GOLD" | "SILVER" | "REGULAR";
  staysCount: number;
  lifetimeSpent: number;
  loyaltyPoints: number;
  nidVerified: boolean;
  isBlacklisted: boolean;
}

const INITIAL_GUESTS: GuestRecord[] = [
  {
    id: "g1",
    name: "Ayesha Khan",
    email: "ayesha.khan@dignitary.bd",
    phone: "01744444444",
    nationality: "Bangladeshi",
    vipTier: "VIP",
    staysCount: 22,
    lifetimeSpent: 650000,
    loyaltyPoints: 8500,
    nidVerified: true,
    isBlacklisted: false,
  },
  {
    id: "g2",
    name: "Fatema Begum",
    email: "fatema@example.com",
    phone: "01722222222",
    nationality: "Bangladeshi",
    vipTier: "PLATINUM",
    staysCount: 15,
    lifetimeSpent: 380000,
    loyaltyPoints: 5200,
    nidVerified: true,
    isBlacklisted: false,
  },
  {
    id: "g3",
    name: "Rahim Ahmed",
    email: "rahim@techcorp.com",
    phone: "01711111111",
    nationality: "Bangladeshi",
    vipTier: "GOLD",
    staysCount: 8,
    lifetimeSpent: 125000,
    loyaltyPoints: 2500,
    nidVerified: true,
    isBlacklisted: false,
  },
  {
    id: "g4",
    name: "James Wilson",
    email: "james.wilson@embassy.us",
    phone: "+1-555-0123",
    nationality: "American",
    vipTier: "SILVER",
    staysCount: 5,
    lifetimeSpent: 96000,
    loyaltyPoints: 1200,
    nidVerified: true,
    isBlacklisted: false,
  },
  {
    id: "g5",
    name: "Tanaka Yuki",
    email: "tanaka@jica.jp",
    phone: "+81-90-1234-5678",
    nationality: "Japanese",
    vipTier: "REGULAR",
    staysCount: 3,
    lifetimeSpent: 48000,
    loyaltyPoints: 500,
    nidVerified: true,
    isBlacklisted: false,
  },
  {
    id: "g6",
    name: "Mahfuzur Rahman",
    email: "mahfuz@badguest.com",
    phone: "01799990000",
    nationality: "Bangladeshi",
    vipTier: "REGULAR",
    staysCount: 1,
    lifetimeSpent: 4500,
    loyaltyPoints: 0,
    nidVerified: false,
    isBlacklisted: true,
  },
];

export default function AdminGuestsPage() {
  const [guests, setGuests] = useState<GuestRecord[]>(INITIAL_GUESTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [vipFilter, setVipFilter] = useState("ALL");

  const toggleBlacklist = (id: string) => {
    setGuests((prev) =>
      prev.map((g) => (g.id === id ? { ...g, isBlacklisted: !g.isBlacklisted } : g))
    );
  };

  const filtered = guests.filter((g) => {
    const matchVip = vipFilter === "ALL" || g.vipTier === vipFilter;
    const matchSearch =
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.phone.includes(searchQuery);
    return matchVip && matchSearch;
  });

  const getVipBadge = (tier: GuestRecord["vipTier"]) => {
    switch (tier) {
      case "VIP":
        return <Badge className="bg-amber-500 text-stone-950 font-bold">★ VIP Royal</Badge>;
      case "PLATINUM":
        return <Badge className="bg-slate-700 text-white font-semibold">Platinum</Badge>;
      case "GOLD":
        return <Badge className="bg-yellow-600 text-white font-semibold">Gold</Badge>;
      case "SILVER":
        return <Badge className="bg-stone-400 text-white font-semibold">Silver</Badge>;
      default:
        return <Badge variant="outline" className="text-stone-500">Regular</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-hotel-navy">
            Guest CRM & VIP Loyalty Management
          </h1>
          <p className="text-xs text-stone-500">
            Guest profiles, visit records, government ID verification, and personalized preferences.
          </p>
        </div>

        <Button className="bg-hotel-navy hover:bg-hotel-navy-light text-hotel-gold font-semibold text-xs gap-2">
          <Plus className="w-4 h-4" /> Register New Guest
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {["ALL", "VIP", "PLATINUM", "GOLD", "SILVER", "REGULAR"].map((tier) => (
            <button
              key={tier}
              onClick={() => setVipFilter(tier)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                vipFilter === tier
                  ? "bg-hotel-navy text-hotel-gold shadow"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {tier === "ALL" ? "All Guests" : tier}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-hotel-gold/50"
          />
        </div>
      </div>

      {/* Guests Table */}
      <Card className="border-stone-200 shadow-sm rounded-xl overflow-hidden bg-white">
        <Table>
          <TableHeader className="bg-stone-50 text-xs">
            <TableRow>
              <TableHead>Guest Profile</TableHead>
              <TableHead>Tier & ID Verification</TableHead>
              <TableHead>Stay Statistics</TableHead>
              <TableHead>Loyalty Points</TableHead>
              <TableHead>Lifetime Spend</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs">
            {filtered.map((guest) => (
              <TableRow key={guest.id} className="hover:bg-stone-50/70">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-hotel-cream text-hotel-navy font-bold flex items-center justify-center text-xs">
                      {guest.name.charAt(0)}
                    </div>
                    <div>
                      <span className="font-bold text-stone-800 flex items-center gap-1.5">
                        {guest.name}
                        {guest.isBlacklisted && (
                          <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded font-bold">
                            Blacklisted
                          </span>
                        )}
                      </span>
                      <span className="text-[11px] text-stone-500 block">{guest.email}</span>
                      <span className="text-[11px] text-stone-400">{guest.phone}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div>{getVipBadge(guest.vipTier)}</div>
                    <span className="text-[10px] text-stone-500 flex items-center gap-1">
                      <FileCheck
                        className={`w-3.5 h-3.5 ${
                          guest.nidVerified ? "text-emerald-600" : "text-amber-500"
                        }`}
                      />
                      {guest.nidVerified ? "Passport/NID Verified" : "Verification Pending"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-bold text-stone-800">{guest.staysCount} Stays</span>
                  <span className="block text-[10px] text-stone-400">
                    Nationality: {guest.nationality}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-mono font-bold text-amber-600">
                    {guest.loyaltyPoints} pts
                  </span>
                  <span className="block text-[10px] text-stone-400">Can redeem for free stay</span>
                </TableCell>
                <TableCell>
                  <span className="font-bold text-hotel-navy text-sm">
                    {formatCurrency(guest.lifetimeSpent)}
                  </span>
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <Button variant="outline" size="sm" className="h-7 px-2 text-stone-600">
                    <History className="w-3.5 h-3.5 mr-1" /> Stays
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleBlacklist(guest.id)}
                    className={`h-7 px-2 ${
                      guest.isBlacklisted
                        ? "text-emerald-600 border-emerald-300"
                        : "text-rose-600 border-rose-300"
                    }`}
                  >
                    <Ban className="w-3.5 h-3.5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
