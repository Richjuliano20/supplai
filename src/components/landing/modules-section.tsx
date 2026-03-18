"use client"
import { motion } from "framer-motion"
import { TrendingUp, GitBranch, Bot } from "lucide-react"

const modules = [
  {
    icon: TrendingUp,
    name: "SupplAi Predict",
    description:
      "Prediksi harga pangan 14 hari ke depan menggunakan model Prophet + LSTM dengan akurasi tinggi",
  },
  {
    icon: GitBranch,
    name: "SupplAi Match",
    description:
      "Rekomendasi redistribusi pangan dari wilayah surplus ke defisit menggunakan optimasi matematis",
  },
  {
    icon: Bot,
    name: "SupplAi Agent",
    description:
      "Otomasi pengumpulan data, deteksi anomali harga, dan percepatan pelaporan TPID",
  },
]

export function ModulesSection() {
  return (
    <section className="px-4 py-16 max-w-5xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Tiga Modul Utama
        </h2>
        <p className="text-white/60 text-base md:text-lg">
          Solusi end-to-end untuk stabilisasi harga pangan Indonesia
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {modules.map((mod, index) => {
          const Icon = mod.icon
          return (
            <motion.div
              key={mod.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur rounded-xl p-6 hover:bg-white/20 transition-colors cursor-default group"
            >
              <div className="mb-4">
                <Icon size={40} className="text-[#60a5fa] group-hover:text-[#93c5fd] transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{mod.name}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{mod.description}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
