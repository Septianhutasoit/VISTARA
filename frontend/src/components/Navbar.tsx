'use client';
import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Home, Compass, Sparkles, Map, BookOpen,
    Menu, X, ChevronDown, LogOut, User, Settings,
    MessageCircle, CalendarDays, Bell,
} from 'lucide-react';

// ── Nav items (user-facing) ─────────────────────────────────────────────────
const navItems = [
    { name: 'Beranda', href: '/', icon: Home },
    { name: 'Jelajahi', href: '/explore', icon: Compass },
    { name: 'Trip Planner', href: '/planner', icon: CalendarDays },
    { name: 'AI Guide', href: '/ai', icon: Sparkles },
    { name: 'Culturepedia', href: '/culturepedia', icon: BookOpen },
];

// ── Tipe Notifikasi ──────────────────────────────────────────────────────────
interface Notification {
    id: number;
    title: string;
    desc: string;
    color?: string;
    time?: string;
}

export default function Navbar() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const notifRef = useRef<HTMLDivElement>(null);
    const seenNotifIds = useRef<Set<string>>(new Set());

    // Scroll effect - trigger setelah scroll 50px (lebih sensitif)
    useEffect(() => {
        const onScroll = () => {
            // Scroll lebih dari 50px akan mengaktifkan efek blur
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close dropdowns on route change
    useEffect(() => {
        setIsMobileOpen(false);
        setIsProfileOpen(false);
        setIsNotifOpen(false);
    }, [pathname]);

    // Simulasi notifikasi
    useEffect(() => {
        const demoNotifs: Notification[] = [
            {
                id: 1,
                title: '✨ Destinasi Baru',
                desc: 'Air Terjun Efrata telah ditambahkan ke Culturepedia!',
                color: 'bg-emerald-500',
                time: '2 jam lalu'
            },
            {
                id: 2,
                title: '🎯 Rencana Perjalanan',
                desc: 'Jangan lupa selesaikan Trip Planner Anda untuk akhir pekan ini.',
                color: 'bg-blue-500',
                time: '5 jam lalu'
            }
        ];
        setNotifications(demoNotifs);
        setUnreadCount(demoNotifs.length);
    }, []);

    const closeAll = () => {
        setIsProfileOpen(false);
        setIsNotifOpen(false);
    };

    const handleLogout = () => setShowLogoutModal(true);
    const executeLogout = () => {
        setShowLogoutModal(false);
        console.log('Logout executed');
    };

    const getInitials = () => {
        return 'WT';
    };

    return (
        <>
            {/* ── NAVBAR ────────────────────────────────────────────────────────── */}
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 120, damping: 20 }}
                className="fixed top-0 left-0 right-0 z-[100]"
            >
                {/* Container dengan transisi seamless */}
                <div className={`w-full transition-all duration-500 ease-out
                    ${isScrolled ? 'px-4 sm:px-8 pt-4 pb-4' : 'px-6 sm:px-12 pt-10 pb-10'}`}
                >
                    <div className={`
                        flex items-center justify-between gap-4 
                        transition-all duration-500 ease-out
                        mx-auto
                        ${isScrolled
                            ? 'bg-black/80 backdrop-blur-xl rounded-2xl border border-white/15 shadow-2xl shadow-black/30 px-8 py-4' // Tambah padding horizontal
                            : 'bg-gradient-to-b from-black/40 via-black/20 to-transparent px-10 py-6' // Tambah padding
        }
                    `}>
                        {/* ── Brand ─────────────────────────────────────────────────── */}
                        <Link href="/" className="flex items-center gap-3shrink-0 group">
                            {/* Logo mark dengan efek halus */}
                            <motion.div
                                whileHover={{ scale: 1.05, rotate: 5 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                                className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1D9E75] to-[#0F6E56] flex items-center justify-center shadow-lg shadow-[#1D9E75]/20 flex-shrink-0"
                            >
                                <Map size={20} className="text-white" />
                            </motion.div>
                            <div className="flex flex-col leading-tight">
                                <span className="text-[17px] font-black tracking-tight text-white">
                                    Cul<span className={`transition-colors duration-500 ${isScrolled ? 'text-[#5DCAA5]' : 'text-[#9FE1CB]'}`}>Tour</span>
                                </span>
                                <span className={`text-[9px] font-semibold tracking-widest uppercase transition-all duration-500
                                    ${isScrolled ? 'text-white/40' : 'text-white/60'}`}>
                                    Danau Toba AI
                                </span>
                            </div>
                        </Link>

                        {/* ── Nav items (desktop) ────────────────────────────────────── */}
                        <div className="hidden lg:flex items-center justify-center flex-1">
                            <div className="flex items-center gap-12">
                                {navItems.map(item => {
                                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                                    return (
                                        <Link key={item.href} href={item.href}>
                                            <motion.div
                                                whileHover={{ scale: 1.04 }}
                                                whileTap={{ scale: 0.96 }}
                                                className={`relative flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium rounded-xl cursor-pointer transition-all duration-200
                                                    ${isActive
                                                        ? isScrolled ? 'text-[#5DCAA5]' : 'text-white font-semibold'
                                                        : isScrolled
                                                            ? 'text-white/70 hover:text-white hover:bg-white/10'
                                                            : 'text-white/80 hover:text-white hover:bg-white/15'}`}
                                            >
                                                <item.icon size={23} className="flex-shrink-0" />
                                                <span>{item.name}</span>
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="cultour-active-nav"
                                                        className={`absolute bottom-1 left-3 right-3 h-[2px] rounded-full ${isScrolled ? 'bg-[#5DCAA5]' : 'bg-white'}`}
                                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                                    />
                                                )}
                                            </motion.div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        {/* ── Actions kanan ─────────────────────────────────────────── */}
                        <div className="flex items-center gap-1.5 shrink-0">

                            {/* Bell notifikasi */}
                            <div className="relative" ref={notifRef}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        setIsNotifOpen(prev => !prev);
                                        setIsProfileOpen(false);
                                    }}
                                    className={`relative p-2 rounded-xl transition-all z-50
                                        ${isNotifOpen
                                            ? 'text-[#5DCAA5] bg-white/15'
                                            : isScrolled
                                                ? 'text-white/60 hover:text-white hover:bg-white/10'
                                                : 'text-white/70 hover:text-white hover:bg-white/15'}`}
                                >
                                    <Bell size={19} />
                                    {unreadCount > 0 && (
                                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-[#0a0a0a] animate-pulse" />
                                    )}
                                </motion.button>

                                <AnimatePresence>
                                    {isNotifOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ type: 'spring', damping: 22, stiffness: 300 }}
                                            className="absolute right-0 mt-3 w-80 bg-[#121212]/95 backdrop-blur-xl
                                                border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-[110]"
                                        >
                                            <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
                                                <h4 className="text-xs font-black text-white uppercase tracking-widest">
                                                    Pemberitahuan
                                                </h4>
                                                {unreadCount > 0 && (
                                                    <span className="text-[9px] bg-[#1D9E75] text-white px-2 py-0.5 rounded-full font-bold">
                                                        {unreadCount} Baru
                                                    </span>
                                                )}
                                            </div>
                                            <div className="max-h-80 overflow-y-auto divide-y divide-white/5">
                                                {notifications.length === 0 ? (
                                                    <div className="p-10 text-center space-y-2">
                                                        <Bell size={24} className="mx-auto text-white/10" />
                                                        <p className="text-[10px] text-white/30 uppercase font-bold tracking-tighter">
                                                            Belum ada notifikasi
                                                        </p>
                                                    </div>
                                                ) : (
                                                    notifications.map(n => (
                                                        <div key={n.id}
                                                            className="p-4 hover:bg-white/5 transition-colors cursor-default group"
                                                        >
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${n.color || 'bg-[#1D9E75]'}`} />
                                                                <p className="text-[11px] font-black text-white uppercase group-hover:text-[#5DCAA5] transition-colors">
                                                                    {n.title}
                                                                </p>
                                                            </div>
                                                            <p className="text-[10px] text-white/50 leading-relaxed">{n.desc}</p>
                                                            {n.time && (
                                                                <p className="text-[8px] text-[#5DCAA5]/50 mt-2 font-bold italic">{n.time}</p>
                                                            )}
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                            <div className="p-3 border-t border-white/5 bg-white/3">
                                                <button
                                                    onClick={() => {
                                                        setNotifications([]);
                                                        setUnreadCount(0);
                                                        seenNotifIds.current.clear();
                                                    }}
                                                    className="w-full text-[10px] font-bold text-white/30 hover:text-white/60 transition-colors py-1"
                                                >
                                                    Tandai semua sudah dibaca
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Profile dropdown */}
                            <div className="relative">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => {
                                        setIsProfileOpen(prev => !prev);
                                        setIsNotifOpen(false);
                                    }}
                                    className={`flex items-center gap-2 pl-1.5 pr-2 py-1 rounded-full transition-all duration-300 
                                        ${isScrolled
                                            ? 'bg-white/10 border border-white/20 hover:bg-white/20'
                                            : 'bg-white/10 border border-white/20 hover:bg-white/20'}`}
                                >
                                    <div className="relative flex-shrink-0">
                                        <div className="w-8 h-8 rounded-full ring-2 ring-[#1D9E75]/50 flex items-center justify-center bg-gradient-to-br from-[#1D9E75] to-[#0F6E56] text-white font-bold text-[10px]">
                                            {getInitials()}
                                        </div>
                                        <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full border border-white" />
                                    </div>
                                    <div className="hidden sm:block text-left pr-1">
                                        <p className="text-[11px] font-semibold leading-tight text-white">Wisatawan</p>
                                        <p className={`text-[9px] font-medium transition-colors duration-500 ${isScrolled ? 'text-[#5DCAA5]' : 'text-[#9FE1CB]'}`}>
                                            Danau Toba AI
                                        </p>
                                    </div>
                                    <ChevronDown
                                        size={12}
                                        className={`text-white/60 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`}
                                    />
                                </motion.button>

                                <AnimatePresence>
                                    {isProfileOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                            transition={{ type: 'spring', damping: 22, stiffness: 300 }}
                                            className="absolute right-0 mt-2 w-64 bg-[#1a1a1a]/95 backdrop-blur-md rounded-2xl shadow-2xl shadow-black/50 border border-white/8 overflow-hidden z-[110]"
                                        >
                                            <div className="bg-gradient-to-br from-[#1D9E75]/90 to-[#0F6E56]/90 px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                                        <User size={16} className="text-white" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-white leading-tight">Wisatawan</p>
                                                        <p className="text-[10px] text-[#9FE1CB] mt-0.5">Danau Toba Explorer</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="px-3 py-3 space-y-1">
                                                {[
                                                    { href: '/profile', icon: User, label: 'Profil saya' },
                                                    { href: '/settings', icon: Settings, label: 'Pengaturan' },
                                                    { href: '/ai', icon: MessageCircle, label: 'Tanya AI Guide' },
                                                ].map(item => (
                                                    <Link key={item.href} href={item.href} onClick={closeAll}>
                                                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] text-white/70 hover:text-white hover:bg-white/10 transition-all">
                                                            <item.icon size={14} className="text-[#5DCAA5]" />
                                                            {item.label}
                                                        </button>
                                                    </Link>
                                                ))}
                                                <div className="h-px bg-white/8 mx-2 my-1" />
                                                <button
                                                    onClick={() => { setIsProfileOpen(false); handleLogout(); }}
                                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] text-red-400 hover:bg-red-500/10 transition-all"
                                                >
                                                    <LogOut size={14} />
                                                    Keluar
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Mobile hamburger */}
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsMobileOpen(p => !p)}
                                className={`lg:hidden p-2 rounded-xl transition-all
                                    ${isScrolled
                                        ? 'text-white/70 hover:bg-white/10'
                                        : 'text-white/80 hover:bg-white/15'}`}
                            >
                                {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* ── Mobile menu ─────────────────────────────────────────────────── */}
                <AnimatePresence>
                    {isMobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="lg:hidden bg-white/95 backdrop-blur-xl shadow-xl overflow-hidden border-t border-white/20"
                        >
                            <div className="px-4 py-3 space-y-0.5">
                                {navItems.map((item, idx) => {
                                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                                    return (
                                        <motion.div
                                            key={item.href}
                                            initial={{ opacity: 0, x: -16 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.04 }}
                                        >
                                            <Link
                                                href={item.href}
                                                onClick={() => setIsMobileOpen(false)}
                                                className={`flex items-center justify-between px-4 py-3 rounded-xl text-[13px] font-medium transition-all
                                                    ${isActive
                                                        ? 'bg-[#1D9E75]/15 text-[#1D9E75]'
                                                        : 'text-slate-700 hover:bg-slate-100'}`}
                                            >
                                                <span className="flex items-center gap-2.5">
                                                    <item.icon size={15} />
                                                    {item.name}
                                                </span>
                                                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#1D9E75]" />}
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                                <div className="pt-2 mt-1 border-t border-slate-200 space-y-0.5">
                                    <Link href="/ai" onClick={() => setIsMobileOpen(false)}>
                                        <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-[13px] text-[#1D9E75] hover:bg-[#1D9E75]/10 transition-all font-medium">
                                            <Sparkles size={15} /> Tanya AI Guide
                                        </div>
                                    </Link>
                                    <button
                                        onClick={() => { setIsMobileOpen(false); handleLogout(); }}
                                        className="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-[13px] font-semibold text-red-500 hover:bg-red-50 transition-all"
                                    >
                                        <LogOut size={15} /> Keluar
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* ── Backdrop untuk tutup semua dropdown ─────────────────────────────── */}
            {(isProfileOpen || isNotifOpen) && (
                <div
                    className="fixed inset-0 z-[90] bg-transparent"
                    onClick={closeAll}
                />
            )}

            {/* ── LOGOUT MODAL ──────────────────────────────────── */}
            <AnimatePresence>
                {showLogoutModal && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
                            onClick={() => setShowLogoutModal(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 20 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                            className="fixed inset-0 z-[201] flex items-center justify-center p-4"
                        >
                            <div className="bg-[#0D1F16] border border-white/10 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
                                <div className="bg-gradient-to-r from-[#1D9E75] to-[#0F6E56] px-6 py-4 flex items-center gap-3">
                                    <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                                        <LogOut size={17} className="text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-white uppercase tracking-wide">Keluar Aplikasi</p>
                                        <p className="text-[10px] text-emerald-200 font-bold">CulTour Danau Toba</p>
                                    </div>
                                </div>
                                <div className="px-6 py-5 space-y-4">
                                    <div className="flex items-center gap-3 bg-white/5 border border-white/8 rounded-xl p-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1D9E75] to-[#0F6E56] flex items-center justify-center text-white font-black text-base shrink-0 shadow-lg">
                                            {getInitials()}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-white">Wisatawan</p>
                                            <p className="text-[10px] text-white/40 mt-0.5">Danau Toba Explorer</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-white/60 leading-relaxed">
                                        Anda akan keluar dari <span className="text-[#5DCAA5] font-bold">CulTour</span>. Sesi Anda akan diakhiri.
                                    </p>
                                </div>
                                <div className="px-6 pb-5 flex gap-3">
                                    <button
                                        onClick={() => setShowLogoutModal(false)}
                                        className="flex-1 py-2.5 rounded-xl border border-white/15 text-white/70 text-sm font-bold hover:bg-white/8 transition-all"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        onClick={executeLogout}
                                        className="flex-1 py-2.5 rounded-xl bg-red-500/90 hover:bg-red-600 text-white text-sm font-black uppercase tracking-wide transition-all shadow-lg shadow-red-900/30 active:scale-95"
                                    >
                                        Ya, Keluar
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}