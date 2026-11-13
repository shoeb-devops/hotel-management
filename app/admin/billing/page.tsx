"use client";

import React, { useState } from "react";
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  Download,
  Filter,
  Search,
  CheckCircle2,
  Clock,
  Printer,
  FileSpreadsheet,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";

interface PaymentTransaction {
  id: string;
  trxId: string;
  invoiceNo: string;
  guestName: string;
  roomNumber: string;
  amount: number;
  gateway: "bKash" | "Nagad" | "SSLCommerz" | "Stripe" | "Cash Desk";
  status: "COMPLETED" | "PENDING" | "REFUNDED";
  timestamp: string;
}

const TRANSACTIONS: PaymentTransaction[] = [
  { id: "tx1", trxId: "BK-98428174", invoiceNo: "INV-20261113-001", guestName: "Rahim Ahmed", roomNumber: "102", amount: 22500, gateway: "bKash", status: "COMPLETED", timestamp: "13 Nov, 10:14 AM" },
  { id: "tx2", trxId: "SSL-48192041", invoiceNo: "INV-20261113-002", guestName: "Fatema Begum", roomNumber: "105", amount: 10000, gateway: "SSLCommerz", status: "COMPLETED", timestamp: "13 Nov, 09:30 AM" },
  { id: "tx3", trxId: "pi_3Mtw28192", invoiceNo: "INV-20261112-003", guestName: "James Wilson", roomNumber: "201", amount: 96000, gateway: "Stripe", status: "COMPLETED", timestamp: "12 Nov, 04:45 PM" },
  { id: "tx4", trxId: "NG-19283748", invoiceNo: "INV-20261111-004", guestName: "Ayesha Khan", roomNumber: "301", amount: 60000, gateway: "Nagad", status: "COMPLETED", timestamp: "11 Nov, 02:15 PM" },
  { id: "tx5", trxId: "CSH-0029104", invoiceNo: "INV-20261110-005", guestName: "Kamrul Islam", roomNumber: "101", amount: 9000, gateway: "Cash Desk", status: "REFUNDED", timestamp: "10 Nov, 11:20 AM" },
  { id: "tx6", trxId: "SSL-99381726", invoiceNo: "INV-20261114-006", guestName: "Sadman Sakib", roomNumber: "303", amount: 20000, gateway: "SSLCommerz", status: "PENDING", timestamp: "14 Nov, 08:00 AM" },
];

export default function AdminBillingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [gatewayFilter, setGatewayFilter] = useState("ALL");

  const filtered = TRANSACTIONS.filter((t) => {
    const matchGateway = gatewayFilter === "ALL" || t.gateway === gatewayFilter;
    const matchSearch =
      t.trxId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.roomNumber.includes(searchQuery);
    return matchGateway && matchSearch;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-hotel-navy">
            Billing, Invoicing & Cash Reconciliations
          </h1>
          <p className="text-xs text-stone-500">
            Real-time tracking of bKash, Nagad, Stripe, and SSLCommerz card payments.
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-xs gap-1.5 border-stone-300">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
          <Button className="bg-hotel-navy hover:bg-hotel-navy-light text-hotel-gold font-semibold text-xs">
            + Record Manual Payment
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 border-stone-200 bg-white">
          <span className="text-xs text-stone-500 block">Today's Total Collection</span>
          <div className="text-2xl font-bold text-hotel-navy mt-1">
            {formatCurrency(32500)}
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-2">
            <TrendingUp className="w-3.5 h-3.5" /> +14.2% compared to yesterday
          </span>
        </Card>

        <Card className="p-5 border-stone-200 bg-white">
          <span className="text-xs text-stone-500 block">This Month's Revenue</span>
          <div className="text-2xl font-bold text-hotel-navy mt-1">
            {formatCurrency(1485000)}
          </div>
          <span className="text-[11px] text-stone-400 mt-2 block">
            Target: ৳2,000,000 (74% achieved)
          </span>
        </Card>

        <Card className="p-5 border-stone-200 bg-white">
          <span className="text-xs text-stone-500 block">Pending Receivables (Due)</span>
          <div className="text-2xl font-bold text-amber-600 mt-1">
            {formatCurrency(37500)}
          </div>
          <span className="text-[11px] text-stone-400 mt-2 block">
            Across 3 active resident rooms
          </span>
        </Card>

        <Card className="p-5 border-stone-200 bg-white">
          <span className="text-xs text-stone-500 block">VAT & Service Charge Accrued</span>
          <div className="text-2xl font-bold text-stone-800 mt-1">
            {formatCurrency(193695)}
          </div>
          <span className="text-[11px] text-stone-400 mt-2 block">
            NBR 15% statutory collection
          </span>
        </Card>
      </div>

      {/* Filter bar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {["ALL", "bKash", "Nagad", "SSLCommerz", "Stripe", "Cash Desk"].map((gw) => (
            <button
              key={gw}
              onClick={() => setGatewayFilter(gw)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                gatewayFilter === gw
                  ? "bg-hotel-navy text-hotel-gold shadow"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {gw}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search trx ID, invoice, guest..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-hotel-gold/50"
          />
        </div>
      </div>

      {/* Transactions Table */}
      <Card className="border-stone-200 shadow-sm rounded-xl overflow-hidden bg-white">
        <Table>
          <TableHeader className="bg-stone-50 text-xs">
            <TableRow>
              <TableHead>Invoice & Trx ID</TableHead>
              <TableHead>Guest & Room</TableHead>
              <TableHead>Channel</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs">
            {filtered.map((item) => (
              <TableRow key={item.id} className="hover:bg-stone-50/70">
                <TableCell>
                  <span className="font-bold text-hotel-navy block font-mono">
                    {item.invoiceNo}
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono">{item.trxId}</span>
                </TableCell>
                <TableCell>
                  <span className="font-semibold text-stone-800 block">{item.guestName}</span>
                  <span className="text-[11px] text-stone-500">Room {item.roomNumber}</span>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-semibold text-[11px]">
                    {item.gateway}
                  </Badge>
                </TableCell>
                <TableCell className="font-bold text-stone-900 text-sm">
                  {formatCurrency(item.amount)}
                </TableCell>
                <TableCell>
                  {item.status === "COMPLETED" && (
                    <Badge className="bg-emerald-600 text-white font-medium">Completed</Badge>
                  )}
                  {item.status === "PENDING" && (
                    <Badge className="bg-amber-500 text-white font-medium">Pending</Badge>
                  )}
                  {item.status === "REFUNDED" && (
                    <Badge className="bg-rose-500 text-white font-medium">Refunded</Badge>
                  )}
                </TableCell>
                <TableCell className="text-stone-500">{item.timestamp}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" className="h-7 px-2 text-stone-600">
                    <Printer className="w-3.5 h-3.5 mr-1" /> Invoice PDF
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
