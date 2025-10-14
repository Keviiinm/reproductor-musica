// *VARIABLES GLOBALES
const fondo = document.querySelector('.app')
const contCaratula = document.getElementById('contenedor-caratula');
const titulo = document.getElementById('titulo-cancion');
const artista = document.getElementById('nombre-artista');
const btnAleatorio = document.getElementById('btn-shuffle');
const btnPrev = document.getElementById('btn-atras');
const btnReproducirPausar = document.getElementById('btn-reproducir');
const btnNext = document.getElementById('btn-siguiente');
const barraDeProgreso = document.getElementById('progress');
const audio = document.getElementById('audio');
const inicio = document.getElementById('inicio');
const fin = document.getElementById('fin');
const contenedorCanciones = document.getElementById('contenedor-canciones');
const btnLista = document.getElementById('btn-lista');
const contenedorLista = document.getElementById('contenedor-lista');
const botonListaRegreso = document.getElementById('btn-regreso');

// *VARIABLES QUE NO CAMBIAN
let canciones = []
let indiceActual = 0
let reproduciendo = false
let aleatorio = false

// *SE INVOCA EL .JSON CON EL EVENTO DE ESCUCHA
document.addEventListener('DOMContentLoaded', () => {
    fetch("../json/canciones.json")

        .then(response => response.json())

        .then(data => {
            canciones = data

            mostrarCanciones(indiceActual)
            // *aqui iniciamos el src para poder usarlo en el reproductor
            audio.setAttribute('src', canciones[indiceActual].cancion)

            mostrarCancionesEnLista()
        })

        .catch(error => {
            console.error("No se cargó el archivo JSON", error)
        })
})

function mostrarCanciones(indice) {
    const cancion = canciones[indice]

    // *ponemos esto para modificar una variable en css, el fondo cambia segun la caratula de la cancion
    fondo.style.setProperty('--fondo-caratula', `url('${cancion.caratula}')`)

    contCaratula.innerHTML = `
        <img src="${cancion.caratula}"  alt="${cancion.nombre}">
    `
    titulo.textContent = cancion.nombre
    artista.textContent = cancion.artista
}

btnAleatorio.addEventListener('click', () => {
    // *esto es para alternar el estado del boleano, por defecto esta desactivado
    aleatorio = !aleatorio

    if (aleatorio) { 
        btnAleatorio.classList.add('active');
    }
    else {
        btnAleatorio.classList.remove('active');
    }
})

// *boton de cancion anterior
btnPrev.addEventListener('click', () => {
    if (aleatorio) {
        // *funcion math.random = numero aleatorio recorriendo las canciones que haya
        const indiceAleatorio = Math.floor(Math.random() * (canciones.length));
        
        indiceActual = indiceAleatorio;
    }
    else {
        if (indiceActual === 0) {
            indiceActual = canciones.length - 1
        }
        else {
            indiceActual--;
        }

    }

    mostrarCanciones(indiceActual);

    // *REPRODUCIMOS LA CANCIÓN DESPUES DE ACTUALIZAR EL ÍNDICE O SI NO SE REPRODUCE LA CANCIÓN ANTERIOR EN EL ARREGLO AL CAMBIAR AL BOTÓN ANTERIOR
    const cancion = canciones[indiceActual]

    // *se cambia la cancion
    audio.setAttribute('src', cancion.cancion);

    audio.play()

    btnReproducirPausar.innerHTML = '<i class="bi bi-pause-fill"></i>'

    // *mantenemos el booleano en true para que no importe si la canción está pausada o no, se reproduzca siempre la siguiente al presionar el botón de next
    reproduciendo = true
})

btnNext.addEventListener('click', () => {
    // *hacer la funcionalidad para las canciones aleatorias
    if (aleatorio) {
        
        const indiceAleatorio = Math.floor(Math.random() * (canciones.length));
        // *guardamos en la variable indiceactual el valor aleatorio que se guarda en la variable indice aleatorio
        indiceActual = indiceAleatorio;
    }
    else {
        if (indiceActual === canciones.length - 1) {
            indiceActual = 0
        }
        else {
            indiceActual++;

        }
    }
    mostrarCanciones(indiceActual);

    // *reproducimos la canción despues de actualizar el índice o si no se reproduce la canción anterior en el arreglo al cambiar al botón seguiente
    const cancion = canciones[indiceActual]

    // *Cambia la cancion
    audio.setAttribute('src', cancion.cancion);

    audio.play()

    btnReproducirPausar.innerHTML = '<i class="bi bi-pause-fill"></i>'

    // *mantenemos el booleano en true para que no importe si la canción está pausada o no, se reproduzca siempre la siguiente al presionar el botón de next
    reproduciendo = true
})

btnReproducirPausar.addEventListener('click', () => {
    // *acá no inicializamos la canción para que al pausar y luego volver a reproducir se reanude desde el punto que se pauso por eso se declara dentro del fetch data
    if (reproduciendo) {
        audio.pause()
        btnReproducirPausar.innerHTML = '<i class="bi bi-play-fill"></i>'
        reproduciendo = false
    }
    else {
        audio.play()
        btnReproducirPausar.innerHTML = '<i class="bi bi-pause-fill"></i>'
        reproduciendo = true
    }
})

btnLista.addEventListener('click', () => {
    contenedorLista.classList.add('active2');
})

// *sincronizar la barra de progreso con el audio de la canción
// *timeupdate es un evento que se dispara cuando se está reproduciendo la canción es propio de la etiqueta audio
audio.addEventListener('timeupdate', () => {

    // *1. obtenemos cuanto tiempo lleva reproducido el audio
    audio.currentTime;

    // *2. OBTENEMOS LA DURACIÓN TOTAL DE LA CANCIÓN
    audio.duration

    // *3. calculamos el porcentaje de progreso, dividiendo el tiempo actual por la duración total de la canción y multiplicando por 100 y lo guardamos en una variable

    let porcentaje = 0

    // *4. acá decimos que si la duración total de la canción es 0 entonces se ejecute la operación para actualizar la barra de progreso y el movimiento de la bolita lo multiplicamos entre 100 para que se vuelva porcentaje
    if (audio.duration) {
        porcentaje = audio.currentTime / audio.duration * 100
    }

    // *5. vamos a actualizar la barra amarilla junto con la bolita, importante agregar el % para que el gradient de la barra lo interprete correctamente
    barraDeProgreso.style.setProperty('--value', `${porcentaje}%`)

    // *6. le asignamos el valor guardado en porcentaje a la barra de progreso
    barraDeProgreso.value = porcentaje

    // *7. movemos dinámicamente los segundos

    if (audio.duration) {
        let tiempoRestante = audio.duration - audio.currentTime;

        
        let minutosActual = Math.floor(audio.currentTime / 60);
        let segundosActual = Math.floor(audio.currentTime % 60);
        
        let minutosTotal = Math.floor(tiempoRestante / 60);
        let segundosTotal = Math.floor(tiempoRestante % 60);

        // *8. si los segundos son menores que 10, agregamos un 0 al frente
        if (segundosActual < 10) {
            segundosActual = "0" + segundosActual;
        }

        if (segundosTotal < 10) {
            segundosTotal = "0" + segundosTotal
        }

        // *9. mostrar los tiempos en pantalla
        inicio.textContent = minutosActual + ":" + segundosActual;
        fin.textContent = "-" + minutosTotal + ":" + segundosTotal;
    }
})

// *hacer una función para que al mover la bolita de la barra la canción se actualice al punto exacto
barraDeProgreso.addEventListener('input', () => {
    // *tomamos el valor actual de la barra con el .value que es un input
    barraDeProgreso.value;
    // *declaramos una variable inicializada en 0 para guardar el resultado de multiplicar y el valor actual de la barra por la duración real de la canción divido por 100 multiplicamos y divimos entre 100 para pasar un valor porcentual a segundos reales
    let nuevoTiempo = 0

    // *guardamos el resultado en la variable
    nuevoTiempo = (barraDeProgreso.value * audio.duration) / 100;

    // *guardamos en el tiempo transcurrido la variable con el resultado para así terminar la función
    audio.currentTime = nuevoTiempo;
})

function mostrarCancionesEnLista() {

    canciones.forEach((cancion, indice) => {
        const fila = document.createElement('div');
        fila.classList.add('fila');

        const contImg = document.createElement('div');
        contImg.classList.add('cont-img');

        const img = document.createElement('img');
        img.setAttribute('src', cancion.caratula);
        img.setAttribute('alt', cancion.nombre);

        const contInfo = document.createElement('div');
        contInfo.classList.add('cont-info');

        const h3 = document.createElement('h3');
        h3.textContent = cancion.nombre;

        const h4 = document.createElement('h4');
        h4.textContent = cancion.artista

        const boton = document.createElement('button');
        boton.innerHTML = '<i class="bi bi-play-fill"></i>'
        boton.addEventListener('click', () => {

            // *cambiamos el índice actual
            indiceActual = indice;

            // *mostramos los datos de esa canción (nombre, artista, carátula, fondo)
            mostrarCanciones(indiceActual);

            // *cambiamos la fuente del audio a la canción seleccionada
            audio.setAttribute('src', cancion.cancion);

            // *reproducimos la canción
            audio.play();

            // *actualizamos los íconos de reproducción
            boton.innerHTML = '<i class="bi bi-pause-fill"></i>';
            btnReproducirPausar.innerHTML = '<i class="bi bi-pause-fill"></i>';

            // *cambiamos el estado
            reproduciendo = true;

            contenedorLista.classList.remove('active2')
        })

        contenedorCanciones.appendChild(fila);

        fila.appendChild(contImg);
        fila.appendChild(contInfo);
        fila.appendChild(boton);
        contImg.appendChild(img);
        contInfo.appendChild(h3);
        contInfo.appendChild(h4);
    })
}

botonListaRegreso.addEventListener('click', () => {
    contenedorLista.classList.remove('active2');
})