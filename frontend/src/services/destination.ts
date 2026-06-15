import { fetcher } from '@/lib/api';
import type { Destination, SearchResult, TripPlan, PlannerPreference, ChatRequest, ChatResponse, CultureEntry } from '@/types';

// ── Destinasi ─────────────────────────────────────────────────────────────
// GET /destinations → Destination[] langsung (sesuai FastAPI kita)
export const destinationService = {
    getAll: () =>
        fetcher<Destination[]>('/destinations'),

    getById: (id: string | number) =>
        fetcher<Destination>(`/destinations/${id}`),

    getStatus: () =>
        fetcher<{ message: string; model_loaded: boolean }>('/'),
};

// ── Semantic Search ───────────────────────────────────────────────────────
// GET /search?q=...&limit=... → SearchResult[] langsung (array, bukan {results:[...]})
export const searchService = {
    search: (q: string, limit = 5) =>
        fetcher<SearchResult[]>(`/search?q=${encodeURIComponent(q)}&limit=${limit}`),
};

// ── Chat AI ───────────────────────────────────────────────────────────────
// POST /chat → ChatResponse
export const chatService = {
    send: (data: ChatRequest) =>
        fetcher<ChatResponse>('/chat', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
};

// ── Trip Planner ──────────────────────────────────────────────────────────
export const plannerService = {
    generate: (pref: PlannerPreference) =>
        fetcher<TripPlan>('/planner/generate', {
            method: 'POST',
            body: JSON.stringify(pref),
        }),
};

// ── Culturepedia ──────────────────────────────────────────────────────────
export const cultureService = {
    getAll: () =>
        fetcher<CultureEntry[]>('/cultures'),

    search: (q: string) =>
        fetcher<CultureEntry[]>(`/cultures/search?q=${encodeURIComponent(q)}`),
};