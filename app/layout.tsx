import type { Metadata, Viewport } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import { AuthProvider } from "@/lib/auth-context";
import { KashiChatbot } from "@/components/chatbot";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kashi - The Unexplored City | Unveil the Secrets of Varanasi",
  description:
    "Discover the hidden temples, secret ghats, ancient mysteries, and untold stories of Kashi (Varanasi) - one of the oldest living cities in the world. Book local guides, explore the unexplored.",
  keywords:
    "Kashi, Varanasi, hidden temples, ghats, spiritual, ancient city, unexplored, mysteries, Ganga, heritage, local guides, booking",
  openGraph: {
    title: "Kashi - The Unexplored City",
    description:
      "Unveil the secrets. Explore the hidden treasures of the world's oldest living city. Book local guides for authentic experiences.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1C2D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">
        <AuthProvider>
          {children}
          <KashiChatbot />
        </AuthProvider>
      </body>
    </html>
  );
}
