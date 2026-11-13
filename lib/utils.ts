import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, differenceInDays } from "date-fns";

/** Merge Tailwind CSS classes with conflict resolution */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format currency in BDT */
export function formatCurrency(amount: number | string, currency = "BDT"): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  if (currency === "BDT") {
    return `৳${num.toLocaleString("en-BD", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(num);
}

/** Format date to readable string */
export function formatDate(date: Date | string, pattern = "dd MMM yyyy"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, pattern);
}

/** Format date with time */
export function formatDateTime(date: Date | string): string {
  return formatDate(date, "dd MMM yyyy, hh:mm a");
}

/** Calculate number of nights between two dates */
export function calculateNights(checkIn: Date, checkOut: Date): number {
  return differenceInDays(checkOut, checkIn);
}

/** Generate booking number: STY-YYYYMMDD-XXX */
export function generateBookingNumber(): string {
  const date = format(new Date(), "yyyyMMdd");
  const rand = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `STY-${date}-${rand}`;
}

/** Generate invoice number: INV-YYYYMMDD-XXX */
export function generateInvoiceNumber(): string {
  const date = format(new Date(), "yyyyMMdd");
  const rand = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `INV-${date}-${rand}`;
}

/** Generate employee ID: EMP-XXX */
export function generateEmployeeId(count: number): string {
  return `EMP-${String(count + 1).padStart(3, "0")}`;
}

/** Get star rating display */
export function getStarDisplay(rating: number): string {
  return "⭐".repeat(rating);
}

/** Get room status color */
export function getRoomStatusColor(status: string): string {
  const colors: Record<string, string> = {
    AVAILABLE: "bg-emerald-500",
    OCCUPIED: "bg-red-500",
    RESERVED: "bg-amber-500",
    MAINTENANCE: "bg-blue-500",
    HOUSEKEEPING: "bg-orange-500",
    OUT_OF_ORDER: "bg-gray-500",
  };
  return colors[status] || "bg-gray-400";
}

/** Get booking status color */
export function getBookingStatusColor(status: string): string {
  const colors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    CONFIRMED: "bg-blue-100 text-blue-800",
    CHECKED_IN: "bg-green-100 text-green-800",
    CHECKED_OUT: "bg-gray-100 text-gray-800",
    CANCELLED: "bg-red-100 text-red-800",
    NO_SHOW: "bg-orange-100 text-orange-800",
    WAITLISTED: "bg-purple-100 text-purple-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
}

/** Slugify a string */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Truncate text */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
}

/** Calculate occupancy percentage */
export function calculateOccupancy(occupied: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((occupied / total) * 100);
}

/** Delay function for animations */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
