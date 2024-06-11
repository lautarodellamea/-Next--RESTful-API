import NextAuth from "next-auth"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

import github from "next-auth/providers/github"
import google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { signInEmailPassword } from "./auth/components/actions/auth-actions"



const prisma = new PrismaClient()




export const { handlers, signIn, signOut, auth } = NextAuth({


  adapter: PrismaAdapter(prisma),

  providers: [

    CredentialsProvider({

      name: "Credentials",

      credentials: {
        username: { label: "Correo", type: "text", placeholder: "usuario@example.com" },
        password: { label: "Contraseña", type: "password", placeholder: "**********" }
      },
      async authorize(credentials: any, req) {

        const user = await signInEmailPassword(credentials!.username, credentials!.password)

        if (user) {
          return user
        } else {
          return null

        }
      }
    }),


    google({
      clientId: process.env.AUTH_GOOGLE_ID ?? "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? "",

    }),
    github({
      clientId: process.env.AUTH_GITHUB_ID ?? "",
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? "",
      // allowDangerousEmailAccountLinking: true,
    }),
  ],

  // esta es para decirle con que estrategia este manejada la session
  session: {
    strategy: "jwt"
  },

  // funciones que pasan en el ciclo de vida de autentificacion del usuario, suceden en el orden que los puse
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log({ user })


      // retornar false es por ejemplo util para bloquear usuarios de ciertos dominios en particular, como gmail, etc, esto es a la hora de creaar usuarios
      return true
    },


    // la idea de este json web token es que pase la info que yo quiera en el payload de el, para poner roles, si el usuario esta activo, etc
    async jwt({ token, user, account, profile }) {


      const dbUser = await prisma.user.findUnique({
        where: {
          email: token.email! ?? 'no-email'
        }
      })

      // A USUARIOS CON EL isActive en false los sacara y no dejara logearlos
      // if (dbUser?.isActive === false) {
      //   throw Error('User is not active')
      // }

      // le agregamos informacion adicional al token
      token.roles = dbUser?.roles ?? ["no-roles"]
      token.id = dbUser?.id ?? "no-uuid"

      // vemos el token en consola, porque aca estamos en el backend
      console.log({ token })


      return token

    },

    async session({ session, user, token }) {

      // si tenemos una sesion y la sesion tiene un usuario
      if (session.user && session.user) {
        (session.user.roles as any) = token.roles;
        (session.user.id as any) = token.id;

      }

      return session




    }
  }




})