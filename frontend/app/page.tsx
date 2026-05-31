"use client";
import { useState, useEffect } from 'react';

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<any>(null);

  // Cek status AI saat halaman dibuka
  useEffect(() => {
    fetch('http://localhost:8000/api/v1/search/status')
      .then(res => res.json())
      .then(data => setStatus(data));
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/api/v1/search?q=${query}&limit=6`);
      const data = await res.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Hero Section */}
      <div className="bg-green-800 py-16 px-4 text-white shadow-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight">CulTour AI</h1>
          <p className="text-xl text-green-100 mb-8">Pencarian Wisata Budaya Danau Toba berbasis Kecerdasan Buatan</p>

          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <input
              type="text"
              className="w-full p-5 rounded-2xl text-slate-900 shadow-2xl outline-none focus:ring-4 focus:ring-green-400 transition-all pr-32"
              placeholder="Coba: 'rekomendasi wisata sejarah di Samosir'..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-2 bottom-2 bg-green-600 hover:bg-green-700 text-white px-8 rounded-xl font-bold transition-colors disabled:bg-slate-400"
            >
              {loading ? "..." : "Cari"}
            </button>
          </form>

          {status && (
            <div className="mt-4 text-sm text-green-200">
              ⚡ AI Aktif: {status.destinations_count} destinasi terindeks
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((item: any, idx: number) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex justify-between items-center mb-3">
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${item.destination.category === 'Wisata' ? 'bg-blue-100 text-blue-700' :
                  item.destination.category === 'Kuliner' ? 'bg-orange-100 text-orange-700' :
                    item.destination.category === 'Budaya' ? 'bg-purple-100 text-purple-700' :
                      'bg-red-100 text-red-700'
                }`}>
                {item.destination.category}
              </span>
              <span className="text-xs font-mono text-green-600 font-bold">
                {(item.similarity_score * 100).toFixed(1)}% Match
              </span>
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-2">{item.destination.name}</h3>
            <p className="text-gray-600 text-sm line-clamp-3 mb-4">{item.destination.description}</p>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50 text-xs text-gray-500">
              <span>📍 {item.destination.location}</span>
              <span className="flex items-center">⭐ {item.destination.rating}</span>
            </div>
          </div>
        ))}
      </div>
           <p className="text-center text-slate-500">Tidak menemukan hasil yang cocok.</p>
      </div>
  );
}