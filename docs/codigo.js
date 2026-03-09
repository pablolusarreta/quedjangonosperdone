const $ = ele => document.querySelector(ele)
const listaTemas = $('#listaTemas')
const standars = $('#standars')
const bossa = $('#bossa')
const blues = $('#blues')
const videos = $('#videos')
const fotos = $('#fotos')
const reproductor = $('#reproductor')


const listaVideos = () => {
    for (let i in DATOS.elementos) {
        if (DATOS.elementos[i].tipo === "video") {
            videos.innerHTML += `<li id="elemento${[i]}" onclick="window.open('${DATOS.elementos[i].direccion}',
                'blank')" class="elemento">${DATOS.elementos[i].nombre}</li>`
        }
    }
}
const listaFotos = () => {
    for (let i in DATOS.elementos) {
        if (DATOS.elementos[i].tipo === "foto") {
            fotos.innerHTML += `<li id="elemento${[i]}" onclick="window.open('${DATOS.elementos[i].direccion}',
                'blank')" class="elemento">${DATOS.elementos[i].nombre}</li>`
        }
    }
}
const listaStandars = () => {
    for (let i in DATOS.elementos) {
        if (DATOS.elementos[i].tipo === "jazz") {
            standars.innerHTML += `<li id="elemento${[i]}" onclick="play('${DATOS.elementos[i].direccion}',
                '${DATOS.elementos[i].tipo}',this)" class="elemento">
                <img src="img/play.svg">${DATOS.elementos[i].nombre}</li>`
        }
    }
}
const listaBossa = () => {
    for (let i in DATOS.elementos) {
        if (DATOS.elementos[i].tipo === "bossa") {
            bossa.innerHTML += `<li id="elemento${[i]}" onclick="play('${DATOS.elementos[i].direccion}',
                '${DATOS.elementos[i].tipo}',this)" class="elemento"> 
                <img src="img/play.svg">${DATOS.elementos[i].nombre}</li>`
        }
    }
}
const listaBlues = () => {
    for (let i in DATOS.elementos) {
        if (DATOS.elementos[i].tipo === "blues" || DATOS.elementos[i].tipo === "intemporal") {
            blues.innerHTML += `<li id="elemento${[i]}" onclick="play('${DATOS.elementos[i].direccion}',
                '${DATOS.elementos[i].tipo}',this)" class="elemento"> 
                <img src="img/play.svg">${DATOS.elementos[i].nombre}</li>`
        }
    }
}

const play = tema => {
    window.open(`MP3/${tema}`, 'blank')
}
let DATOS
const t = new Date().getTime()
fetch(`datos.json?t=${t}`)
    .then(response => response.json())
    .then(data => {
        data.elementos.reverse()
        DATOS = data

        listaStandars()
        listaBlues()
        listaBossa()
        listaVideos()
        listaFotos()
    })