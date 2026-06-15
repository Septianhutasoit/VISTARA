"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    Sparkles,
    ArrowRight,
    Star,
    MapPin,
    Compass,
    Users,
    Landmark,
    Bot,
    Map,
    ChevronRight,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════
   ANIMATION VARIANTS
═══════════════════════════════════════════════════════ */
const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
    },
});

const stagger = {
    initial: {},
    animate: { transition: { staggerChildren: 0.1 } },
};

/* ═══════════════════════════════════════════════════════
   STATIC DATA
═══════════════════════════════════════════════════════ */
const STATS = [
    {
        label: "Destinasi Terverifikasi",
        val: "48+",
        Icon: Compass,
        color: "text-emerald-400",
        bg: "bg-emerald-400/8",
        border: "border-emerald-400/15",
    },
    {
        label: "Kategori Budaya",
        val: "12",
        Icon: Users,
        color: "text-violet-400",
        bg: "bg-violet-400/8",
        border: "border-violet-400/15",
    },
    {
        label: "Area Kawasan",
        val: "7",
        Icon: Landmark,
        color: "text-sky-400",
        bg: "bg-sky-400/8",
        border: "border-sky-400/15",
    },
];

const FEATURES = [
    {
        Icon: Map,
        title: "Smart Itinerary",
        desc: "AI merancang rute perjalanan optimal berdasarkan preferensi, budget, dan durasi trip Anda secara real-time.",
        color: "text-emerald-400",
        bg: "bg-emerald-400/8",
    },
    {
        Icon: Bot,
        title: "AI Chatbot 24/7",
        desc: "Tanya apa saja tentang Danau Toba — kuliner lokal, penginapan terbaik, hingga ritual adat Batak.",
        color: "text-violet-400",
        bg: "bg-violet-400/8",
    },
    {
        Icon: Compass,
        title: "48+ Destinasi",
        desc: "Database lengkap destinasi wisata, budaya, dan kuliner terverifikasi di seluruh kawasan Danau Toba.",
        color: "text-sky-400",
        bg: "bg-sky-400/8",
    },
];

const DESTINATIONS = [
    { name: "Huta Siallagan", loc: "Ambarita, Samosir", cat: "Budaya", icon: "🏛️", rate: "4.8", catColor: "text-amber-400 bg-amber-400/8 border-amber-400/20" },
    { name: "Bukit Holbung", loc: "Samosir", cat: "Alam", icon: "⛰️", rate: "4.9", catColor: "text-emerald-400 bg-emerald-400/8 border-emerald-400/20" },
    { name: "Mie Gomak Balige", loc: "Balige", cat: "Kuliner", icon: "🍜", rate: "4.7", catColor: "text-orange-400 bg-orange-400/8 border-orange-400/20" },
    { name: "Air Terjun Sipiso-piso", loc: "Tongging", cat: "Alam", icon: "💧", rate: "4.9", catColor: "text-emerald-400 bg-emerald-400/8 border-emerald-400/20" },
];

/* ═══════════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════════ */
export default function Home() {
    return (
        <div className="min-h-screen bg-[#07090a] text-white">

            {/* ══ HERO ══════════════════════════════════════════════ */}
            <section className="relative pt-36 pb-16 px-6 overflow-hidden">
                {/* Ambient background glow */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-emerald-600/6 rounded-full blur-[160px]" />
                    <div className="absolute top-24 right-0 w-[400px] h-[400px] bg-green-500/4 rounded-full blur-[120px]" />
                </div>

                <div className="relative z-10 max-w-6xl mx-auto">
                    <motion.div
                        variants={stagger}
                        initial="initial"
                        animate="animate"
                        className="text-center"
                    >
                        {/* Badge */}
                        <motion.div {...fadeUp(0)} className="flex justify-center mb-10">
                            <span className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-5 py-2 rounded-full text-[11px] font-bold tracking-[0.18em] uppercase backdrop-blur-md">
                                <Sparkles size={12} className="animate-pulse" />
                                AI-Powered Cultural Experience
                            </span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            {...fadeUp(0.1)}
                            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.0] mb-8"
                        >
                            Jelajahi Danau Toba
                            <br />
                            <span className="bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400 bg-clip-text text-transparent">
                                dengan Personal AI
                            </span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            {...fadeUp(0.2)}
                            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
                        >
                            Temukan kekayaan budaya Batak, kuliner autentik, dan rencana
                            perjalanan cerdas yang disesuaikan khusus untuk Anda.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            {...fadeUp(0.3)}
                            className="flex flex-wrap justify-center gap-4 mb-20"
                        >
                            <Link
                                href="/planner"
                                className="group flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black px-8 py-4 rounded-2xl text-base transition-all shadow-xl shadow-emerald-900/40 active:scale-95"
                            >
                                Rencanakan Trip
                                <ArrowRight
                                    size={18}
                                    className="group-hover:translate-x-1 transition-transform"
                                />
                            </Link>
                            <Link
                                href="/explore"
                                className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-4 rounded-2xl text-base transition-all backdrop-blur-md"
                            >
                                Jelajahi Destinasi
                            </Link>
                        </motion.div>

                        {/* Feature pills row */}
                        <motion.div
                            {...fadeUp(0.4)}
                            className="flex flex-wrap justify-center gap-3"
                        >
                            {["48+ Destinasi Wisata", "AI Trip Planner", "Budaya Batak", "Kuliner Lokal", "Real-time Chat"].map(
                                (pill) => (
                                    <span
                                        key={pill}
                                        className="text-xs text-gray-500 bg-white/4 border border-white/8 px-4 py-2 rounded-full font-medium"
                                    >
                                        {pill}
                                    </span>
                                )
                            )}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ══ STATS ═════════════════════════════════════════════ */}
            <section className="px-6 max-w-6xl mx-auto mb-24">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-5"
                    variants={stagger}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    {STATS.map((s, i) => (
                        <motion.div
                            key={i}
                            {...fadeUp(i * 0.08)}
                            whileHover={{ y: -5 }}
                            className={`group bg-[#0e1210] border ${s.border} hover:border-emerald-500/25 rounded-3xl p-9 transition-all`}
                        >
                            <div
                                className={`w-11 h-11 ${s.bg} border ${s.border} rounded-2xl flex items-center justify-center mb-6`}
                            >
                                <s.Icon size={20} className={s.color} />
                            </div>
                            <div className="text-5xl font-black text-white mb-2 tracking-tighter group-hover:text-emerald-400 transition-colors">
                                {s.val}
                            </div>
                            <div className="text-gray-500 text-[11px] uppercase tracking-[0.22em] font-bold">
                                {s.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* ══ FEATURES ══════════════════════════════════════════ */}
            <section className="px-6 max-w-6xl mx-auto mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <p className="text-[11px] font-bold text-emerald-500 uppercase tracking-[0.2em] mb-3">
                        Fitur Unggulan
                    </p>
                    <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
                        Semua yang kamu butuhkan
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {FEATURES.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            whileHover={{ y: -4 }}
                            className="bg-[#0e1210] border border-white/5 hover:border-white/12 rounded-3xl p-7 transition-all"
                        >
                            <div
                                className={`w-11 h-11 ${f.bg} rounded-2xl flex items-center justify-center mb-5`}
                            >
                                <f.Icon size={20} className={f.color} />
                            </div>
                            <h3 className="font-bold text-white text-lg mb-3 tracking-tight">
                                {f.title}
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ══ DESTINATIONS ══════════════════════════════════════ */}
            <section className="px-6 max-w-6xl mx-auto mb-24">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-5 mb-10"
                >
                    <div>
                        <p className="text-[11px] font-bold text-emerald-500 uppercase tracking-[0.2em] mb-3">
                            Destinasi Pilihan
                        </p>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-2">
                            Unggulan AI CulTour
                        </h2>
                        <p className="text-gray-500 text-sm">
                            Rekomendasi terbaik berdasarkan analisis AI
                        </p>
                    </div>
                    <Link
                        href="/explore"
                        className="group flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-bold text-sm transition-colors"
                    >
                        Lihat Semua
                        <ChevronRight
                            size={15}
                            className="group-hover:translate-x-0.5 transition-transform"
                        />
                    </Link>
                </motion.div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {DESTINATIONS.map((dest, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            whileHover={{ y: -8 }}
                            className="group bg-[#0e1210] border border-white/5 hover:border-emerald-500/15 rounded-3xl overflow-hidden transition-all cursor-pointer"
                        >
                            {/* Thumbnail */}
                            <div className="bg-gradient-to-br from-[#1a3020] to-[#0a100c] aspect-[4/3] flex items-center justify-center text-5xl overflow-hidden group-hover:scale-[1.03] transition-transform duration-500">
                                {dest.icon}
                            </div>
                            {/* Info */}
                            <div className="p-5">
                                <div className="flex justify-between items-center mb-3">
                                    <span
                                        className={`text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest border ${dest.catColor}`}
                                    >
                                        {dest.cat}
                                    </span>
                                    <div className="flex items-center gap-1 text-amber-400 text-xs font-black">
                                        <Star size={11} fill="currentColor" /> {dest.rate}
                                    </div>
                                </div>
                                <h4 className="font-bold text-white text-base mb-1.5 group-hover:text-emerald-400 transition-colors tracking-tight leading-tight">
                                    {dest.name}
                                </h4>
                                <p className="text-gray-500 text-xs flex items-center gap-1.5 font-medium">
                                    <MapPin size={11} className="text-emerald-700 flex-shrink-0" />
                                    {dest.loc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ══ CTA BANNER ════════════════════════════════════════ */}
            <section className="px-6 max-w-6xl mx-auto pb-28">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative rounded-3xl bg-gradient-to-br from-emerald-900/25 via-[#0e1512] to-[#07090a] border border-emerald-800/20 p-10 md:p-16 text-center overflow-hidden"
                >
                    {/* glow */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-emerald-600/8 rounded-full blur-[80px]" />
                    </div>
                    <div className="relative z-10 max-w-xl mx-auto">
                        <p className="text-[11px] font-bold text-emerald-500 uppercase tracking-[0.2em] mb-4">
                            Mulai Sekarang
                        </p>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-5 leading-tight">
                            Siap merencanakan{" "}
                            <span className="text-emerald-400">trip impianmu?</span>
                        </h2>
                        <p className="text-gray-400 text-base mb-10 leading-relaxed">
                            Biarkan AI CulTour merancang itinerary terbaik berdasarkan minat,
                            budget, dan waktu Anda — gratis dan instan.
                        </p>
                        <Link
                            href="/planner"
                            className="group inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black px-10 py-5 rounded-2xl text-base transition-all shadow-xl shadow-emerald-900/40 active:scale-95"
                        >
                            Generate Itinerary Sekarang
                            <ArrowRight
                                size={18}
                                className="group-hover:translate-x-1 transition-transform"
                            />
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* ══ FOOTER ════════════════════════════════════════════ */}
            <footer className="border-t border-white/5 px-6 py-10">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-5">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-emerald-600 rounded-xl flex items-center justify-center font-black text-sm shadow-lg shadow-emerald-900/40">
                            C
                        </div>
                        <span className="font-black text-sm tracking-tight">
                            Cul<span className="text-emerald-500">Tour</span>
                            <span className="text-gray-600 font-normal ml-1.5 text-xs">AI</span>
                        </span>
                    </div>
                    <p className="text-gray-600 text-xs text-center">
                        © 2024 CulTour AI · Wisata Budaya Danau Toba
                    </p>
                    <nav className="flex gap-6 text-xs text-gray-600">
                        {[
                            { label: "Explore", href: "/explore" },
                            { label: "Planner", href: "/planner" },
                            { label: "Admin", href: "/admin" },
                        ].map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="hover:text-white transition-colors"
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </footer>
        </div>
    );
}