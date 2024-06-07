import { PrismaClient } from '@prisma/client';

// un usuario dijo esto:
// Hay que usar el keyword 'declare' para poder setear el tipo de la variable global
// e esta forma sacamos el as any de global
// declare global {
//   var prisma: PrismaClient; // This must be a `var` and not a `let / const`
// }

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
}

export default prisma;