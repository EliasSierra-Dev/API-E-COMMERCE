# E-Commerce API 🛒

## Descripción
API REST para e-commerce con autenticación JWT.

## Tecnologías
- Node.js
- Express
- MongoDB
- JWT
- Bcrypt

## Instalación
1. Clonar el repositorio
   git clone <url-del-repo>

2. Instalar dependencias
   npm install

3. Configurar variables de entorno
   cp .env.example .env
   # Llenar las variables en .env

4. Iniciar el servidor
   npm run dev

## Variables de entorno
JWT_SECRET=
JWT_EXPIRATION=
DB_URI=
PORT=

## Endpoints
### Auth
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /api/auth/register | Registrar usuario |
| POST | /api/auth/login | Iniciar sesión |

## Estructura del proyecto
E-COMMERCE/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── middlewares/
├── .env
├── .gitignore
└── index.js
