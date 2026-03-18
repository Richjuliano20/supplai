"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { RedistributionProvince } from "@/lib/types"
import { formatNumber } from "@/lib/format"

// ---------------------------------------------------------------------------
// SurplusPanel — list of surplus provinces
// ---------------------------------------------------------------------------

interface SurplusPanelProps {
  provinces: RedistributionProvince[]
}

export function SurplusPanel({ provinces }: SurplusPanelProps) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3 border-b">
        <CardTitle className="text-sm font-semibold text-[#1e293b]">
          Wilayah Surplus
        </CardTitle>
        <p className="text-xs text-muted-foreground mt-0.5">
          Provinsi dengan stok melebihi kebutuhan
        </p>
      </CardHeader>
      <CardContent className="pt-3">
        {provinces.length === 0 ? (
          <p className="text-xs text-muted-foreground py-4 text-center">
            Tidak ada data surplus.
          </p>
        ) : (
          <ul className="space-y-2">
            {provinces
              .slice()
              .sort((a, b) => b.stock - a.stock)
              .map((p) => (
                <li
                  key={p.id}
                  className="flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                    <span className="text-xs font-medium text-[#1e293b] truncate">
                      {p.name}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatNumber(p.stock)} t
                  </span>
                </li>
              ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

// ---------------------------------------------------------------------------
// MethodPanel — optimization method info
// ---------------------------------------------------------------------------

export function MethodPanel() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3 border-b">
        <CardTitle className="text-sm font-semibold text-[#1e293b]">
          Metode Optimasi
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-3 space-y-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="font-semibold text-[#2563eb]">
            Linear Programming
          </span>{" "}
          digunakan untuk mengoptimalkan alokasi redistribusi pangan dari
          wilayah surplus ke defisit dengan meminimalkan biaya logistik.
        </p>

        <div className="space-y-2">
          <div className="flex items-center justify-between rounded-lg bg-green-50 px-3 py-2">
            <span className="text-xs text-green-700 font-medium">
              Provinsi Surplus
            </span>
            <span className="text-sm font-bold text-green-700">8</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-red-50 px-3 py-2">
            <span className="text-xs text-red-700 font-medium">
              Kabupaten Defisit
            </span>
            <span className="text-sm font-bold text-red-700">10+</span>
          </div>
        </div>

        <div className="text-xs text-muted-foreground leading-relaxed">
          <p className="font-medium text-[#1e293b] mb-1">Fungsi Tujuan:</p>
          <p className="font-mono bg-slate-50 rounded px-2 py-1 text-[11px]">
            min Σ (biaya × volume × jarak)
          </p>
        </div>

        <div className="text-xs text-muted-foreground space-y-1">
          <p className="font-medium text-[#1e293b]">Kendala:</p>
          <ul className="list-disc list-inside space-y-0.5">
            <li>Kapasitas pengiriman maks</li>
            <li>Kebutuhan minimum tiap wilayah</li>
            <li>Ketersediaan stok surplus</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
