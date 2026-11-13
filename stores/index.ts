import { create } from "zustand";

// ============================================
// BOOKING SEARCH STORE
// ============================================

interface BookingSearchState {
  checkIn: Date | null;
  checkOut: Date | null;
  adults: number;
  children: number;
  roomType: string;
  setCheckIn: (date: Date | null) => void;
  setCheckOut: (date: Date | null) => void;
  setAdults: (count: number) => void;
  setChildren: (count: number) => void;
  setRoomType: (type: string) => void;
  reset: () => void;
}

export const useBookingSearchStore = create<BookingSearchState>((set) => ({
  checkIn: null,
  checkOut: null,
  adults: 2,
  children: 0,
  roomType: "",
  setCheckIn: (date) => set({ checkIn: date }),
  setCheckOut: (date) => set({ checkOut: date }),
  setAdults: (count) => set({ adults: count }),
  setChildren: (count) => set({ children: count }),
  setRoomType: (type) => set({ roomType: type }),
  reset: () =>
    set({
      checkIn: null,
      checkOut: null,
      adults: 2,
      children: 0,
      roomType: "",
    }),
}));

// ============================================
// ADMIN SIDEBAR STORE
// ============================================

interface SidebarState {
  isOpen: boolean;
  isCollapsed: boolean;
  toggle: () => void;
  setOpen: (open: boolean) => void;
  toggleCollapse: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: true,
  isCollapsed: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setOpen: (open) => set({ isOpen: open }),
  toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
}));

// ============================================
// NOTIFICATION STORE
// ============================================

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: Date;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, "id" | "read" | "createdAt">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [
    {
      id: "1",
      title: "New Booking",
      message: "John Doe booked a Deluxe Room for Nov 15-18",
      type: "success" as const,
      read: false,
      createdAt: new Date(),
    },
    {
      id: "2",
      title: "Check-out Reminder",
      message: "3 guests are scheduled to check out today",
      type: "info" as const,
      read: false,
      createdAt: new Date(),
    },
    {
      id: "3",
      title: "Maintenance Alert",
      message: "Room 305 reported AC issue",
      type: "warning" as const,
      read: false,
      createdAt: new Date(),
    },
  ],
  unreadCount: 3,
  addNotification: (notification) =>
    set((state) => {
      const newNotification: Notification = {
        ...notification,
        id: Date.now().toString(),
        read: false,
        createdAt: new Date(),
      };
      return {
        notifications: [newNotification, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      };
    }),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),
  clearAll: () => set({ notifications: [], unreadCount: 0 }),
}));
