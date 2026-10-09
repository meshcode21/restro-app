import { ThemeToggle } from "@/components/theme-toggle"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-muted/30 flex flex-col justify-center items-center relative p-4">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  )
}
