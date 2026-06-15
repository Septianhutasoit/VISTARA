// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import ChatWidget from "../components/ChatWidget";

export const metadata: Metadata = {
    title: "CulTour AI — Jelajahi Danau Toba",
    description: "Asisten Wisata Budaya Berbasis AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="id">
            <body className="bg-[#07090a] text-white antialiased selection:bg-emerald-500/30">
                {/* Navbar Global */}
                <Navbar />

                {/* Konten Halaman */}
                <main>{children}</main>

                {/* Chatbot Melayang */}
                <ChatWidget />
            </body>
        </html>
    );
}