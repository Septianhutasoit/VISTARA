"use client";
import { useState, useEffect } from 'react';

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<any>(null);

  // Fungsi untuk mengambil status AI saat pertama kali dibuka
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/v1/search/status')
      .then(res => res.json())
      .then(data => setStatus(data))
      .catch(err => console.error("Gagal mengambil status:", err));
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/v1/search?q=${encodeURIComponent(query)}&limit=6`);
      const data = await res.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900">
      {/* HEADER SECTION */}
      <header className="bg-green-800 text-white py-16 px-4 shadow-xl">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-black mb-2 tracking-tight">CulTour AI</h1>
          <p className="text-lg text-green-100 mb-8 font-medium">Asisten Cerdas Wisata Budaya Danau Toba</p>

          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto group">
            <input
              type="text"
              className="w-full p-5 pl-7 rounded-2xl text-slate-900 shadow-2xl outline-none focus:ring-4 focus:ring-green-400 transition-all pr-32 text-lg"
              placeholder="Coba: 'rekomendasi kuliner pedas' atau 'sejarah batak'..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-2 bottom-2 bg-green-600 hover:bg-green-700 text-white px-8 rounded-xl font-bold transition-all disabled:bg-slate-400 active:scale-95"
            >
              {loading ? "..." : "Cari AI"}
            </button>
          </form>

          {status && (
            <div className="mt-6 flex justify-center gap-4 text-xs">
              <span className="bg-green-900/50 px-3 py-1 rounded-full border border-green-700/50">
                🟢 AI Ready: {status.index_size} Data Terindeks
              </span>
              <span className="bg-green-900/50 px-3 py-1 rounded-full border border-green-700/50 uppercase">
                Model: {status.model_name.split('/').pop()}
              </span>
            </div>
          )}
        </div>
      </header>

      {/* RESULTS SECTION */}
      <main className="max-w-6xl mx-auto py-12 px-6">
        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((item: any, idx: number) => (
              <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="p-7">
                  <div className="flex justify-between items-center mb-4">
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${item.destination.category === 'Wisata' ? 'bg-blue-100 text-blue-700' :
                        item.destination.category === 'Kuliner' ? 'bg-orange-100 text-orange-700' :
                          item.destination.category === 'Budaya' ? 'bg-purple-100 text-purple-700' :
                            'bg-red-100 text-red-700'
                      }`}>
                      {item.destination.category}
                    </span>
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-black text-green-600">
                        {(item.similarity_score * 100).toFixed(1)}% Match
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-700 transition-colors">
                    {item.destination.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-4">
                    {item.destination.description}
                  </p>

                  <div className="flex items-center justify-between pt-5 border-t border-gray-50 text-sm font-medium">
                    <div className="flex items-center text-gray-500">
                      <span className="mr-1">📍</span> {item.destination.location}
                    </div>
                    <div className="flex items-center text-amber-500">
                      <span className="mr-1">⭐</span> {item.destination.rating}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🌲</div>
              <h2 className="text-2xl font-bold text-gray-400">Siap menjelajahi Danau Toba?</h2>
              <p className="text-gray-400">Masukkan apa yang ingin Anda cari di kolom pencarian di atas.</p>
            </div>
          )
        )}
      </main>

      <footer className="py-10 text-center text-gray-400 text-xs border-t border-gray-100">
        &copy; 2026 CulTour AI - Proyek Kompetisi GEMASTIK
      </footer>
    </div>
  );
}