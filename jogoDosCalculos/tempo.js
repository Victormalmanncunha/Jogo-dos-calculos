const divPergunta = document.querySelector("#pergunta")
const resposta = document.querySelector("#resposta")
const contadorRespostaCorreta = document.querySelector("#respostaCorreta")
const contadorRespostaErrada = document.querySelector("#respostaErrada")
const tempoContador = document.querySelector("#tempo")
var quantidadeErrada = 0
var quantidadeCorreta = 0
var respostaCorreta
var temporizador
var checadorDeDerrota
var tempo = 10
var tempoTotal = 0
var maiorTempo = localStorage.getItem(`maiorTempo`)
const operações = ["+", "-", "*", "/"]

contadorRespostaCorreta.innerHTML = `${quantidadeCorreta}`
contadorRespostaErrada.innerHTML = `${quantidadeErrada}`


function gerarPergunta() {
    var countDecimals = function (value) {
        if(Math.floor(value) === value) return 0;
        return value.toString().split(".")[1].length || 0;
    }
    let numeroUm = Math.round(Math.random() * 20)
    let numeroDois = Math.round(Math.random() * 20)
    let operacaoEscolhida = operações[Math.round(Math.random() * 3)]
    respostaCorreta = eval(`${numeroUm}${operacaoEscolhida}${numeroDois}`)
    while(countDecimals(respostaCorreta) > 0){
        numeroUm = Math.round(Math.random() * 10)
        numeroDois = Math.round(Math.random() * 10)
        operacaoEscolhida = operações[Math.round(Math.random() * 3)]
        respostaCorreta = eval(`${numeroUm}${operacaoEscolhida}${numeroDois}`)
     }
    console.log(countDecimals(respostaCorreta))
    divPergunta.innerHTML = `Quanto é ${numeroUm} ${operacaoEscolhida} ${numeroDois}`
}
gerarPergunta()

function enterSubmit() {
    resposta.addEventListener("keypress", (e) => {
        if(e.key === "Enter"){
            e.preventDefault()
            if(Number(resposta.value) === respostaCorreta){
                resposta.value = "" 
                quantidadeCorreta += 1
                contadorRespostaCorreta.innerHTML = `${quantidadeCorreta}`
                tempo += 2
                gerarPergunta()
            }else{
                resposta.value = "" 
                quantidadeErrada += 1
                contadorRespostaErrada.innerHTML = `${quantidadeErrada}`
                tempo -= 2
                gerarPergunta()
            }
        }
    })
}
enterSubmit()

function tempoPraResponder() {
    temporizador = setInterval(() => {
        tempoContador.innerHTML = `${tempo}`
        tempo -= 1
        tempoTotal += 1
    }, 1000)
    checadorDeDerrota = setInterval(() => {
        if(tempo < 0){
            clearInterval(temporizador)
            clearInterval(checadorDeDerrota)

            if(maiorTempo<tempoTotal){
                localStorage.setItem(`maiorTempo`, tempoTotal)
                document.querySelector("body").innerHTML = `<h1>FIM DE JOGO<h1><p>Novo recorde!: ${localStorage.getItem(`maiorTempo`)} Segundos</p><a href="index.html"><button>Sair</button></a><a href=""><button>Reiniciar</button></a>`
            }else{
                document.querySelector("body").innerHTML = `<h1>FIM DE JOGO<h1><p>Tempo: ${tempoTotal} Segundos</p><p>Recorde: ${localStorage.getItem(`maiorTempo`)} Segundos</p><a href="index.html"><button>Sair</button></a><a href=""><button>Reiniciar</button></a>`
            }
        }
    })
}
tempoPraResponder()

