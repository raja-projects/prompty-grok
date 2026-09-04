import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { Header } from "@/components/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prompty — Image & Video Prompt Lab",
  description:
    "Craft high-quality prompts for Midjourney, Flux, DALL·E, Stable Diffusion, Runway, Kling, Luma, and Sora-style generators.",
  applicationName: "Prompty",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${display.variable} font-sans antialiased`}
      >
        <div className="min-h-screen bg-grid-fade bg-prompty-bg">
          <Header />
          <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">{children}</main>
          <footer className="border-t border-prompty-border/60 py-8 text-center text-xs text-prompty-muted">
            Prompty · prompt assembly only · no image/video API calls
          </footer>
        </div>
      </body>
    </html>
  );
}
