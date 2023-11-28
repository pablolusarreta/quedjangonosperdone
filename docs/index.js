const idiomas = ['castellano', 'euskera']
let DATOS, temas, pie
const inicio = () => {
    // CONSTANTES
    temas = document.getElementById('lista')

    pie = document.getElementsByTagName('footer')[0]
    // ARRANQUE
    fetch("temas.json")
        .then(response => response.json())
        .then(data => {
            DATOS = data
            for (let i in DATOS.tema) {
                temas.innerHTML += `<div id="tema${[i]}" onclick="play('${DATOS.tema[i]}.mp3',this)">${DATOS.tema[i]}</div>`
            }
            reescala()
            movil()
        })
}
const inicia_lista = () => {
    for (let i in DATOS.tema) {
        document.getElementById('tema'+i).style.color = 'var(--color2)'
    }  
}
const play = (tema, ob) => {
    inicia_lista()
    let player = document.getElementById('player')
    player.innerHTML = `<audio controls autoplay>
                        <source src="MP3/${tema}" type="audio/mpeg">
                    </audio>`
    ob.style.color = 'var(--color3)'
}
const reescala = () => {
    let ancho = window.innerWidth;
    let zoom = ancho / 1500
    zoom = zoom < 1 ? 1 : zoom
    console.log(ancho, zoom)
    document.body.style.zoom = zoom
}
const movil = () => {
    if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)) {
        console.log('Movil')
        //document.getElementById("estilo").setAttribute('href', 'movil.css')
    }
}
window.onresize = reescala
window.onload = inicio