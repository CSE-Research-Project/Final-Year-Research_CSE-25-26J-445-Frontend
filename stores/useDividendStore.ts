import { create } from "zustand"
import type { DividendPredictionResult } from "@/lib/fakeApi"

interface DividendInputs {
  symbol: string
}

interface DividendStore {
  inputs: DividendInputs
  results: DividendPredictionResult | null
  loading: boolean
  error: string | null
  setInputs: (inputs: DividendInputs) => void
  setResults: (results: DividendPredictionResult | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useDividendStore = create<DividendStore>((set) => ({
  inputs: { symbol: "" },
  results: null,
  loading: false,
  error: null,
  setInputs: (inputs) => set({ inputs }),
  setResults: (results) => set({ results }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}))
