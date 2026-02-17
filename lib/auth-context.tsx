"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { User, UserRole } from "./data";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simple cookie-based storage for demo — in production back this with a real DB + bcrypt
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string, days = 7) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/;SameSite=Lax`;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}

// In-memory user store for demo
const DEMO_USERS: (User & { password: string })[] = [
  {
    id: "admin-1",
    name: "Admin",
    email: "admin@kashi.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: "visitor-1",
    name: "Demo Visitor",
    email: "visitor@kashi.com",
    password: "visitor123",
    role: "visitor",
  },
  {
    id: "guide-demo",
    name: "Rajesh Sharma",
    email: "guide@kashi.com",
    password: "guide123",
    role: "guide",
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = getCookie("kashi_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        deleteCookie("kashi_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Check registered users first
    const registeredRaw = getCookie("kashi_registered");
    let registeredUsers: (User & { password: string })[] = [];
    if (registeredRaw) {
      try {
        registeredUsers = JSON.parse(registeredRaw);
      } catch {
        /* ignore */
      }
    }

    const allUsers = [...DEMO_USERS, ...registeredUsers];
    const found = allUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (found) {
      const userData: User = {
        id: found.id,
        name: found.name,
        email: found.email,
        role: found.role,
      };
      setUser(userData);
      setCookie("kashi_user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ): Promise<boolean> => {
    const registeredRaw = getCookie("kashi_registered");
    let registeredUsers: (User & { password: string })[] = [];
    if (registeredRaw) {
      try {
        registeredUsers = JSON.parse(registeredRaw);
      } catch {
        /* ignore */
      }
    }

    const allUsers = [...DEMO_USERS, ...registeredUsers];
    if (allUsers.some((u) => u.email === email)) return false;

    const newUser = {
      id: `${role}-${Date.now()}`,
      name,
      email,
      password,
      role,
    };
    registeredUsers.push(newUser);
    setCookie("kashi_registered", JSON.stringify(registeredUsers));

    const userData: User = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };
    setUser(userData);
    setCookie("kashi_user", JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    deleteCookie("kashi_user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
