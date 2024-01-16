import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const authSession = await getServerSession(authOptions);
  const user = authSession && authSession.user;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hey {user?.first_name}</h1>
    </main>
  );
}
