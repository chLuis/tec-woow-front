# Frontend Project UI

Este repositorio contiene la interfaz de usuario de la aplicación, desarrollada con **React** y **TypeScript** utilizando **Vite** como empaquetador. El diseño está construido con **Tailwind CSS** y componentes de **shadcn/ui**, asegurando validación de datos robusta mediante **Zod**.

## 🛠️ Tecnologías

* [React](https://react.dev/) - Biblioteca para interfaces de usuario
* [TypeScript](https://www.typescriptlang.org/) - Superset de JavaScript con tipado estático
* [Vite](https://vitejs.dev/) - Entorno de desarrollo rápido
* [Tailwind CSS](https://tailwindcss.com/) - Framework de estilos utility-first
* [shadcn/ui](https://ui.shadcn.com/) - Colección de componentes reutilizables
* [Zod](https://zod.dev/) - Validación de esquemas

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:
* Node.js (v18 o superior recomendado para Vite)

## 🚀 Instalación y Configuración

Sigue estos pasos para levantar el proyecto en tu entorno local:

### 1. Clonar el repositorio e instalar dependencias

```bash
git clone https://github.com/chLuis/tec-woow-front.git
cd tec-woow-front
npm install
```
### 2. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto y añade las variables necesarias como se muestra en el archivo .env.example.

### 3. Iniciar el servidor de desarrollo

```bash
npm run dev
```
Esto iniciará el servidor de desarrollo y podrás acceder a la aplicación en `http://localhost:5173`.

### 4. Autenticación
Para poder acceder es necesario tener el backend corriendo y con todos los datos cargados dentro de la base de datos, lo cual permitira el ingreso a la misma

URL para ejecutar el backend https://github.com/chLuis/tec-woow-back

