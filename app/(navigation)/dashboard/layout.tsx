import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Dashboard | Backoffice',
    description: 'Dashboard Backoffice',
}

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <>{children}</>
  }