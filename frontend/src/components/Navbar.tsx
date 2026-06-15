// src/components/Navbar.tsx
"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Compass, Map, ShieldCheck, Sparkles } from 'lucide-react';

export default function Navbar() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'Explore', href: '/explore', icon: Compass },
        { name: 'Planner', href: '/planner', icon: Map },
        { name: 'Admin', href: '/admin', icon: ShieldCheck },
    ];

    return (
        <div className="fixed top-6 left-0 right-0 z-[100] px-6">
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`max-w-fit mx-auto border transition-all duration-500 rounded-2xl flex items-center gap-2 p-1.5 ${isScrolled
                        ? 'bg-black/60 backdrop-blur-xl border-white/10 shadow-2xl'
                        : 'bg-[#111111]/80 backdrop-blur-md border-white/5 shadow-xl'
                    }`}
            >
                {/* Logo Section */}
                <div className="flex items-center px-4 py-2 border-r border-white/10 mr-2 gap-2.5">
                    <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center font-black shadow-lg shadow-emerald-900/40">C</div>
                    <span className="font-black text-sm tracking-tighter hidden sm:block">
                        Cul<span className="text-emerald-500 font-light">Tour</span>
                    </span>
                </div>

                {/* Menu Section */}
                <div className="flex items-center gap-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href}>
                                <div className={`relative px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                                    }`}>
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-glow"
                                            className="absolute inset-0 bg-emerald-600/20 border border-emerald-500/30 rounded-xl -z-10"
                                        />
                                    )}
                                    <item.icon size={14} className={isActive ? 'text-emerald-400' : ''} />
                                    <span className="hidden md:block">{item.name}</span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </motion.nav>
        </div>
    );
}