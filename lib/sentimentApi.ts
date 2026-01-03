// ================= TYPES =================

export interface HistoricalExample {
  topic: string
  date: string
  direction: "positive" | "negative"
  pct_change_2d: number
  faiss_rank: number
}

export interface AnalyzeResponse {
  impact: "impactful" | "not_impactful"
  direction: "positive" | "negative" | null

  identified_companies: {
    company_name: string
    ticker: string
    matched_entity: string
    confidence: number
  }[]

  historical_context?: {
    narrative?: string
    examples: HistoricalExample[] // 🔹 always array
  }
}

// ================= API CALL =================

export async function analyzeNews(text: string): Promise<AnalyzeResponse> {
  const res = await fetch("http://127.0.0.1:8001/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  })

  if (!res.ok) {
    throw new Error("Failed to analyze news")
  }

  const raw = await res.json()

  return {
    impact: raw.impact,
    direction: raw.direction,

    identified_companies: raw.identified_companies ?? [],

    historical_context: raw.historical_context
      ? {
          narrative: raw.historical_context.narrative,
          examples: (raw.historical_context.related_news ?? []).map(
            (n: any): HistoricalExample => ({
              topic: n.Topic,
              date: n.Date,
              direction:
                n.reaction_label === "positive" ? "positive" : "negative",
              pct_change_2d: n.pct_change_2d,
              faiss_rank: n.faiss_rank,
            })
          ),
        }
      : undefined,
  }
}
