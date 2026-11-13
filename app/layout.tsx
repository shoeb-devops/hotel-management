import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "StaySync — Premium Hotel Management",
    template: "%s | StaySync",
  },
  description:
    "Premium hotel management system for 3-star to 5-star hotels. Book rooms, manage reservations, and experience luxury hospitality.",
  keywords: [
    "hotel management",
    "hotel booking",
    "luxury hotel",
    "5 star hotel",
    "hotel reservation",
    "Bangladesh hotel",
  ],
  authors: [{ name: "StaySync" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "StaySync",
    title: "StaySync — Premium Hotel Management",
    description: "Premium hotel management system for luxury hospitality.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background antialiased">
        {children}
        <Toaster
          position="top-right"
          richColors
          closeButton
          toastOptions={{
            style: {
              fontFamily: "Inter, system-ui, sans-serif",
            },
          }}
        />
      </body>
    </html>
  );
}
