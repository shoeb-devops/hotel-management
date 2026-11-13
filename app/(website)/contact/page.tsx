"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  CheckCircle,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const FAQS = [
  {
    q: "What are your check-in and check-out times?",
    a: "Standard check-in begins at 2:00 PM and check-out is by 12:00 PM. Early check-in and late check-out can be arranged through the front desk subject to room availability.",
  },
  {
    q: "Do you offer airport transfer services?",
    a: "Yes! We provide private luxury chauffeur airport transfers in Mercedes Benz and BMW sedans. You can add this during online booking or contact our concierge 24 hours prior.",
  },
  {
    q: "What payment methods are supported?",
    a: "We accept all major local MFS (bKash, Nagad, Rocket), local and international credit/debit cards (Visa, Mastercard, Amex via SSLCommerz and Stripe), and direct bank wire.",
  },
  {
    q: "Is breakfast complimentary?",
    a: "Buffet breakfast is included with all Deluxe Suites, Executive Suites, and Presidential bookings. For standard rooms, gourmet breakfast can be added at a nominal rate.",
  },
  {
    q: "What is your cancellation and refund policy?",
    a: "Reservations can be modified or cancelled free of charge up to 24 hours prior to your scheduled check-in time. Refunds are processed back to your original payment channel within 3-5 banking days.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Reservation Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] pt-24 pb-20">
      {/* Header */}
      <div className="relative bg-hotel-navy py-16 text-white text-center mb-12">
        <div className="container mx-auto px-4">
          <span className="text-hotel-gold text-xs tracking-widest uppercase font-semibold">
            24/7 Guest Services
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-heading mt-2 mb-4">
            Connect With StaySync
          </h1>
          <p className="max-w-xl mx-auto text-gray-300 text-sm">
            Whether you are planning a visit, organizing a high-profile banquet, or have a special request, our hospitality team is here at your service.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl space-y-16">
        {/* Contact Cards & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Contact Info Cards */}
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-start gap-4">
              <div className="p-3 rounded-xl bg-hotel-cream text-hotel-gold flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-hotel-navy">Hotel Location</h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  StaySync Grand Hotel, Road 45, Plot 12, Gulshan-2, Dhaka 1212, Bangladesh
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-start gap-4">
              <div className="p-3 rounded-xl bg-hotel-cream text-hotel-gold flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-hotel-navy">Concierge Hotline</h4>
                <p className="text-xs text-stone-600 mt-1">+880 (2) 987-6543</p>
                <p className="text-xs text-stone-600">Direct WhatsApp: +880 1700-123456</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-start gap-4">
              <div className="p-3 rounded-xl bg-hotel-cream text-hotel-gold flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-hotel-navy">Email Inquiries</h4>
                <p className="text-xs text-stone-600 mt-1">reservations@staysync.com</p>
                <p className="text-xs text-stone-600">concierge@staysync.com</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-start gap-4">
              <div className="p-3 rounded-xl bg-hotel-cream text-hotel-gold flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-hotel-navy">Front Desk Hours</h4>
                <p className="text-xs text-stone-600 mt-1">
                  Open 24 hours a day, 7 days a week, 365 days a year
                </p>
              </div>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-stone-200 shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-hotel-navy">
                  Message Dispatched Successfully
                </h3>
                <p className="text-xs text-stone-500 max-w-md mx-auto">
                  Thank you for writing to us. Our senior concierge will review your message and reach back within 2 business hours.
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  className="mt-4 border-stone-300"
                >
                  Send Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold font-heading text-hotel-navy mb-2">
                  Send an Inquiry
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-stone-600 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Asif Mahmud"
                      className="w-full text-sm p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-hotel-gold/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-stone-600 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full text-sm p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-hotel-gold/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-stone-600 block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+880 17..."
                      className="w-full text-sm p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-hotel-gold/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-stone-600 block mb-1">
                      Inquiry Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full text-sm p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-hotel-gold/50"
                    >
                      <option>Room Reservation</option>
                      <option>Corporate Event / Ballroom</option>
                      <option>Fine Dining & Table Booking</option>
                      <option>Spa & Wellness</option>
                      <option>General Feedback</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-600 block mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your dates, preferences, or questions..."
                    className="w-full text-sm p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-hotel-gold/50"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full py-6 bg-hotel-navy hover:bg-hotel-navy-light text-hotel-gold font-bold text-sm shadow-md"
                >
                  <Send className="w-4 h-4 mr-2" /> Dispatch Message
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-stone-200 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-hotel-gold font-bold text-xs uppercase tracking-wider">
              Common Questions
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-hotel-navy mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-stone-200 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left font-semibold text-sm text-stone-800 flex justify-between items-center hover:bg-stone-50"
                  >
                    <span>{faq.q}</span>
                    <span className="text-hotel-gold font-bold text-base">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="p-5 pt-0 text-xs text-stone-600 leading-relaxed border-t border-stone-100 bg-stone-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
