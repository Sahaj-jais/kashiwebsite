// Simple cookie-based booking store for demo — replace with DB in production
import type { Booking } from "./data";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string, days = 30) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/;SameSite=Lax`;
}

export function getBookings(): Booking[] {
  const raw = getCookie("kashi_bookings");
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function addBooking(booking: Booking): void {
  const bookings = getBookings();
  bookings.push(booking);
  setCookie("kashi_bookings", JSON.stringify(bookings));
}

export function cancelBooking(bookingId: string): void {
  const bookings = getBookings();
  const updated = bookings.map((b) =>
    b.id === bookingId ? { ...b, status: "cancelled" as const } : b
  );
  setCookie("kashi_bookings", JSON.stringify(updated));
}

export function getBookingsForUser(userId: string): Booking[] {
  return getBookings().filter((b) => b.userId === userId);
}

export function getBookingsForGuide(guideId: string): Booking[] {
  return getBookings().filter((b) => b.guideId === guideId);
}
