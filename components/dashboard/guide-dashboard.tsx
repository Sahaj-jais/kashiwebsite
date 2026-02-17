"use client";

import { useState, useEffect } from "react";
import { getBookings } from "@/lib/booking-store";
import type { Booking } from "@/lib/data";

export function GuideDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<"requests" | "availability" | "earnings">("requests");

  useEffect(() => {
    // For demo, show all bookings (in production, filter by guide's ID)
    setBookings(getBookings());
  }, []);

  const totalEarnings = bookings
    .filter((b) => b.status === "confirmed" || b.status === "completed")
    .reduce((a, b) => a + b.amount, 0);

  const pendingBookings = bookings.filter((b) => b.status === "pending");
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed");

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
            Pending
          </p>
          <p className="mt-1 font-serif text-3xl font-bold text-primary">
            {pendingBookings.length}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Confirmed
          </p>
          <p className="mt-1 font-serif text-3xl font-bold text-accent">
            {confirmedBookings.length}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Total Earnings
          </p>
          <p className="mt-1 font-serif text-2xl font-bold text-accent">
            {"₹"}{totalEarnings.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-4 border-b border-border">
        {(["requests", "availability", "earnings"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-semibold capitalize tracking-wider transition-colors ${
              activeTab === tab
                ? "border-b-2 border-accent text-accent"
                : "text-foreground/40 hover:text-foreground/60"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "requests" && (
        <div className="flex flex-col gap-4">
          {bookings.length === 0 ? (
            <div className="rounded-xl border border-border bg-card/50 p-12 text-center">
              <p className="text-foreground/40">No booking requests yet.</p>
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="flex flex-col gap-4 rounded-xl border border-border bg-card/50 p-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-serif font-bold text-foreground">
                      Booking #{booking.id}
                    </p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        booking.status === "confirmed"
                          ? "bg-accent/10 text-accent"
                          : booking.status === "cancelled"
                          ? "bg-red-500/10 text-red-400"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-foreground/60">
                    {booking.pricingLabel} &middot; {booking.theme}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {booking.date} at {booking.time}
                  </p>
                </div>
                <p className="font-serif text-lg font-bold text-accent">
                  {"₹"}{booking.amount.toLocaleString("en-IN")}
                </p>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "availability" && (
        <div className="rounded-xl border border-border bg-card/50 p-8">
          <h3 className="mb-4 font-serif text-lg font-bold text-foreground">
            Manage Availability
          </h3>
          <p className="mb-6 text-sm text-foreground/50">
            Set your available hours for each day of the week. Visitors will
            only be able to book within your available times.
          </p>
          <div className="flex flex-col gap-3">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
              (day) => (
                <div
                  key={day}
                  className="flex items-center justify-between rounded-lg border border-border bg-background/50 px-4 py-3"
                >
                  <span className="text-sm font-medium text-foreground">
                    {day}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-foreground/50">
                      5:00 AM - 8:00 PM
                    </span>
                    <button className="text-xs font-medium text-accent hover:text-accent/80">
                      Edit
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {activeTab === "earnings" && (
        <div className="rounded-xl border border-border bg-card/50 p-8">
          <h3 className="mb-4 font-serif text-lg font-bold text-foreground">
            Earnings Overview
          </h3>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-background/50 p-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                This Month
              </p>
              <p className="mt-2 font-serif text-4xl font-bold text-accent">
                {"₹"}{totalEarnings.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-background/50 p-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Pending Payout
              </p>
              <p className="mt-2 font-serif text-4xl font-bold text-foreground">
                {"₹"}0
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
