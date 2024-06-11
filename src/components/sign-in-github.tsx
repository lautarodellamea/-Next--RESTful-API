import { signIn, auth } from "@/auth"
import { redirect } from "next/navigation"

export async function SignInGitHub() {




  return (
    <form
      action={async () => {
        "use server"
        await signIn("github")
      }}
    >
      <button type="submit">Signin with GitHub</button>
    </form>
  )
}