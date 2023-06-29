# Estilo canino front-end

<hr />

## Estructura del proyecto

```
.

├── src
│   ├── assets
│   │   └──
│   ├── components
│   │   └── ... ├──... itemsPages
│   ├── pages
│   │   └── ...
│   ├── redux
│   │   └── ...
│   ├── types
│   │   └── ...
│   ├── utils
│   │   └── ... variantes de entorno
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── vite-env.d.ts
│   └── eslintrc.cjs
├── .gitignore
├── .idex.html
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
└── tsconfig.tsbuildinfo
└── vite.config.ts
```

<hr />

## Correr el cliente

- Utilizar `npm run dev` para correr en development.

## Tecnologías

- React
- MaterialUI
- Redux
- Typescript
- JWT
- Axios
- days
- react-router-dom
- sweetalert2

## Funcionamiento y roles

## Usuarios del tipo "cliente"

- Registrarse -validacion de mails repetidos
- Iniciar Sesion jwt
- Crear objetos de tipo perro ligados a tu cuenta
- Editar nombre, raza, edad de perro
- Eliminar cualquier perro perteneciente a tu cuenta
- Editar nombre, email, contraseña de usuario- validaciones de edad,mail,nombre y password
- Solicitar un turno con un peluquero, solo se puede los que el peluquero tenga disponible
- Cancerlar un turno antes solicitado
- Ver tus turnos disponibles

## Usuarios del tipo "peluquero"

- Iniciar Sesion jwt
- Editar nombre, email, contraseña de usuario- validaciones de edad,mail,nombre y password
- Crear un turno con cualquier usuario del tipo "cliente" registrado
- Cancerlar cualquier turno perteneciente a esta cuenta
- Ver sus turnos disponibles
- Ver sus tomados

## Usuarios del tipo "administrador"

- Iniciar Sesion jwt
- Editar nombre, email, contraseña de usuario- validaciones de edad,mail,nombre y password
- Crear un turno con cualquier usuario del tipo "cliente" y un perro perteneciente a dicho cliente con cualquier usuario del tipo "peluquero"(registrado)
- Cancerlar cualquier turno perteneciente a cualquier cuenta
- Ver todos los turnos tomados y disponibles filtrando por peluquero y fecha
- Crear usuarios del tipo "peluquero"
- Eliminar cualquier usuario del tipo "cliente" o "peluquero"
- Eliminar cualquier usuario del tipo "cliente" o "peluquero"
- Ver todos los perros de cualquier usuario del tipo "cliente"
- Solo el puede acceder a ciertas rutas privadas (react-router-dom)
- Cuenta con 2 paneles extra que solo el puede ver
