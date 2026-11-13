"use client";

import React, { useState } from "react";
import {
  Users,
  Search,
  Plus,
  Phone,
  Mail,
  Clock,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  Calendar,
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

interface StaffMember {
  id: string;
  empId: string;
  name: string;
  role: string;
  department: string;
  phone: string;
  email: string;
  currentShift: "MORNING" | "EVENING" | "NIGHT" | "OFF";
  salary: number;
  status: "ACTIVE" | "ON_LEAVE";
}

const INITIAL_STAFF: StaffMember[] = [
  { id: "s1", empId: "EMP-001", name: "Mohammad Ali", role: "General Manager", department: "Executive Office", phone: "01755555555", email: "m.ali@staysync.com", currentShift: "MORNING", salary: 120000, status: "ACTIVE" },
  { id: "s2", empId: "EMP-002", name: "Nusrat Jahan", role: "Front Desk Manager", department: "Front Office", phone: "01766666666", email: "nusrat@staysync.com", currentShift: "MORNING", salary: 55000, status: "ACTIVE" },
  { id: "s3", empId: "EMP-003", name: "Rafiq Islam", role: "Senior Housekeeper", department: "Housekeeping", phone: "01777777777", email: "rafiq@staysync.com", currentShift: "EVENING", salary: 22000, status: "ACTIVE" },
  { id: "s4", empId: "EMP-004", name: "Sumaiya Akter", role: "Chief Accountant", department: "Finance", phone: "01788888888", email: "sumaiya@staysync.com", currentShift: "MORNING", salary: 48000, status: "ACTIVE" },
  { id: "s5", empId: "EMP-005", name: "Hasan Mahmud", role: "Executive Master Chef", department: "Food & Beverage", phone: "01799999999", email: "hasan@staysync.com", currentShift: "EVENING", salary: 50000, status: "ACTIVE" },
  { id: "s6", empId: "EMP-006", name: "Shahana Begum", role: "Housekeeping Associate", department: "Housekeeping", phone: "01712340000", email: "shahana@staysync.com", currentShift: "MORNING", salary: 18000, status: "ACTIVE" },
  { id: "s7", empId: "EMP-007", name: "Zubair Hossain", role: "Night Duty Manager", department: "Front Office", phone: "01732100000", email: "zubair@staysync.com", currentShift: "NIGHT", salary: 40000, status: "ACTIVE" },
  { id: "s8", empId: "EMP-008", name: "Kabir Khan", role: "Chief Security Officer", department: "Security", phone: "01744440000", email: "kabir@staysync.com", currentShift: "MORNING", salary: 28000, status: "ON_LEAVE" },
];

export default function AdminStaffPage() {
  const [staffList, setStaffList] = useState<StaffMember[]>(INITIAL_STAFF);
  const [departmentFilter, setDepartmentFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = staffList.filter((s) => {
    const matchDept = departmentFilter === "ALL" || s.department === departmentFilter;
    const matchSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.empId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.phone.includes(searchQuery);
    return matchDept && matchSearch;
  });

  const getShiftBadge = (shift: StaffMember["currentShift"]) => {
    switch (shift) {
      case "MORNING":
        return <Badge className="bg-amber-100 text-amber-800 border-none">Morning (8am-4pm)</Badge>;
      case "EVENING":
        return <Badge className="bg-blue-100 text-blue-800 border-none">Evening (4pm-12am)</Badge>;
      case "NIGHT":
        return <Badge className="bg-indigo-100 text-indigo-800 border-none">Night (12am-8am)</Badge>;
      default:
        return <Badge variant="outline" className="text-stone-400">Off Duty</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-hotel-navy">
            Human Resources & Shift Roster
          </h1>
          <p className="text-xs text-stone-500">
            Staff directory, departmental assignments, compensation, and active 24/7 duty shifts.
          </p>
        </div>

        <Button className="bg-hotel-navy hover:bg-hotel-navy-light text-hotel-gold font-semibold text-xs gap-2">
          <Plus className="w-4 h-4" /> Add Staff Member
        </Button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {["ALL", "Front Office", "Housekeeping", "Food & Beverage", "Finance", "Security"].map((dept) => (
            <button
              key={dept}
              onClick={() => setDepartmentFilter(dept)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                departmentFilter === dept
                  ? "bg-hotel-navy text-hotel-gold shadow"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {dept === "ALL" ? "All Departments" : dept}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search employee, ID, role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-hotel-gold/50"
          />
        </div>
      </div>

      {/* Staff Table */}
      <Card className="border-stone-200 shadow-sm rounded-xl overflow-hidden bg-white">
        <Table>
          <TableHeader className="bg-stone-50 text-xs">
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Role & Department</TableHead>
              <TableHead>Duty Shift</TableHead>
              <TableHead>Monthly Salary</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Contact</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs">
            {filtered.map((staff) => (
              <TableRow key={staff.id} className="hover:bg-stone-50/70">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-hotel-cream text-hotel-navy font-bold flex items-center justify-center text-xs">
                      {staff.name.charAt(0)}
                    </div>
                    <div>
                      <span className="font-bold text-stone-800 block">{staff.name}</span>
                      <span className="text-[10px] text-stone-400 font-mono">{staff.empId}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-semibold text-stone-800 block">{staff.role}</span>
                  <span className="text-[11px] text-stone-500">{staff.department}</span>
                </TableCell>
                <TableCell>{getShiftBadge(staff.currentShift)}</TableCell>
                <TableCell className="font-bold text-hotel-navy">
                  {formatCurrency(staff.salary)}
                </TableCell>
                <TableCell>
                  {staff.status === "ACTIVE" ? (
                    <Badge className="bg-emerald-600 text-white font-medium text-[10px]">
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-amber-600 border-amber-300 text-[10px]">
                      On Leave
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <span className="text-[11px] text-stone-600 block">{staff.phone}</span>
                  <span className="text-[10px] text-stone-400">{staff.email}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
