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
        ob.style.color = 'var(--gris)'
    } else if (tipo === 'video') {
        window.open(url, '_blank')
    }else if (tipo === 'foto') {
        amplia(url)
    }
}
const reproductorOff = () => {
    reproductor.style.display = "none"
    reproductor.innerHTML = ""
}
const amplia = img => {
    ampliacion.innerHTML = `<img src="${img}">`
    ampliacion.addEventListener('click', () => {
        ampliacion.style.display = 'none'
    })
    ampliacion.style.display = 'flex'
}
const $ = ele => document.querySelector(ele)
const elementos = $('#lista')
const pie = $('footer')
const reproductor = $('#reproductor')
const ampliacion = $('#ampliacion')

const titulo = $('header')
titulo.addEventListener('click', () => { location.reload() })
// ARRANQUE
const t = new Date().getTime()
fetch(`datos.json?t=${t}`)
    .then(response => response.json())
    .then(data => {
        data.elementos.reverse()
        const DATOS = data
        for (let i in DATOS.elementos) {
            elementos.innerHTML += `<li id="elemento${[i]}" onclick="play('${DATOS.elementos[i].direccion}',
                '${DATOS.elementos[i].tipo}',this)" class="elemento">
                <img src="img/${DATOS.elementos[i].tipo}.webp" alt="·">${DATOS.elementos[i].nombre}</li>`
        }
        for (let i in DATOS.pie) {
            pie.innerHTML += `<div> <img src="img/${DATOS.pie[i].img}.webp"><a href="${DATOS.pie[i].direccion}" target="_blank">${DATOS.pie[i].nombre}</a></div>`
        }
    })

