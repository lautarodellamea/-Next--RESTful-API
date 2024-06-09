// este archivo tendra las instrucciones para realizar el posteo http tradicional, no habra nada de logica para mantener el estado o actualizarlo
// simplemente llegaremos al endpoint y haremos la modificacion respectiva como si estuvieramos en postman
// aca solo se accede a los endpoint y se manda la info que nececiten, tambien se aclara por que metodo accedo y demas

import { Todo } from "@prisma/client";


// funcion para simular un loading
const sleep = (seconds: number = 0): Promise<boolean> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, seconds * 1000)
  })
}


// actualizar todo
export const updateTodo = async (id: string, complete: boolean): Promise<Todo> => {

  // pasaran 2 segundos antes de que se ejecute todo, esto lo hacemos para ver la diferencia con la actualizacion optimista que veremos mas adelante
  await sleep(2)

  const body = { complete: complete }

  // si quisiera llamar el endpoint del servidor debo poner todo el url completo, pero como lo llamo del lado del cliente
  const todo = await fetch(`/api/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(res => res.json());


  return todo

}


// crear todo
export const createTodo = async (description: string): Promise<Todo> => {

  const body = { description: description }

  // si quisiera llamar el endpoint del servidor debo poner todo el url completo, pero como lo llamo del lado del cliente
  const todo = await fetch(`/api/todos`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(res => res.json());


  return todo

}


// borrar todos
// crear todo
export const deleteCompleteTodos = async (): Promise<boolean> => {



  await fetch(`/api/todos`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(res => res.json());


  return true

}