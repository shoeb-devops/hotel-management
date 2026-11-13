"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BedDouble,
  CalendarCheck,
  Users,
  CreditCard,
  Sparkles,
  UserCog,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Hotel,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
  { label: "Rooms", icon: BedDouble, href: "/admin/rooms" },
  { label: "Bookings", icon: CalendarCheck, href: "/admin/bookings" },
  { label: "Guests", icon: Users, href: "/admin/guests" },
  { label: "Billing", icon: CreditCard, href: "/admin/billing" },
  { label: "Housekeeping", icon: Sparkles, href: "/admin/housekeeping" },
  { label: "Staff", icon: UserCog, href: "/admin/staff" },
  { label: "Reports", icon: BarChart3, href: "/admin/reports" },
  { label: "Settings", icon: Settings, href: "/admin/settings" },
];

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={0}>
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 260 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed left-0 top-0 z-40 h-screen bg-hotel-navy flex flex-col border-r border-white/10"
      >
        {/* Logo Section */}
        <div className="flex items-center h-16 px-4 border-b border-white/10">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-hotel-gold to-hotel-gold-light">
              <Hotel className="h-5 w-5 text-white" />
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  <span className="text-xl font-heading font-bold text-white">
                    Stay<span className="text-hotel-gold">Sync</span>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            const linkContent = (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                  isActive
                    ? "bg-hotel-gold/20 text-hotel-gold"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-hotel-gold rounded-r-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <item.icon
                  className={cn(
                    "h-5 w-5 shrink-0 transition-colors",
                    isActive ? "text-hotel-gold" : "text-white/70 group-hover:text-white"
                  )}
                />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );

            if (collapsed) {
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                  <TooltipContent side="right" className="font-body">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              );
            }

            return <React.Fragment key={item.href}>{linkContent}</React.Fragment>;
          })}
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-white/10 p-3">
          {/* User Info */}
          <div
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl mb-2",
              collapsed ? "justify-center" : ""
            )}
          >
            <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-hotel-gold to-hotel-gold-light flex items-center justify-center text-white font-semibold text-sm">
              AR
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <p className="text-sm font-medium text-white truncate">Admin</p>
                  <p className="text-xs text-white/50 truncate">admin@staysync.com</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Logout */}
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="flex items-center justify-center w-full gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200">
                  <LogOut className="h-5 w-5 shrink-0" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="font-body">
                Logout
              </TooltipContent>
            </Tooltip>
          ) : (
            <button className="flex items-center w-full gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200">
              <LogOut className="h-5 w-5 shrink-0" />
              <span>Logout</span>
            </button>
          )}
        </div>

        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className="absolute -right-3 top-20 h-6 w-6 rounded-full bg-hotel-navy border-2 border-hotel-gold/50 flex items-center justify-center text-hotel-gold hover:bg-hotel-navy-light transition-colors shadow-lg"
        >
          {collapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </button>
      </motion.aside>
    </TooltipProvider>
  );
}
