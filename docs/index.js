// si es un ordenador redirecciona 
const redirige = () => { location.href = "web.html" }
if (!(navigator.userAgentData && navigator.userAgentData.mobile)) {
    redirige()
}
///////////////////////////////////////////////////////////////////////////////////////////
const play = (url, tipo, ob) => {
    if (tipo === "jazz" || tipo === "bossa" || tipo === "blues") {
        if (reproductor.firstChild) reproductor.innerHTML = ""
        reproductor.addEventListener('click', reproductorOff)
        reproductor.style.display = "flex"
        const tema = document.createElement("div")
        tema.innerText = url
        reproductor.appendChild(tema)
        const audio = document.createElement("audio")
        audio.setAttribute("controls", '')
        audio.setAttribute("autoplay", '')
        audio.addEventListener('ended', reproductorOff)
        const source = document.createElement("source")
        source.setAttribute("src", `MP3/${url}`)
        source.setAttribute("type", 'audio/mpeg')
        audio.appendChild(source)
        reproductor.appendChild(audio)
        //
    } else if (tipo === 'video') {
        ampliaVideo(url)
    } else if (tipo === 'foto') {
        ampliaFoto(url)
    }
    ob.style.color = 'var(--gris)'
}
const reproductorOff = () => {
    reproductor.style.display = "none"
    reproductor.innerHTML = ""
}
const ampliaFoto = img => {
    ampliacion.innerHTML = `<img src="${img}">`
    ampliacion.style.display = 'flex'
}
const ampliaVideo = url => {
    ampliacion.innerHTML = `<iframe id="videoYT" width="1600" height="900" 
    src="${url}" title="YouTube video player" frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
    gyroscope; picture-in-picture; web-share" 
    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
    </iframe>`
    ampliacion.style.display = 'flex'
}
const $ = ele => document.querySelector(ele)
const elementos = $('#lista')
const pie = $('footer')
const reproductor = $('#reproductor')
const ampliacion = $('#ampliacion')
ampliacion.addEventListener('click', () => {
    ampliacion.innerHTML = ''
    ampliacion.style.display = 'none'
})
const info = $('#masinfo')
info.addEventListener('click', redirige)
let horizontal = true
const pantalla = () => {
    const videoYT = $('#videoYT')
    horizontal = (window.innerWidth / window.innerHeight > 1) ? true : false;
    if (horizontal) {
        videoYT.setAttribute('width', '800')
        videoYT.setAttribute('height', '450')
    } else {
        videoYT.setAttribute('width', '1600')
        videoYT.setAttribute('height', '900')
    }
}

window.addEventListener('resize', pantalla)
screen.orientation.addEventListener("change", pantalla)
const titulo = $('header')
titulo.addEventListener('click', () => { location.reload() })
// ARRANQUE ///////////////////////////////////////////////////////////////////////////////
const t = new Date().getTime()
fetch(`datos.json?t=${t}`)
    .then(response => response.json())
    .then(data => {
        data.elementos.reverse()
        const DATOS = data
        for (let i in DATOS.elementos) {
            elementos.innerHTML += `<li id="elemento${[i]}" onclick="play('${DATOS.elementos[i].direccion}',
                '${DATOS.elementos[i].tipo}',this)" class="elemento">
                <img src="img/${DATOS.elementos[i].tipo}.webp" title="${DATOS.elementos[i].tipo}">${DATOS.elementos[i].nombre}</li>`
        }
    })
pantalla()
