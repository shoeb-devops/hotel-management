"use client";

import React, { useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  Clock,
  AlertCircle,
  UserCheck,
  Plus,
  Filter,
  CheckSquare,
  Square,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface HousekeepingTask {
  id: string;
  roomNumber: string;
  taskType: "Turnover Clean" | "Routine Clean" | "Deep Sanitize" | "VIP Turndown";
  priority: "URGENT" | "HIGH" | "NORMAL";
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  assignedStaff: string;
  floor: number;
  checklist: { item: string; done: boolean }[];
}

const INITIAL_TASKS: HousekeepingTask[] = [
  {
    id: "hk1",
    roomNumber: "103",
    floor: 1,
    taskType: "Turnover Clean",
    priority: "HIGH",
    status: "IN_PROGRESS",
    assignedStaff: "Rafiq Islam",
    checklist: [
      { item: "Linen & Bedding Replacement", done: true },
      { item: "Bathroom Sanitization & New Towels", done: true },
      { item: "Mini-bar Replenishment", done: false },
      { item: "Flooring Vacuum & Mop", done: false },
    ],
  },
  {
    id: "hk2",
    roomNumber: "206",
    floor: 2,
    taskType: "Routine Clean",
    priority: "NORMAL",
    status: "PENDING",
    assignedStaff: "Shahana Begum",
    checklist: [
      { item: "Dusting & Trash Disposal", done: false },
      { item: "Fresh Towels & Toiletries", done: false },
      { item: "Tea & Coffee Bar Refill", done: false },
    ],
  },
  {
    id: "hk3",
    roomNumber: "401",
    floor: 4,
    taskType: "VIP Turndown",
    priority: "URGENT",
    status: "COMPLETED",
    assignedStaff: "Rafiq Islam",
    checklist: [
      { item: "Rose Petal & Scented Candle Placement", done: true },
      { item: "Evening Curtains Drawn & Bed Turndown", done: true },
      { item: "Artisanal Chocolate on Pillows", done: true },
      { item: "Fresh Ice Bucket Supplied", done: true },
    ],
  },
  {
    id: "hk4",
    roomNumber: "305",
    floor: 3,
    taskType: "Deep Sanitize",
    priority: "NORMAL",
    status: "PENDING",
    assignedStaff: "Unassigned",
    checklist: [
      { item: "Curtains & Carpet Steam Clean", done: false },
      { item: "Air Conditioning Filter Cleanse", done: false },
      { item: "Balcony Glass Wash", done: false },
    ],
  },
];

export default function AdminHousekeepingPage() {
  const [tasks, setTasks] = useState<HousekeepingTask[]>(INITIAL_TASKS);
  const [filterStatus, setFilterStatus] = useState("ALL");

  const toggleChecklistItem = (taskId: string, index: number) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const newChecklist = [...t.checklist];
        newChecklist[index].done = !newChecklist[index].done;

        // Auto-update status if all are done
        const allDone = newChecklist.every((c) => c.done);
        return {
          ...t,
          checklist: newChecklist,
          status: allDone ? "COMPLETED" : "IN_PROGRESS",
        };
      })
    );
  };

  const filtered = tasks.filter((t) =>
    filterStatus === "ALL" ? true : t.status === filterStatus
  );

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-hotel-navy">
            Housekeeping & Sanitization Operations
          </h1>
          <p className="text-xs text-stone-500">
            Real-time room turnover tracking, staff task distribution, and inspection checklists.
          </p>
        </div>

        <Button className="bg-hotel-navy hover:bg-hotel-navy-light text-hotel-gold font-semibold text-xs gap-2">
          <Plus className="w-4 h-4" /> Dispatch New Cleaning Task
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {["ALL", "PENDING", "IN_PROGRESS", "COMPLETED"].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              filterStatus === st
                ? "bg-hotel-navy text-hotel-gold shadow"
                : "bg-white text-stone-600 border border-stone-200"
            }`}
          >
            {st === "ALL" ? "All Tasks" : st.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((task) => (
          <Card key={task.id} className="bg-white border-stone-200 shadow-sm rounded-2xl">
            <div className="p-4 border-b border-stone-100 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold font-heading text-lg text-hotel-navy">
                    Room {task.roomNumber}
                  </span>
                  <span className="text-[11px] text-stone-400">Floor {task.floor}</span>
                </div>
                <p className="text-xs text-stone-600 font-medium">{task.taskType}</p>
              </div>

              <div>
                {task.priority === "URGENT" && (
                  <Badge className="bg-rose-600 text-white font-bold text-[10px]">Urgent VIP</Badge>
                )}
                {task.priority === "HIGH" && (
                  <Badge className="bg-amber-500 text-white font-semibold text-[10px]">High</Badge>
                )}
                {task.priority === "NORMAL" && (
                  <Badge variant="outline" className="text-stone-500 text-[10px]">Routine</Badge>
                )}
              </div>
            </div>

            <CardContent className="p-4 space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-500 flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-hotel-gold" /> Assigned:
                </span>
                <span className="font-semibold text-stone-800">{task.assignedStaff}</span>
              </div>

              {/* Checklist */}
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <span className="text-[11px] text-stone-400 font-semibold uppercase tracking-wider block">
                  Checklist Progress
                </span>
                {task.checklist.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => toggleChecklistItem(task.id, idx)}
                    className="flex items-center gap-2.5 text-xs text-stone-700 cursor-pointer select-none hover:text-hotel-navy"
                  >
                    {item.done ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-stone-300 flex-shrink-0" />
                    )}
                    <span className={item.done ? "line-through text-stone-400" : ""}>
                      {item.item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Status footer */}
              <div className="pt-3 border-t border-stone-100 flex justify-between items-center text-xs">
                <span className="text-stone-400">Status</span>
                {task.status === "COMPLETED" && (
                  <Badge className="bg-emerald-600 text-white font-medium">Completed ✓</Badge>
                )}
                {task.status === "IN_PROGRESS" && (
                  <Badge className="bg-purple-600 text-white font-medium">In Progress</Badge>
                )}
                {task.status === "PENDING" && (
                  <Badge className="bg-amber-500 text-white font-medium">Pending</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
