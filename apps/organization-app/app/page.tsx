import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootHomePage() {
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
}
