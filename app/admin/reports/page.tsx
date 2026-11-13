"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  Download,
  Calendar,
  DollarSign,
  Users,
  Building,
  FileSpreadsheet,
  Printer,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
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
import { formatCurrency } from "@/lib/utils";

const MONTHLY_REVENUE = [
  { month: "Jan", revenue: 850000, bookings: 78 },
  { month: "Feb", revenue: 920000, bookings: 85 },
  { month: "Mar", revenue: 1100000, bookings: 102 },
  { month: "Apr", revenue: 1350000, bookings: 125 },
  { month: "May", revenue: 1200000, bookings: 112 },
  { month: "Jun", revenue: 1450000, bookings: 138 },
  { month: "Jul", revenue: 1300000, bookings: 120 },
  { month: "Aug", revenue: 1550000, bookings: 145 },
  { month: "Sep", revenue: 1680000, bookings: 160 },
  { month: "Oct", revenue: 1720000, bookings: 168 },
  { month: "Nov", revenue: 1850000, bookings: 182 },
];

const OCCUPANCY_TREND = [
  { day: "01 Nov", rate: 68 },
  { day: "03 Nov", rate: 72 },
  { day: "05 Nov", rate: 85 },
  { day: "07 Nov", rate: 78 },
  { day: "09 Nov", rate: 88 },
  { day: "11 Nov", rate: 92 },
  { day: "13 Nov", rate: 84 },
];

const BOOKING_SOURCES = [
  { name: "Website Direct", value: 55, color: "#1B2A4A" },
  { name: "Walk-in Desk", value: 25, color: "#C5A55A" },
  { name: "Booking.com / Agoda", value: 15, color: "#2563EB" },
  { name: "Corporate Tie-ups", value: 5, color: "#10B981" },
];

export default function AdminReportsPage() {
  const [timeRange, setTimeRange] = useState("Month");

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-hotel-navy">
            Executive Analytics & Financial Intelligence
          </h1>
          <p className="text-xs text-stone-500">
            Real-time RevPAR, occupancy yield, sales channels, and statutory revenue reporting.
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 border-stone-300 text-xs">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" /> Export Excel
          </Button>
          <Button
            size="sm"
            onClick={() => window.print()}
            className="bg-hotel-navy hover:bg-hotel-navy-light text-hotel-gold font-semibold text-xs gap-1.5"
          >
            <Printer className="w-4 h-4" /> Print PDF Report
          </Button>
        </div>
      </div>

      {/* KPI Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 bg-white border-stone-200">
          <span className="text-xs text-stone-500 block">ADR (Average Daily Rate)</span>
          <div className="text-2xl font-bold text-hotel-navy mt-1">
            {formatCurrency(8450)}
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-2">
            <TrendingUp className="w-3.5 h-3.5" /> +8.5% year-on-year
          </span>
        </Card>

        <Card className="p-5 bg-white border-stone-200">
          <span className="text-xs text-stone-500 block">RevPAR (Revenue per Available Room)</span>
          <div className="text-2xl font-bold text-hotel-navy mt-1">
            {formatCurrency(6929)}
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-2">
            <TrendingUp className="w-3.5 h-3.5" /> High yield performance
          </span>
        </Card>

        <Card className="p-5 bg-white border-stone-200">
          <span className="text-xs text-stone-500 block">Average Occupancy Yield</span>
          <div className="text-2xl font-bold text-stone-900 mt-1">82.4%</div>
          <span className="text-[11px] text-stone-400 mt-2 block">
            Target 75% surpassed by 7.4%
          </span>
        </Card>

        <Card className="p-5 bg-white border-stone-200">
          <span className="text-xs text-stone-500 block">Total Guest Nights Booked</span>
          <div className="text-2xl font-bold text-stone-900 mt-1">1,492</div>
          <span className="text-[11px] text-stone-400 mt-2 block">During this quarter</span>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Revenue Chart */}
        <Card className="lg:col-span-2 border-stone-200 bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold text-hotel-navy">
              Revenue Trajectory (2026)
            </CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_REVENUE}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1B2A4A" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#C5A55A" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" tickLine={false} tick={{ fontSize: 11 }} />
                <YAxis
                  tickLine={false}
                  tick={{ fontSize: 11 }}
                  tickFormatter={(v) => `৳${v / 1000}k`}
                />
                <Tooltip
                  formatter={(val: any) => [formatCurrency(val), "Revenue"]}
                  contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#1B2A4A"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorRev)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Booking Channel Distribution */}
        <Card className="border-stone-200 bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold text-hotel-navy">
              Booking Source Mix
            </CardTitle>
          </CardHeader>
          <CardContent className="h-72 flex flex-col justify-between">
            <ResponsiveContainer width="100%" height="70%">
              <PieChart>
                <Pie
                  data={BOOKING_SOURCES}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {BOOKING_SOURCES.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [`${v}%`, "Share"]} />
              </PieChart>
            </ResponsiveContainer>

            <div className="space-y-1.5 pt-2 border-t text-xs">
              {BOOKING_SOURCES.map((src, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: src.color }} />
                    <span className="text-stone-600">{src.name}</span>
                  </div>
                  <span className="font-bold text-stone-800">{src.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Occupancy Trend Bar Chart */}
      <Card className="border-stone-200 bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-bold text-hotel-navy">
            Daily Occupancy Rate (%) - November Cycle
          </CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={OCCUPANCY_TREND}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="day" tickLine={false} tick={{ fontSize: 11 }} />
              <YAxis tickLine={false} tick={{ fontSize: 11 }} domain={[0, 100]} />
              <Tooltip formatter={(v) => [`${v}%`, "Occupancy"]} />
              <Bar dataKey="rate" fill="#C5A55A" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
