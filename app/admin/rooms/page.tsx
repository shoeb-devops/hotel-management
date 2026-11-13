"use client";

import React, { useState } from "react";
import {
  BedDouble,
  Plus,
  Filter,
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Layers,
  MoreVertical,
  DoorOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface RoomItem {
  id: string;
  roomNumber: string;
  floor: number;
  type: string;
  price: number;
  status: "AVAILABLE" | "OCCUPIED" | "RESERVED" | "MAINTENANCE" | "HOUSEKEEPING";
  currentGuest?: string;
  checkOut?: string;
}

const INITIAL_ROOMS: RoomItem[] = [
  { id: "1", roomNumber: "101", floor: 1, type: "Standard Queen", price: 4500, status: "AVAILABLE" },
  { id: "2", roomNumber: "102", floor: 1, type: "Standard Queen", price: 4500, status: "OCCUPIED", currentGuest: "Rahim Ahmed", checkOut: "Tomorrow, 12:00 PM" },
  { id: "3", roomNumber: "103", floor: 1, type: "Standard Queen", price: 4500, status: "HOUSEKEEPING" },
  { id: "4", roomNumber: "104", floor: 1, type: "Standard Queen", price: 4500, status: "AVAILABLE" },
  { id: "5", roomNumber: "105", floor: 1, type: "Deluxe King", price: 7500, status: "RESERVED", currentGuest: "Fatema Begum", checkOut: "Check-in at 2:00 PM" },
  { id: "6", roomNumber: "106", floor: 1, type: "Deluxe King", price: 7500, status: "MAINTENANCE" },

  { id: "7", roomNumber: "201", floor: 2, type: "Deluxe King", price: 7500, status: "OCCUPIED", currentGuest: "James Wilson", checkOut: "18 Nov, 12:00 PM" },
  { id: "8", roomNumber: "202", floor: 2, type: "Deluxe King", price: 7500, status: "AVAILABLE" },
  { id: "9", roomNumber: "203", floor: 2, type: "Grand Family Residence", price: 9000, status: "OCCUPIED", currentGuest: "Tanvir Hasan", checkOut: "20 Nov, 12:00 PM" },
  { id: "10", roomNumber: "204", floor: 2, type: "Grand Family Residence", price: 9000, status: "AVAILABLE" },
  { id: "11", roomNumber: "205", floor: 2, type: "Standard Queen", price: 4500, status: "AVAILABLE" },
  { id: "12", roomNumber: "206", floor: 2, type: "Standard Queen", price: 4500, status: "HOUSEKEEPING" },

  { id: "13", roomNumber: "301", floor: 3, type: "Royal Executive Suite", price: 12000, status: "OCCUPIED", currentGuest: "Ayesha Khan", checkOut: "16 Nov, 12:00 PM" },
  { id: "14", roomNumber: "302", floor: 3, type: "Royal Executive Suite", price: 12000, status: "AVAILABLE" },
  { id: "15", roomNumber: "303", floor: 3, type: "Honeymoon Villa Suite", price: 15000, status: "RESERVED", currentGuest: "Sadman & Nusrat", checkOut: "Check-in at 3:00 PM" },
  { id: "16", roomNumber: "304", floor: 3, type: "Honeymoon Villa Suite", price: 15000, status: "AVAILABLE" },

  { id: "17", roomNumber: "401", floor: 4, type: "Grand Presidential Suite", price: 25000, status: "OCCUPIED", currentGuest: "Ambassador Tanaka", checkOut: "22 Nov, 12:00 PM" },
  { id: "18", roomNumber: "402", floor: 4, type: "Grand Presidential Suite", price: 25000, status: "AVAILABLE" },
  { id: "19", roomNumber: "403", floor: 4, type: "Royal Executive Suite", price: 12000, status: "MAINTENANCE" },
  { id: "20", roomNumber: "404", floor: 4, type: "Royal Executive Suite", price: 12000, status: "AVAILABLE" },
];

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState<RoomItem[]>(INITIAL_ROOMS);
  const [filterFloor, setFilterFloor] = useState<number | "ALL">("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const updateRoomStatus = (roomId: string, newStatus: RoomItem["status"]) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === roomId ? { ...r, status: newStatus } : r))
    );
  };

  const filteredRooms = rooms.filter((room) => {
    const matchFloor = filterFloor === "ALL" || room.floor === filterFloor;
    const matchStatus = filterStatus === "ALL" || room.status === filterStatus;
    const matchSearch =
      room.roomNumber.includes(searchQuery) ||
      room.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (room.currentGuest && room.currentGuest.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchFloor && matchStatus && matchSearch;
  });

  const statusCounts = {
    total: rooms.length,
    available: rooms.filter((r) => r.status === "AVAILABLE").length,
    occupied: rooms.filter((r) => r.status === "OCCUPIED").length,
    reserved: rooms.filter((r) => r.status === "RESERVED").length,
    maintenance: rooms.filter((r) => r.status === "MAINTENANCE").length,
    housekeeping: rooms.filter((r) => r.status === "HOUSEKEEPING").length,
  };

  const getStatusBadge = (status: RoomItem["status"]) => {
    switch (status) {
      case "AVAILABLE":
        return <Badge className="bg-emerald-500 text-white font-medium">Available</Badge>;
      case "OCCUPIED":
        return <Badge className="bg-rose-500 text-white font-medium">Occupied</Badge>;
      case "RESERVED":
        return <Badge className="bg-amber-500 text-white font-medium">Reserved</Badge>;
      case "MAINTENANCE":
        return <Badge className="bg-blue-600 text-white font-medium">Maintenance</Badge>;
      case "HOUSEKEEPING":
        return <Badge className="bg-purple-600 text-white font-medium">Cleaning</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Page Title & Add Room CTA */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-hotel-navy">
            Room Inventory & Status Matrix
          </h1>
          <p className="text-xs text-stone-500">
            Real-time visual monitoring of all floors, room occupations, and maintenance states.
          </p>
        </div>

        <Button className="bg-hotel-navy hover:bg-hotel-navy-light text-hotel-gold font-semibold text-xs gap-2">
          <Plus className="w-4 h-4" /> Add New Room
        </Button>
      </div>

      {/* Overview Stat Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div
          onClick={() => setFilterStatus("ALL")}
          className={`p-3.5 rounded-xl border bg-white cursor-pointer transition-all ${
            filterStatus === "ALL" ? "border-hotel-navy shadow-sm" : "border-stone-200"
          }`}
        >
          <span className="text-[11px] text-stone-500 block">Total Rooms</span>
          <span className="text-xl font-bold text-stone-800">{statusCounts.total}</span>
        </div>
        <div
          onClick={() => setFilterStatus("AVAILABLE")}
          className={`p-3.5 rounded-xl border bg-white cursor-pointer transition-all ${
            filterStatus === "AVAILABLE" ? "border-emerald-500 shadow-sm" : "border-stone-200"
          }`}
        >
          <span className="text-[11px] text-emerald-600 font-semibold block">Available</span>
          <span className="text-xl font-bold text-emerald-600">{statusCounts.available}</span>
        </div>
        <div
          onClick={() => setFilterStatus("OCCUPIED")}
          className={`p-3.5 rounded-xl border bg-white cursor-pointer transition-all ${
            filterStatus === "OCCUPIED" ? "border-rose-500 shadow-sm" : "border-stone-200"
          }`}
        >
          <span className="text-[11px] text-rose-600 font-semibold block">Occupied</span>
          <span className="text-xl font-bold text-rose-600">{statusCounts.occupied}</span>
        </div>
        <div
          onClick={() => setFilterStatus("RESERVED")}
          className={`p-3.5 rounded-xl border bg-white cursor-pointer transition-all ${
            filterStatus === "RESERVED" ? "border-amber-500 shadow-sm" : "border-stone-200"
          }`}
        >
          <span className="text-[11px] text-amber-600 font-semibold block">Reserved</span>
          <span className="text-xl font-bold text-amber-600">{statusCounts.reserved}</span>
        </div>
        <div
          onClick={() => setFilterStatus("HOUSEKEEPING")}
          className={`p-3.5 rounded-xl border bg-white cursor-pointer transition-all ${
            filterStatus === "HOUSEKEEPING" ? "border-purple-500 shadow-sm" : "border-stone-200"
          }`}
        >
          <span className="text-[11px] text-purple-600 font-semibold block">Housekeeping</span>
          <span className="text-xl font-bold text-purple-600">{statusCounts.housekeeping}</span>
        </div>
        <div
          onClick={() => setFilterStatus("MAINTENANCE")}
          className={`p-3.5 rounded-xl border bg-white cursor-pointer transition-all ${
            filterStatus === "MAINTENANCE" ? "border-blue-500 shadow-sm" : "border-stone-200"
          }`}
        >
          <span className="text-[11px] text-blue-600 font-semibold block">Maintenance</span>
          <span className="text-xl font-bold text-blue-600">{statusCounts.maintenance}</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-500 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-hotel-gold" /> Floor:
          </span>
          {["ALL", 1, 2, 3, 4].map((fl) => (
            <button
              key={fl}
              onClick={() => setFilterFloor(fl as any)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                filterFloor === fl
                  ? "bg-hotel-navy text-hotel-gold"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {fl === "ALL" ? "All Floors" : `Floor ${fl}`}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search room # or guest name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-hotel-gold/50"
          />
        </div>
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredRooms.map((room) => (
          <Card
            key={room.id}
            className="border-stone-200 hover:shadow-md transition-all rounded-xl overflow-hidden bg-white"
          >
            <div className="p-4 border-b border-stone-100 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold font-heading text-hotel-navy">
                    Room {room.roomNumber}
                  </span>
                  <span className="text-[10px] text-stone-400">Fl {room.floor}</span>
                </div>
                <p className="text-xs text-stone-600 font-medium">{room.type}</p>
              </div>
              {getStatusBadge(room.status)}
            </div>

            <CardContent className="p-4 space-y-3">
              <div className="text-xs">
                {room.currentGuest ? (
                  <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                    <span className="text-stone-400 block text-[10px]">Current Resident</span>
                    <span className="font-semibold text-stone-800">{room.currentGuest}</span>
                    <span className="text-[11px] text-stone-500 block mt-0.5">{room.checkOut}</span>
                  </div>
                ) : (
                  <div className="p-2 text-stone-400 italic text-[11px]">
                    No active occupancy
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center text-xs pt-1 border-t border-stone-100">
                <span className="font-semibold text-hotel-navy">
                  {formatCurrency(room.price)} / night
                </span>

                {/* Status Changer Select */}
                <select
                  value={room.status}
                  onChange={(e) => updateRoomStatus(room.id, e.target.value as any)}
                  className="text-[11px] p-1 bg-stone-100 rounded border border-stone-300 font-medium cursor-pointer"
                >
                  <option value="AVAILABLE">Available</option>
                  <option value="OCCUPIED">Occupied</option>
                  <option value="RESERVED">Reserved</option>
                  <option value="HOUSEKEEPING">Housekeeping</option>
                  <option value="MAINTENANCE">Maintenance</option>
                </select>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
