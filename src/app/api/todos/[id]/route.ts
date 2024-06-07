import prisma from '@/lib/prisma'
import { Todo } from '@prisma/client'
import { NextResponse } from 'next/server'
import * as yup from 'yup'

interface Segments {
  params: {
    id: string
  }
}


// hacemos una funcionnpara reutilizar y manejar esto
// de esta forma podemos extraer logica y simplificar el codigo dentro de las funciones de peticion
const getTodo = async (id: string): Promise<Todo | null> => {
  const todo = await prisma.todo.findFirst({ where: { id: id } })
  return todo
}


// obtener un todo
export async function GET(request: Request, { params }: Segments) {

  const todo = await getTodo(params.id)

  if (!todo) { return NextResponse.json({ message: `Todo con id: ${params.id} no encontrado` }, { status: 404 }) }

  return NextResponse.json(todo)
}



// hagamos un schema de validacion para el put
const putSchema = yup.object({
  complete: yup.boolean().optional(),
  description: yup.string().optional(),
})

// modificar un todo
export async function PUT(request: Request, { params }: Segments) {

  const todo = await getTodo(params.id)

  if (!todo) { return NextResponse.json({ message: `Todo con id: ${params.id} no encontrado` }, { status: 404 }) }


  try {
    const { complete, description } = await putSchema.validate(await request.json())



    const updatedTodo = await prisma.todo.update({
      where: { id: params.id },
      // si no le pandamos el complete por ejemplo, no lo actualiza lo deja como esta
      data: { complete, description }
    })

    return NextResponse.json(updatedTodo)

  } catch (error) {

    return NextResponse.json(error, { status: 400 })
  }
}


