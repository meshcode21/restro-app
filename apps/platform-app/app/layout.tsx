import { Geist, Geist_Mono, Inter } from "next/font/google"

import "@workspace/ui/globals.css"
import { Providers } from "@/components/providers"
import { cn } from "@workspace/ui/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

import { TooltipProvider } from "@workspace/ui/components/tooltip"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <body>
        <Providers>
          <TooltipProvider>{children}</TooltipProvider>
        </Providers>
      </body>
    </html>
  )
}
