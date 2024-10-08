function trocarModo (modo){
    mostrarTempo()
    buttons.forEach( function(modo){
        modo.classList.remove('active')
    })

    html.setAttribute('data-contexto', modo)
    appImg.setAttribute('src', `/imagens/${modo}.png`)
    
    switch (modo) {
        case 'foco':
            titulo.innerHTML=`Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;

        case 'descanso-curto':
            titulo.innerHTML=`Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
        break;

        case 'descanso-longo':
            titulo.innerHTML=`Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
        break;
    
        default:
            break;
    }
}

function temporizador (){
    if (timer > 0){
        timer -=1
        mostrarTempo()
    }else{
        alerta.play()
        alert('A contagem terminou!')
        zerar()
        return
    }
}

function pausarOuPlay (){
    if(intervalo){
        zerar()
        pausar.play()
        playTemp.innerHTML='Começar'
        playImg.setAttribute('src', '/imagens/play_arrow.png')
        return
    }
    comecar.play()
    playTemp.innerHTML='Pausar'
    playImg.setAttribute('src', '/imagens/pause.png')
    intervalo = setInterval(temporizador, 1000)
    mostrarTempo()
}

function zerar(){
    clearInterval(intervalo)
    intervalo=null
}

function mostrarTempo(){
    const tempoEmSegundos = new Date(timer*1000)
    const tempoFinal = tempoEmSegundos.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoTela.innerHTML= `${tempoFinal}`
}

let timer = 1500
let intervalo = null

const html     = document.querySelector('html');
const appImg   = document.querySelector('.app__image')
const titulo   = document.querySelector('.app__title')
const buttons  = document.querySelectorAll('.app__card-button')
const focoBt   = document.querySelector('.app__card-button--foco')
const curtoBt  = document.querySelector('.app__card-button--curto')
const longoBt  = document.querySelector('.app__card-button--longo')
const playTemp = document.querySelector('#start-pause span')
const playImg  = document.querySelector('.app__card-primary-butto-icon')
const toggle   = document.getElementById('alternar-musica')
const startBt  = document.getElementById('start-pause')
const tempoTela= document.querySelector('#timer')

const musica  = new Audio('/sons/luna-rise-part-one.mp3')
const comecar = new Audio('/sons/play.wav')
const pausar  = new Audio('/sons/pause.mp3')
const alerta  = new Audio('/sons/beep.mp3')

musica.loop=true
toggle.addEventListener('change', () => {
    if (musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

focoBt.addEventListener ('click', () => {
    timer = 1500
    trocarModo('foco')
    focoBt.classList.add('active')
})

    curtoBt.addEventListener('click', () => {
    timer = 300
    trocarModo('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    timer = 900
    trocarModo('descanso-longo')
    longoBt.classList.add('active')
})

startBt.addEventListener('click', pausarOuPlay);

mostrarTempo()
