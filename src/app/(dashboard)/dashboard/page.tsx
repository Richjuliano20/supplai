"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useApi } from "@/hooks/use-api"
import type { PredictionResponse } from "@/lib/types"
import { FilterBar } from "@/components/layout/filter-bar"
import { SummaryCards } from "@/components/dashboard/summary-cards"
import { PriceLineChart } from "@/components/dashboard/price-line-chart"
import { RegionBarChart } from "@/components/dashboard/region-bar-chart"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function DashboardPage() {
  const [commodity, setCommodity] = useState("beras")
  const [region, setRegion] = useState("jakarta")
  const [range, setRange] = useState(14)

  const apiUrl = `/api/predictions?commodity=${commodity}&region=${region}&range=${range}`
  const { data, loading } = useApi<PredictionResponse>(apiUrl)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="p-4 md:p-6 space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1e293b]">Dashboard Prediksi Harga</h1>
        <p className="text-[#64748b] mt-0.5">
          Pantau dan prediksi harga pangan di seluruh wilayah Indonesia
        </p>
      </div>

      {/* Filter Bar */}
      <FilterBar
        commodity={commodity}
        region={region}
        range={range}
        onCommodityChange={setCommodity}
        onRegionChange={setRegion}
        onRangeChange={setRange}
        showRegion
        showExport
      />

      {/* Summary Cards */}
      <SummaryCards summary={data?.summary ?? null} loading={loading} />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Price Line Chart */}
        <div className="lg:col-span-2">
          <Card className="bg-white shadow-sm">
            <CardHeader className="border-b pb-3">
              <CardTitle className="text-base font-semibold text-[#1e293b]">
                Tren Harga &amp; Prediksi
              </CardTitle>
              <p className="text-xs text-[#64748b] mt-0.5">
                Harga aktual vs. prediksi model ML dengan interval kepercayaan
              </p>
            </CardHeader>
            <CardContent className="pt-4">
              <PriceLineChart data={data?.timeseries ?? []} loading={loading} />
            </CardContent>
          </Card>
        </div>

        {/* Region Bar Chart */}
        <div>
          <Card className="bg-white shadow-sm">
            <CardHeader className="border-b pb-3">
              <CardTitle className="text-base font-semibold text-[#1e293b]">
                Perbandingan Antarwilayah
              </CardTitle>
              <p className="text-xs text-[#64748b] mt-0.5">
                Harga saat ini per wilayah — merah di atas rata-rata
              </p>
            </CardHeader>
            <CardContent className="pt-4">
              <RegionBarChart data={data?.comparison ?? []} loading={loading} />
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}
