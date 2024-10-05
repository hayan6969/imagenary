import type { Metadata } from "next";
import localFont from "next/font/local";
import {Poppins} from 'next/font/google'
import "./globals.css";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['900','400','700','600','500','300'],
  variable: '--font-poppins',
})


export const metadata: Metadata = {
  title: "Imagenary",
  description: "AI Powered Image Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
