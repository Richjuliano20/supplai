"use client"
import { commodities } from "@/data/commodities"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface AlertFiltersProps {
  severity: string | null
  status: string | null
  commodity: string | null
  onSeverityChange: (value: string | null) => void
  onStatusChange: (value: string | null) => void
  onCommodityChange: (value: string | null) => void
}

const severityOptions = [
  { value: null, label: "Semua", activeClass: "bg-gray-700 text-white", inactiveClass: "border border-gray-300 text-gray-700 hover:bg-gray-50" },
  { value: "kritis", label: "Kritis", activeClass: "bg-red-500 text-white", inactiveClass: "border border-red-300 text-red-600 hover:bg-red-50" },
  { value: "tinggi", label: "Tinggi", activeClass: "bg-orange-500 text-white", inactiveClass: "border border-orange-300 text-orange-600 hover:bg-orange-50" },
  { value: "sedang", label: "Sedang", activeClass: "bg-yellow-500 text-black", inactiveClass: "border border-yellow-300 text-yellow-600 hover:bg-yellow-50" },
  { value: "rendah", label: "Rendah", activeClass: "bg-blue-500 text-white", inactiveClass: "border border-blue-300 text-blue-600 hover:bg-blue-50" },
]

export function AlertFilters({
  severity,
  status,
  commodity,
  onSeverityChange,
  onStatusChange,
  onCommodityChange,
}: AlertFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Severity toggle buttons */}
      <div className="flex flex-wrap gap-1.5">
        {severityOptions.map((opt) => {
          const isActive = severity === opt.value
          return (
            <button
              key={opt.label}
              onClick={() => onSeverityChange(opt.value)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                isActive ? opt.activeClass : opt.inactiveClass
              }`}
            >
              {opt.label}
            </button>
          )
        })}
      </div>

      {/* Commodity select */}
      <Select
        value={commodity ?? "all"}
        onValueChange={(val) => onCommodityChange(val === "all" ? null : val)}
      >
        <SelectTrigger className="h-8 text-xs min-w-[160px]">
          <SelectValue placeholder="Semua Komoditas" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua Komoditas</SelectItem>
          {commodities.map((c) => (
            <SelectItem key={c.id} value={c.id}>
              {c.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Status select */}
      <Select
        value={status ?? "all"}
        onValueChange={(val) => onStatusChange(val === "all" ? null : val)}
      >
        <SelectTrigger className="h-8 text-xs min-w-[140px]">
          <SelectValue placeholder="Semua Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua Status</SelectItem>
          <SelectItem value="aktif">Aktif</SelectItem>
          <SelectItem value="ditangani">Ditangani</SelectItem>
          <SelectItem value="selesai">Selesai</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
