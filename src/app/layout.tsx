import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./Component/Common/Footer";
import Header from "./Component/Common/Login_Header";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "K-visa Partner",
  description: "K-visa Partner",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body style={{ touchAction:"manipulation"}}>
        <Header/>
        {children}
        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
