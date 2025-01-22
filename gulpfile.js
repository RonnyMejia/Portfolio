import { src, dest, watch, series } from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import terser from 'gulp-terser';
import browserSync from 'browser-sync';

const sass = gulpSass(dartSass);
const server = browserSync.create();

// Manejo de errores
function handleError(err) {
    console.error(err.toString());
    this.emit('end');
}

export function css(done) {
    src('src/scss/app.scss', { sourcemaps: true })
        .pipe(sass({ outputStyle: 'compressed' }).on('error', handleError))
        .pipe(dest('dist/css', { sourcemaps: '.' }))
        .pipe(server.stream()); 

    done();
}

export function js(done) {
    src('src/js/app.js')
        .pipe(terser().on('error', handleError))
        .pipe(dest('dist/js'))
        .pipe(server.stream()); 

    done();
}

export function serve(done) {
    server.init({
        server: {
            baseDir: './', 
        },
        port: 3000,
    });

    done();
}

export function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', js);
    watch('./*.html').on('change', server.reload); 
}

export default series(css, js, serve, dev);
