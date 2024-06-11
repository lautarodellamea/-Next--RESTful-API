// logica para crear la logica y todo lo demas

import bcrypt from 'bcryptjs'
import prisma from "@/lib/prisma"
import { auth } from '@/auth'


// creo esta funcion ya que usare el usuario de la sesion en muchos lados
export const getUserSessionServer = async () => {
  const session = await auth()

  return session?.user

}

export const signInEmailPassword = async (email: string, password: string) => {

  if (!email || !password) return null

  const user = await prisma.user.findUnique({ where: { email } })

  // si el usuario no existe lo creamos
  if (!user) {
    const dbUser = await createUser(email, password)
    return dbUser
  }

  // comparamos si el password ingresado matchea con el de la base de datos
  if (!bcrypt.compareSync(password, user.password ?? "")) {

    return null
  }

  // si hace match returnamos el usuario
  return user

}




// creaciond el usuario
const createUser = async (email: string, password: string) => {
  const user = await prisma.user.create({
    data: {
      email: email,
      password: bcrypt.hashSync(password, 10),
      name: email.split("@")[0],
    }
  })
  return user
}




