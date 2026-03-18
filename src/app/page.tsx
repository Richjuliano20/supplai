import Link from "next/link"
import { HeroSection } from "@/components/landing/hero-section"
import { ModulesSection } from "@/components/landing/modules-section"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1f37] to-[#2563eb] text-white">
      {/* Hero */}
      <HeroSection />

      {/* Modules */}
      <div className="flex justify-center">
        <ModulesSection />
      </div>

      {/* CTA */}
      <section className="flex flex-col items-center gap-6 py-16 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Siap Memantau Stabilitas Harga Pangan?
        </h2>
        <p className="text-white/60 max-w-md">
          Masuk ke dashboard untuk melihat prediksi harga real-time, peta distribusi, dan laporan TPID otomatis.
        </p>
        <Link
          href="/dashboard"
          className="inline-block bg-white text-[#1a1f37] font-bold px-8 py-4 rounded-xl text-lg hover:scale-105 transition-transform shadow-lg"
        >
          Masuk ke Dashboard →
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-white/40 text-sm">
        SupplAi — Tim PIDI 2026
      </footer>
    </div>
  )
}
