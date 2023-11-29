const idiomas = ['castellano', 'euskera']
let DATOS, elementos, pie, IF;
let temSel = 'elemento0'
const inicio = () => {
    // CONSTANTES
    elementos = document.getElementById('lista')
    pie = document.getElementsByTagName('footer')[0]
    IF = document.getElementById("imgFondo")
    IF.addEventListener('load', () => {
        IF.style.opacity = "1"
    })
    IF.setAttribute("src", "img/Portada.jpg")
    // ARRANQUE
    fetch("datos.json")
        .then(response => response.json())
        .then(data => {
            DATOS = data
            for (let i in DATOS.elementos) {
                elementos.innerHTML += `<div id="elemento${[i]}" onclick="play('${DATOS.elementos[i].direccion}.mp3','${DATOS.elementos[i].tipo}',this)" class="elemento">
                <img src="img/${DATOS.elementos[i].tipo}.png" alt="·">${DATOS.elementos[i].nombre}</div>`
            }
            reescala()
            movil()
        })
}
const play = (url, tipo, ob) => {
    
    if (tipo === "mp3") {
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
        source.setAttribute("src", `MP3/${url}`)
        source.setAttribute("type", 'audio/mpeg')
        audio.appendChild(source)
        reproductor.appendChild(audio)
        temSel = ob.id
        ob.style.color = 'var(--color3)'
    }else if(tipo === 'video'){
        window.open(url, '_blank')
    }
    
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
        document.body.style.zoom = "2"
        document.getElementById('titulo').style.fontSize = "40px"
        pie.style.width = "100%"
        pie.style.backgroundColor = "#000"
        IF.style.width = "100%"
    }
}
window.onresize = reescala
window.onload = inicio