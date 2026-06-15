import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import ChatWidget from "../components/ChatWidget";

export const metadata: Metadata = {
    title: "CulTour AI — Wisata Budaya Danau Toba",
    description: "AI-Powered Cultural Tourism Assistant untuk kawasan Danau Toba",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="id">
            <body className="bg-[#07090a] text-white antialiased min-h-screen overflow-x-hidden">
                <Navbar />
                <main className="relative z-10">{children}</main>
                <ChatWidget />
            </body>
        </html>
    );
}