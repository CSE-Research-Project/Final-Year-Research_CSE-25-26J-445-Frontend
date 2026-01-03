"use client"

import { useState, useMemo, useRef } from "react"
import { CSE_COMPANIES, getPopularCompanies, type CseCompany } from "@/data/cse-companies"
import { Input } from "@/components/ui/input"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Search } from "lucide-react"

interface CompanySymbolSearchProps {
    value: string
    onChange: (value: string) => void
    onSelect: (symbol: string) => void
    onEnter?: () => void
    placeholder?: string
    disabled?: boolean
}

export function CompanySymbolSearch({
    value,
    onChange,
    onSelect,
    onEnter,
    placeholder = "Search by company name or symbol...",
    disabled = false
}: CompanySymbolSearchProps) {
    const [open, setOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    // Filter companies based on search query
    const filteredCompanies = useMemo(() => {
        if (!value.trim()) {
            return getPopularCompanies()
        }

        const lowerQuery = value.toLowerCase()
        return CSE_COMPANIES.filter(company =>
            company.name.toLowerCase().includes(lowerQuery) ||
            company.symbol.toLowerCase().includes(lowerQuery)
        ).slice(0, 10) // Limit to 10 results for performance
    }, [value])

    const handleSelect = (company: CseCompany) => {
        onChange(company.symbol)
        onSelect(company.symbol)
        setOpen(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && onEnter) {
            e.preventDefault()
            setOpen(false)
            onEnter()
        } else if (e.key === "Escape") {
            setOpen(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        onChange(newValue)
        if (!open) {
            setOpen(true)
        }
    }

    const handleFocus = () => {
        setOpen(true)
    }

    const handleBlur = (e: React.FocusEvent) => {
        // Check if the new focus target is within our container (dropdown)
        // If so, don't close the dropdown
        const relatedTarget = e.relatedTarget as Node | null
        if (containerRef.current && relatedTarget && containerRef.current.contains(relatedTarget)) {
            return
        }
        // Small delay to allow click events on dropdown items to fire first
        setTimeout(() => {
            setOpen(false)
        }, 150)
    }

    return (
        <div ref={containerRef} className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
            <Input
                placeholder={placeholder}
                value={value}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
                disabled={disabled}
                className="pl-10"
            />
            {open && (
                <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-md border bg-popover shadow-md">
                    <Command>
                        <CommandList>
                            {filteredCompanies.length === 0 && value && (
                                <CommandEmpty>No companies found.</CommandEmpty>
                            )}
                            {filteredCompanies.length > 0 && (
                                <CommandGroup heading={!value.trim() ? "Popular Companies" : "Search Results"}>
                                    {filteredCompanies.map((company) => (
                                        <CommandItem
                                            key={company.symbol}
                                            value={`${company.name} ${company.symbol}`}
                                            onMouseDown={(e) => {
                                                e.preventDefault() // Prevent blur from firing before select
                                            }}
                                            onSelect={() => handleSelect(company)}
                                            className="cursor-pointer"
                                        >
                                            <div className="flex flex-col gap-0.5">
                                                <span className="font-medium">{company.name}</span>
                                                <span className="text-xs text-muted-foreground font-mono">{company.symbol}</span>
                                            </div>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            )}
                        </CommandList>
                    </Command>
                </div>
            )}
        </div>
    )
}

