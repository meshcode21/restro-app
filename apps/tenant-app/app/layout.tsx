import { Geist, Geist_Mono, Inter } from "next/font/google"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@workspace/ui/lib/utils";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

import { TooltipProvider } from "@workspace/ui/components/tooltip"
import { QueryProvider } from "@/components/providers"
import { Toaster } from "@workspace/ui/components/sonner"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies();
  const tenantSession = cookieStore.get("tenant_session")?.value;

  if (!tenantSession) {
    // If not logged in at all, go to login
    redirect("/login");
  }

  try {
    // Decode JWT payload (base64url)
    const payloadBase64 = tenantSession.split('.')[1];
    if (!payloadBase64) throw new Error("Invalid token format");
    const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString('utf-8'));

    const role = payload.role;

    if (role === 'waiter') {
      redirect("/waiter");
    } else if (role === 'kitchen') {
      redirect("/kds");
    } else {
      // manager, admin, owner, cashier -> dashboard for now
      redirect("/dashboard");
    }
  } catch (e) {
    // If invalid token, just redirect to login
    redirect("/login");
  }

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <body>
        <QueryProvider>
          <ThemeProvider>
            <TooltipProvider>{children}</TooltipProvider>
            <ThemeToggle />
            <Toaster />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
