// aca plantaremos datos en la base de datos

import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcryptjs';

export async function GET(request: Request) {

  // borramos todo () - igual al delete * from todo (sin ningun where borra todo, tener cuidado)
  // await prisma.todo.deleteMany({where: { complete: true }})
  await prisma.todo.deleteMany()
  await prisma.user.deleteMany()

  // creamos usuarios
  const user = await prisma.user.create({
    data: {
      name: "test1",
      email: "test1@google.com",
      password: bcrypt.hashSync("123456"),
      roles: ["admin", "editor"],
      todos: {
        create: [
          { description: "Piedra del alma", complete: true },
          { description: "Piedra de la muerte" },
          { description: "Piedra del tiempo" },
          { description: "Piedra del espacio" },
          { description: "Piedra del poder" },
          { description: "Piedra del universo" },
          { description: "Piedra del infinito" },
        ]
      }
    }
  })


  // insertamos un todo
  // const todo = await prisma.todo.create({
  //   data: { description: "Piedra del alma", complete: true }
  // })
  // console.log(todo)


  // insertamos masivamente
  // await prisma.todo.createMany({
  //   data: [
  //     { description: "Piedra del alma", complete: true },
  //     { description: "Piedra de la muerte" },
  //     { description: "Piedra del tiempo" },
  //     { description: "Piedra del espacio" },
  //     { description: "Piedra del poder" },
  //     { description: "Piedra del universo" },
  //     { description: "Piedra del infinito" },
  //   ]
  // })






  return NextResponse.json({ message: "Seed Executed" })
}