const $ = ele => document.querySelector(ele)
const listaTemas = $('#listaTemas')
const standars = $('#standars')
const bossa = $('#bossa')
const blues = $('#blues')
const videos = $('#videos')
const fotos = $('#fotos')
const reproductor = $('#reproductor')
//
const listaDatos = DATOS => {
    let dir, tipo, nombre
    for (let i in DATOS.elementos) {
        dir = DATOS.elementos[i].direccion
        tipo = DATOS.elementos[i].tipo
        nombre = DATOS.elementos[i].nombre
        if (tipo === "video") {
            videos.innerHTML += `<li id="elemento${[i]}" onclick="window.open('${dir}',
                'blank')" class="elemento">${nombre}</li>`
        } else if (tipo === "foto") {
            fotos.innerHTML += `<li id="elemento${[i]}" onclick="window.open('${dir}',
                'blank')" class="elemento">${nombre}</li>`
        } else if (tipo === "jazz") {
            standars.innerHTML += `<li id="elemento${[i]}" onclick="play('${dir}')" 
            class="elemento"><img src="img/play.svg">${nombre}</li>`
        } else if (tipo === "bossa") {
            bossa.innerHTML += `<li id="elemento${[i]}" onclick="play('${dir}')" 
            class="elemento"><img src="img/play.svg">${nombre}</li>`
        } else if (tipo === "blues" || tipo === "intemporal") {
            blues.innerHTML += `<li id="elemento${[i]}" onclick="play('${dir}')" 
            class="elemento"><img src="img/play.svg">${nombre}</li>`
        }
    }
}
const play = tema => {
    window.open(`MP3/${tema}`, 'blank')
}
const t = new Date().getTime()
fetch(`datos.json?t=${t}`)
    .then(response => response.json())
    .then(data => {
        data.elementos.reverse()
        listaDatos(data)
    })