"use client"
import { Alert as AlertType } from "@/lib/types"
import { AlertCard } from "./alert-card"
import { Bell } from "lucide-react"

const severityOrder: Record<string, number> = {
  kritis: 0,
  tinggi: 1,
  sedang: 2,
  rendah: 3,
}

interface AlertListProps {
  alerts: AlertType[]
  onStatusChange?: (id: string, status: string) => void
}

export function AlertList({ alerts, onStatusChange }: AlertListProps) {
  if (alerts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
        <Bell className="size-10 mb-3 opacity-30" />
        <p className="text-sm font-medium">Tidak ada peringatan yang cocok dengan filter</p>
        <p className="text-xs mt-1 opacity-70">Coba ubah filter untuk melihat lebih banyak peringatan</p>
      </div>
    )
  }

  const sorted = [...alerts].sort((a, b) => {
    const severityDiff = (severityOrder[a.severity] ?? 99) - (severityOrder[b.severity] ?? 99)
    if (severityDiff !== 0) return severityDiff
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  })

  return (
    <div className="space-y-3">
      {sorted.map((alert) => (
        <AlertCard key={alert.id} alert={alert} onStatusChange={onStatusChange} />
      ))}
    </div>
  )
}
