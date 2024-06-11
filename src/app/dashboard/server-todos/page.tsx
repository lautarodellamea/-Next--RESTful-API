// el no estar usando el fetch este enlace veremos como manejar el cache
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const dynamic = 'force-dynamic'
// esto es para que la pagina o layout sea siempre dinamicamente generada
export const revalidate = 0
import { getUserSessionServer } from "@/auth/components/actions/auth-actions";
// ahora cada vez que entremos a esta pagina, se recostruira 
// si vemos que no hay data actualizada debemos ver estos temas de cache ya que next lo maneja y podemos variar o decirle como manejarlo como en este caso



import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";
import { redirect } from "next/navigation";




export const metadata = {
  title: 'Listado de todos',
  description: 'Listado de todos',
};


export default async function ServerTodosPage() {

  const user = await getUserSessionServer()
  if (!user) redirect("/api/auth/signin")

  const todos = await prisma.todo.findMany({ where: { userId: user.id }, orderBy: { description: 'asc' } })


  // el no estar usando el fetch este enlace veremos como manejar el cache
  // https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
  console.log("construido")




  return (
    <>
      <span className="text-3xl mb-10">Server Actions</span>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>

      <TodosGrid todos={todos} />
    </>
  );
}