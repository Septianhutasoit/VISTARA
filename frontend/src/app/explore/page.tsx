"use client";
import { useState, useEffect } from 'react';
import { Compass, Search, Filter, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import DestinationCard from '@/components/DestinationCard';
import { destinationService } from '@/services/destination';
import { Destination } from '@/types';

export default function ExplorePage() {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await destinationService.getAll();
                setDestinations(data.destinations);
            } catch (err) {
                console.error("Gagal load destinasi");
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // Filter lokal sederhana untuk demo
    const filtered = destinations.filter(d =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.location.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-5xl font-black tracking-tighter mb-4">Jelajahi <br /><span className="text-emerald-500 font-serif italic">Danau Toba</span></h1>
                    <p className="text-gray-400 max-w-md">Temukan 48+ destinasi wisata, budaya, dan kuliner terverifikasi di seluruh kawasan Toba.</p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Cari Samosir, Balige, atau nama tempat..."
                        className="w-full bg-[#111111] border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-emerald-500 transition-all text-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap gap-2 mb-12">
                {['Semua', 'Wisata', 'Kuliner', 'Budaya', 'Event', 'Samosir', 'Balige'].map((cat) => (
                    <button key={cat} className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-black uppercase tracking-widest hover:border-emerald-500 hover:text-emerald-400 transition-all">
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid Destinasi */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[1, 2, 3, 4].map(i => <div key={i} className="aspect-[4/5] bg-white/5 rounded-[40px] animate-pulse" />)}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filtered.map((item) => (
                        <DestinationCard key={item.id} data={item} mode="full" />
                    ))}
                </div>
            )}

            {filtered.length === 0 && !loading && (
                <div className="text-center py-20 bg-[#111111] rounded-[48px] border border-dashed border-white/10">
                    <p className="text-gray-500 font-bold">Destinasi tidak ditemukan. Coba kata kunci lain.</p>
                </div>
            )}
        </div>
    );
}