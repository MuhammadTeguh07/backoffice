import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Register | Backoffice',
    description: 'Register Backoffice',
}

export default function RegisterLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <>{children}</>
  }