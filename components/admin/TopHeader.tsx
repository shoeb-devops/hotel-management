"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bell,
  Menu,
  User,
  Settings,
  LogOut,
  ChevronDown,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopHeaderProps {
  onMenuToggle: () => void;
}

const notifications = [
  {
    id: 1,
    title: "New booking received",
    description: "Room 305 — John Doe, Dec 15-18",
    time: "5 min ago",
    unread: true,
  },
  {
    id: 2,
    title: "Check-out reminder",
    description: "Room 201 — Jane Smith, Today 11:00 AM",
    time: "15 min ago",
    unread: true,
  },
  {
    id: 3,
    title: "Housekeeping complete",
    description: "Room 410 is now ready",
    time: "1 hr ago",
    unread: false,
  },
  {
    id: 4,
    title: "Payment received",
    description: "৳25,000 from Booking #STY-2024-A1B",
    time: "2 hr ago",
    unread: false,
  },
];

export default function TopHeader({ onMenuToggle }: TopHeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white/80 backdrop-blur-md px-4 md:px-6">
      {/* Menu Toggle */}
      <button
        onClick={onMenuToggle}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-hotel-navy hover:bg-hotel-cream transition-colors lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search bookings, guests, rooms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full rounded-lg border border-input bg-hotel-cream/50 pl-9 pr-4 text-sm outline-none focus:border-hotel-gold focus:ring-2 focus:ring-hotel-gold/20 transition-all placeholder:text-muted-foreground"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Notifications */}
        <DropdownMenu open={notifOpen} onOpenChange={setNotifOpen}>
          <DropdownMenuTrigger asChild>
            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-hotel-navy hover:bg-hotel-cream transition-colors">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-0">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h4 className="text-sm font-semibold text-hotel-navy">
                Notifications
              </h4>
              <span className="text-xs text-hotel-gold font-medium cursor-pointer hover:underline">
                Mark all read
              </span>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={cn(
                    "flex gap-3 px-4 py-3 hover:bg-hotel-cream/50 transition-colors cursor-pointer border-b last:border-0",
                    notif.unread && "bg-hotel-gold/5"
                  )}
                >
                  <div className="mt-0.5">
                    <div
                      className={cn(
                        "h-2 w-2 rounded-full",
                        notif.unread ? "bg-hotel-gold" : "bg-transparent"
                      )}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-hotel-navy">
                      {notif.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {notif.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {notif.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t px-4 py-2">
              <button className="w-full text-center text-xs font-medium text-hotel-gold hover:underline">
                View all notifications
              </button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Divider */}
        <div className="hidden md:block h-6 w-px bg-border" />

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-hotel-cream transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-hotel-navy">Admin</p>
                <p className="text-xs text-muted-foreground">Manager</p>
              </div>
              <ChevronDown className="hidden md:block h-4 w-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Admin</p>
                <p className="text-xs text-muted-foreground">
                  admin@staysync.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 cursor-pointer text-red-600 focus:text-red-600">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
