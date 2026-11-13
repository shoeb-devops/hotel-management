"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  LogIn,
  LogOut,
  Percent,
  TrendingUp,
  TrendingDown,
  Plus,
  UserPlus,
  Footprints,
  UtensilsCrossed,
  MoreHorizontal,
  ArrowUpRight,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const statCards = [
  {
    title: "Total Bookings",
    value: "156",
    change: "+12.5%",
    trend: "up" as const,
    icon: CalendarCheck,
    color: "from-blue-500 to-blue-600",
    bgLight: "bg-blue-50",
  },
  {
    title: "Today's Check-ins",
    value: "12",
    change: "+3.2%",
    trend: "up" as const,
    icon: LogIn,
    color: "from-emerald-500 to-emerald-600",
    bgLight: "bg-emerald-50",
  },
  {
    title: "Today's Check-outs",
    value: "8",
    change: "-2.1%",
    trend: "down" as const,
    icon: LogOut,
    color: "from-amber-500 to-amber-600",
    bgLight: "bg-amber-50",
  },
  {
    title: "Occupancy Rate",
    value: "78%",
    change: "+5.3%",
    trend: "up" as const,
    icon: Percent,
    color: "from-purple-500 to-purple-600",
    bgLight: "bg-purple-50",
  },
];

const revenueData = [
  { month: "Jan", revenue: 420000 },
  { month: "Feb", revenue: 380000 },
  { month: "Mar", revenue: 510000 },
  { month: "Apr", revenue: 470000 },
  { month: "May", revenue: 560000 },
  { month: "Jun", revenue: 620000 },
  { month: "Jul", revenue: 710000 },
  { month: "Aug", revenue: 680000 },
  { month: "Sep", revenue: 590000 },
  { month: "Oct", revenue: 640000 },
  { month: "Nov", revenue: 720000 },
  { month: "Dec", revenue: 780000 },
];

const roomStatusData = [
  { name: "Available", value: 42, color: "#10B981" },
  { name: "Occupied", value: 78, color: "#1B2A4A" },
  { name: "Maintenance", value: 5, color: "#F59E0B" },
  { name: "Reserved", value: 15, color: "#C5A55A" },
];

const recentBookings = [
  {
    id: "STY-20241201-A3F",
    guest: "Ahmed Rahman",
    room: "Suite 501",
    checkIn: "Dec 15, 2024",
    checkOut: "Dec 18, 2024",
    status: "Confirmed",
    amount: "৳45,000",
  },
  {
    id: "STY-20241201-B7K",
    guest: "Sarah Chen",
    room: "Deluxe 302",
    checkIn: "Dec 14, 2024",
    checkOut: "Dec 16, 2024",
    status: "Checked In",
    amount: "৳22,000",
  },
  {
    id: "STY-20241201-C2M",
    guest: "James Wilson",
    room: "Standard 105",
    checkIn: "Dec 13, 2024",
    checkOut: "Dec 15, 2024",
    status: "Checked Out",
    amount: "৳12,000",
  },
  {
    id: "STY-20241201-D9P",
    guest: "Fatima Ali",
    room: "Suite 602",
    checkIn: "Dec 16, 2024",
    checkOut: "Dec 20, 2024",
    status: "Pending",
    amount: "৳68,000",
  },
  {
    id: "STY-20241201-E5R",
    guest: "Michael Brown",
    room: "Deluxe 405",
    checkIn: "Dec 12, 2024",
    checkOut: "Dec 14, 2024",
    status: "Cancelled",
    amount: "৳28,000",
  },
];

const quickActions = [
  { label: "New Booking", icon: Plus, color: "bg-hotel-gold hover:bg-hotel-gold-dark text-white" },
  { label: "Walk-in", icon: Footprints, color: "bg-hotel-navy hover:bg-hotel-navy-light text-white" },
  { label: "Add Guest", icon: UserPlus, color: "bg-emerald-600 hover:bg-emerald-700 text-white" },
  { label: "Room Service", icon: UtensilsCrossed, color: "bg-purple-600 hover:bg-purple-700 text-white" },
];

function getStatusBadge(status: string) {
  const styles: Record<string, string> = {
    Confirmed: "bg-blue-100 text-blue-800",
    "Checked In": "bg-green-100 text-green-800",
    "Checked Out": "bg-gray-100 text-gray-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Cancelled: "bg-red-100 text-red-800",
  };
  return styles[status] || "bg-gray-100 text-gray-800";
}

function CustomTooltipContent({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border rounded-lg shadow-xl p-3">
        <p className="text-sm font-semibold text-hotel-navy">{label}</p>
        <p className="text-sm text-hotel-gold">
          ৳{(payload[0].value / 1000).toFixed(0)}K
        </p>
      </div>
    );
  }
  return null;
}

export default function DashboardPage() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = today.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">
      {/* Welcome Banner */}
      <motion.div
        variants={fadeUp}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-hotel-navy to-hotel-navy-light p-6 md:p-8 text-white"
      >
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-heading font-bold">
            Welcome back, <span className="text-hotel-gold">Admin</span>
          </h1>
          <p className="mt-1 text-white/70 text-sm md:text-base">
            {formattedDate} • {formattedTime}
          </p>
          <p className="mt-3 text-white/80 text-sm">
            You have <span className="text-hotel-gold font-semibold">12 check-ins</span> and{" "}
            <span className="text-hotel-gold font-semibold">8 check-outs</span> scheduled today.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-hotel-gold/10 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 right-20 w-32 h-32 bg-hotel-gold/5 rounded-full translate-y-1/2" />
      </motion.div>

      {/* Stat Cards */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <motion.div
            key={stat.title}
            variants={fadeUp}
            className="bg-white rounded-xl border p-5 hover-lift shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
                <p className="text-2xl md:text-3xl font-heading font-bold text-hotel-navy mt-1">
                  {stat.value}
                </p>
              </div>
              <div
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br",
                  stat.color
                )}
              >
                <stat.icon className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5">
              {stat.trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span
                className={cn(
                  "text-sm font-medium",
                  stat.trend === "up" ? "text-emerald-600" : "text-red-600"
                )}
              >
                {stat.change}
              </span>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <motion.div variants={fadeUp} className="lg:col-span-2 bg-white rounded-xl border p-5 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-heading font-semibold text-hotel-navy">
                Revenue Overview
              </h2>
              <p className="text-sm text-muted-foreground">Monthly revenue for 2024</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-hotel-navy">৳70.8L</span>
              <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                +14.2%
              </span>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C5A55A" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#C5A55A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#888" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#888" }}
                  tickFormatter={(val) => `${(val / 1000).toFixed(0)}K`}
                />
                <Tooltip content={<CustomTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#C5A55A"
                  strokeWidth={2.5}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Room Status Donut */}
        <motion.div variants={fadeUp} className="bg-white rounded-xl border p-5 shadow-sm">
          <h2 className="text-lg font-heading font-semibold text-hotel-navy mb-2">
            Room Status
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Total: {roomStatusData.reduce((a, b) => a + b.value, 0)} rooms
          </p>
          <div className="h-52 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roomStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {roomStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number, name: string) => [value, name]}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {roomStatusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-semibold text-hotel-navy">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Bookings & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Recent Bookings Table */}
        <motion.div variants={fadeUp} className="lg:col-span-3 bg-white rounded-xl border shadow-sm">
          <div className="flex items-center justify-between p-5 border-b">
            <div>
              <h2 className="text-lg font-heading font-semibold text-hotel-navy">
                Recent Bookings
              </h2>
              <p className="text-sm text-muted-foreground">Latest booking activities</p>
            </div>
            <button className="text-sm text-hotel-gold font-medium hover:underline flex items-center gap-1">
              View all
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-hotel-cream/30">
                <TableHead>Booking #</TableHead>
                <TableHead>Guest</TableHead>
                <TableHead className="hidden md:table-cell">Room</TableHead>
                <TableHead className="hidden lg:table-cell">Check-in</TableHead>
                <TableHead className="hidden lg:table-cell">Check-out</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-mono text-xs text-hotel-navy font-medium">
                    {booking.id}
                  </TableCell>
                  <TableCell className="font-medium">{booking.guest}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {booking.room}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground">
                    {booking.checkIn}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground">
                    {booking.checkOut}
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "status-badge",
                        getStatusBadge(booking.status)
                      )}
                    >
                      {booking.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-hotel-navy">
                    {booking.amount}
                  </TableCell>
                  <TableCell>
                    <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-hotel-cream transition-colors">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={fadeUp} className="bg-white rounded-xl border p-5 shadow-sm">
          <h2 className="text-lg font-heading font-semibold text-hotel-navy mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            {quickActions.map((action) => (
              <button
                key={action.label}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 active:scale-[0.98]",
                  action.color
                )}
              >
                <action.icon className="h-4 w-4" />
                {action.label}
              </button>
            ))}
          </div>

          {/* Today's Summary */}
          <div className="mt-6 pt-5 border-t">
            <h3 className="text-sm font-semibold text-hotel-navy mb-3">Today&apos;s Summary</h3>
            <div className="space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Revenue</span>
                <span className="font-semibold text-hotel-navy">৳1,25,000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">New Guests</span>
                <span className="font-semibold text-hotel-navy">7</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Room Service</span>
                <span className="font-semibold text-hotel-navy">15 orders</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Pending Tasks</span>
                <span className="font-semibold text-hotel-gold">4</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
