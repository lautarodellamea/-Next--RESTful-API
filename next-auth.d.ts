import { DefaultSession, DefaultUser } from "next-auth"

// Definiciones de tipos extendidas
interface IUser extends DefaultUser {
  roles?: string[];
}

// Extender la interfaz Session para incluir la propiedad user
interface Session extends DefaultSession {
  user?: IUser;
  isActive?: boolean;
}

// Extender la interfaz JWT para incluir la propiedad roles
interface JWT extends IUser { }

// Sobreescribir las definiciones de módulo
declare module "next-auth" {
  interface User extends IUser { }
  interface Session extends Session { }
}

declare module "next-auth/jwt" {
  interface JWT extends JWT { }
}