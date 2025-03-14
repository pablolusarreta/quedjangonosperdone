const play = (url, tipo, ob) => {
    if (tipo === "jazz" || tipo === "bossa" || tipo === "blues") {
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

window.addEventListener('load',()=>{
//
const $ = ele => document.querySelector(ele)
const elementos = $('#lista')
const pie = $('footer')

let temSel = 'elemento0'

if (screen.orientation) {
    screen.orientation.lock("portrait").then(() => {
        console.log("Orientación bloqueada en modo retrato.");
    }).catch((error) => {
        console.error("Error al bloquear la orientación:", error);
    });
} else {
    console.log("La API de orientación de pantalla no es compatible con este navegador.");
}
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
    })    
})
