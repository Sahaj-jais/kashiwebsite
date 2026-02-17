"use client";

import { useState, useEffect } from "react";
import { getBookings } from "@/lib/booking-store";
import { guides, unexploredPlaces } from "@/lib/data";
import type { Booking } from "@/lib/data";

export function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<
    "overview" | "bookings" | "guides" | "content"
  >("overview");

  useEffect(() => {
    setBookings(getBookings());
  }, []);

  const totalRevenue = bookings
    .filter((b) => b.status !== "cancelled")
    .reduce((a, b) => a + b.amount, 0);

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
            Active Guides
          </p>
          <p className="mt-1 font-serif text-3xl font-bold text-accent">
            {guides.length}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Content Items
          </p>
          <p className="mt-1 font-serif text-3xl font-bold text-foreground">
            {unexploredPlaces.length}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Total Revenue
          </p>
          <p className="mt-1 font-serif text-2xl font-bold text-accent">
            {"₹"}{totalRevenue.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-4 overflow-x-auto border-b border-border">
        {(["overview", "bookings", "guides", "content"] as const).map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 pb-3 text-sm font-semibold capitalize tracking-wider transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-accent text-accent"
                  : "text-foreground/40 hover:text-foreground/60"
              }`}
            >
              {tab}
            </button>
          )
        )}
      </div>

      {activeTab === "overview" && (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card/50 p-6">
            <h3 className="mb-4 font-serif text-lg font-bold text-foreground">
              Recent Bookings
            </h3>
            {bookings.length === 0 ? (
              <p className="text-sm text-foreground/40">No bookings yet.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {bookings.slice(-5).reverse().map((b) => (
                  <div
                    key={b.id}
                    className="flex items-center justify-between rounded-lg border border-border bg-background/50 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {b.guideName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {b.date} &middot; {b.pricingLabel}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        b.status === "confirmed"
                          ? "bg-accent/10 text-accent"
                          : b.status === "cancelled"
                            ? "bg-red-500/10 text-red-400"
                            : "bg-primary/10 text-primary"
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-xl border border-border bg-card/50 p-6">
            <h3 className="mb-4 font-serif text-lg font-bold text-foreground">
              Platform Health
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground/60">System Status</span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-green-400">
                  <span className="h-2 w-2 rounded-full bg-green-400" />
                  Operational
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground/60">
                  AI Chatbot Status
                </span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-green-400">
                  <span className="h-2 w-2 rounded-full bg-green-400" />
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground/60">
                  Active Users Today
                </span>
                <span className="text-sm font-bold text-foreground">24</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground/60">
                  Chat Sessions Today
                </span>
                <span className="text-sm font-bold text-foreground">18</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "bookings" && (
        <div className="flex flex-col gap-4">
          {bookings.length === 0 ? (
            <div className="rounded-xl border border-border bg-card/50 p-12 text-center">
              <p className="text-foreground/40">No bookings yet.</p>
            </div>
          ) : (
            bookings.map((b) => (
              <div
                key={b.id}
                className="flex flex-col gap-4 rounded-xl border border-border bg-card/50 p-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-serif font-bold text-foreground">
                      {b.id}
                    </p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        b.status === "confirmed"
                          ? "bg-accent/10 text-accent"
                          : b.status === "cancelled"
                            ? "bg-red-500/10 text-red-400"
                            : "bg-primary/10 text-primary"
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-foreground/60">
                    Guide: {b.guideName} &middot; {b.pricingLabel}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {b.date} at {b.time} &middot; Theme: {b.theme}
                  </p>
                </div>
                <p className="font-serif text-lg font-bold text-accent">
                  {"₹"}{b.amount.toLocaleString("en-IN")}
                </p>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "guides" && (
        <div className="grid gap-4 md:grid-cols-2">
          {guides.map((g) => (
            <div
              key={g.id}
              className="flex items-center gap-4 rounded-xl border border-border bg-card/50 p-5"
            >
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-secondary">
                <img
                  src={g.image}
                  alt={g.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-serif font-bold text-foreground">{g.name}</p>
                <p className="text-xs text-foreground/60">
                  {g.specializations.join(", ")}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs text-accent">
                    {g.rating} stars
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {g.reviewCount} reviews
                  </span>
                </div>
              </div>
              <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-semibold text-green-400">
                Active
              </span>
            </div>
          ))}
        </div>
      )}

      {activeTab === "content" && (
        <div className="flex flex-col gap-4">
          {unexploredPlaces.map((p) => (
            <div
              key={p.slug}
              className="flex items-center justify-between rounded-xl border border-border bg-card/50 p-5"
            >
              <div>
                <p className="font-serif font-bold text-foreground">
                  {p.title}
                </p>
                <p className="text-xs text-muted-foreground">{p.category}</p>
              </div>
              <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
                Published
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
