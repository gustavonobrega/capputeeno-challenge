import { NavFilter } from '@/components/NavFilter'
import { Select } from '@/components/Select'
import { SelectItem } from '@/components/Select/SelectItem'

export default function Home() {
  return (
    <div className="m-auto mb-16 mt-9 max-w-desktop px-5">
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:justify-between sm:gap-0">
        <NavFilter />

        <Select placeholder="Organizar por">
          <SelectItem value="news" text="Novidades" />
          <SelectItem value="biggest_price" text="Preço: Maior - menor" />
          <SelectItem value="minor_price" text="Preço: Menor - maior" />
          <SelectItem value="topseller" text="Mais vendidos" />
        </Select>
      </div>

      <main className="mb-16 mt-9">Products</main>
    </div>
  )
}
