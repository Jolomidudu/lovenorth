import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "lovenorth",
  description: "A beautiful light view of a modern dating app. Swipe, match, connect.",
  openGraph: {
    title: "lovenorth",
    description: "Swipe, match, and chat in lovenorth.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#f7f1e8] text-[#3b2b27] min-h-screen">
        {children}
      </body>
    </html>
  );
}
