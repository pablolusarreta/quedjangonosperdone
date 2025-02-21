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
    } else if (tipo === 'video') {
        window.open(url, '_blank')
    }

}
const reescala = () => {
    let ancho = window.innerWidth;
    let zoom = ancho / 2000
    zoom = zoom < 1 ? 1 : zoom
    document.body.style.zoom = zoom
    //console.log(zoom)
}
//
const $ = ele => document.querySelector(ele)
const idiomas = ['castellano', 'euskera']
const elementos = $('#lista')
const pie = $('footer')
const IF = $("#imgFondo")
let temSel = 'elemento0'
//
IF.addEventListener('load', () => {
    IF.style.opacity = "1"
    IF.style.filter = "blur(0px)"
})
IF.setAttribute("src", "img/Portada.webp")
// ARRANQUE

const esmovil = (/Android|iPhone|iPad|Mobile/i.test(navigator.userAgent))
const t = new Date().getTime()
fetch(`datos.json?t=${t}`)
    .then(response => response.json())
    .then(data => {
        data.elementos.reverse()
        const DATOS = data
        for (let i in DATOS.elementos) {
            elementos.innerHTML += `<div id="elemento${[i]}" onclick="play('${DATOS.elementos[i].direccion}.mp3','${DATOS.elementos[i].tipo}',this)" class="elemento">
                <img src="img/${DATOS.elementos[i].tipo}.png" alt="·">${DATOS.elementos[i].nombre}</div>`
        }
        for (let i in DATOS.pie) {
            pie.innerHTML += esmovil || DATOS.pie[i].pc ? `<div><a href="${DATOS.pie[i].direccion}" target="_blank">
                <img src="${DATOS.pie[i].img}"><br>${DATOS.pie[i].nombre}</a></div>` : ''
        }
        reescala()
    })

window.onresize = reescala