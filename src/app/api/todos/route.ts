import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import * as yup from 'yup'

// obtener todos
export async function GET(request: Request) {

  const { searchParams } = new URL(request.url)
  const take = Number(searchParams.get('take') ?? "10") // indica cuantos registros traer
  const skip = Number(searchParams.get('skip') ?? "0") // indica cuantos registros saltearse


  if (isNaN(take)) { return NextResponse.json({ message: "Take tiene que ser un número" }, { status: 400 }) }
  if (isNaN(skip)) { return NextResponse.json({ message: "Skip tiene que ser un número" }, { status: 400 }) }

  const todos = await prisma.todo.findMany({
    take: take,
    skip: skip,
  })



  return NextResponse.json(todos)
}


// esto es un gusto personal de fer
// hace esto justo antes del POST para saber que informacion espera con este POST
// gracias a la libreria "yup" podemos definir como queremos que se vea el objeto
// cualquier propiedad que me manden y no este definida aca me dara error
const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
})


// crear un todo
export async function POST(request: Request) {

  try {
    const { complete, description } = await postSchema.validate(await request.json())

    const todo = await prisma.todo.create({
      data: {
        complete,
        description
      }
    })

    return NextResponse.json(todo)

  } catch (error) {

    return NextResponse.json(error, { status: 400 })
  }







}