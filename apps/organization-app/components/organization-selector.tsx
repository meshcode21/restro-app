"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useQuery, useMutation } from "@tanstack/react-query"
import { cn } from "@workspace/ui/lib/utils"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent } from "@workspace/ui/components/card"
import api from "@/lib/axios"
import { Building2, ChevronRight } from "lucide-react"

type Organization = {
  organizationId: string
  name: string
  slug: string
  role: string
}

export function OrganizationSelector({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)

  const { data: orgs, isLoading } = useQuery({
    queryKey: ["organizations"],
    queryFn: async () => {
      const response = await api.get("/auth/org/organizations")
      return response.data.data as Organization[]
    },
  })

  const { mutate: selectOrg, isPending } = useMutation({
    mutationFn: async (organizationId: string) => {
      const response = await api.post("/auth/org/organizations/select", { organizationId })
      return response.data
    },
    onSuccess: () => {
      router.push("/dashboard")
    },
    onError: (err: any) => {
      setError(err.response?.data?.error?.message || "Failed to select organization.")
    },
  })

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Card className="shadow-lg border-muted/50 rounded-2xl overflow-hidden">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <svg className="h-6 w-6 animate-spin mb-4" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-25" />
                <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <p>Loading organizations...</p>
            </div>
          ) : !orgs || orgs.length === 0 ? (
            <div className="py-12 px-6 text-center text-muted-foreground">
              You are not a member of any organizations.
            </div>
          ) : (
            <div className="divide-y divide-border">
              {orgs.map((org) => (
                <button
                  key={org.organizationId}
                  onClick={() => {
                    setError(null)
                    selectOrg(org.organizationId)
                  }}
                  disabled={isPending}
                  className="w-full flex items-center justify-between p-6 hover:bg-muted/30 transition-colors text-left disabled:opacity-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{org.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">Role: {org.role}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
              ))}
            </div>
          )}
          {error && (
            <div className="m-6 p-3 bg-destructive/15 text-destructive rounded-xl text-sm">
              {error}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
