'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles, Send, RotateCcw, Map, Copy, Check,
    ArrowDown, Loader2, UtensilsCrossed, Sunrise,
    BookOpen, CalendarDays, Compass,
} from 'lucide-react';
import { chatService } from '@/services/destination';
import type { ChatMessage, Destination } from '@/types';
import DestinationCard from '@/components/DestinationCard';

// ── Extend ChatMessage secara lokal saja, tidak mengubah type global ──
type LocalMessage = ChatMessage & { error?: boolean; time?: string };

const QUICK_PROMPTS = [
    { text: 'Rekomendasi wisata budaya 2 hari dari Balige', icon: CalendarDays },
    { text: 'Apa makna ritual Sigale-gale?', icon: BookOpen },
    { text: 'Kuliner halal khas Danau Toba', icon: UtensilsCrossed },
    { text: 'Itinerary hemat ke Samosir', icon: Compass },
    { text: 'Tempat terbaik untuk melihat sunrise', icon: Sunrise },
    { text: 'Ceritakan sejarah Batak Toba', icon: BookOpen },
];

const timeNow = () =>
    new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

export default function AIGuidePage() {
    const [messages, setMessages] = useState<LocalMessage[]>([
        {
            role: 'bot',
            text: 'Horas! Saya CulTour AI - asisten wisata budaya Danau Toba.\n\nCeritakan preferensimu dan saya akan rekomendasikan destinasi, itinerary, atau info budaya yang paling cocok untukmu!',
        },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [recs, setRecs] = useState<Destination[]>([]);
    const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
    const [showScrollBtn, setShowScrollBtn] = useState(false);

    const bottomRef = useRef<HTMLDivElement>(null);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const isEmpty = messages.length <= 1 && recs.length === 0;

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // ── Deteksi posisi scroll → tampilkan tombol "ke bawah" jika user scroll ke atas ──
    useEffect(() => {
        const el = scrollAreaRef.current;
        if (!el) return;
        const onScroll = () => {
            const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
            setShowScrollBtn(distanceFromBottom > 160);
        };
        el.addEventListener('scroll', onScroll);
        return () => el.removeEventListener('scroll', onScroll);
    }, [isEmpty]);

    // ── Auto-resize textarea sesuai konten, maksimal 120px ──
    useEffect(() => {
        const ta = inputRef.current;
        if (!ta) return;
        ta.style.height = 'auto';
        ta.style.height = Math.min(ta.scrollHeight, 120) + 'px';
    }, [input]);

    const send = async (text: string) => {
        if (!text.trim() || loading) return;
        setMessages(prev => [...prev, { role: 'user', text, time: timeNow() }]);
        setInput('');
        setLoading(true);
        setRecs([]);

        try {
            const history = messages.slice(-6);
            const res = await chatService.send({ message: text, history });
            setMessages(prev => [...prev, { role: 'bot', text: res.reply, time: timeNow() }]);
            if (res.recommendations?.length) setRecs(res.recommendations);
        } catch {
            setMessages(prev => [...prev, {
                role: 'bot',
                text: 'Maaf, terjadi kesalahan. Pastikan backend sudah berjalan di port 8000.',
                error: true,
                time: timeNow(),
            }]);
        } finally {
            setLoading(false);
            inputRef.current?.focus();
        }
    };

    const reset = () => {
        setMessages([{ role: 'bot', text: 'Horas! Sesi baru dimulai. Ceritakan preferensimu!' }]);
        setRecs([]);
        setInput('');
    };

    const copyText = (text: string, idx: number) => {
        navigator.clipboard?.writeText(text);
        setCopiedIdx(idx);
        setTimeout(() => setCopiedIdx(null), 1500);
    };

    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        setShowScrollBtn(false);
    };

    return (
        <div className="relative min-h-screen bg-[#0a0a0a] pt-20 pb-8 overflow-hidden">

            {/* ── Ambient glow — sentuhan premium di background ── */}
            <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[640px] h-[640px] rounded-full bg-[#1D9E75]/10 blur-[140px]" />

            <div className="relative max-w-4xl mx-auto px-4 flex flex-col" style={{ height: 'calc(100vh - 80px)' }}>

                {/* ── Panel utama: bungkus chat dalam card, bukan menempel ke background ── */}
                <div className="flex flex-col flex-1 min-h-0 rounded-3xl border border-white/8 bg-white/[0.015] shadow-2xl shadow-black/40 overflow-hidden">

                    {/* Header */}
                    <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/8 bg-white/[0.02] flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1D9E75] to-[#085041] flex items-center justify-center shadow-lg shadow-emerald-900/30 shrink-0">
                                <Sparkles size={18} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-white font-semibold text-[15px] leading-tight">CulTour AI Guide</h1>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    <p className="text-[#5DCAA5] text-[11px] font-medium">Online · RAG + multilingual-e5-small</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={reset}
                            className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors px-3 py-1.5 rounded-lg hover:bg-white/8"
                        >
                            <RotateCcw size={13} /> Reset sesi
                        </button>
                    </div>

                    {/* ── EMPTY STATE: welcome terpusat, gaya ChatGPT/Claude ── */}
                    {isEmpty ? (
                        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center overflow-y-auto">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1D9E75] to-[#085041] flex items-center justify-center shadow-xl shadow-emerald-900/30 mb-5">
                                <Sparkles size={28} className="text-white" />
                            </div>
                            <h2 className="text-white text-xl font-semibold mb-2">Mau jelajahi apa hari ini?</h2>
                            <p className="text-white/40 text-sm max-w-md mb-7 leading-relaxed">
                                Tanyakan destinasi, itinerary, kuliner, atau budaya Batak Toba — saya bantu rekomendasikan yang paling cocok.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-xl">
                                {QUICK_PROMPTS.map(({ text, icon: Icon }) => (
                                    <button
                                        key={text}
                                        onClick={() => send(text)}
                                        className="flex items-center gap-2.5 text-left text-[13px] px-4 py-3 rounded-xl
                                            border border-white/8 bg-white/[0.02] text-white/70
                                            hover:bg-[#1D9E75]/10 hover:border-[#1D9E75]/40 hover:text-white
                                            transition-all"
                                    >
                                        <Icon size={15} className="text-[#5DCAA5] flex-shrink-0" />
                                        {text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="relative flex-1 min-h-0 flex flex-col">

                            {/* Chat area */}
                            <div ref={scrollAreaRef} className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 space-y-4 min-h-0">
                                {messages.map((m, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className={`flex group ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        {m.role === 'bot' && (
                                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#1D9E75] to-[#085041] flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                                                <Sparkles size={13} className="text-white" />
                                            </div>
                                        )}
                                        <div className="flex flex-col max-w-[78%]">
                                            <div
                                                className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line
                                                    ${m.role === 'user'
                                                        ? 'bg-[#1D9E75]/80 text-white rounded-br-sm'
                                                        : m.error
                                                            ? 'bg-red-500/10 text-red-300 border border-red-500/20 rounded-bl-sm'
                                                            : 'bg-white/6 text-white/85 border border-white/8 rounded-bl-sm'}`}
                                            >
                                                {m.text}
                                            </div>
                                            <div className={`flex items-center gap-2 mt-1 px-1 opacity-0 group-hover:opacity-100 transition-opacity
                                                ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                {m.time && <span className="text-[10px] text-white/25">{m.time}</span>}
                                                {m.role === 'bot' && (
                                                    <button
                                                        onClick={() => copyText(m.text, i)}
                                                        className="text-white/25 hover:text-white/60 transition-colors"
                                                        aria-label="Salin pesan"
                                                    >
                                                        {copiedIdx === i ? <Check size={11} /> : <Copy size={11} />}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}

                                {/* Loading */}
                                {loading && (
                                    <div className="flex justify-start items-center">
                                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#1D9E75] to-[#085041] flex items-center justify-center flex-shrink-0 mr-2">
                                            <Sparkles size={13} className="text-white" />
                                        </div>
                                        <div className="bg-white/6 border border-white/8 px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-2">
                                            <div className="flex items-center gap-1.5">
                                                {[0, 1, 2].map(i => (
                                                    <motion.div
                                                        key={i}
                                                        className="w-1.5 h-1.5 bg-[#5DCAA5] rounded-full"
                                                        animate={{ y: [0, -5, 0] }}
                                                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-[11px] text-white/30">AI sedang mengetik...</span>
                                        </div>
                                    </div>
                                )}

                                {/* Rekomendasi destinasi */}
                                <AnimatePresence>
                                    {recs.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="space-y-2"
                                        >
                                            <p className="text-xs text-white/40 flex items-center gap-1.5 ml-9">
                                                <Map size={12} /> Rekomendasi destinasi
                                            </p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ml-9">
                                                {recs.map(d => (
                                                    <DestinationCard key={d.id} destination={d} compact />
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div ref={bottomRef} />
                            </div>

                            {/* Tombol scroll-ke-bawah saat user membaca chat lama */}
                            <AnimatePresence>
                                {showScrollBtn && (
                                    <motion.button
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 8 }}
                                        onClick={scrollToBottom}
                                        className="absolute bottom-4 right-6 w-9 h-9 rounded-full bg-[#1D9E75] hover:bg-[#0F6E56]
                                            flex items-center justify-center shadow-lg shadow-emerald-900/40 transition-colors z-10"
                                        aria-label="Scroll ke pesan terbaru"
                                    >
                                        <ArrowDown size={15} className="text-white" />
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </div>
                    )}

                    {/* Input */}
                    <div className="flex-shrink-0 px-5 sm:px-6 py-4 border-t border-white/8 bg-white/[0.02]">
                        <div className="flex gap-3 items-end">
                            <textarea
                                ref={inputRef}
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        send(input);
                                    }
                                }}
                                placeholder="Tanya tentang wisata, budaya, kuliner, atau itinerary Danau Toba..."
                                rows={1}
                                className="flex-1 resize-none bg-white/6 border border-white/10 rounded-xl px-4 py-3 text-sm text-white
                                    placeholder-white/25 outline-none focus:border-[#1D9E75]/50 transition-colors leading-relaxed
                                    max-h-[120px] overflow-y-auto"
                            />
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => send(input)}
                                disabled={!input.trim() || loading}
                                aria-label="Kirim pesan"
                                className="w-12 h-12 rounded-xl bg-[#1D9E75] hover:bg-[#0F6E56] disabled:opacity-30 flex items-center justify-center transition-colors flex-shrink-0"
                            >
                                {loading
                                    ? <Loader2 size={17} className="text-white animate-spin" />
                                    : <Send size={17} className="text-white" />}
                            </motion.button>
                        </div>
                        <p className="text-[11px] text-white/20 mt-2 text-center">
                            Tekan <kbd className="px-1.5 py-0.5 rounded bg-white/8 text-white/40">Enter</kbd> untuk kirim ·{' '}
                            <kbd className="px-1.5 py-0.5 rounded bg-white/8 text-white/40">Shift+Enter</kbd> untuk baris baru
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}