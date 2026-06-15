// ── Destinasi ─────────────────────────────────────────────────────────────
export interface Destination {
    id?: number;
    name: string;
    category: string;
    location: string;
    description: string;
    rating: number;
    price_range?: string;
    latitude?: number;
    longitude?: number;
    image_url?: string;
    duration_hours?: number;
}

// ── Search — sesuai return FastAPI GET /search ────────────────────────────
// Backend mengembalikan array langsung, bukan {results: [...]}
export interface SearchResult {
    destination: Destination;
    score: number;           // cosine similarity 0–1
}

// ── Chat ──────────────────────────────────────────────────────────────────
export interface ChatMessage {
    role: 'user' | 'bot';
    content: string;
    results?: SearchResult[]; // rekomendasi dari AI (opsional)
}

export interface ChatRequest {
    message: string;
}

export interface ChatResponse {
    reply: string;
    results?: SearchResult[];
}

// ── Trip Planner ──────────────────────────────────────────────────────────
export interface PlannerPreference {
    start_location: string;
    duration_days: number;
    budget: 'hemat' | 'sedang' | 'bebas';
    category: string;
    group_size: number;
}

export interface ItineraryItem {
    time: string;
    destination: Destination;
    duration_minutes: number;
    estimated_cost: number;
    notes?: string;
}

export interface ItineraryDay {
    day: number;
    title: string;
    items: ItineraryItem[];
    total_cost: number;
}

export interface TripPlan {
    days: ItineraryDay[];
    total_cost: number;
    ai_match_score: number;
    summary: string;
}

// ── Culturepedia ──────────────────────────────────────────────────────────
export interface CultureEntry {
    id: number;
    title: string;
    category: 'tradisi' | 'kuliner' | 'kesenian' | 'bahasa' | 'sejarah';
    description: string;
    image_url?: string;
    related_destinations?: string[];
}