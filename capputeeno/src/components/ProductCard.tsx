import { formatPrice } from '@/utils/format-price'
import Image from 'next/image'
import Link from 'next/link'

type ProductCardProps = {
  id: string
  name: string
  price: number
  imgUrl: string
}

export function ProductCard({ id, name, price, imgUrl }: ProductCardProps) {
  const formattedPrice = formatPrice(price)

  return (
    <Link
      href={`/product/${id}`}
      className="max-w-[256px] cursor-pointer overflow-hidden rounded-md bg-white shadow outline-app-light-orange transition hover:scale-105"
    >
      <Image
        src={imgUrl}
        alt={name}
        width={256}
        height={300}
        className="h-[300px] object-cover"
      />

      <div className="px-3 py-2">
        <p className="mb-2 border-b border-app-background-200 pb-2 font-light text-app-text-400 ">
          {name}
        </p>
        <span className="text-sm font-semibold">{formattedPrice}</span>
      </div>
    </Link>
  )
}
