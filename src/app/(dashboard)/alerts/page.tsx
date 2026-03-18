"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useApi } from "@/hooks/use-api"
import { AlertResponse } from "@/lib/types"
import { AlertFilters } from "@/components/alerts/alert-filters"
import { AlertList } from "@/components/alerts/alert-list"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { Bell, Clock, CheckCircle, AlertTriangle } from "lucide-react"

export default function AlertsPage() {
  const [severity, setSeverity] = useState<string | null>(null)
  const [status, setStatus] = useState<string | null>(null)
  const [commodity, setCommodity] = useState<string | null>(null)

  const params = new URLSearchParams()
  if (severity) params.set("severity", severity)
  if (status) params.set("status", status)
  if (commodity) params.set("commodity", commodity)
  const query = params.toString()

  const { data, loading } = useApi<AlertResponse>(`/api/alerts${query ? `?${query}` : ""}`)

  useEffect(() => {
    const timer = setTimeout(() => {
      toast.warning("Peringatan Baru", {
        description: "Lonjakan harga Cabai Rawit terdeteksi di Kab. Jayapura (+32.5%)",
      })
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="p-4 md:p-6 space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1e293b]">Alert Center</h1>
        <p className="text-sm text-[#64748b] mt-1">
          Pusat pemantauan dan pengelolaan peringatan harga pangan
        </p>
      </div>

      {/* Summary cards */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="py-4">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-8 w-12" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Bell className="size-4" />
                <span className="text-xs font-medium">Alert Aktif</span>
              </div>
              <p className="text-2xl font-bold text-red-500">{data?.summary.active ?? 0}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="py-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <AlertTriangle className="size-4" />
                <span className="text-xs font-medium">Alert Bulan Ini</span>
              </div>
              <p className="text-2xl font-bold text-[#1e293b]">
                {data?.summary.thisMonth ?? 0}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="py-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Clock className="size-4" />
                <span className="text-xs font-medium">Rata-rata Respons</span>
              </div>
              <p className="text-2xl font-bold text-[#1e293b]">
                {data?.summary.avgResponseTime ?? 0}
                <span className="text-sm font-normal text-muted-foreground ml-1">hari</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="py-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <CheckCircle className="size-4" />
                <span className="text-xs font-medium">Terselesaikan</span>
              </div>
              <p className="text-2xl font-bold text-green-500">{data?.summary.resolved ?? 0}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-[#1e293b]">Filter Peringatan</h2>
        <AlertFilters
          severity={severity}
          status={status}
          commodity={commodity}
          onSeverityChange={setSeverity}
          onStatusChange={setStatus}
          onCommodityChange={setCommodity}
        />
      </div>

      {/* Alert list */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="py-4">
                <div className="flex items-center gap-2 mb-2">
                  <Skeleton className="h-5 w-14" />
                  <Skeleton className="h-4 flex-1" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <div className="flex gap-4">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <AlertList
          alerts={data?.alerts ?? []}
        />
      )}
    </motion.div>
  )
}
