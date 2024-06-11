import { auth } from "@/auth";
import { WidgetItem } from "@/components";
import { SignInGitHub } from "@/components/sign-in-github";
import { redirect } from "next/navigation";



export default async function DashboardPage() {

  const session = await auth()

  if (!session) {
    redirect('/api/auth/signin')
  }





  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">

      <WidgetItem title="Usuario conectado Server Side">

        <div className="flex flex-col">
          <span>{session.user?.name}</span>
          <span>{session.user?.image}</span>
          <span>{session.user?.email}</span>
        </div>

        <div>
          {JSON.stringify(session)}
        </div>


        {/* <SignInGitHub /> */}


      </WidgetItem>


    </div>

  );
}