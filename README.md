# Proyecto Final - DWEC

## Descripción

Aplicación de gestión de tareas desarrollada con Vue 3 y Vite. Usa Firebase (Authentication + Firestore) para autenticar usuarios y almacenar sus tareas de forma centralizada (cada usuario tiene su propio documento con una lista de tasks).

## Tecnologías

- Vue 3
- Vite
- Firebase (Authentication, Firestore)
- JavaScript

## Ejecutar en local

1. Clona o copia el repositorio.
2. Instala dependencias:

3. Configura Firebase: añade tus credenciales en `src/firebase/config.js` (sigue el formato que ya existe en el proyecto).

4. Levanta el servidor de desarrollo

5. Para compilar para producción:

Nota: si usas variables de entorno, crea el fichero `.env` según tu flujo y asegúrate de que `src/firebase/config.js` lea dichas variables o incluya la configuración apropiada.

## Enlace de Vercel

- Enlace de despliegue: proyecto-final-dwec-iota.vercel.app

## Estructura de Firestore

La aplicación utiliza una estructura simple centrada en el usuario:

- Colección: `users`
- Documento por usuario: el ID del documento es el `uid` del usuario (proporcionado por Firebase Authentication).
- Dentro del documento de usuario se almacena una lista `tasks` (array) con cada tarea como objeto.

