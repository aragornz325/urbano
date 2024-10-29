# Proyecto de Backend y Frontend con Docker

Este proyecto es una aplicación de backend y frontend desarrollada en Node.js, PostgreSQL y React, todo desplegado en contenedores Docker. Aquí encontrarás toda la información necesaria para instalar, configurar y ejecutar el proyecto de manera eficiente.

## 🚀 Tecnologías Utilizadas

- **Backend**: Node.js (NestJS)
- **Frontend**: React (Create React App)
- **Base de Datos**: PostgreSQL
- **Contenedores**: Docker y Docker Compose

## ⚙️ Configuración del Proyecto

### Prerrequisitos

Asegúrate de tener Docker y Docker Compose instalados en tu sistema.

### Instalación

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/usuario/proyecto.git
   cd proyecto
   ```

2. **Configura las Variables de Entorno**: Asegúrate de que los valores en `docker-compose.yml` para `POSTGRES_USER`, `POSTGRES_PASSWORD`, y otros valores de entorno estén configurados correctamente según tus necesidades.

3. **Inicia los Contenedores**: Ejecuta el siguiente comando para construir y ejecutar los contenedores:
   ```bash
   docker-compose up --build
   ```

4. **Acceso a la Aplicación**:
   - **Frontend**: [http://localhost:3000](http://localhost:3000)
   - **Backend (Swagger UI)**: [http://localhost:5000](http://localhost:5000)

## 📝 Estructura del Proyecto

- **/backend**: Contiene el código del backend con NestJS y la configuración de la API.
- **/frontend**: Contiene el código del frontend en React.
- **docker-compose.yml**: Configuración para el despliegue de todos los servicios con Docker.

## 🌐 Endpoints Principales (Backend)

La API incluye varios endpoints que se pueden explorar a través de Swagger UI:

- **Autenticación**: `/api/auth`
- **Usuarios**: `/api/users`
- **Cursos**: `/api/courses`
- **Contenido**: `/api/contents`

> **Nota**: Estos endpoints son solo ejemplos, consulta Swagger UI para una documentación completa.

## 🐳 Docker

Este proyecto está totalmente containerizado, lo que facilita su despliegue en cualquier entorno compatible con Docker. El archivo `docker-compose.yml` incluye los siguientes servicios:

- **database**: Contenedor de PostgreSQL que almacena los datos de la aplicación.
- **backend**: Contenedor de la API desarrollada con NestJS.
- **frontend**: Contenedor del cliente web en React.

### Comandos Útiles de Docker

- **Iniciar los contenedores**:
  ```bash
  docker-compose up
  ```

- **Detener los contenedores**:
  ```bash
  docker-compose down
  ```

- **Reconstruir los contenedores**:
  ```bash
  docker-compose up --build
  ```

## 📄 Consideraciones

- **Persistencia de Datos**: La base de datos está configurada para utilizar un volumen llamado `db_data` que permite que los datos persistan incluso después de detener los contenedores.
- **Renombrado de Ramas**: La rama principal del proyecto se cambió a `main` para reflejar la versión más reciente y estable del código.

## 💡 Funcionalidades Implementadas

- **Despliegue de Backend y Frontend en Docker**
- **Comunicación entre contenedores utilizando Docker Compose**
- **Configuración de proxy en el frontend para redireccionamiento de API**
- **Uso de Swagger UI para documentación de la API**

## 👏 Agradecimientos

Gracias por utilizar este proyecto. Si tienes sugerencias o encuentras algún problema, no dudes en abrir un **issue** o realizar un **pull request**.

---

¡Espero que disfrutes trabajando en este proyecto tanto como yo disfrute desarrollarlo! 🎉
