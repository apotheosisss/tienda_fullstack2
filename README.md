# Proyecto ElectroPlus - Tienda Online con React

Este proyecto es una tienda online de productos electrónicos desarrollada como una Single Page Application (SPA) utilizando React, Bootstrap, y un sistema de pruebas unitarias con Karma y Jasmine.

## 🚀 Instalación

Para configurar el proyecto en tu entorno local, sigue estos pasos.

### Requisitos Previos

-   [Node.js](https://nodejs.org/) (versión 16 o superior)
-   npm (usualmente viene incluido con Node.js)

### Instrucción Principal

Para instalar **todas** las dependencias necesarias del proyecto (tanto de producción como de desarrollo), simplemente clona el repositorio, navega a la carpeta raíz y ejecuta el siguiente comando:

```bash
npm install

npm install bootstrap react react-dom react-scripts web-vitals

npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader css-loader jasmine-core karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter karma-sourcemap-loader karma-webpack style-loader webpack

npm start: Inicia la aplicación en modo de desarrollo. Abre http://localhost:3000 para verla en tu navegador.
npm test: Ejecuta el sistema de pruebas unitarias con Karma y Jasmine. Abrirá una ventana de Chrome para mostrar los resultados en tiempo real.
npm run build: Compila la aplicación para producción en la carpeta build.
