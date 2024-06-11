// server actions

// todo este archivo se ejecutara del lado del servidor
'use server'

import prisma from "@/lib/prisma"
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getUserSessionServer } from '../../auth/components/actions/auth-actions';

// usaremos esta funcion apra simular latencia y ver como el useOptimistic Hook funciona haciendo parecer que hay cero de latencia pero el backend funciona con normalidad
export const sleep = async (seconds: number = 0) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, seconds * 1000)
  })
}



// no es mas que una simple funcion que hace el trabajo del lado del servidor
export const toggleTodo = async (id: string, complete: boolean): Promise<Todo> => {
  // para que esta funcion solamente se ejecute del lado del servidor puedo hacer esto tambien
  // 'use client'

  // await sleep(3)



  const todo = await prisma.todo.findFirst({ where: { id: id } })

  if (!todo) {
    throw new Error(`Todo con id: ${id} no encontrado`)
  }

  const updateTodo = await prisma.todo.update({
    where: { id: id },
    data: { complete: complete }
  })

  // esto es para que recarge solo lo que cambio
  revalidatePath('/dashboard/server-todos')

  return updateTodo

}



export const addTodo = async (description: string, userId: string) => {


  try {



    const todo = await prisma.todo.create({
      data: {
        description: description,
        userId: userId
      }
    })

    revalidatePath('/dashboard/server-todos')

    return todo

  } catch (error) {

    return {
      message: "Error al crear el todo"
    }
  }

}


export const deleteCompleted = async (): Promise<boolean> => {
  try {

    await prisma.todo.deleteMany({ where: { complete: true } })

    revalidatePath('/dashboard/server-todos')

    return true

  } catch (error) {

    return false
  }

}