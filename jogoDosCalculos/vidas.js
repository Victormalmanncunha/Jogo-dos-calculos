const divPergunta = document.querySelector("#pergunta")
const resposta = document.querySelector("#resposta")
const contadorRespostaCorreta = document.querySelector("#respostaCorreta")
const contadorVidas = document.querySelector("#vidas")
const tempoContador = document.querySelector("#tempo")
var vidas = 3
var quantidadeCorreta = 0
var respostaCorreta
var temporizador
const operações = ["+", "-", "*", "/"]

contadorRespostaCorreta.innerHTML = `${quantidadeCorreta}`
contadorVidas.innerHTML = `${vidas}`


function gerarPergunta() {
    let numeroUm = Math.round(Math.random() * 10)
    let numeroDois = Math.round(Math.random() * 10)
    let operacaoEscolhida = operações[Math.round(Math.random() * 3)]
    divPergunta.innerHTML = `Quanto é ${numeroUm} ${operacaoEscolhida} ${numeroDois}`
    respostaCorreta = eval(`${numeroUm}${operacaoEscolhida}${numeroDois}`)
}
gerarPergunta()

function enterSubmit() {
    resposta.addEventListener("keypress", (e) => {
        if(e.key === "Enter"){
            e.preventDefault()
            if(Number(resposta.value) === respostaCorreta){
                resposta.value = "" 
                quantidadeCorreta += 1
                fimDeJogo()
                contadorRespostaCorreta.innerHTML = `${quantidadeCorreta}`
                clearInterval(temporizador)
                gerarPergunta()
                tempoPraResponder()
            }else{
                resposta.value = "" 
                vidas -= 1
                fimDeJogo()
                contadorVidas.innerHTML = `${vidas}`
                clearInterval(temporizador)
                gerarPergunta()
                tempoPraResponder()
            }
        }
    })
}
enterSubmit()

function tempoPraResponder() {
    let tempo = 10
    temporizador = setInterval(() => {
        tempoContador.innerHTML = `${tempo}`
        tempo -= 1
        if(tempo <= -1){
            vidas -= 1
            fimDeJogo()
            contadorVidas.innerHTML = `${vidas}`
            gerarPergunta()
            clearInterval(temporizador)
            tempoPraResponder()
        }
    }, 1000)
}
tempoPraResponder()

function fimDeJogo() {
    if(vidas === 0)document.querySelector("body").innerHTML = `<h1>FIM DE JOGO<h1><a href="index.html"><button>Sair</button></a><a href=""><button>Reiniciar</button></a>`
    if(quantidadeCorreta === 10)document.querySelector("body").innerHTML = `<h1>VITÓRIA</h1><a href="index.html"><button>Sair</button></a><a href=""><button>Reiniciar</button></a>`
}


