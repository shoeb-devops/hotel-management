import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // ============================================
  // CREATE ADMIN USER
  // ============================================
  const hashedPassword = await bcrypt.hash("admin123", 12);

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@staysync.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@staysync.com",
      hashedPassword,
      role: "SUPER_ADMIN",
      phone: "01700000000",
    },
  });

  console.log("✅ Admin user created:", adminUser.email);

  // ============================================
  // CREATE HOTEL
  // ============================================
  const hotel = await prisma.hotel.upsert({
    where: { slug: "staysync-grand-hotel" },
    update: {},
    create: {
      name: "StaySync Grand Hotel & Resort",
      slug: "staysync-grand-hotel",
      description:
        "Experience luxury beyond imagination at StaySync Grand Hotel & Resort. Nestled in the heart of Dhaka, our 5-star property offers world-class amenities, exquisite dining, and unparalleled hospitality that will make your stay truly memorable.",
      starRating: 5,
      address: "123 Gulshan Avenue, Gulshan-2",
      city: "Dhaka",
      state: "Dhaka Division",
      country: "Bangladesh",
      zipCode: "1212",
      phone: "+880-2-9876543",
      email: "info@staysync.com",
      website: "https://staysync.com",
      latitude: 23.7937,
      longitude: 90.4066,
      checkInTime: "14:00",
      checkOutTime: "12:00",
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
      ],
      amenities: [
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
        "Rooftop Terrace",
      ],
      policies: {
        cancellation: "Free cancellation up to 24 hours before check-in",
        pets: "Pets are not allowed",
        smoking: "Smoking is prohibited in all indoor areas",
        children: "Children of all ages are welcome",
        extraBed: "Extra bed available upon request (BDT 2,000/night)",
      },
    },
  });

  console.log("✅ Hotel created:", hotel.name);

  // ============================================
  // CREATE ROOM TYPES
  // ============================================
  const roomTypes = [
    {
      name: "Standard Room",
      slug: "standard-room",
      description:
        "Our Standard Rooms offer a comfortable retreat with modern amenities. Featuring elegant décor, plush bedding, and a well-appointed bathroom, these rooms are perfect for both business and leisure travelers.",
      basePrice: 4500,
      maxOccupancy: 2,
      maxAdults: 2,
      maxChildren: 1,
      bedType: "Double",
      roomSize: 280,
      images: [
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
      ],
      amenities: ["wifi", "ac", "tv", "safe", "shower", "workspace", "hairdryer", "iron"],
    },
    {
      name: "Deluxe Room",
      slug: "deluxe-room",
      description:
        "Upgrade your stay with our Deluxe Rooms featuring premium furnishings, a spacious seating area, and city views. Enjoy enhanced amenities including a mini-bar, premium toiletries, and complimentary breakfast.",
      basePrice: 7500,
      maxOccupancy: 3,
      maxAdults: 2,
      maxChildren: 2,
      bedType: "King",
      roomSize: 380,
      images: [
        "https://images.unsplash.com/photo-1590490360182-c33d57733427",
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a",
      ],
      amenities: [
        "wifi", "ac", "tv", "minibar", "safe", "balcony",
        "bathtub", "shower", "roomService", "breakfast", "workspace", "hairdryer",
      ],
    },
    {
      name: "Executive Suite",
      slug: "executive-suite",
      description:
        "Our Executive Suites offer a separate living area, premium amenities, and stunning panoramic views. Ideal for extended stays or those seeking extra space and luxury. Includes exclusive lounge access.",
      basePrice: 12000,
      maxOccupancy: 3,
      maxAdults: 2,
      maxChildren: 2,
      bedType: "King",
      roomSize: 520,
      images: [
        "https://images.unsplash.com/photo-1582719508461-905c673771fd",
        "https://images.unsplash.com/photo-1591088398332-8a7791972843",
      ],
      amenities: [
        "wifi", "ac", "tv", "minibar", "safe", "balcony",
        "bathtub", "shower", "roomService", "laundry",
        "breakfast", "parking", "pool", "gym", "workspace", "hairdryer",
      ],
    },
    {
      name: "Presidential Suite",
      slug: "presidential-suite",
      description:
        "The pinnacle of luxury — our Presidential Suite features a grand living room, private dining area, master bedroom with walk-in closet, marble bathroom with jacuzzi, and a private terrace with breathtaking city views. Butler service included.",
      basePrice: 25000,
      maxOccupancy: 4,
      maxAdults: 2,
      maxChildren: 2,
      bedType: "King",
      roomSize: 950,
      images: [
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
        "https://images.unsplash.com/photo-1631049552057-403cdb8f0658",
      ],
      amenities: [
        "wifi", "ac", "tv", "minibar", "safe", "balcony",
        "bathtub", "shower", "roomService", "laundry",
        "breakfast", "parking", "pool", "gym", "spa", "workspace", "hairdryer", "iron",
      ],
    },
    {
      name: "Family Room",
      slug: "family-room",
      description:
        "Designed with families in mind, our Family Rooms offer spacious accommodations with separate sleeping areas for children. Includes child-friendly amenities, extra storage, and easy access to kid-friendly hotel facilities.",
      basePrice: 9000,
      maxOccupancy: 5,
      maxAdults: 2,
      maxChildren: 3,
      bedType: "Twin",
      roomSize: 450,
      images: [
        "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6",
        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc",
      ],
      amenities: [
        "wifi", "ac", "tv", "safe", "shower",
        "roomService", "breakfast", "parking", "pool", "workspace",
      ],
    },
    {
      name: "Honeymoon Suite",
      slug: "honeymoon-suite",
      description:
        "Celebrate your love in our romantic Honeymoon Suite. Features a four-poster bed, rose petal turndown service, private balcony with garden views, couples' spa amenities, and a complimentary bottle of champagne.",
      basePrice: 15000,
      maxOccupancy: 2,
      maxAdults: 2,
      maxChildren: 0,
      bedType: "King",
      roomSize: 480,
      images: [
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39",
        "https://images.unsplash.com/photo-1602002418082-a4443e081dd1",
      ],
      amenities: [
        "wifi", "ac", "tv", "minibar", "safe", "balcony",
        "bathtub", "shower", "roomService", "laundry",
        "breakfast", "spa", "hairdryer",
      ],
    },
  ];

  const createdRoomTypes = [];
  for (const rt of roomTypes) {
    const created = await prisma.roomType.upsert({
      where: { hotelId_slug: { hotelId: hotel.id, slug: rt.slug } },
      update: {},
      create: { ...rt, hotelId: hotel.id },
    });
    createdRoomTypes.push(created);
  }

  console.log(`✅ ${createdRoomTypes.length} room types created`);

  // ============================================
  // CREATE ROOMS
  // ============================================
  const rooms = [
    // Floor 1 - Standard & Deluxe
    { roomNumber: "101", floor: 1, roomTypeIndex: 0 },
    { roomNumber: "102", floor: 1, roomTypeIndex: 0 },
    { roomNumber: "103", floor: 1, roomTypeIndex: 0 },
    { roomNumber: "104", floor: 1, roomTypeIndex: 0 },
    { roomNumber: "105", floor: 1, roomTypeIndex: 1 },
    { roomNumber: "106", floor: 1, roomTypeIndex: 1 },
    // Floor 2 - Deluxe & Family
    { roomNumber: "201", floor: 2, roomTypeIndex: 1 },
    { roomNumber: "202", floor: 2, roomTypeIndex: 1 },
    { roomNumber: "203", floor: 2, roomTypeIndex: 4 },
    { roomNumber: "204", floor: 2, roomTypeIndex: 4 },
    { roomNumber: "205", floor: 2, roomTypeIndex: 0 },
    { roomNumber: "206", floor: 2, roomTypeIndex: 0 },
    // Floor 3 - Executive & Honeymoon
    { roomNumber: "301", floor: 3, roomTypeIndex: 2 },
    { roomNumber: "302", floor: 3, roomTypeIndex: 2 },
    { roomNumber: "303", floor: 3, roomTypeIndex: 5 },
    { roomNumber: "304", floor: 3, roomTypeIndex: 5 },
    { roomNumber: "305", floor: 3, roomTypeIndex: 1 },
    { roomNumber: "306", floor: 3, roomTypeIndex: 1 },
    // Floor 4 - Presidential & Executive
    { roomNumber: "401", floor: 4, roomTypeIndex: 3 },
    { roomNumber: "402", floor: 4, roomTypeIndex: 3 },
    { roomNumber: "403", floor: 4, roomTypeIndex: 2 },
    { roomNumber: "404", floor: 4, roomTypeIndex: 2 },
  ];

  const statuses = ["AVAILABLE", "OCCUPIED", "RESERVED", "MAINTENANCE", "HOUSEKEEPING"] as const;

  for (let i = 0; i < rooms.length; i++) {
    const r = rooms[i];
    const status = i < 8 ? "AVAILABLE" : i < 14 ? "OCCUPIED" : i < 18 ? "RESERVED" : i === 18 ? "MAINTENANCE" : "AVAILABLE";
    await prisma.room.upsert({
      where: { hotelId_roomNumber: { hotelId: hotel.id, roomNumber: r.roomNumber } },
      update: {},
      create: {
        hotelId: hotel.id,
        roomTypeId: createdRoomTypes[r.roomTypeIndex].id,
        roomNumber: r.roomNumber,
        floor: r.floor,
        status: status as any,
      },
    });
  }

  console.log(`✅ ${rooms.length} rooms created`);

  // ============================================
  // CREATE SAMPLE GUESTS
  // ============================================
  const guests = [
    {
      firstName: "Rahim",
      lastName: "Ahmed",
      email: "rahim@example.com",
      phone: "01711111111",
      nationality: "Bangladeshi",
      nidNumber: "1234567890",
      vipStatus: "GOLD" as const,
      loyaltyPoints: 2500,
      totalStays: 8,
      totalSpent: 125000,
    },
    {
      firstName: "Fatema",
      lastName: "Begum",
      email: "fatema@example.com",
      phone: "01722222222",
      nationality: "Bangladeshi",
      nidNumber: "9876543210",
      vipStatus: "PLATINUM" as const,
      loyaltyPoints: 5200,
      totalStays: 15,
      totalSpent: 380000,
    },
    {
      firstName: "James",
      lastName: "Wilson",
      email: "james.wilson@example.com",
      phone: "+1-555-0123",
      nationality: "American",
      passportNumber: "US123456",
      vipStatus: "REGULAR" as const,
      loyaltyPoints: 300,
      totalStays: 2,
      totalSpent: 35000,
    },
    {
      firstName: "Karim",
      lastName: "Hassan",
      email: "karim.hassan@example.com",
      phone: "01733333333",
      nationality: "Bangladeshi",
      nidNumber: "5555555555",
      vipStatus: "SILVER" as const,
      loyaltyPoints: 1200,
      totalStays: 5,
      totalSpent: 75000,
    },
    {
      firstName: "Ayesha",
      lastName: "Khan",
      email: "ayesha@example.com",
      phone: "01744444444",
      nationality: "Bangladeshi",
      nidNumber: "7777777777",
      vipStatus: "VIP" as const,
      loyaltyPoints: 8500,
      totalStays: 22,
      totalSpent: 650000,
    },
    {
      firstName: "Tanaka",
      lastName: "Yuki",
      email: "tanaka@example.com",
      phone: "+81-90-1234-5678",
      nationality: "Japanese",
      passportNumber: "JP789012",
      vipStatus: "REGULAR" as const,
      loyaltyPoints: 500,
      totalStays: 3,
      totalSpent: 48000,
    },
  ];

  for (const g of guests) {
    await prisma.guest.create({ data: g });
  }

  console.log(`✅ ${guests.length} guests created`);

  // ============================================
  // CREATE STAFF
  // ============================================
  const staffMembers = [
    {
      employeeId: "EMP-001",
      firstName: "Mohammad",
      lastName: "Ali",
      email: "m.ali@staysync.com",
      phone: "01755555555",
      role: "GENERAL_MANAGER" as const,
      department: "Management",
      salary: 120000,
    },
    {
      employeeId: "EMP-002",
      firstName: "Nusrat",
      lastName: "Jahan",
      email: "nusrat@staysync.com",
      phone: "01766666666",
      role: "FRONT_DESK_MANAGER" as const,
      department: "Front Office",
      salary: 55000,
    },
    {
      employeeId: "EMP-003",
      firstName: "Rafiq",
      lastName: "Islam",
      phone: "01777777777",
      role: "HOUSEKEEPER" as const,
      department: "Housekeeping",
      salary: 18000,
    },
    {
      employeeId: "EMP-004",
      firstName: "Sumaiya",
      lastName: "Akter",
      email: "sumaiya@staysync.com",
      phone: "01788888888",
      role: "ACCOUNTANT" as const,
      department: "Finance",
      salary: 45000,
    },
    {
      employeeId: "EMP-005",
      firstName: "Hasan",
      lastName: "Mahmud",
      phone: "01799999999",
      role: "CHEF" as const,
      department: "Restaurant",
      salary: 35000,
    },
  ];

  for (const s of staffMembers) {
    await prisma.staff.create({ data: { ...s, hotelId: hotel.id } });
  }

  console.log(`✅ ${staffMembers.length} staff members created`);

  // ============================================
  // CREATE COUPONS
  // ============================================
  await prisma.coupon.createMany({
    data: [
      {
        hotelId: hotel.id,
        code: "WELCOME20",
        description: "20% off for first-time guests",
        discountType: "PERCENTAGE",
        discountValue: 20,
        maxDiscount: 5000,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      },
      {
        hotelId: hotel.id,
        code: "EID2024",
        description: "Special Eid discount - BDT 3000 off",
        discountType: "FIXED",
        discountValue: 3000,
        minBookingAmount: 10000,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
      {
        hotelId: hotel.id,
        code: "LOYALTY500",
        description: "BDT 500 off for loyal guests",
        discountType: "FIXED",
        discountValue: 500,
        usageLimit: 100,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
      },
    ],
  });

  console.log("✅ 3 coupons created");

  console.log("\n🎉 Database seeded successfully!");
  console.log("📧 Admin login: admin@staysync.com / admin123");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seed error:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
