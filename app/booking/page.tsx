"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { guides } from "@/lib/data";
import { addBooking } from "@/lib/booking-store";

const themes = [
  "Heritage Walk",
  "Food Tour",
  "Spiritual Journey",
  "Photography Walk",
  "Hidden Temples",
  "Night Experience",
  "Artisan Tour",
  "Custom Experience",
];

type Step = "select" | "details" | "payment" | "confirmation";

export default function BookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const guideId = searchParams.get("guide") || "";
  const tierParam = searchParams.get("tier") || "";

  const guide = guides.find((g) => g.id === guideId);

  const [step, setStep] = useState<Step>("select");
  const [selectedTier, setSelectedTier] = useState(tierParam);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("06:00");
  const [theme, setTheme] = useState(themes[0]);
  const [bookingId, setBookingId] = useState("");

  useEffect(() => {
    if (!user) {
      router.push(`/login?redirect=/booking?guide=${guideId}&tier=${encodeURIComponent(tierParam)}`);
    }
  }, [user, router, guideId, tierParam]);

  if (!guide) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-foreground/60">Please select a guide first.</p>
          <Link
            href="/guides"
            className="mt-4 inline-block text-sm font-medium text-accent hover:text-accent/80"
          >
            Browse Guides
          </Link>
        </div>
      </div>
    );
  }

  const selectedPricing = guide.pricing.find((p) => p.label === selectedTier) ||
    guide.pricing[0];

  const handleConfirmBooking = () => {
    if (!user) return;
    const id = `BK-${Date.now().toString(36).toUpperCase()}`;
    addBooking({
      id,
      guideId: guide.id,
      guideName: guide.name,
      userId: user.id,
      date,
      time,
      theme,
      pricingLabel: selectedPricing.label,
      amount: selectedPricing.price,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    });
    setBookingId(id);
    setStep("confirmation");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link
            href={`/guides/${guide.id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70 transition-colors hover:text-accent"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Guide
          </Link>
          <Link href="/" className="font-serif text-lg font-bold text-accent">
            Kashi
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 pt-28 pb-24">
        {/* Progress bar */}
        <div className="mb-12 flex items-center justify-center gap-2">
          {(["select", "details", "payment", "confirmation"] as Step[]).map(
            (s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                    step === s || (["select", "details", "payment", "confirmation"].indexOf(step) > i)
                      ? "bg-accent text-accent-foreground"
                      : "bg-card border border-border text-foreground/40"
                  }`}
                >
                  {i + 1}
                </div>
                {i < 3 && (
                  <div
                    className={`h-px w-8 sm:w-16 ${
                      ["select", "details", "payment", "confirmation"].indexOf(step) > i
                        ? "bg-accent"
                        : "bg-border"
                    }`}
                  />
                )}
              </div>
            )
          )}
        </div>

        {/* Guide summary card */}
        <div className="mb-8 flex items-center gap-4 rounded-xl border border-border bg-card/50 p-4">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
            <Image
              src={guide.image}
              alt={guide.name}
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>
          <div>
            <p className="font-serif font-bold text-foreground">
              {guide.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {guide.specializations.join(" / ")}
            </p>
          </div>
        </div>

        {/* Step 1: Select experience */}
        {step === "select" && (
          <div>
            <h1 className="mb-6 font-serif text-2xl font-bold text-foreground">
              Select Your Experience
            </h1>
            <div className="grid gap-4 sm:grid-cols-3">
              {guide.pricing.map((tier) => (
                <button
                  key={tier.label}
                  onClick={() => {
                    setSelectedTier(tier.label);
                  }}
                  className={`flex flex-col rounded-xl border p-6 text-left transition-all duration-300 ${
                    selectedTier === tier.label
                      ? "border-accent bg-accent/10"
                      : "border-border bg-card/50 hover:border-accent/30"
                  }`}
                >
                  <p className="text-sm font-medium text-foreground/80">
                    {tier.label}
                  </p>
                  <p className="mt-2 font-serif text-2xl font-bold text-accent">
                    {"₹"}{tier.price.toLocaleString("en-IN")}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    per person
                  </p>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep("details")}
              disabled={!selectedTier}
              className="mt-8 w-full border border-accent bg-accent py-3 text-sm font-semibold tracking-widest uppercase text-accent-foreground transition-all duration-300 hover:bg-accent/90 disabled:opacity-40"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Date & details */}
        {step === "details" && (
          <div>
            <h1 className="mb-6 font-serif text-2xl font-bold text-foreground">
              Choose Date & Theme
            </h1>
            <div className="flex flex-col gap-6">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-foreground/60">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-foreground/60">
                  Preferred Time
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-accent"
                >
                  <option value="04:00">4:00 AM (Pre-Dawn)</option>
                  <option value="05:00">5:00 AM (Dawn)</option>
                  <option value="06:00">6:00 AM (Sunrise)</option>
                  <option value="08:00">8:00 AM (Morning)</option>
                  <option value="10:00">10:00 AM (Late Morning)</option>
                  <option value="14:00">2:00 PM (Afternoon)</option>
                  <option value="16:00">4:00 PM (Golden Hour)</option>
                  <option value="18:00">6:00 PM (Evening)</option>
                  <option value="21:00">9:00 PM (Night)</option>
                  <option value="23:00">11:00 PM (Midnight)</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-foreground/60">
                  Exploration Theme
                </label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-accent"
                >
                  {themes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-8 flex gap-4">
              <button
                onClick={() => setStep("select")}
                className="flex-1 border border-border py-3 text-sm font-semibold tracking-widest uppercase text-foreground/60 transition-colors hover:text-foreground"
              >
                Back
              </button>
              <button
                onClick={() => setStep("payment")}
                disabled={!date}
                className="flex-1 border border-accent bg-accent py-3 text-sm font-semibold tracking-widest uppercase text-accent-foreground transition-all duration-300 hover:bg-accent/90 disabled:opacity-40"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === "payment" && (
          <div>
            <h1 className="mb-6 font-serif text-2xl font-bold text-foreground">
              Review & Pay
            </h1>

            {/* Order summary */}
            <div className="rounded-xl border border-border bg-card/50 p-6">
              <h2 className="mb-4 font-serif text-lg font-bold text-foreground">
                Booking Summary
              </h2>
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-foreground/60">Guide</span>
                  <span className="text-foreground">{guide.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Experience</span>
                  <span className="text-foreground">{selectedPricing.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Date</span>
                  <span className="text-foreground">
                    {new Date(date).toLocaleDateString("en-IN", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Time</span>
                  <span className="text-foreground">{time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Theme</span>
                  <span className="text-foreground">{theme}</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-foreground">Total</span>
                  <span className="text-accent">
                    {"₹"}{selectedPricing.price.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

            {/* Simulated payment form */}
            <div className="mt-6 rounded-xl border border-border bg-card/50 p-6">
              <h2 className="mb-4 font-serif text-lg font-bold text-foreground">
                Payment Details
              </h2>
              <p className="mb-4 text-xs text-muted-foreground">
                This is a demo payment form. In production, this would integrate
                with a real payment gateway (Stripe, Razorpay, etc.)
              </p>
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Card Number"
                  defaultValue="4242 4242 4242 4242"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-accent placeholder:text-muted-foreground"
                />
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    defaultValue="12/28"
                    className="flex-1 rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-accent placeholder:text-muted-foreground"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    defaultValue="123"
                    className="w-24 rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-accent placeholder:text-muted-foreground"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => setStep("details")}
                className="flex-1 border border-border py-3 text-sm font-semibold tracking-widest uppercase text-foreground/60 transition-colors hover:text-foreground"
              >
                Back
              </button>
              <button
                onClick={handleConfirmBooking}
                className="flex-1 border border-accent bg-accent py-3 text-sm font-semibold tracking-widest uppercase text-accent-foreground transition-all duration-300 hover:bg-accent/90"
              >
                Pay {"₹"}{selectedPricing.price.toLocaleString("en-IN")}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === "confirmation" && (
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
              <svg
                className="h-10 w-10 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="font-serif text-3xl font-bold text-foreground">
              Booking Confirmed!
            </h1>
            <p className="mt-3 text-foreground/60">
              Your experience with {guide.name} has been booked successfully.
            </p>

            <div className="mx-auto mt-8 max-w-sm rounded-xl border border-border bg-card/50 p-6 text-left">
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-foreground/60">Booking ID</span>
                  <span className="font-mono text-accent">{bookingId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Date</span>
                  <span className="text-foreground">{date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Amount Paid</span>
                  <span className="font-bold text-accent">
                    {"₹"}{selectedPricing.price.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Status</span>
                  <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
                    Confirmed
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 border border-accent bg-accent px-6 py-3 text-sm font-semibold tracking-widest uppercase text-accent-foreground transition-all hover:bg-accent/90"
              >
                View Dashboard
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-semibold tracking-widest uppercase text-foreground/60 transition-all hover:text-foreground"
              >
                Back to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
