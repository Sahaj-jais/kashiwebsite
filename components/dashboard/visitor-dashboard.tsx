"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getBookingsForUser, cancelBooking } from "@/lib/booking-store";
import type { Booking } from "@/lib/data";

export function VisitorDashboard({ userId }: { userId: string }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "saved">(
    "upcoming"
  );

  useEffect(() => {
    setBookings(getBookingsForUser(userId));
  }, [userId]);

  const upcoming = bookings.filter(
    (b) => b.status === "confirmed" || b.status === "pending"
  );
  const past = bookings.filter(
    (b) => b.status === "completed" || b.status === "cancelled"
  );

  const handleCancel = (id: string) => {
    cancelBooking(id);
    setBookings(getBookingsForUser(userId));
  };

  return (
    <div>
      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-border bg-card/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Total Bookings
          </p>
          <p className="mt-1 font-serif text-3xl font-bold text-foreground">
            {bookings.length}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Upcoming
          </p>
          <p className="mt-1 font-serif text-3xl font-bold text-accent">
            {upcoming.length}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Completed
          </p>
          <p className="mt-1 font-serif text-3xl font-bold text-foreground">
            {past.filter((b) => b.status === "completed").length}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Total Spent
          </p>
          <p className="mt-1 font-serif text-2xl font-bold text-foreground">
            {"₹"}
            {bookings
              .filter((b) => b.status !== "cancelled")
              .reduce((a, b) => a + b.amount, 0)
              .toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-4 border-b border-border">
        {(["upcoming", "past", "saved"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-semibold capitalize tracking-wider transition-colors ${
              activeTab === tab
                ? "border-b-2 border-accent text-accent"
                : "text-foreground/40 hover:text-foreground/60"
            }`}
          >
            {tab === "saved" ? "Saved Places" : tab}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "upcoming" && (
        <div className="flex flex-col gap-4">
          {upcoming.length === 0 ? (
            <div className="rounded-xl border border-border bg-card/50 p-12 text-center">
              <p className="text-foreground/40">No upcoming bookings yet.</p>
              <Link
                href="/guides"
                className="mt-4 inline-block text-sm font-medium text-accent hover:text-accent/80"
              >
                Book a Guide
              </Link>
            </div>
          ) : (
            upcoming.map((booking) => (
              <div
                key={booking.id}
                className="flex flex-col gap-4 rounded-xl border border-border bg-card/50 p-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-serif font-bold text-foreground">
                      {booking.guideName}
                    </p>
                    <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
                      {booking.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-foreground/60">
                    {booking.pricingLabel} &middot; {booking.theme}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {booking.date} at {booking.time} &middot; ID: {booking.id}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-serif text-lg font-bold text-accent">
                    {"₹"}{booking.amount.toLocaleString("en-IN")}
                  </p>
                  <button
                    onClick={() => handleCancel(booking.id)}
                    className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/20"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "past" && (
        <div className="flex flex-col gap-4">
          {past.length === 0 ? (
            <div className="rounded-xl border border-border bg-card/50 p-12 text-center">
              <p className="text-foreground/40">No past experiences yet.</p>
            </div>
          ) : (
            past.map((booking) => (
              <div
                key={booking.id}
                className="flex flex-col gap-4 rounded-xl border border-border bg-card/50 p-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-serif font-bold text-foreground">
                    {booking.guideName}
                  </p>
                  <p className="mt-1 text-sm text-foreground/60">
                    {booking.pricingLabel} &middot; {booking.theme}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {booking.date}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    booking.status === "cancelled"
                      ? "bg-red-500/10 text-red-400"
                      : "bg-accent/10 text-accent"
                  }`}
                >
                  {booking.status}
                </span>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "saved" && (
        <div className="rounded-xl border border-border bg-card/50 p-12 text-center">
          <p className="text-foreground/40">
            Your saved unexplored places will appear here.
          </p>
          <Link
            href="/#explore"
            className="mt-4 inline-block text-sm font-medium text-accent hover:text-accent/80"
          >
            Explore Hidden Kashi
          </Link>
        </div>
      )}
    </div>
  );
}
