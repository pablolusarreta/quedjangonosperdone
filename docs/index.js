const idiomas = ['castellano', 'euskera']
let idioma_sel, foto, DATOS
const inicio = () => {
    // CONSTANTES
    const temas = document.getElementById('lista')
    const player = document.getElementById('player')
    const pie = document.getElementsByTagName('footer')[0]
    // ARRANQUE
    fetch("temas.json")
        .then(response => response.json())
        .then(data => {
            DATOS = data
            for (let i in data.tema) {
                temas.innerHTML += `<div onclick="play('${data.tema[i]}.mp3')">${data.tema[i]}</div>`
            }
            temas.innerHTML += `<div id="player"></div>`

        })
}
const play = tema => {
    player.innerHTML = `<audio controls autoplay>
                        <source src="MP3/${tema}" type="audio/mpeg">
                    </audio>`
}
window.onload = inicio