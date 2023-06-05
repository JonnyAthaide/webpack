import '../scss/main.scss'
import img from '../assets/webpack.png'

import imagemWebP from '../assets/webpack.png'

// Use a imagemWebP como quiser


const textComponent = ()=> {
    const elH1 = document.createElement('h1')
    elH1.innerHTML = "Olá server Mundo!"
    elH1.classList.add('title')
    return elH1
}

const imgComponent = ()=> {
    const elImg = new Image(300, 150)
    elImg.src = imagemWebP
    return elImg
}

document.body.appendChild(textComponent())
document.body.appendChild(imgComponent())