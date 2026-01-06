import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Normalize CSE symbol to backend format
 * Removes .N0000 suffix if present
 *
 * @example
 * normalizeSymbol("AAF.N0000") // "AAF"
 * normalizeSymbol("AAF") // "AAF"
 */
export function normalizeSymbol(symbol: string): string {
  return symbol.replace(/\.N\d+$/, '')
}
