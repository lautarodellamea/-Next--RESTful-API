import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";



export const metadata = {
  title: 'Listado de todos',
  description: 'Listado de todos',
};


export default async function RestTodosPage() {

  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } })


  // useEffect(() => {
  //   fetch('/api/todos')
  //     .then(res => res.json())
  //     .then(data => console.log(data))
  // }, [])




  return (
    <div>
      {/* TODO: Formulario para crear un todo */}
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>

      <TodosGrid todos={todos} />
    </div>
  );
}