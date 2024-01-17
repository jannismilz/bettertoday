import { Separator } from "@/components/ui/separator";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import ProjectForm from "@/components/projectForm";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@heroicons/react/24/solid";

export default async function Home() {
  const authSession = await getServerSession(authOptions);
  const user = authSession && authSession.user;

  return (
    <main className="p-6">
      <h1>Hey {user?.first_name}</h1>
      <Separator className="my-4" />
      <div className="flex flex-wrap justify-center gap-4">
        <ProjectForm>
          <Button variant="outline" className="flex w-full gap-1">
            <PlusIcon className="h-4 w-4" />
            Create a Project
          </Button>
        </ProjectForm>
      </div>
      <Separator className="my-4" />
    </main>
  );
}
