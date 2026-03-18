"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Grid3X3, Map, Bell } from "lucide-react"

const navItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard Prediksi",
    href: "/dashboard",
  },
  {
    icon: Grid3X3,
    label: "Heatmap",
    href: "/heatmap",
  },
  {
    icon: Map,
    label: "Redistribusi",
    href: "/redistribusi",
  },
  {
    icon: Bell,
    label: "Alert Center",
    href: "/alerts",
    badge: 3,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-[#1a1f37] shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-white/10">
        <div className="w-8 h-8 rounded-lg bg-[#2563eb] flex items-center justify-center">
          <span className="text-white font-bold text-sm">S</span>
        </div>
        <span className="text-white font-bold text-xl tracking-tight">SupplAi</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                transition-all duration-150 relative group
                ${
                  isActive
                    ? "border-l-4 border-[#2563eb] bg-white/10 text-white pl-2"
                    : "text-white/60 hover:text-white hover:bg-white/5 border-l-4 border-transparent"
                }
              `}
            >
              <Icon
                size={18}
                className={isActive ? "text-[#2563eb]" : "text-white/50 group-hover:text-white/80"}
              />
              <span className="flex-1">{item.label}</span>
              {item.badge != null && (
                <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center leading-none">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-white/10">
        <p className="text-white/30 text-xs">© 2026 SupplAi</p>
      </div>
    </aside>
  )
}
