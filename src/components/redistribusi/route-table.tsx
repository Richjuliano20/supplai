"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import type { RedistributionRoute } from "@/lib/types"
import { formatRupiah, formatNumber } from "@/lib/format"

type SortKey = keyof Pick<
  RedistributionRoute,
  "from" | "to" | "commodity" | "volume" | "distance" | "cost" | "priority"
>

const PRIORITY_ORDER: Record<RedistributionRoute["priority"], number> = {
  high: 0,
  medium: 1,
  low: 2,
}

const COMMODITY_LABELS: Record<string, string> = {
  beras: "Beras",
  "gula-pasir": "Gula Pasir",
  "bawang-merah": "Bawang Merah",
  "bawang-putih": "Bawang Putih",
  "cabai-rawit": "Cabai Rawit",
  jagung: "Jagung",
  kedelai: "Kedelai",
  "minyak-goreng": "Minyak Goreng",
}

interface RouteTableProps {
  routes: RedistributionRoute[]
  loading: boolean
}

export function RouteTable({ routes, loading }: RouteTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("priority")
  const [sortAsc, setSortAsc] = useState(true)

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortAsc((prev) => !prev)
    } else {
      setSortKey(key)
      setSortAsc(true)
    }
  }

  const sorted = [...routes].sort((a, b) => {
    let aVal: string | number
    let bVal: string | number

    if (sortKey === "priority") {
      aVal = PRIORITY_ORDER[a.priority]
      bVal = PRIORITY_ORDER[b.priority]
    } else if (
      sortKey === "volume" ||
      sortKey === "distance" ||
      sortKey === "cost"
    ) {
      aVal = a[sortKey]
      bVal = b[sortKey]
    } else {
      aVal = a[sortKey]
      bVal = b[sortKey]
    }

    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortAsc
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal)
    }
    return sortAsc
      ? (aVal as number) - (bVal as number)
      : (bVal as number) - (aVal as number)
  })

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col)
      return <span className="ml-1 opacity-30 text-[10px]">↕</span>
    return (
      <span className="ml-1 text-[10px] text-[#2563eb]">
        {sortAsc ? "↑" : "↓"}
      </span>
    )
  }

  function SortableHead({
    col,
    label,
  }: {
    col: SortKey
    label: string
  }) {
    return (
      <TableHead
        onClick={() => handleSort(col)}
        className="cursor-pointer select-none hover:text-[#2563eb] transition-colors"
      >
        {label}
        <SortIcon col={col} />
      </TableHead>
    )
  }

  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full rounded" />
        ))}
      </div>
    )
  }

  if (routes.length === 0) {
    return (
      <div className="py-10 text-center text-sm text-muted-foreground">
        Tidak ada rute untuk komoditas yang dipilih.
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <SortableHead col="from" label="Asal" />
          <SortableHead col="to" label="Tujuan" />
          <SortableHead col="commodity" label="Komoditas" />
          <SortableHead col="volume" label="Volume" />
          <SortableHead col="distance" label="Jarak" />
          <SortableHead col="cost" label="Est. Biaya" />
          <SortableHead col="priority" label="Prioritas" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {sorted.map((route, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">{route.from}</TableCell>
            <TableCell>{route.to}</TableCell>
            <TableCell>
              {COMMODITY_LABELS[route.commodity] ?? route.commodity}
            </TableCell>
            <TableCell>{formatNumber(route.volume)} ton</TableCell>
            <TableCell>{formatNumber(route.distance)} km</TableCell>
            <TableCell>{formatRupiah(route.cost)}</TableCell>
            <TableCell>
              {route.priority === "high" && (
                <Badge variant="destructive">Tinggi</Badge>
              )}
              {route.priority === "medium" && (
                <Badge
                  variant="outline"
                  className="text-orange-600 border-orange-300 bg-orange-50"
                >
                  Sedang
                </Badge>
              )}
              {route.priority === "low" && (
                <Badge variant="secondary">Rendah</Badge>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
