import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Wallet } from "./components/Wallet";
import NavBar from "./components/Navbar";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Next.js AI Lite App",
  description: "AI with Next and AI SDK",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          montserrat.className +
          "bg-gradient-to-r from-blue-600 to-pink-600 rounded-lg group-hover:opacity-100 transition duration-800 group-hover:duration-200 animate-tilt"
        }
      >
        <Wallet>
          <NavBar />
          {children}
        </Wallet>
      </body>
    </html>
  );
}
