"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { cn } from "@workspace/ui/lib/utils"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import api from "@/lib/axios"
import type { LoginResponse } from '@workspace/types';
import { toast } from "sonner";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: Record<string, string>) => {
      const response = await api.post("/auth/tenant/login", data)
      return response.data
    },
    onSuccess: (response: { data: LoginResponse }) => {
      toast.success(response.data.message);
      router.push("/dashboard");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error?.message || "An error occurred during login.")
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate({ email, password })
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
          <form onSubmit={handleSubmit}>
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
                  disabled={isPending}
                  className="rounded-xl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  disabled={isPending}
                  className="rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && (
                <div className="p-3 bg-destructive/15 text-destructive rounded-xl text-sm">
                  {error}
                </div>
              )}
              <Button type="submit" disabled={isPending} className="mt-2 w-full font-bold h-11 rounded-xl">
                {isPending && (
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
      </Card>
    </div>
  )
}
