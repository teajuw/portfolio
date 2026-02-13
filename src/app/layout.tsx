import type { Metadata } from "next";
import { DM_Sans, Space_Mono, VT323 } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const vt323 = VT323({
  variable: "--font-retro",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Trevor Ju | ML/AI Engineer",
  description: "Portfolio of Trevor Ju, ML/AI Engineer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${spaceMono.variable} antialiased relative`}
      >
        <div className="bg-grid"></div>
        {children}
      </body>
    </html>
  );
}
