"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const success = await login(email, password);
    if (success) {
      router.push("/dashboard");
    } else {
      setError("Invalid email or password. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-md">
        {/* Back */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-foreground/50 transition-colors hover:text-accent"
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
          Back to Kashi
        </Link>

        <div className="rounded-2xl border border-border bg-card/50 p-8">
          <div className="mb-8 text-center">
            <Link
              href="/"
              className="font-serif text-3xl font-bold text-accent"
            >
              Kashi
            </Link>
            <h1 className="mt-4 font-serif text-2xl font-bold text-foreground">
              Welcome Back
            </h1>
            <p className="mt-2 text-sm text-foreground/50">
              Sign in to access your bookings and dashboard
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-foreground/60"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent placeholder:text-muted-foreground"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-foreground/60"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent placeholder:text-muted-foreground"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full border border-accent bg-accent py-3 text-sm font-semibold tracking-widest uppercase text-accent-foreground transition-all duration-300 hover:bg-accent/90 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-foreground/50">
            Don{"'"}t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-accent transition-colors hover:text-accent/80"
            >
              Register
            </Link>
          </p>

          {/* Demo credentials */}
          <div className="mt-6 rounded-lg border border-border bg-secondary/50 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-foreground/40">
              Demo Accounts
            </p>
            <div className="flex flex-col gap-1 text-xs text-foreground/40">
              <p>
                Visitor: <span className="text-foreground/60">visitor@kashi.com</span> / visitor123
              </p>
              <p>
                Guide: <span className="text-foreground/60">guide@kashi.com</span> / guide123
              </p>
              <p>
                Admin: <span className="text-foreground/60">admin@kashi.com</span> / admin123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
