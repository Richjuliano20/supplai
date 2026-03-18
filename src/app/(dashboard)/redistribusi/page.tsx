"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useApi } from "@/hooks/use-api"
import type { RedistributionResponse } from "@/lib/types"
import { FilterBar } from "@/components/layout/filter-bar"
import { IndonesiaMap } from "@/components/redistribusi/indonesia-map"
import { RouteTable } from "@/components/redistribusi/route-table"
import { SurplusPanel, MethodPanel } from "@/components/redistribusi/info-panels"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatRupiah, formatNumber } from "@/lib/format"
import { MapPin, Route, TrendingUp, Wallet } from "lucide-react"

export default function RedistribusiPage() {
  const [commodity, setCommodity] = useState("beras")

  const { data, loading } = useApi<RedistributionResponse>(
    `/api/redistribution?commodity=${commodity}`
  )

  const summary = data?.summary
  const provinces = data?.provinces ?? []
  const routes = data?.routes ?? []
  const surplusProvinces = provinces.filter((p) => p.status === "surplus")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="p-4 md:p-6 space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1e293b]">
          SupplAi Match — Rekomendasi Redistribusi
        </h1>
        <p className="text-[#64748b] mt-0.5">
          Optimasi distribusi pangan dari wilayah surplus ke defisit
        </p>
      </div>

      {/* Filter — commodity only */}
      <FilterBar
        commodity={commodity}
        range={14}
        onCommodityChange={setCommodity}
        onRangeChange={() => {}}
        showRegion={false}
      />

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Routes */}
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Rute</p>
                {loading ? (
                  <Skeleton className="h-7 w-12 mt-1" />
                ) : (
                  <p className="text-2xl font-bold text-[#1e293b]">
                    {summary?.totalRoutes ?? 0}
                  </p>
                )}
              </div>
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                <Route className="w-4 h-4 text-[#2563eb]" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Volume */}
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Volume</p>
                {loading ? (
                  <Skeleton className="h-7 w-20 mt-1" />
                ) : (
                  <p className="text-2xl font-bold text-[#1e293b]">
                    {formatNumber(summary?.totalVolume ?? 0)}
                    <span className="text-sm font-normal text-muted-foreground ml-1">
                      ton
                    </span>
                  </p>
                )}
              </div>
              <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Routes */}
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Prioritas Aktif</p>
                {loading ? (
                  <Skeleton className="h-7 w-28 mt-1" />
                ) : (
                  <p className="text-base font-semibold text-[#1e293b] mt-1 leading-tight">
                    {summary?.activeRoutes ?? "-"}
                  </p>
                )}
              </div>
              <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Estimated Cost */}
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Estimasi Biaya</p>
                {loading ? (
                  <Skeleton className="h-7 w-28 mt-1" />
                ) : (
                  <p className="text-lg font-bold text-[#1e293b] mt-0.5">
                    {formatRupiah(summary?.estimatedCost ?? 0)}
                  </p>
                )}
              </div>
              <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
                <Wallet className="w-4 h-4 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Map area with side panels */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left panel — surplus regions */}
        <div className="hidden lg:block">
          <SurplusPanel provinces={surplusProvinces} />
        </div>

        {/* Map */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-base font-semibold text-[#1e293b]">
                Peta Redistribusi
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Provinsi surplus (hijau) dan defisit (merah) beserta jalur pengiriman
              </p>
            </CardHeader>
            <CardContent className="pt-4">
              <IndonesiaMap
                provinces={provinces}
                routes={routes}
                loading={loading}
              />
            </CardContent>
          </Card>
        </div>

        {/* Right panel — method info */}
        <div className="hidden lg:block">
          <MethodPanel />
        </div>
      </div>

      {/* Mobile surplus panel */}
      <div className="block lg:hidden">
        <SurplusPanel provinces={surplusProvinces} />
      </div>

      {/* Route table */}
      <Card>
        <CardHeader className="border-b pb-3">
          <CardTitle className="text-base font-semibold text-[#1e293b]">
            Detail Rute Redistribusi
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">
            Klik header kolom untuk mengurutkan. Biaya dihitung berdasarkan Rp3.000/ton/km.
          </p>
        </CardHeader>
        <CardContent className="pt-4">
          <RouteTable routes={routes} loading={loading} />
        </CardContent>
      </Card>
    </motion.div>
  )
}
