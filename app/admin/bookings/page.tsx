"use client";

import React, { useState } from "react";
import {
  CalendarCheck,
  Search,
  Plus,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  UserCheck,
  UserX,
  CreditCard,
  Eye,
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

interface BookingRecord {
  id: string;
  bookingNumber: string;
  guestName: string;
  phone: string;
  roomNumber: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  totalAmount: number;
  paidAmount: number;
  status: "CONFIRMED" | "CHECKED_IN" | "CHECKED_OUT" | "PENDING" | "CANCELLED";
  paymentMethod: string;
}

const INITIAL_BOOKINGS: BookingRecord[] = [
  {
    id: "b1",
    bookingNumber: "STY-20261113-A8K",
    guestName: "Rahim Ahmed",
    phone: "01711111111",
    roomNumber: "102",
    roomType: "Deluxe King",
    checkIn: "12 Nov 2026",
    checkOut: "15 Nov 2026",
    nights: 3,
    totalAmount: 22500,
    paidAmount: 22500,
    status: "CHECKED_IN",
    paymentMethod: "bKash MFS",
  },
  {
    id: "b2",
    bookingNumber: "STY-20261113-B4P",
    guestName: "Fatema Begum",
    phone: "01722222222",
    roomNumber: "105",
    roomType: "Deluxe King",
    checkIn: "13 Nov 2026",
    checkOut: "16 Nov 2026",
    nights: 3,
    totalAmount: 22500,
    paidAmount: 10000,
    status: "CONFIRMED",
    paymentMethod: "Visa Card",
  },
  {
    id: "b3",
    bookingNumber: "STY-20261112-C9T",
    guestName: "James Wilson",
    phone: "+1-555-0123",
    roomNumber: "201",
    roomType: "Royal Executive Suite",
    checkIn: "10 Nov 2026",
    checkOut: "18 Nov 2026",
    nights: 8,
    totalAmount: 96000,
    paidAmount: 96000,
    status: "CHECKED_IN",
    paymentMethod: "Stripe / Amex",
  },
  {
    id: "b4",
    bookingNumber: "STY-20261111-D2R",
    guestName: "Ayesha Khan",
    phone: "01744444444",
    roomNumber: "301",
    roomType: "Royal Executive Suite",
    checkIn: "08 Nov 2026",
    checkOut: "13 Nov 2026",
    nights: 5,
    totalAmount: 60000,
    paidAmount: 60000,
    status: "CHECKED_OUT",
    paymentMethod: "Nagad",
  },
  {
    id: "b5",
    bookingNumber: "STY-20261114-E7X",
    guestName: "Sadman Sakib",
    phone: "01766666666",
    roomNumber: "303",
    roomType: "Honeymoon Villa",
    checkIn: "14 Nov 2026",
    checkOut: "17 Nov 2026",
    nights: 3,
    totalAmount: 45000,
    paidAmount: 20000,
    status: "CONFIRMED",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "b6",
    bookingNumber: "STY-20261110-F1M",
    guestName: "Kamrul Islam",
    phone: "01788888888",
    roomNumber: "101",
    roomType: "Standard Queen",
    checkIn: "10 Nov 2026",
    checkOut: "12 Nov 2026",
    nights: 2,
    totalAmount: 9000,
    paidAmount: 0,
    status: "CANCELLED",
    paymentMethod: "Cash on Arrival",
  },
];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<BookingRecord[]>(INITIAL_BOOKINGS);
  const [selectedTab, setSelectedTab] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const updateStatus = (id: string, newStatus: BookingRecord["status"]) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
  };

  const filtered = bookings.filter((b) => {
    const matchTab = selectedTab === "ALL" || b.status === selectedTab;
    const matchSearch =
      b.bookingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.phone.includes(searchQuery) ||
      b.roomNumber.includes(searchQuery);
    return matchTab && matchSearch;
  });

  const getStatusBadge = (status: BookingRecord["status"]) => {
    switch (status) {
      case "CHECKED_IN":
        return <Badge className="bg-emerald-600 text-white font-medium">Checked In</Badge>;
      case "CONFIRMED":
        return <Badge className="bg-blue-600 text-white font-medium">Confirmed</Badge>;
      case "CHECKED_OUT":
        return <Badge className="bg-stone-500 text-white font-medium">Checked Out</Badge>;
      case "PENDING":
        return <Badge className="bg-amber-500 text-white font-medium">Pending</Badge>;
      case "CANCELLED":
        return <Badge className="bg-rose-500 text-white font-medium">Cancelled</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-hotel-navy">
            Reservations & Folio Management
          </h1>
          <p className="text-xs text-stone-500">
            Control online web bookings, front desk walk-ins, and guest check-ins/outs.
          </p>
        </div>

        <Button className="bg-hotel-navy hover:bg-hotel-navy-light text-hotel-gold font-semibold text-xs gap-2">
          <Plus className="w-4 h-4" /> Create Walk-in Booking
        </Button>
      </div>

      {/* Tabs & Search */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {[
            { id: "ALL", label: "All Bookings" },
            { id: "CONFIRMED", label: "Confirmed" },
            { id: "CHECKED_IN", label: "Checked In" },
            { id: "CHECKED_OUT", label: "Checked Out" },
            { id: "CANCELLED", label: "Cancelled" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedTab === tab.id
                  ? "bg-hotel-navy text-hotel-gold shadow"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search booking #, guest, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-hotel-gold/50"
          />
        </div>
      </div>

      {/* Bookings Table */}
      <Card className="border-stone-200 shadow-sm rounded-xl overflow-hidden bg-white">
        <Table>
          <TableHeader className="bg-stone-50 text-xs">
            <TableRow>
              <TableHead>Booking Ref</TableHead>
              <TableHead>Guest Name</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Schedule</TableHead>
              <TableHead>Financials</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs">
            {filtered.map((item) => {
              const due = item.totalAmount - item.paidAmount;
              return (
                <TableRow key={item.id} className="hover:bg-stone-50/70">
                  <TableCell className="font-mono font-bold text-hotel-navy">
                    {item.bookingNumber}
                    <span className="block text-[10px] text-stone-400 font-sans">
                      {item.paymentMethod}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-stone-800 block">{item.guestName}</span>
                    <span className="text-[11px] text-stone-500">{item.phone}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold text-stone-800">Room {item.roomNumber}</span>
                    <span className="block text-[11px] text-stone-500">{item.roomType}</span>
                  </TableCell>
                  <TableCell>
                    <span>
                      {item.checkIn} → {item.checkOut}
                    </span>
                    <span className="block text-[11px] text-stone-400 font-medium">
                      {item.nights} Nights Stay
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold text-stone-800">
                      {formatCurrency(item.totalAmount)}
                    </span>
                    <span className="block text-[11px]">
                      {due > 0 ? (
                        <span className="text-rose-600 font-semibold">
                          Due: {formatCurrency(due)}
                        </span>
                      ) : (
                        <span className="text-emerald-600 font-semibold">Paid in Full ✓</span>
                      )}
                    </span>
                  </TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="text-right space-x-1">
                    {item.status === "CONFIRMED" && (
                      <Button
                        size="sm"
                        onClick={() => updateStatus(item.id, "CHECKED_IN")}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] h-7 px-2.5"
                      >
                        Check-in
                      </Button>
                    )}
                    {item.status === "CHECKED_IN" && (
                      <Button
                        size="sm"
                        onClick={() => updateStatus(item.id, "CHECKED_OUT")}
                        className="bg-hotel-navy hover:bg-hotel-navy-light text-hotel-gold text-[11px] h-7 px-2.5"
                      >
                        Check-out
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="h-7 px-2 text-stone-600">
                      <FileText className="w-3.5 h-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
