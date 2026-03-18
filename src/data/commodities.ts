import type { Commodity } from "@/lib/types"

export const commodities: Commodity[] = [
  { id: "beras", name: "Beras Medium", unit: "kg" },
  { id: "cabai-rawit", name: "Cabai Rawit Merah", unit: "kg" },
  { id: "bawang-merah", name: "Bawang Merah", unit: "kg" },
  { id: "bawang-putih", name: "Bawang Putih Impor", unit: "kg" },
  { id: "gula-pasir", name: "Gula Pasir Lokal", unit: "kg" },
]

export function getCommodityById(id: string): Commodity | undefined {
  return commodities.find((c) => c.id === id)
}
