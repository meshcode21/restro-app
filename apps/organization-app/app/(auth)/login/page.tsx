import { LoginForm } from "@/components/login-form"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function LoginPage() {
  const cookieStore = await cookies()
  
  // if (cookieStore.get("tenant_session")) {
  //   redirect("/dashboard")
  // }
  
  if (cookieStore.get("auth_session")) {
    redirect("/dashboard")
  }
  
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Kora Kitchen</h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access your workspace
        </p>
      </div>
      <LoginForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        By clicking sign in, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  )
}