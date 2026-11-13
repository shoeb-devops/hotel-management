"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Users,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Building,
  Car,
  Sparkles,
  Utensils,
  Percent,
  Clock,
  Printer,
  ChevronRight,
  ArrowRight,
  User,
  Phone,
  Mail,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, generateBookingNumber } from "@/lib/utils";

const AVAILABLE_ROOMS = [
  { id: "deluxe-king", name: "Luxury Deluxe King", price: 7500, maxGuests: 3, bed: "King Bed", img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=400&q=80" },
  { id: "exec-suite", name: "Royal Executive Suite", price: 12000, maxGuests: 4, bed: "King + Living", img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=400&q=80" },
  { id: "presidential", name: "Grand Presidential Suite", price: 25000, maxGuests: 5, bed: "Master King", img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=400&q=80" },
  { id: "standard", name: "Deluxe Standard Room", price: 4500, maxGuests: 2, bed: "Queen Bed", img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=400&q=80" },
];

const ADDONS = [
  { id: "breakfast", name: "Gourmet Buffet Breakfast", price: 600, desc: "Per person daily • Continental & Deshi cuisine", icon: Utensils },
  { id: "airport", name: "Luxury Airport Transfer", price: 2500, desc: "Private Mercedes Benz chauffeur pickup", icon: Car },
  { id: "spa", name: "Couples Aromatherapy Spa", price: 4500, desc: "60-min restorative full-body therapy", icon: Sparkles },
  { id: "early-checkin", name: "Guaranteed Early Check-in", price: 1500, desc: "Arrive as early as 9:00 AM", icon: Clock },
];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(AVAILABLE_ROOMS[0]);
  const [nights, setNights] = useState(2);
  const [guestsCount, setGuestsCount] = useState(2);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["breakfast"]);

  // Guest details
  const [guest, setGuest] = useState({
    firstName: "Tanvir",
    lastName: "Rahman",
    email: "tanvir.rahman@gmail.com",
    phone: "01712345678",
    nid: "1992269201900012",
    specialRequests: "High floor requested with quiet city view, please.",
  });

  // Coupon & Payment
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [paymentGateway, setPaymentGateway] = useState<"bkash" | "card" | "stripe">("bkash");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingNumber, setBookingNumber] = useState("");

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "WELCOME20") {
      setDiscountPercent(20);
    } else if (couponCode.toUpperCase() === "STAY10") {
      setDiscountPercent(10);
    } else {
      alert("Invalid coupon code! Try 'WELCOME20' for 20% off.");
    }
  };

  // Calculations
  const roomTotal = selectedRoom.price * nights;
  const addonsTotal = selectedAddons.reduce((acc, id) => {
    const item = ADDONS.find((a) => a.id === id);
    if (!item) return acc;
    if (id === "breakfast") return acc + item.price * nights * guestsCount;
    return acc + item.price;
  }, 0);
  const subtotal = roomTotal + addonsTotal;
  const discountAmount = (subtotal * discountPercent) / 100;
  const taxableAmount = subtotal - discountAmount;
  const taxes = taxableAmount * 0.15; // 15% VAT & Service Charge
  const grandTotal = taxableAmount + taxes;

  const handleConfirmBooking = () => {
    const num = generateBookingNumber();
    setBookingNumber(num);
    setIsConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Step Indicator */}
        <div className="mb-10">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[
              { num: 1, title: "Room & Dates" },
              { num: 2, title: "Guest Details" },
              { num: 3, title: "Enhancements" },
              { num: 4, title: "Payment" },
            ].map((s) => (
              <div key={s.num} className="flex items-center gap-2">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    step >= s.num
                      ? "bg-hotel-navy text-hotel-gold shadow"
                      : "bg-stone-200 text-stone-500"
                  }`}
                >
                  {s.num}
                </div>
                <span
                  className={`text-xs hidden sm:inline font-medium ${
                    step >= s.num ? "text-hotel-navy font-semibold" : "text-stone-400"
                  }`}
                >
                  {s.title}
                </span>
                {s.num < 4 && <ChevronRight className="w-4 h-4 text-stone-300 hidden sm:inline" />}
              </div>
            ))}
          </div>
        </div>

        {isConfirmed ? (
          /* ================= Booking Success Modal / Receipt ================= */
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-stone-200 shadow-2xl max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <Badge className="bg-hotel-navy text-hotel-gold mb-3">Reservation Confirmed</Badge>
            <h2 className="text-3xl font-bold font-heading text-hotel-navy mb-2">
              Welcome to StaySync Grand Hotel
            </h2>
            <p className="text-stone-600 text-sm mb-6">
              Your reservation reference is{" "}
              <span className="font-mono font-bold text-hotel-navy text-base">{bookingNumber}</span>.
              A confirmation email has been dispatched to{" "}
              <span className="font-semibold">{guest.email}</span>.
            </p>

            <div className="bg-stone-50 rounded-2xl p-6 text-left text-xs space-y-3 mb-8 border border-stone-200">
              <div className="flex justify-between border-b pb-2">
                <span className="text-stone-500">Reserved Suite</span>
                <span className="font-bold text-stone-800">{selectedRoom.name}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-stone-500">Guest Name</span>
                <span className="font-bold text-stone-800">
                  {guest.firstName} {guest.lastName}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-stone-500">Duration</span>
                <span className="font-bold text-stone-800">
                  {nights} Nights ({guestsCount} Guests)
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-stone-500">Payment Gateway</span>
                <span className="font-bold text-emerald-600 uppercase">
                  {paymentGateway} (Paid in Full)
                </span>
              </div>
              <div className="flex justify-between pt-1 text-sm font-bold text-hotel-navy">
                <span>Total Paid</span>
                <span className="text-hotel-gold text-base">{formatCurrency(grandTotal)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.print()}
                variant="outline"
                className="gap-2 border-stone-300"
              >
                <Printer className="w-4 h-4" /> Print PDF Voucher
              </Button>
              <Link href="/">
                <Button className="w-full sm:w-auto bg-hotel-navy text-hotel-gold font-semibold">
                  Return to Homepage
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* ================= Step Wizard Forms ================= */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Steps Container */}
            <div className="lg:col-span-2 space-y-6">
              {/* STEP 1: Room & Duration */}
              {step === 1 && (
                <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-6">
                  <h3 className="text-xl font-bold font-heading text-hotel-navy">
                    Select Your Preferred Accommodation
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {AVAILABLE_ROOMS.map((room) => (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoom(room)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedRoom.id === room.id
                            ? "border-hotel-gold bg-stone-50/80 shadow-md"
                            : "border-stone-200 hover:border-stone-300"
                        }`}
                      >
                        <div className="relative h-32 rounded-lg overflow-hidden mb-3">
                          <Image src={room.img} alt={room.name} fill className="object-cover" />
                        </div>
                        <h4 className="font-bold text-stone-800 text-sm">{room.name}</h4>
                        <p className="text-xs text-stone-500 mb-2">{room.bed} • Up to {room.maxGuests} Guests</p>
                        <div className="text-sm font-bold text-hotel-navy">
                          {formatCurrency(room.price)}{" "}
                          <span className="text-[11px] font-normal text-stone-500">/ night</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-100">
                    <div>
                      <label className="text-xs font-semibold text-stone-600 block mb-1">
                        Length of Stay
                      </label>
                      <select
                        value={nights}
                        onChange={(e) => setNights(Number(e.target.value))}
                        className="w-full text-sm p-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-hotel-gold/50"
                      >
                        {[1, 2, 3, 4, 5, 7, 10, 14].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? "Night" : "Nights"}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-stone-600 block mb-1">
                        Guests
                      </label>
                      <select
                        value={guestsCount}
                        onChange={(e) => setGuestsCount(Number(e.target.value))}
                        className="w-full text-sm p-2.5 rounded-lg border border-stone-300 focus:ring-2 focus:ring-hotel-gold/50"
                      >
                        <option value={1}>1 Adult</option>
                        <option value={2}>2 Adults</option>
                        <option value={3}>3 Adults</option>
                        <option value={4}>4 Adults</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      onClick={() => setStep(2)}
                      className="bg-hotel-navy hover:bg-hotel-navy-light text-hotel-gold px-6 gap-2"
                    >
                      Next: Guest Info <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 2: Guest Information */}
              {step === 2 && (
                <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-6">
                  <h3 className="text-xl font-bold font-heading text-hotel-navy">
                    Primary Guest Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-stone-600 block mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={guest.firstName}
                        onChange={(e) => setGuest({ ...guest, firstName: e.target.value })}
                        className="w-full text-sm p-2.5 rounded-lg border border-stone-300"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-stone-600 block mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={guest.lastName}
                        onChange={(e) => setGuest({ ...guest, lastName: e.target.value })}
                        className="w-full text-sm p-2.5 rounded-lg border border-stone-300"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-stone-600 block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={guest.email}
                        onChange={(e) => setGuest({ ...guest, email: e.target.value })}
                        className="w-full text-sm p-2.5 rounded-lg border border-stone-300"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-stone-600 block mb-1">
                        Phone Number (bKash/SMS) *
                      </label>
                      <input
                        type="tel"
                        value={guest.phone}
                        onChange={(e) => setGuest({ ...guest, phone: e.target.value })}
                        className="w-full text-sm p-2.5 rounded-lg border border-stone-300"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs font-semibold text-stone-600 block mb-1">
                        National ID / Passport Number
                      </label>
                      <input
                        type="text"
                        value={guest.nid}
                        onChange={(e) => setGuest({ ...guest, nid: e.target.value })}
                        className="w-full text-sm p-2.5 rounded-lg border border-stone-300"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs font-semibold text-stone-600 block mb-1">
                        Special Requests (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={guest.specialRequests}
                        onChange={(e) => setGuest({ ...guest, specialRequests: e.target.value })}
                        className="w-full text-sm p-2.5 rounded-lg border border-stone-300"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      className="bg-hotel-navy hover:bg-hotel-navy-light text-hotel-gold px-6 gap-2"
                    >
                      Next: Addons <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 3: Add-ons & Experiences */}
              {step === 3 && (
                <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-6">
                  <h3 className="text-xl font-bold font-heading text-hotel-navy">
                    Enhance Your Luxury Experience
                  </h3>

                  <div className="space-y-3">
                    {ADDONS.map((addon) => {
                      const Icon = addon.icon;
                      const isSelected = selectedAddons.includes(addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleAddon(addon.id)}
                          className={`p-4 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                            isSelected
                              ? "border-hotel-gold bg-stone-50/90 shadow-sm"
                              : "border-stone-200 hover:border-stone-300"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-lg bg-hotel-cream text-hotel-gold">
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm text-stone-800">{addon.name}</h4>
                              <p className="text-xs text-stone-500">{addon.desc}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-sm text-hotel-navy">
                              +{formatCurrency(addon.price)}
                            </span>
                            <div className="text-[11px] text-stone-400">
                              {isSelected ? "Selected ✓" : "Click to Add"}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button
                      onClick={() => setStep(4)}
                      className="bg-hotel-navy hover:bg-hotel-navy-light text-hotel-gold px-6 gap-2"
                    >
                      Next: Payment <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 4: Payment */}
              {step === 4 && (
                <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-6">
                  <h3 className="text-xl font-bold font-heading text-hotel-navy">
                    Select Payment Method
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* bKash / Nagad / SSLCommerz */}
                    <div
                      onClick={() => setPaymentGateway("bkash")}
                      className={`p-4 rounded-xl border-2 cursor-pointer text-center transition-all ${
                        paymentGateway === "bkash"
                          ? "border-hotel-gold bg-stone-50 shadow-md"
                          : "border-stone-200"
                      }`}
                    >
                      <div className="w-10 h-10 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mx-auto mb-2 font-bold text-xs">
                        ৳
                      </div>
                      <h4 className="font-bold text-sm text-stone-800">bKash / Nagad</h4>
                      <p className="text-[11px] text-stone-500">MFS Mobile Banking</p>
                    </div>

                    {/* Debit/Credit Card (SSLCommerz) */}
                    <div
                      onClick={() => setPaymentGateway("card")}
                      className={`p-4 rounded-xl border-2 cursor-pointer text-center transition-all ${
                        paymentGateway === "card"
                          ? "border-hotel-gold bg-stone-50 shadow-md"
                          : "border-stone-200"
                      }`}
                    >
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 font-bold text-xs">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-sm text-stone-800">Visa / Mastercard</h4>
                      <p className="text-[11px] text-stone-500">Local Bank Cards</p>
                    </div>

                    {/* Stripe (International) */}
                    <div
                      onClick={() => setPaymentGateway("stripe")}
                      className={`p-4 rounded-xl border-2 cursor-pointer text-center transition-all ${
                        paymentGateway === "stripe"
                          ? "border-hotel-gold bg-stone-50 shadow-md"
                          : "border-stone-200"
                      }`}
                    >
                      <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-2 font-bold text-xs">
                        Intl
                      </div>
                      <h4 className="font-bold text-sm text-stone-800">Stripe Gateway</h4>
                      <p className="text-[11px] text-stone-500">Amex, Apple Pay, Intl</p>
                    </div>
                  </div>

                  {/* Promo code box */}
                  <div className="flex gap-2 pt-2">
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. WELCOME20)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="text-sm px-3 py-2 border rounded-lg flex-1 uppercase"
                    />
                    <Button onClick={applyCoupon} variant="outline" className="text-xs font-semibold">
                      Apply
                    </Button>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setStep(3)}>
                      Back
                    </Button>
                    <Button
                      onClick={handleConfirmBooking}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 shadow-lg"
                    >
                      Pay & Confirm ({formatCurrency(grandTotal)})
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-stone-200 shadow-md p-6 sticky top-28 space-y-4">
                <h4 className="font-bold font-heading text-lg text-hotel-navy border-b pb-3">
                  Reservation Summary
                </h4>

                <div className="flex gap-3">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={selectedRoom.img} alt={selectedRoom.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-stone-800">{selectedRoom.name}</h5>
                    <p className="text-[11px] text-stone-500">{nights} Nights • {guestsCount} Guests</p>
                    <span className="text-xs font-semibold text-hotel-navy">
                      {formatCurrency(selectedRoom.price)} / night
                    </span>
                  </div>
                </div>

                {/* Calculation breakdown */}
                <div className="space-y-2 pt-3 border-t text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span>Room Accommodation</span>
                    <span>{formatCurrency(roomTotal)}</span>
                  </div>
                  {addonsTotal > 0 && (
                    <div className="flex justify-between">
                      <span>Addons & Services</span>
                      <span>{formatCurrency(addonsTotal)}</span>
                    </div>
                  )}
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Special Discount ({discountPercent}%)</span>
                      <span>-{formatCurrency(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Taxes & Service (15%)</span>
                    <span>{formatCurrency(taxes)}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t text-sm font-bold text-hotel-navy">
                    <span>Grand Total</span>
                    <span className="text-hotel-gold text-lg">{formatCurrency(grandTotal)}</span>
                  </div>
                </div>

                <div className="text-[11px] text-stone-400 flex items-center justify-center gap-1.5 pt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Free cancellation up to 24 hrs prior</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
