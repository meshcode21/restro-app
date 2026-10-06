import { ThemeToggle } from "@/components/theme-toggle"

export default function CustomerRouteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background relative">
      {children}
      <div className="fixed bottom-24 right-4 z-50">
        <ThemeToggle />
      </div>
    </div>
  )
}
