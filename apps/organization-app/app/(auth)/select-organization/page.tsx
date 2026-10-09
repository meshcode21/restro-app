import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { OrganizationSelector } from "@/components/organization-selector"

export default async function SelectOrganizationPage() {
  const cookieStore = await cookies()
  const authSession = cookieStore.get("auth_session")

  if (!authSession) {
    redirect("/login")
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Select Workspace</h1>
        <p className="text-sm text-muted-foreground">
          Choose an organization to continue
        </p>
      </div>
      <OrganizationSelector />
    </div>
  )
}
