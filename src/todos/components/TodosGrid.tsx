'use client'

import { Todo } from "@prisma/client"
import { TodoItem } from "./TodoItem"


// importamos todo asi ya tenemos todas las funciones
// import * as todosApi from '@/todos/helpers/todos'
import { useRouter } from "next/navigation"

// server actions
import { toggleTodo } from "../actions/todo-actions"



interface Props {
  todos?: Todo[]
}


export const TodosGrid = ({ todos = [] }: Props) => {


  // nos sirve para hacer refresh de la ruta en que nos encontramos (tiene mas funcionalidades tambien)
  const router = useRouter()


  // esta funcion manda a llamar la peticion http
  // la comente porque estamos usando una fucnion directamente de server actions
  /*   const toggleTodo = async (id: string, complete: boolean) => {
      const updateTodo = await todosApi.updateTodo(id, complete)
      console.log(updateTodo)
      router.refresh()
    }
   */



  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {
        todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
        ))
      }

    </div>
  )
}