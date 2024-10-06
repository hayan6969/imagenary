import type { Metadata } from "next";
import {Poppins} from 'next/font/google'
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

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
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
