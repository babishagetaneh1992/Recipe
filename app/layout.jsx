

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import Provider from "@/components/Provider";
import { CartProvider } from "@/context/cartContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Goated",
  description: "Generated by create next app",
};

export default function RootLayout({ Component, pageProps, children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
          
        <Provider>
        <div className="max-w-10xl mx-auto p-4">
          <ToastContainer />
          <Navbar />
           <CartProvider>
          <div className="mt-10">{children}</div>
          </CartProvider>
        </div>
        </Provider>
        
      </body>
    </html>
  );
}
