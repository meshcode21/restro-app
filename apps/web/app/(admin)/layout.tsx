import { AdminLayout } from "@/components/layouts/admin-layout"

export default function SuperAdminRouteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminLayout isSuperAdmin>{children}</AdminLayout>
}
