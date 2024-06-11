# Development
Pasos para levantar la app en desarrollo

1. Levantar la base de datos
```
docker compose up -d
```

2. Crear una copia de el .env.templatea y renombrarlo a .env
3. Reemplazar las variables de entorno
4. Ejecutar el comando ``` npm install ```
5. Ejecutar el comando ``` npm run dev ```
6. Ejecutar estos comandos de prisma
```
npx prisma migrate dev
npx prisma generate
```
7. Ejecutar el SEED para [crear la base de datos](localhost:3000/api/seed/)

## Nota: Usuario por defecto
__usuario__: test1@google.com
__usuario__: 123456

# Prisma commands
```
npx prisma init
npx prisma migrate dev
npx prisma generate
```



# Prod


# Stage