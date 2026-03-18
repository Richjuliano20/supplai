"use client"
import { useState } from "react"
import { Alert as AlertType } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Clock, MapPin, ShoppingBasket } from "lucide-react"

function getRelativeTime(timestamp: string): string {
  const now = new Date()
  const then = new Date(timestamp)
  const diffMs = now.getTime() - then.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  if (diffMins < 60) return `${diffMins} menit lalu`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours} jam lalu`
  const diffDays = Math.floor(diffHours / 24)
  return `${diffDays} hari lalu`
}

const severityConfig = {
  kritis: {
    border: "border-l-4 border-red-500",
    badge: "bg-red-500 text-white",
    label: "Kritis",
  },
  tinggi: {
    border: "border-l-4 border-orange-500",
    badge: "bg-orange-500 text-white",
    label: "Tinggi",
  },
  sedang: {
    border: "border-l-4 border-yellow-500",
    badge: "bg-yellow-500 text-black",
    label: "Sedang",
  },
  rendah: {
    border: "border-l-4 border-blue-500",
    badge: "bg-blue-500 text-white",
    label: "Rendah",
  },
}

const statusConfig = {
  aktif: { badge: "bg-red-100 text-red-700", label: "Aktif" },
  ditangani: { badge: "bg-yellow-100 text-yellow-700", label: "Ditangani" },
  selesai: { badge: "bg-green-100 text-green-700", label: "Selesai" },
}

const statusCycle: Record<string, "aktif" | "ditangani" | "selesai"> = {
  aktif: "ditangani",
  ditangani: "selesai",
  selesai: "aktif",
}

const statusActionLabel: Record<string, string> = {
  aktif: "Tandai Ditangani",
  ditangani: "Tandai Selesai",
  selesai: "Aktifkan Kembali",
}

interface AlertCardProps {
  alert: AlertType
  onStatusChange?: (id: string, status: string) => void
}

export function AlertCard({ alert, onStatusChange }: AlertCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [localStatus, setLocalStatus] = useState<"aktif" | "ditangani" | "selesai">(alert.status)

  const severity = severityConfig[alert.severity]
  const status = statusConfig[localStatus]

  function handleStatusCycle() {
    const next = statusCycle[localStatus]
    setLocalStatus(next)
    onStatusChange?.(alert.id, next)
  }

  return (
    <Card className={`${severity.border} gap-0 py-0 transition-shadow hover:shadow-md`}>
      <CardContent className="px-4 py-3">
        {/* Row 1: Severity badge + Title + Status badge */}
        <div className="flex items-start gap-2 mb-2">
          <span
            className={`inline-flex shrink-0 items-center rounded px-2 py-0.5 text-xs font-semibold ${severity.badge}`}
          >
            {severity.label}
          </span>
          <span className="flex-1 text-sm font-medium leading-snug text-gray-900 dark:text-gray-100">
            {alert.title}
          </span>
          <span
            className={`inline-flex shrink-0 items-center rounded px-2 py-0.5 text-xs font-medium ${status.badge}`}
          >
            {status.label}
          </span>
        </div>

        {/* Row 2: Meta info */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mb-2">
          <span className="flex items-center gap-1">
            <MapPin className="size-3" />
            {alert.region}
          </span>
          <span className="flex items-center gap-1">
            <ShoppingBasket className="size-3" />
            {alert.commodity}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="size-3" />
            {getRelativeTime(alert.timestamp)}
          </span>
          <span className="flex items-center gap-1">
            <span className="text-gray-500">Kepercayaan:</span>
            <span className="font-medium text-gray-700 dark:text-gray-300">{alert.confidence}%</span>
            <span className="relative h-1.5 w-12 rounded-full bg-gray-200 overflow-hidden">
              <span
                className="absolute left-0 top-0 h-full rounded-full bg-blue-500"
                style={{ width: `${alert.confidence}%` }}
              />
            </span>
          </span>
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
        >
          {expanded ? (
            <>
              <ChevronUp className="size-3" /> Sembunyikan detail
            </>
          ) : (
            <>
              <ChevronDown className="size-3" /> Lihat detail
            </>
          )}
        </button>

        {/* Expanded detail */}
        {expanded && (
          <div className="mt-3 space-y-3 border-t pt-3">
            {/* Recommendation */}
            <div>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Rekomendasi:
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                {alert.detail.recommendation}
              </p>
            </div>

            {/* Status history */}
            <div>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Histori Status:
              </p>
              <div className="space-y-1.5">
                {alert.detail.history.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <span className="size-1.5 rounded-full bg-blue-400 shrink-0" />
                    <span className="font-medium text-gray-700 dark:text-gray-300">{h.status}</span>
                    <span className="text-muted-foreground">{getRelativeTime(h.timestamp)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action button */}
            <Button
              size="sm"
              variant="outline"
              onClick={handleStatusCycle}
              className="text-xs"
            >
              {statusActionLabel[localStatus]}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
