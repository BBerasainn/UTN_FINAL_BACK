TP Final – Backend

Este es el backend del Trabajo Final del curso Fullstack.
El servidor permite registrar usuarios, enviar un email de verificación, iniciar sesión, gestionar contactos, chats y mensajes.
Está desarrollado con Node.js + Express y conectado a MongoDB Atlas.

Tecnologías utilizadas

Node.js

Express

MongoDB Atlas

Mongoose

Nodemailer (Mailtrap)

JWT (jsonwebtoken)

bcrypt

CORS

Render (deploy)

-Estructura del proyecto
src/
├── app.js
├── server.js
├── routes/
│   ├── authRoutes.js
│   ├── chatRoutes.js
│   ├── contactRoutes.js
│   └── messageRoutes.js
├── controllers/
│   └── (controladores de cada módulo)
├── services/
│   └── authService.js
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
├── models/
│   ├── User.js
│   ├── Contact.js
│   ├── Message.js
│   ├── Chat.js
│   └── VerificationToken.js
└── utils/
    ├── hash.js
    ├── jwt.js
    └── sendVerificationEmail.js

-Variables de entorno

Crear un archivo .env con:

MONGO_URI=tu_conexion_mongodb
JWT_SECRET=clave_secreta
FRONTEND_URL=https://utnfinalfrontendfullstack.vercel.app

MAILTRAP_USER=tu_usuario_mailtrap
MAILTRAP_PASS=tu_password_mailtrap


En desarrollo:

FRONTEND_URL=http://localhost:5173

- Endpoints principales
/api/auth

POST /register → Registro + email de verificación

GET /verify/:token → Verifica la cuenta

POST /login → Login de usuario

/api/contacts

CRUD de contactos del usuario autenticado.

/api/messages

Envío y recepción de mensajes.

/api/chats

Creación y carga de chats.

/health

Ruta para comprobar que el servidor está online:

https://utn-final-back.onrender.com/health

- Nota sobre la URL principal en Render

Si se accede directamente a:

https://utn-final-back.onrender.com


Render muestra:

Cannot GET /


Esto es NORMAL porque el backend no tiene una ruta para /.
Para verificar que está funcionando debe usarse:

/health

- Cómo ejecutarlo en local

Clonar el repositorio

git clone https://github.com/BBerasainn/UTN_FINAL_BACK.git


Entrar a la carpeta

cd UTN_FINAL_BACK


Instalar dependencias

npm install


Crear el archivo .env

MONGO_URI=tu_mongo
JWT_SECRET=123456
FRONTEND_URL=http://localhost:5173
MAILTRAP_USER=xxxx
MAILTRAP_PASS=xxxx


Ejecutar el servidor

npm run dev


El backend quedará disponible en:

- http://localhost:4000

- Flujo de autenticación

El usuario se registra.

El backend envía un email desde Mailtrap con un enlace de verificación.

El usuario hace clic y queda verificado.

Luego puede iniciar sesión.

Se genera un token JWT.

Con ese token puede acceder a las rutas privadas (contactos, chats, mensajes).
