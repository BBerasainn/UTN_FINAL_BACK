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

Estructura del proyecto
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

Variables de entorno

Para funcionar correctamente, el backend utiliza las siguientes variables:

MONGO_URI=tu_conexion_mongodb
JWT_SECRET=clave_secreta
FRONTEND_URL=https://utnfinalfrontendfullstack.vercel.app

MAILTRAP_USER=tu_usuario_mailtrap
MAILTRAP_PASS=tu_password_mailtrap


En modo desarrollo:

FRONTEND_URL=http://localhost:5173

Endpoints principales
 /api/auth

POST /register → Registro de usuario + email de verificación

GET /verify/:token → Verificar cuenta

POST /login → Iniciar sesión

/api/contacts

CRUD de contactos del usuario logueado.

/api/messages

Mensajes entre usuarios.

/api/chats

Creación y carga de chats.

Cómo ejecutarlo en local

Clonar el repositorio:

git clone https://github.com/BBerasainn/UTN_FINAL_BACK.git


Instalar dependencias:

npm install


Crear un archivo .env con:

MONGO_URI=tu_mongo
JWT_SECRET=123456
FRONTEND_URL=http://localhost:5173
MAILTRAP_USER=xxxx
MAILTRAP_PASS=xxxx


Ejecutar el servidor:

npm run dev


El backend quedará disponible en:

http://localhost:4000

Flujo de autenticación

El usuario se registra.

El backend envía un email con un enlace de verificación.

El usuario hace clic y se verifica su cuenta.

Luego puede iniciar sesión normalmente.

El token JWT se usa para acceder a rutas protegidas.

El usuario ya puede usar la sección de chat.

Estado del deploy

El backend está desplegado en Render:

👉 https://utn-final-back.onrender.com
