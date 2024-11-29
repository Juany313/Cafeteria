
import { src, dest, watch, series } from 'gulp';

//Css y Sass
import gulpSass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import cssnano from 'cssnano';


// Función para compilar Sass
function css(done) {
    // Compilar Sass
    src('src/scss/app.scss') // Paso 1: identificar archivo
        .pipe(sourcemaps.init())
        .pipe(gulpSass())
        .on('error', (err) => {
            console.error('Error en Sass:', err.message); // Muestra solo el mensaje
            this.emit('end'); // Continúa la ejecución
        })
        .pipe(postcss([autoprefixer(), cssnano()]).on('error', (err) => {
            console.error('Error en PostCSS:', err.message); // Mostrar solo el mensaje del error
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css')); // Paso 3: guardar el css

    done();
}


// Función para el modo de desarrollo (watch)
function dev() {
    // Observar cambios en el archivo Sass y compilar automáticamente
    watch('src/scss/**/*.scss', css);
    // Observar cambios en la carpeta img por si agrego o quito imagenes
    //watch('src/img/**/*', imagenes);
}




export default series( css, dev);
//series - Se inicia una tarea y cuando finaliza inicia la siguiente.

//parallel - Todas inician al mismo tiempo.