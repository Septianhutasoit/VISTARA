"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    Sparkles, ArrowRight, Star, MapPin,
    Compass, Users, Landmark, Bot, Map, ChevronRight,
} from "lucide-react";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] } },
});

const STATS = [
    { label: "Destinasi Terverifikasi", val: "48+", Icon: Compass, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
    { label: "Kategori Budaya", val: "12", Icon: Users, color: "text-violet-400", bg: "bg-violet-400/10", border: "border-violet-400/20" },
    { label: "Area Kawasan", val: "7", Icon: Landmark, color: "text-sky-400", bg: "bg-sky-400/10", border: "border-sky-400/20" },
];

const FEATURES = [
    { Icon: Map, title: "Smart Itinerary", desc: "AI merancang rute perjalanan optimal berdasarkan preferensi, budget, dan durasi trip Anda secara real-time.", color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { Icon: Bot, title: "AI Chatbot 24/7", desc: "Tanya apa saja tentang Danau Toba — kuliner lokal, penginapan terbaik, hingga ritual adat Batak.", color: "text-violet-400", bg: "bg-violet-400/10" },
    { Icon: Compass, title: "48+ Destinasi", desc: "Database lengkap destinasi wisata, budaya, dan kuliner terverifikasi di seluruh kawasan Danau Toba.", color: "text-sky-400", bg: "bg-sky-400/10" },
];

const DESTINATIONS = [
    { name: "Huta Siallagan", loc: "Ambarita, Samosir", cat: "Budaya", icon: "🏛️", rate: "4.8", catColor: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
    { name: "Bukit Holbung", loc: "Samosir", cat: "Alam", icon: "⛰️", rate: "4.9", catColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
    { name: "Mie Gomak Balige", loc: "Balige", cat: "Kuliner", icon: "🍜", rate: "4.7", catColor: "text-orange-400 bg-orange-400/10 border-orange-400/20" },
    { name: "Air Terjun Sipiso-piso", loc: "Tongging", cat: "Alam", icon: "💧", rate: "4.9", catColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
];

export default function Home() {
    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#07090a", color: "white" }}>

            {/* ══ HERO ══ */}
            <section style={{ position: "relative", paddingTop: "120px", paddingBottom: "96px", overflow: "hidden" }}>
                {/* Glow */}
                <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
                    <div style={{
                        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                        width: "800px", height: "500px",
                        background: "radial-gradient(ellipse, rgba(16,185,129,0.07) 0%, transparent 70%)",
                        filter: "blur(60px)"
                    }} />
                </div>

                <div style={{ position: "relative", zIndex: 10, maxWidth: "800px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>

                    {/* Badge */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                        style={{ display: "flex", justifyContent: "center", marginBottom: "32px" }}>
                        <span style={{
                            display: "inline-flex", alignItems: "center", gap: "8px",
                            background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)",
                            color: "#34d399", padding: "8px 20px", borderRadius: "999px",
                            fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase"
                        }}>
                            <Sparkles size={12} style={{ animation: "pulse 2s infinite" }} />
                            AI-Powered Cultural Experience
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1 {...fadeUp(0.1)} style={{
                        fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontWeight: 900,
                        letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "24px"
                    }}>
                        Jelajahi Danau Toba
                        <br />
                        <span style={{
                            background: "linear-gradient(90deg, #34d399, #86efac, #2dd4bf)",
                            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
                        }}>
                            dengan Personal AI
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p {...fadeUp(0.2)} style={{
                        color: "#9ca3af", fontSize: "1.125rem", lineHeight: 1.7,
                        maxWidth: "560px", margin: "0 auto 40px"
                    }}>
                        Temukan kekayaan budaya Batak, kuliner autentik, dan rencana
                        perjalanan cerdas yang disesuaikan khusus untuk Anda.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div {...fadeUp(0.3)} style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap", marginBottom: "48px" }}>
                        <Link href="/planner" style={{
                            display: "inline-flex", alignItems: "center", gap: "10px",
                            background: "#059669", color: "white", fontWeight: 800,
                            padding: "14px 32px", borderRadius: "16px", fontSize: "15px",
                            textDecoration: "none", transition: "background 0.2s",
                            boxShadow: "0 20px 40px rgba(5,150,105,0.3)"
                        }}
                            onMouseEnter={e => (e.currentTarget.style.background = "#10b981")}
                            onMouseLeave={e => (e.currentTarget.style.background = "#059669")}
                        >
                            Rencanakan Trip <ArrowRight size={18} />
                        </Link>
                        <Link href="/explore" style={{
                            display: "inline-flex", alignItems: "center", gap: "10px",
                            background: "rgba(255,255,255,0.05)", color: "white", fontWeight: 600,
                            padding: "14px 32px", borderRadius: "16px", fontSize: "15px",
                            textDecoration: "none", border: "1px solid rgba(255,255,255,0.1)",
                            transition: "background 0.2s"
                        }}
                            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                        >
                            Jelajahi Destinasi
                        </Link>
                    </motion.div>

                    {/* Pills */}
                    <motion.div {...fadeUp(0.4)} style={{ display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap" }}>
                        {["48+ Destinasi Wisata", "AI Trip Planner", "Budaya Batak", "Kuliner Lokal", "Real-time Chat"].map((pill) => (
                            <span key={pill} style={{
                                fontSize: "11px", color: "#6b7280",
                                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                                padding: "6px 14px", borderRadius: "999px", fontWeight: 500
                            }}>{pill}</span>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ══ STATS ══ */}
            <section style={{ padding: "0 24px 96px", maxWidth: "960px", margin: "0 auto" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
                    {STATS.map((s, i) => (
                        <motion.div key={i}
                            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                            whileHover={{ y: -5 }}
                            style={{
                                background: "#0e1210", borderRadius: "24px", padding: "36px",
                                border: "1px solid rgba(255,255,255,0.06)", transition: "all 0.2s"
                            }}
                        >
                            <div style={{
                                width: "44px", height: "44px", borderRadius: "14px",
                                background: "rgba(255,255,255,0.05)", display: "flex",
                                alignItems: "center", justifyContent: "center", marginBottom: "24px"
                            }}>
                                <s.Icon size={20} className={s.color} />
                            </div>
                            <div className={s.color} style={{ fontSize: "3rem", fontWeight: 900, letterSpacing: "-0.04em", marginBottom: "6px" }}>
                                {s.val}
                            </div>
                            <div style={{ color: "#6b7280", fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                                {s.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ══ FEATURES ══ */}
            <section style={{ padding: "0 24px 96px", maxWidth: "960px", margin: "0 auto" }}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.5 }}
                    style={{ marginBottom: "48px" }}>
                    <p style={{ fontSize: "11px", fontWeight: 700, color: "#10b981", textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: "12px" }}>
                        Fitur Unggulan
                    </p>
                    <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 900, letterSpacing: "-0.02em", color: "white" }}>
                        Semua yang kamu butuhkan
                    </h2>
                </motion.div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
                    {FEATURES.map((f, i) => (
                        <motion.div key={i}
                            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                            whileHover={{ y: -4 }}
                            style={{
                                background: "#0e1210", borderRadius: "24px", padding: "28px",
                                border: "1px solid rgba(255,255,255,0.05)", transition: "all 0.2s"
                            }}
                        >
                            <div style={{
                                width: "44px", height: "44px", borderRadius: "14px",
                                background: "rgba(255,255,255,0.05)", display: "flex",
                                alignItems: "center", justifyContent: "center", marginBottom: "20px"
                            }}>
                                <f.Icon size={20} className={f.color} />
                            </div>
                            <h3 style={{ fontWeight: 700, color: "white", fontSize: "1.1rem", marginBottom: "10px", letterSpacing: "-0.01em" }}>
                                {f.title}
                            </h3>
                            <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: 1.7 }}>{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ══ DESTINATIONS ══ */}
            <section style={{ padding: "0 24px 96px", maxWidth: "960px", margin: "0 auto" }}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.5 }}
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}>
                    <div>
                        <p style={{ fontSize: "11px", fontWeight: 700, color: "#10b981", textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: "10px" }}>
                            Destinasi Pilihan
                        </p>
                        <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 900, letterSpacing: "-0.02em", color: "white", marginBottom: "6px" }}>
                            Unggulan AI CulTour
                        </h2>
                        <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>Rekomendasi terbaik berdasarkan analisis AI</p>
                    </div>
                    <Link href="/explore" style={{
                        display: "inline-flex", alignItems: "center", gap: "6px",
                        color: "#34d399", fontWeight: 700, fontSize: "0.875rem",
                        textDecoration: "none", transition: "color 0.2s"
                    }}>
                        Lihat Semua <ChevronRight size={15} />
                    </Link>
                </motion.div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
                    {DESTINATIONS.map((dest, i) => (
                        <motion.div key={i}
                            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                            whileHover={{ y: -8 }}
                            style={{
                                background: "#0e1210", borderRadius: "24px", overflow: "hidden",
                                border: "1px solid rgba(255,255,255,0.05)", cursor: "pointer",
                                transition: "all 0.2s"
                            }}
                        >
                            <div style={{
                                background: "linear-gradient(135deg, #1a3020, #0a100c)",
                                aspectRatio: "4/3", display: "flex", alignItems: "center",
                                justifyContent: "center", fontSize: "3rem"
                            }}>
                                {dest.icon}
                            </div>
                            <div style={{ padding: "20px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                                    <span className={dest.catColor} style={{
                                        fontSize: "10px", fontWeight: 800, padding: "4px 10px",
                                        borderRadius: "8px", textTransform: "uppercase", letterSpacing: "0.1em",
                                        border: "1px solid currentColor"
                                    }}>
                                        {dest.cat}
                                    </span>
                                    <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#fbbf24", fontSize: "12px", fontWeight: 800 }}>
                                        <Star size={11} fill="currentColor" /> {dest.rate}
                                    </div>
                                </div>
                                <h4 style={{ fontWeight: 700, color: "white", fontSize: "1rem", marginBottom: "6px", lineHeight: 1.3 }}>
                                    {dest.name}
                                </h4>
                                <p style={{ color: "#6b7280", fontSize: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
                                    <MapPin size={11} style={{ color: "#065f46", flexShrink: 0 }} />
                                    {dest.loc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ══ CTA ══ */}
            <section style={{ padding: "0 24px 112px", maxWidth: "960px", margin: "0 auto" }}>
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6 }}
                    style={{
                        position: "relative", borderRadius: "28px", overflow: "hidden",
                        background: "linear-gradient(135deg, rgba(6,78,59,0.3), #0e1512, #07090a)",
                        border: "1px solid rgba(5,150,105,0.2)", padding: "64px 40px", textAlign: "center"
                    }}>
                    <div style={{
                        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                        width: "400px", height: "150px", pointerEvents: "none",
                        background: "radial-gradient(ellipse, rgba(16,185,129,0.1) 0%, transparent 70%)",
                        filter: "blur(40px)"
                    }} />
                    <div style={{ position: "relative", zIndex: 10, maxWidth: "500px", margin: "0 auto" }}>
                        <p style={{ fontSize: "11px", fontWeight: 700, color: "#10b981", textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: "16px" }}>
                            Mulai Sekarang
                        </p>
                        <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-0.02em", color: "white", marginBottom: "16px", lineHeight: 1.1 }}>
                            Siap merencanakan <span style={{ color: "#34d399" }}>trip impianmu?</span>
                        </h2>
                        <p style={{ color: "#9ca3af", fontSize: "1rem", marginBottom: "40px", lineHeight: 1.7 }}>
                            Biarkan AI CulTour merancang itinerary terbaik berdasarkan minat, budget, dan waktu Anda — gratis dan instan.
                        </p>
                        <Link href="/planner" style={{
                            display: "inline-flex", alignItems: "center", gap: "10px",
                            background: "#059669", color: "white", fontWeight: 800,
                            padding: "18px 40px", borderRadius: "16px", fontSize: "15px",
                            textDecoration: "none", boxShadow: "0 20px 40px rgba(5,150,105,0.3)",
                            transition: "background 0.2s"
                        }}
                            onMouseEnter={e => (e.currentTarget.style.background = "#10b981")}
                            onMouseLeave={e => (e.currentTarget.style.background = "#059669")}
                        >
                            Generate Itinerary Sekarang <ArrowRight size={18} />
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* ══ FOOTER ══ */}
            <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "40px 24px" }}>
                <div style={{
                    maxWidth: "960px", margin: "0 auto",
                    display: "flex", flexWrap: "wrap", justifyContent: "space-between",
                    alignItems: "center", gap: "20px"
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{
                            width: "32px", height: "32px", background: "#059669", borderRadius: "10px",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontWeight: 900, fontSize: "14px"
                        }}>C</div>
                        <span style={{ fontWeight: 900, fontSize: "14px", letterSpacing: "-0.02em" }}>
                            Cul<span style={{ color: "#10b981" }}>Tour</span>
                            <span style={{ color: "#4b5563", fontWeight: 400, marginLeft: "6px", fontSize: "12px" }}>AI</span>
                        </span>
                    </div>
                    <p style={{ color: "#4b5563", fontSize: "12px" }}>© 2025 CulTour AI · Wisata Budaya Danau Toba</p>
                    <nav style={{ display: "flex", gap: "24px" }}>
                        {[{ label: "Explore", href: "/explore" }, { label: "Planner", href: "/planner" }, { label: "Admin", href: "/admin" }].map((l) => (
                            <Link key={l.href} href={l.href} style={{ color: "#4b5563", fontSize: "12px", textDecoration: "none", transition: "color 0.2s" }}
                                onMouseEnter={e => (e.currentTarget.style.color = "white")}
                                onMouseLeave={e => (e.currentTarget.style.color = "#4b5563")}
                            >{l.label}</Link>
                        ))}
                    </nav>
                </div>
            </footer>
        </div>
    );
}