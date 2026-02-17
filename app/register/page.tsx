"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import type { UserRole } from "@/lib/data";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("visitor");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    const success = await register(name, email, password, role);
    if (success) {
      router.push("/dashboard");
    } else {
      setError("An account with this email already exists.");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-md">
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
              Create Your Account
            </h1>
            <p className="mt-2 text-sm text-foreground/50">
              Join the Kashi community to book guides and save experiences
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Role selection */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-foreground/60">
                I am a
              </label>
              <div className="flex gap-3">
                {(
                  [
                    { value: "visitor", label: "Visitor" },
                    { value: "guide", label: "Local Guide" },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setRole(opt.value)}
                    className={`flex-1 rounded-lg border py-2.5 text-sm font-medium transition-all duration-300 ${
                      role === opt.value
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-border bg-background text-foreground/50 hover:border-accent/30"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-foreground/60"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent placeholder:text-muted-foreground"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label
                htmlFor="reg-email"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-foreground/60"
              >
                Email
              </label>
              <input
                id="reg-email"
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
                htmlFor="reg-password"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-foreground/60"
              >
                Password
              </label>
              <input
                id="reg-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent placeholder:text-muted-foreground"
                placeholder="At least 6 characters"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full border border-accent bg-accent py-3 text-sm font-semibold tracking-widest uppercase text-accent-foreground transition-all duration-300 hover:bg-accent/90 disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-foreground/50">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-accent transition-colors hover:text-accent/80"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
