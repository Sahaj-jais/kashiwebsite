"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { VisitorDashboard } from "@/components/dashboard/visitor-dashboard";
import { GuideDashboard } from "@/components/dashboard/guide-dashboard";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";

export default function DashboardPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="font-serif text-xl font-bold text-accent"
            >
              Kashi
            </Link>
            <span className="hidden rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold capitalize text-accent sm:inline-block">
              {user.role}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-foreground/60 sm:inline">
              {user.name}
            </span>
            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="text-sm font-medium text-foreground/50 transition-colors hover:text-accent"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-24 pb-24">
        <h1 className="mb-8 font-serif text-3xl font-bold text-foreground">
          {user.role === "admin"
            ? "Admin Dashboard"
            : user.role === "guide"
            ? "Guide Dashboard"
            : "My Dashboard"}
        </h1>

        {user.role === "visitor" && <VisitorDashboard userId={user.id} />}
        {user.role === "guide" && <GuideDashboard />}
        {user.role === "admin" && <AdminDashboard />}
      </div>
    </div>
  );
}
