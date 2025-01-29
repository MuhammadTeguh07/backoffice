import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Produk | Backoffice',
    description: 'Produk Backoffice',
}

export default function ProductLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <>{children}</>
  }