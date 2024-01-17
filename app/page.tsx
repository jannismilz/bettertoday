import { Separator } from "@/components/ui/separator";
import { authOptions } from "@/lib/auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getServerSession } from "next-auth";
import ProjectForm from "@/components/projectForm";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const authSession = await getServerSession(authOptions);
  const user = authSession && authSession.user;

  return (
    <main className="p-6">
      <h1>Hey {user?.first_name}</h1>
      <Separator className="my-4" />
      <div className="flex flex-wrap justify-center gap-4">
        <ProjectForm>
          <Button variant="outline">Open Drawer</Button>
        </ProjectForm>
      </div>
    </main>
  );
}
