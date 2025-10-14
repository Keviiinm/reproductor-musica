const fondo = document.querySelector('.app')
const contCaratula = document.getElementById('contenedor-caratula');
const titulo = document.getElementById('titulo-cancion');
const artista = document.getElementById('nombre-artista');
const btnAleatorio = document.getElementById('btn-shuffle');
const btnPrev = document.getElementById('btn-atras');
const btnReproducirPausar = document.getElementById('btn-reproducir');
const btnNext = document.getElementById('btn-siguiente');
const audio = document.getElementById('audio');
const btnPlaypause = document.getElementById('btn-reproducir');

let aleatorioActivo = false;
let reproduciendo = false
let canciones = []
let indiceActual = 0

document.addEventListener('DOMContentLoaded', () => {
    fetch("../json/canciones.json")

        .then(response => response.json())

        .then(data => {
            canciones = data
            mostrarCanciones(indiceActual)

        })
})

// *MOSTRAR CANCIONES 
function mostrarCanciones(indice) {
    const cancion = canciones[indice]

    // ESTO SE USA PARA MODIFICAR UNA VARIABLE CSS DESDE JAVASCRIPT
    fondo.style.setProperty('--fondo-caratula', `url(${cancion.caratula})`)

    contCaratula.innerHTML = `
        <img src="${cancion.caratula}"  alt="${cancion.nombre}">
    `

    titulo.textContent = cancion.nombre
    artista.textContent = cancion.artista
}

// * BOTON ANTERIOR
btnPrev.addEventListener('click', () => {
    if (indiceActual === 0) {
        indiceActual = canciones.length - 1
    }
    else {
        indiceActual--;
    }

    mostrarCanciones(indiceActual);
})

// *BOTON SIGUIENTE
btnNext.addEventListener('click', () => {
    // *modo aleatorio
    if (aleatorioActivo) {
        let nuevoIndice
        do {
            nuevoIndice = math.floor(math.random() * canciones.length)
        } while (nuevoIndice === indiceActual && canciones.length > 1)
        indiceActual = nuevoIndice

        // *modo normal
    } else {

        if (indiceActual === canciones.length - 1) {
            indiceActual = 0
        }
        else {
            indiceActual++;
        }
    }

    mostrarCanciones(indiceActual);
    if (reproduciendo) audio.play();
});


btnPlaypause.addEventListener('click', () => {

    const cancion = canciones[indiceActual]
    audio.setAttribute('src', cancion.cancion)


    if (reproduciendo) {
        audio.pause();

        btnPlaypause.innerHTML = `<i class="bi bi-play-fill"></i>`;
    } else {
        audio.play();

        btnPlaypause.innerHTML = `<i class="bi bi-pause-fill"></i>`;
    }
    reproduciendo = !reproduciendo
})

btnAleatorio.addEventListener("click", () => {

    aleatorioActivo = !aleatorioActivo

    if (aleatorioActivo) {
        btnAleatorio.classList.add("activo")
    } else {
        btnAleatorio.classList.remove("activo")
    }
})