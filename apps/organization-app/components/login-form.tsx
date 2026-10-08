"use client"

import * as React from "react"
import { cn } from "@workspace/ui/lib/utils"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@workspace/ui/components/card"

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    // Simulate login request
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/dashboard"
    }, 1500)
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Card className="shadow-lg border-muted/50 rounded-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold">Sign in</CardTitle>
          <CardDescription>
            Enter your email and password to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  className="rounded-xl"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-sm font-medium text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  disabled={isLoading}
                  className="rounded-xl"
                  required
                />
              </div>
              <Button disabled={isLoading} className="mt-2 w-full font-bold h-11 rounded-xl">
                {isLoading && (
                  <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-25" />
                    <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                )}
                Sign In
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-4 text-sm text-center text-muted-foreground border-t bg-muted/20 p-4 rounded-b-2xl">
          <div className="flex items-center gap-2">
            <span>Admin Code:</span>
            <span className="font-mono bg-muted px-2 py-1 rounded text-foreground font-semibold tracking-wider">DEV_SUPER_ADMIN</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
