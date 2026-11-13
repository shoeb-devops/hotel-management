import { UserRole } from "@prisma/client";

// Extend NextAuth types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string | null;
      image: string | null;
      role: UserRole;
    };
  }

  interface User {
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
  }
}

// ============================================
// COMMON TYPES
// ============================================

export interface NavItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
  children?: NavItem[];
}

export interface HotelInfo {
  id: string;
  name: string;
  starRating: number;
  address: string;
  city: string;
  phone: string;
  email: string;
  checkInTime: string;
  checkOutTime: string;
  amenities: string[];
}

export interface RoomTypeInfo {
  id: string;
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  maxOccupancy: number;
  bedType: string;
  roomSize: number;
  images: string[];
  amenities: string[];
}

export interface RoomInfo {
  id: string;
  roomNumber: string;
  floor: number;
  status: string;
  roomType: RoomTypeInfo;
}

export interface GuestInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  vipStatus: string;
  loyaltyPoints: number;
  totalStays: number;
  totalSpent: number;
}

export interface BookingInfo {
  id: string;
  bookingNumber: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  children: number;
  status: string;
  totalAmount: number;
  paidAmount: number;
  guest: GuestInfo;
  room: RoomInfo;
}

export interface DashboardStats {
  totalBookings: number;
  todayCheckIns: number;
  todayCheckOuts: number;
  occupancyRate: number;
  totalRevenue: number;
  totalGuests: number;
  availableRooms: number;
  totalRooms: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  bookings: number;
}

export interface OccupancyData {
  date: string;
  occupancy: number;
}

// ============================================
// AMENITY TYPES
// ============================================

export const ROOM_AMENITIES = [
  { key: "wifi", label: "Free WiFi", icon: "Wifi" },
  { key: "ac", label: "Air Conditioning", icon: "Snowflake" },
  { key: "tv", label: "Smart TV", icon: "Tv" },
  { key: "minibar", label: "Mini Bar", icon: "Wine" },
  { key: "safe", label: "In-room Safe", icon: "Lock" },
  { key: "balcony", label: "Balcony", icon: "Mountain" },
  { key: "bathtub", label: "Bathtub", icon: "Bath" },
  { key: "shower", label: "Rain Shower", icon: "Droplets" },
  { key: "roomService", label: "Room Service", icon: "ConciergeBell" },
  { key: "laundry", label: "Laundry", icon: "Shirt" },
  { key: "breakfast", label: "Breakfast Included", icon: "Coffee" },
  { key: "parking", label: "Free Parking", icon: "Car" },
  { key: "pool", label: "Pool Access", icon: "Waves" },
  { key: "gym", label: "Gym Access", icon: "Dumbbell" },
  { key: "spa", label: "Spa Access", icon: "Sparkles" },
  { key: "iron", label: "Iron & Board", icon: "Shirt" },
  { key: "hairdryer", label: "Hair Dryer", icon: "Wind" },
  { key: "workspace", label: "Work Desk", icon: "Laptop" },
] as const;

export const HOTEL_AMENITIES = [
  "Swimming Pool",
  "Fitness Center",
  "Spa & Wellness",
  "Restaurant",
  "Bar & Lounge",
  "Conference Room",
  "Business Center",
  "Free Parking",
  "Airport Shuttle",
  "Concierge Service",
  "24/7 Front Desk",
  "Room Service",
  "Laundry Service",
  "Kids Play Area",
  "Garden",
  "Rooftop Terrace",
] as const;

export type RoomAmenityKey = (typeof ROOM_AMENITIES)[number]["key"];
export type HotelAmenity = (typeof HOTEL_AMENITIES)[number];
