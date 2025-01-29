import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Kategori | Backoffice',
    description: 'Kategori Backoffice',
}

export default function CategoryLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <>{children}</>
  }