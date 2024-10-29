FROM node:18.19.1-alpine as build

WORKDIR /app

# Copiar archivos al contenedor
COPY . .

# Establecer la opción de compatibilidad de OpenSSL
ENV NODE_OPTIONS=--openssl-legacy-provider

# Instalar dependencias y construir la aplicación
RUN yarn install
RUN yarn build

#---
FROM nginx:alpine

# Copiar la build al directorio de nginx
COPY --from=build /app/build/ /var/www
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
