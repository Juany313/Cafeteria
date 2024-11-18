const { src, dest, watch, series, parallel } = require('gulp');
const gulpSass = require('gulp-dart-sass'); 
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer')



// Función para compilar Sass
function css(done) {
    // Compilar Sass
    src('src/scss/app.scss') // Paso 1: identificar archivo
        .pipe(gulpSass())
        .on('error', (err) => {
            console.error('Error en Sass:', err.message); // Muestra solo el mensaje
            this.emit('end'); // Continúa la ejecución
        })
        .pipe(postcss([autoprefixer()]).on('error', (err) => {
            console.error('Error en PostCSS:', err.message); // Mostrar solo el mensaje del error
        }))
        .pipe(dest('dist/css')); // Paso 3: guardar el css

    done();
}

// Función para el modo de desarrollo (watch)
function dev() {
    // Observar cambios en el archivo Sass y compilar automáticamente
    watch('src/scss/**/*.scss', css)
}

function tareaDefault() {
    console.log('soy la tarea default');
    
}

// Exportar tareas
exports.css = css;
exports.dev = dev;
exports.default = series(css, dev);

//series - Se inicia una tarea y cuando finaliza inicia la siguiente.

//parallel - Todas inician al mismo tiempo.