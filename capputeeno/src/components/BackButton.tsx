import { ArrowLeftCircle } from 'lucide-react'
import Link, { LinkProps } from 'next/link'

type BackButtonProps = LinkProps & {
  href: string
}

export function BackButton({ href, ...props }: BackButtonProps) {
  return (
    <Link
      href={href}
      {...props}
      className="flex w-fit items-center gap-2 text-sm text-app-back-bt outline-app-light-orange transition hover:opacity-80"
    >
      <ArrowLeftCircle size={22} />
      Voltar
    </Link>
  )
}
