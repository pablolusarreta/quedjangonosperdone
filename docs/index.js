const idiomas = ['castellano', 'euskera']
let DATOS, temas, pie;
let temSel = 'tema0'
const inicio = () => {
    // CONSTANTES
    temas = document.getElementById('lista')
    pie = document.getElementsByTagName('footer')[0]
    console.log(document.getElementById("imgFondo"))
    document.getElementById("imgFondo").style.opacity = "1"
    document.getElementById("imgFondo").addEventListener("load", () => {
        console.log("CARGADA")
    })
    // ARRANQUE
    fetch("temas.json")
        .then(response => response.json())
        .then(data => {
            DATOS = data
            for (let i in DATOS.tema) {
                temas.innerHTML += `<div id="tema${[i]}" onclick="play('${DATOS.tema[i]}.mp3',this)" class="tema">
                ${DATOS.tema[i]}</div>`
            }
            reescala()
            movil()
        })
}
const play = (tema, ob) => {
    document.getElementById(temSel).style.color = 'var(--color2)'
    let reproductor = document.getElementById('reproductor')
    if (reproductor.firstChild) reproductor.removeChild(reproductor.firstChild)
    const audio = document.createElement("audio")
    audio.setAttribute("controls", '')
    audio.setAttribute("autoplay", '')
    audio.addEventListener('ended', () => {
        reproductor.removeChild(reproductor.firstChild)
        document.getElementById(temSel).style.color = 'var(--color2)'
    })
    const source = document.createElement("source")
    source.setAttribute("src", `MP3/${tema}`)
    source.setAttribute("type", 'audio/mpeg')
    audio.appendChild(source)
    reproductor.appendChild(audio)

    temSel = ob.id
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