// --- START OF FILE karma.conf.js ---
module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],

    files: [
      // Importante: Usamos un solo "punto de entrada" para que Webpack maneje el grafo de dependencias.
      // Puedes crear un archivo `tests.js` que importe todas tus pruebas, o apuntar directamente a los archivos.
      // Por simplicidad, mantendremos el patrón de búsqueda.
      'src/**/*.spec.js',
      'src/**/*.test.js'
    ],

    preprocessors: {
      // Aplicamos webpack y sourcemap a todos nuestros archivos de prueba.
      'src/**/*.spec.js': ['webpack', 'sourcemap'],
      'src/**/*.test.js': ['webpack', 'sourcemap'],
      'src/**/!(*.spec|*.test).js': ['webpack', 'sourcemap', 'coverage']
    },

    coverageReporter: {
      type : 'html', // Generará un reporte HTML
      dir : 'coverage/' // En una carpeta llamada 'coverage'
    },

    webpack: {
      // Genera sourcemaps para que, si una prueba falla, veas el error en tu código original (JSX) y no en el código transpilado.
      devtool: 'inline-source-map',
      module: {
        rules: [
          // Regla para transpilar archivos JavaScript y JSX con Babel.
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          },
          // ¡NUEVA REGLA! Para manejar las importaciones de archivos CSS.
          // Esto evita que Webpack falle cuando un componente importa su CSS.
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }
        ]
      }
    },
    
    // ¡REPORTEROS ACTUALIZADOS!
    // 'progress' muestra el feedback en la terminal.
    // 'kjhtml' (Jasmine HTML Reporter) crea una bonita interfaz en el navegador para ver los resultados.
    reporters: ['progress', 'kjhtml', 'coverage'],

    // Configuración específica para el reportero HTML.
    // Esto añade un botón "Debug" en el navegador para correr una prueba específica en una nueva pestaña y depurarla.
    client: {
      clearContext: false // Deja los resultados visibles en la ventana de Jasmine.
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false, // Ponlo en 'true' para que el test corra una vez y se cierre (útil para CI/CD).
    concurrency: Infinity
  });
};
// --- END OF FILE karma.config.js ---