"use client"
import { motion } from "framer-motion"
import { StatsCounter } from "./stats-counter"

const stats = [
  { prefix: "Rp", value: 4.5, suffix: "T", label: "Potensi Penghematan" },
  { prefix: "", value: 514, suffix: "", label: "Kabupaten/Kota" },
  { prefix: "", value: 542, suffix: "", label: "TPID Terhubung" },
  { prefix: "", value: 5, suffix: "", label: "Komoditas Strategis" },
]

export function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-4 py-24 md:py-32 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col items-center gap-6 max-w-4xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/80 backdrop-blur-sm"
        >
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          Sistem Aktif — PIDI 2026
        </motion.div>

        {/* Logo / Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-bold text-5xl md:text-7xl tracking-tight"
        >
          <span className="text-white">Suppl</span>
          <span className="text-[#60a5fa]">Ai</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-xl md:text-2xl text-white/80 max-w-2xl leading-relaxed"
        >
          Sistem Peringatan Dini Inflasi Pangan Berbasis AI
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-base text-white/50 max-w-xl"
        >
          Prediksi harga, redistribusi surplus-defisit, dan otomasi laporan TPID — semuanya dalam satu platform.
        </motion.p>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full max-w-3xl border-t border-white/10 pt-10"
        >
          {stats.map((stat) => (
            <StatsCounter
              key={stat.label}
              prefix={stat.prefix}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              duration={2}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
