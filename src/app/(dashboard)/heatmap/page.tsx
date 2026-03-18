"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useApi } from "@/hooks/use-api"
import { HeatmapResponse } from "@/lib/types"
import { formatPercent } from "@/lib/format"
import { FilterBar } from "@/components/layout/filter-bar"
import { PriceMatrix } from "@/components/heatmap/price-matrix"
import { TopCritical } from "@/components/heatmap/top-critical"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function HeatmapPage() {
  const [commodity, setCommodity] = useState("beras")
  const [range, setRange] = useState(14)

  const { data, loading } = useApi<HeatmapResponse>(
    `/api/heatmap?commodity=${commodity}&range=${range}`
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="p-4 md:p-6 space-y-6"
    >
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1e293b]">
          Heatmap Prediksi Harga per Wilayah
        </h1>
        <p className="text-[#64748b]">
          Prediksi Perubahan Harga 7 hari ke depan di Seluruh Indonesia
        </p>
      </div>

      {/* Filters */}
      <FilterBar
        commodity={commodity}
        range={range}
        onCommodityChange={setCommodity}
        onRangeChange={setRange}
        showRegion={false}
      />

      {/* Summary cards — 3 cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white shadow-sm">
          <CardContent className="pt-6 pb-5">
            <p className="text-sm text-muted-foreground">
              Kabupaten/Kota Terpantau
            </p>
            {loading ? (
              <Skeleton className="h-8 w-16 mt-1" />
            ) : (
              <p className="text-2xl font-bold text-[#1e293b]">
                {data?.summary.totalRegions ?? "-"}
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardContent className="pt-6 pb-5">
            <p className="text-sm text-muted-foreground">Rata-rata Kenaikan</p>
            {loading ? (
              <Skeleton className="h-8 w-20 mt-1" />
            ) : (
              <p className="text-2xl font-bold text-red-500">
                {data ? formatPercent(data.summary.avgIncrease) : "-"}
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardContent className="pt-6 pb-5">
            <p className="text-sm text-muted-foreground">Wilayah Alert</p>
            {loading ? (
              <Skeleton className="h-8 w-12 mt-1" />
            ) : (
              <p className="text-2xl font-bold text-red-500">
                {data?.summary.alertCount ?? "-"}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Main content: price matrix + top critical panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Price matrix — takes 3/4 width on large screens */}
        <div className="lg:col-span-3">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Matriks Harga per Wilayah</CardTitle>
            </CardHeader>
            <CardContent>
              <PriceMatrix matrix={data?.matrix ?? []} loading={loading} />
            </CardContent>
          </Card>
        </div>

        {/* Top critical panel — takes 1/4 width on large screens */}
        <div>
          <TopCritical data={data?.topCritical ?? []} loading={loading} />
        </div>
      </div>
    </motion.div>
  )
}
