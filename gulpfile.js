
import { src, dest, watch, series, parallel } from 'gulp';

//Css y Sass
import gulpSass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';

//Imagenes
import imagemin from 'gulp-imagemin';
import image from 'gulp-image';
import webp from 'gulp-webp';
import avif from 'gulp-avif';

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
        .pipe(dest('build/css')); // Paso 3: guardar el css

    done();
}
function imagenes() {
    return src('src/img/**/*', { allowEmpty: true }) // Permitir carpetas vacías
        .pipe(dest('build/img')); // Copiar sin ningún procesamiento
}

function versionWebp() {
    return src('src/img/**/*.{png,jpg}')
        .pipe(webp({
            quality: 50,
        }))
        .pipe(dest('build/img'))
}
function versionAvif() {
    return src('src/img/**/*.{png,jpg}')  
        .pipe(avif({
            quality: 50,
        }))
        .pipe(dest('build/img'))
        .on('end', () => {
            console.log('Conversión a AVIF completada');
        });
}

// Función para el modo de desarrollo (watch)
function dev() {
    // Observar cambios en el archivo Sass y compilar automáticamente
    watch('src/scss/**/*.scss', css);
    // Observar cambios en la carpeta img por si agrego o quito imagenes
    //watch('src/img/**/*', imagenes);
}


export { 
    css, 
    dev, 
    imagenes,
    versionWebp,
    versionAvif
};

export default series( css, dev);
//series - Se inicia una tarea y cuando finaliza inicia la siguiente.

//parallel - Todas inician al mismo tiempo.