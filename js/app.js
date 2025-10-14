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

let canciones = []
let indiceActual = 0
let reproduciendo = false
let aleatorio = false


document.addEventListener('DOMContentLoaded', () => {
    fetch("json/canciones.json")

        .then(response => response.json())

        .then(data => {
            canciones = data

            mostrarCanciones(indiceActual)
            // INICIALIZAMOS EL SRC AQUÍ PARA PODER USARLO EN EL BOTÓN DE REPRODUCIR
            audio.setAttribute('src', canciones[indiceActual].cancion)

            mostrarCancionesEnLista()
        })

        .catch(error => {
            console.error("No se cargó el archivo JSON", error)
        })
})

function mostrarCanciones(indice) {
    const cancion = canciones[indice]

    // ESTO SE USA PARA MODIFICAR UNA VARIABLE CSS DESDE JAVASCRIPT
    fondo.style.setProperty('--fondo-caratula', `url('${cancion.caratula}')`)

    contCaratula.innerHTML = `
        <img src="${cancion.caratula}"  alt="${cancion.nombre}">
    `

    titulo.textContent = cancion.nombre
    artista.textContent = cancion.artista
}

btnAleatorio.addEventListener('click', () => {
    // ESTO LO HACEMOS PARA ALTERNAR EL ESTADO DEL BOOLEANO AL DAR CLICK
    aleatorio = !aleatorio

    if (aleatorio) {
        btnAleatorio.classList.add('active');
    }
    else {
        btnAleatorio.classList.remove('active');
    }
})

btnPrev.addEventListener('click', () => {
    if (aleatorio) {
        // MATH.RANDOM LO QUE HACE ES DAR UN NÚMERO ALEATORIO ENTRE 0 Y 1 0 INCLIDO Y 1 EXCLUIDO, AL MULTIPLICARLO POR LA LONGITUD DEL ARREGLO LO QUE HACE ES QUE DA UN NÚMERO ENTRE 0 Y LA LONGITUD TOTAL DE LAS CANCIONES, Y EL MATH.FLOOR LO QUE HACE ES REDONDEAR HACIA ABAJO, HACIA EL ENTERO MÁS CERCANO PARA ASÍ DAR UN ÍNDICE VÁLIDO. EJEMPLO: SI ÍNDICE ALEATORIO DIÓ 4.20 EL MATH.FLOOR LO REDONDEA A 4. UNA VEZ SABIENDO TODO ESTO, DENTRO DEL CONDICIONAL LE DECIMOS QUE SI LA VARIABLE BOOLEANA ESTÁ ACTIVA ENTONCES SE ACTIVE LO DEL ÍNDICE ALEATORIO Y SI NO, SE EJECUTE NORMAL EL PROCESO.
        const indiceAleatorio = Math.floor(Math.random() * (canciones.length));
        // GUARDAMOS EN LA VARIABLE INDICEACTUAL EL VALOR ALEATORIO QUE SE GUARDA EN LA VARIABLE INDICE ALEATORIO
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

    // REPRODUCIMOS LA CANCIÓN DESPUES DE ACTUALIZAR EL ÍNDICE O SI NO SE REPRODUCE LA CANCIÓN ANTERIOR EN EL ARREGLO AL CAMBIAR AL BOTÓN ANTERIOR
    const cancion = canciones[indiceActual]

    // CAMBIAMOS LA CANCIÓN
    audio.setAttribute('src', cancion.cancion);

    audio.play()

    btnReproducirPausar.innerHTML = '<i class="bi bi-pause-fill"></i>'

    // MANTENEMOS EL BOOLEANO EN TRUE PARA QUE NO IMPORTE SI LA CANCIÓN ESTÁ PAUSADA O NO, SE REPRODUZCA SIEMPRE LA SIGUIENTE AL PRESIONAR EL BOTÓN DE NEXT
    reproduciendo = true
})

btnNext.addEventListener('click', () => {
    // HACER LA FUNCIONALIDAD PARA LAS CANCIONES ALEATORIAS
    if (aleatorio) {
        // MATH.RANDOM LO QUE HACE ES DAR UN NÚMERO ALEATORIO ENTRE 0 Y 1 0 INCLIDO Y 1 EXCLUIDO, AL MULTIPLICARLO POR LA LONGITUD DEL ARREGLO LO QUE HACE ES QUE DA UN NÚMERO ENTRE 0 Y LA LONGITUD TOTAL DE LAS CANCIONES, Y EL MATH.FLOOR LO QUE HACE ES REDONDEAR HACIA ABAJO, HACIA EL ENTERO MÁS CERCANO PARA ASÍ DAR UN ÍNDICE VÁLIDO. EJEMPLO: SI ÍNDICE ALEATORIO DIÓ 4.20 EL MATH.FLOOR LO REDONDEA A 4. UNA VEZ SABIENDO TODO ESTO, DENTRO DEL CONDICIONAL LE DECIMOS QUE SI LA VARIABLE BOOLEANA ESTÁ ACTIVA ENTONCES SE ACTIVE LO DEL ÍNDICE ALEATORIO Y SI NO, SE EJECUTE NORMAL EL PROCESO.
        const indiceAleatorio = Math.floor(Math.random() * (canciones.length));
        // GUARDAMOS EN LA VARIABLE INDICEACTUAL EL VALOR ALEATORIO QUE SE GUARDA EN LA VARIABLE INDICE ALEATORIO
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

    // REPRODUCIMOS LA CANCIÓN DESPUES DE ACTUALIZAR EL ÍNDICE O SI NO SE REPRODUCE LA CANCIÓN ANTERIOR EN EL ARREGLO AL CAMBIAR AL BOTÓN SEGUIENTE
    const cancion = canciones[indiceActual]

    // CAMBIAMOS LA CANCIÓN
    audio.setAttribute('src', cancion.cancion);

    audio.play()

    btnReproducirPausar.innerHTML = '<i class="bi bi-pause-fill"></i>'

    // MANTENEMOS EL BOOLEANO EN TRUE PARA QUE NO IMPORTE SI LA CANCIÓN ESTÁ PAUSADA O NO, SE REPRODUZCA SIEMPRE LA SIGUIENTE AL PRESIONAR EL BOTÓN DE NEXT
    reproduciendo = true
})

btnReproducirPausar.addEventListener('click', () => {
    // ACÁ NO INICIALIZAMOS LA CANCIÓN PARA QUE AL PAUSAR Y LUEGO VOLVER A REPRODUCIR SE REANUDE DESDE EL PUNTO QUE SE PAUSO POR ESO SE DECLARA DENTRO DEL FETCH DATA
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

// SINCRONIZAR LA BARRA DE PROGRESO CON EL AUDIO DE LA CANCIÓN
// timeupdate ES UN EVENTO QUE SE DISPARA CUANDO SE ESTÁ REPRODUCIENDO LA CANCIÓN ES PROPIO DE LA ETIQUETA AUDIO
audio.addEventListener('timeupdate', () => {
    // 1. OBTENEMOS CUANTO TIEMPO LLEVA REPRODUCIDO EL AUDIO
    audio.currentTime;

    // 2. OBTENEMOS LA DURACIÓN TOTAL DE LA CANCIÓN
    audio.duration

    // 3. CALCULAMOS EL PORCENTAJE DE PROGRESO, DIVIDIENDO EL TIEMPO ACTUAL POR LA DURACIÓN TOTAL DE LA CANCIÓN Y MULTIPLICANDO POR 100 Y LO GUARDAMOS EN UNA VARIABLE

    let porcentaje = 0

    // 4. ACÁ DECIMOS QUE SI LA DURACIÓN TOTAL DE LA CANCIÓN ES 0 ENTONCES SE EJECUTE LA OPERACIÓN PARA ACTUALIZAR LA BARRA DE PROGRESO Y EL MOVIMIENTO DE LA BOLITA LO MULTIPLICAMOS ENTRE 100 PARA QUE SE VUELVA PORCENTAJE
    if (audio.duration) {
        porcentaje = audio.currentTime / audio.duration * 100
    }

    // 5. VAMOS A ACTUALIZAR LA BARRA AMARILLA JUNTO CON LA BOLITA, IMPORTANTE AGREGAR EL % PARA QUE EL GRADIENT DE LA BARRA LO INTERPRETE CORRECTAMENTE
    barraDeProgreso.style.setProperty('--value', `${porcentaje}%`)

    // 6. LE ASIGNAMOS EL VALOR GUARDADO EN PORCENTAJE A LA BARRA DE PROGRESO
    barraDeProgreso.value = porcentaje

    // 7. MOVEMOS DINÁMICAMENTE LOS SEGUNDOS
    // 7.1 ESTA VARIABLE TIEMPO RESTANTE ES PARA QUE LOS MINUTOS Y SEGUNDOS TOTALES SE VAYAN RESTANDO CUANDO LA DURACIÓN ACTUAL DE LA CANCIÓN VAYA INCREMENTANDOSE

    if (audio.duration) {
        let tiempoRestante = audio.duration - audio.currentTime;

        // 7.2 MOSTRAMOS LOS MINUTOS Y SEGUNDOS
        // 7.3 MINUTOSACTUAL Y SEGUNDOSACTUAL SON LOS MINUTOS Y SEGUNDOS DE LA IZQUIERDA
        // MATH.FLOOR SIRVE PARA REDONDEAR UN NÚMERO DECIMAL A ENTERO
        // LA OPERACIÓN CON EL % LO QUE ESTÁ HACIENDO ES TOMAR EL RESTANTE DE LA DIVISIÓN ES DECIR SI LA DIVISIÓN DIÓ 1.05 LO QUE HACE EL % ES TOMAR EL .05 ENTONCES EL % TOMA LOS SEGUNDOS DE LA CANCIÓN
        let minutosActual = Math.floor(audio.currentTime / 60);
        let segundosActual = Math.floor(audio.currentTime % 60);
        // 7.4 MINUTOSTOTAL Y SEGUNDOSTOTAL SON LOS MINUTOS Y SEGUNDOS DE LA DERECHA
        // MATH.FLOOR SIRVE PARA REDONDEAR UN NÚMERO DECIMAL A ENTERO
        // LA OPERACIÓN CON EL % LO QUE ESTÁ HACIENDO ES TOMAR EL RESTANTE DE LA DIVISIÓN ES DECIR SI LA DIVISIÓN DIÓ 1.05 LO QUE HACE EL % ES TOMAR EL .05 ENTONCES EL % TOMA LOS SEGUNDOS DE LA CANCIÓN
        let minutosTotal = Math.floor(tiempoRestante / 60);
        let segundosTotal = Math.floor(tiempoRestante % 60);

        // 8. SI LOS SEGUNDOS SON MENORES QUE 10, AGREGAMOS UN 0 AL FRENTE
        if (segundosActual < 10) {
            segundosActual = "0" + segundosActual;
        }

        if (segundosTotal < 10) {
            segundosTotal = "0" + segundosTotal
        }

        // 9. MOSTRAR LOS TIEMPOS EN PANTALLA
        inicio.textContent = minutosActual + ":" + segundosActual;
        fin.textContent = "-" + minutosTotal + ":" + segundosTotal;
    }
})

// HACER UNA FUNCIÓN PARA QUE AL MOVER LA BOLITA DE LA BARRA LA CANCIÓN SE ACTUALICE AL PUNTO EXACTO
barraDeProgreso.addEventListener('input', () => {
    // TOMAMOS EL VALOR ACTUAL DE LA BARRA CON EL .VALUE QUE ES UN INPUT
    barraDeProgreso.value;
    // DECLARAMOS UNA VARIABLE INICIALIZADA EN 0 PARA GUARDAR EL RESULTADO DE MULTIPLICAR Y EL VALOR ACTUAL DE LA BARRA POR LA DURACIÓN REAL DE LA CANCIÓN DIVIDO POR 100 MULTIPLICAMOS Y DIVIMOS ENTRE 100 PARA PASAR UN VALOR PORCENTUAL A SEGUNDOS REALES
    let nuevoTiempo = 0

    // GUARDAMOS EL RESULTADO EN LA VARIABLE
    nuevoTiempo = (barraDeProgreso.value * audio.duration) / 100;

    // GUARDAMOS EN EL TIEMPO TRANSCURRIDO LA VARIABLE CON EL RESULTADO PARA ASÍ TERMINAR LA FUNCIÓN
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

            // cambiamos el índice actual
            indiceActual = indice;

            // mostramos los datos de esa canción (nombre, artista, carátula, fondo)
            mostrarCanciones(indiceActual);

            // cambiamos la fuente del audio a la canción seleccionada
            audio.setAttribute('src', cancion.cancion);

            // reproducimos la canción
            audio.play();

            // actualizamos los íconos de reproducción
            boton.innerHTML = '<i class="bi bi-pause-fill"></i>';
            btnReproducirPausar.innerHTML = '<i class="bi bi-pause-fill"></i>';

            // cambiamos el estado
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