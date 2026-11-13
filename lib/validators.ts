import { z } from "zod";

// ============================================
// BOOKING VALIDATORS
// ============================================

export const bookingSearchSchema = z.object({
  checkIn: z.coerce.date().min(new Date(), "Check-in date must be in the future"),
  checkOut: z.coerce.date(),
  adults: z.coerce.number().min(1).max(10),
  children: z.coerce.number().min(0).max(5),
  roomType: z.string().optional(),
}).refine((data) => data.checkOut > data.checkIn, {
  message: "Check-out date must be after check-in date",
  path: ["checkOut"],
});

export const createBookingSchema = z.object({
  hotelId: z.string().min(1),
  roomId: z.string().min(1),
  guestId: z.string().min(1),
  checkIn: z.coerce.date(),
  checkOut: z.coerce.date(),
  adults: z.coerce.number().min(1),
  children: z.coerce.number().min(0).default(0),
  specialRequests: z.string().optional(),
  couponCode: z.string().optional(),
  addons: z.array(z.object({
    name: z.string(),
    quantity: z.number().min(1),
    unitPrice: z.number().min(0),
  })).optional(),
});

// ============================================
// GUEST VALIDATORS
// ============================================

export const guestSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().min(11, "Phone number must be at least 11 digits"),
  dateOfBirth: z.coerce.date().optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
  nationality: z.string().default("Bangladeshi"),
  nidNumber: z.string().optional(),
  passportNumber: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().default("Bangladesh"),
});

// ============================================
// ROOM VALIDATORS
// ============================================

export const roomTypeSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  basePrice: z.coerce.number().min(0),
  maxOccupancy: z.coerce.number().min(1).max(20),
  maxAdults: z.coerce.number().min(1).max(10),
  maxChildren: z.coerce.number().min(0).max(5),
  bedType: z.string(),
  roomSize: z.coerce.number().optional(),
  amenities: z.array(z.string()),
});

export const roomSchema = z.object({
  roomNumber: z.string().min(1, "Room number is required"),
  roomTypeId: z.string().min(1, "Room type is required"),
  floor: z.coerce.number().min(0),
  notes: z.string().optional(),
});

// ============================================
// STAFF VALIDATORS
// ============================================

export const staffSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().min(11),
  role: z.string(),
  department: z.string().optional(),
  salary: z.coerce.number().optional(),
});

// ============================================
// AUTH VALIDATORS
// ============================================

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  phone: z.string().min(11, "Phone number must be at least 11 digits"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// ============================================
// PAYMENT VALIDATORS
// ============================================

export const paymentSchema = z.object({
  bookingId: z.string().min(1),
  amount: z.coerce.number().min(1, "Amount must be greater than 0"),
  method: z.enum([
    "CASH", "CREDIT_CARD", "DEBIT_CARD", "BKASH",
    "NAGAD", "ROCKET", "BANK_TRANSFER", "STRIPE",
    "SSLCOMMERZ", "CHECK", "OTHER"
  ]),
  notes: z.string().optional(),
});

// Type exports
export type BookingSearchInput = z.infer<typeof bookingSearchSchema>;
export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type GuestInput = z.infer<typeof guestSchema>;
export type RoomTypeInput = z.infer<typeof roomTypeSchema>;
export type RoomInput = z.infer<typeof roomSchema>;
export type StaffInput = z.infer<typeof staffSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type PaymentInput = z.infer<typeof paymentSchema>;
