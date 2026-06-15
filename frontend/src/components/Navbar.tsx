"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Map, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const NAV_LINKS = [
    { name: "Home", href: "/", Icon: Home },
    { name: "Explore", href: "/explore", Icon: Compass },
    { name: "Planner", href: "/planner", Icon: Map },
    { name: "Admin", href: "/admin", Icon: ShieldCheck },
];

export default function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 24);
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    return (
        <div className="fixed top-5 left-0 right-0 z-[200] px-4">
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`
          max-w-fit mx-auto flex items-center gap-2 p-2 rounded-2xl
          border transition-all duration-300
          ${scrolled
                        ? "bg-[#0c0f0d]/90 border-white/10 shadow-2xl shadow-black/50 backdrop-blur-2xl"
                        : "bg-[#0c0f0d]/70 border-white/8 backdrop-blur-xl"
                    }
        `}
            >
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2.5 px-3 py-2 border-r border-white/8 mr-1"
                >
                    <div className="w-8 h-8 bg-emerald-600 rounded-xl flex items-center justify-center font-black text-sm shadow-lg shadow-emerald-900/50">
                        C
                    </div>
                    <span className="font-black text-sm tracking-tight hidden sm:block">
                        Cul<span className="text-emerald-500">Tour</span>
                    </span>
                </Link>

                {/* Nav links */}
                <div className="flex items-center gap-0.5">
                    {NAV_LINKS.map((n) => {
                        const active = pathname === n.href;
                        return (
                            <Link key={n.href} href={n.href}>
                                <div
                                    className={`
                    relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold
                    transition-colors duration-200 cursor-pointer
                    ${active ? "text-white" : "text-gray-400 hover:text-gray-200 hover:bg-white/5"}
                  `}
                                >
                                    {active && (
                                        <motion.div
                                            layoutId="cultour-active-nav"
                                            className="absolute inset-0 bg-emerald-700/80 rounded-xl -z-10"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <n.Icon size={14} className={active ? "text-emerald-300" : ""} />
                                    <span className="hidden md:block">{n.name}</span>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* CTA */}
                <div className="ml-1 pl-2 border-l border-white/8">
                    <Link
                        href="/planner"
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-900/40 active:scale-95"
                    >
                        Trip AI
                    </Link>
                </div>
            </motion.nav>
        </div>
    );
}