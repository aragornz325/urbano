# Usar Node 18-alpine para el entorno de desarrollo
FROM node:18-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package.json ./
COPY yarn.lock ./

# Instalar todas las dependencias
RUN yarn install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto en el que React sirve la aplicación en modo de desarrollo
EXPOSE 3000

# Ejecutar la aplicación en modo de desarrollo
CMD ["yarn", "start"]
