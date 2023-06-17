const NUM_STUDS = 60;
const TEMPO_INICIAL = 20;
let points = 0;
let tempo = 0;
let timer = null;

const player = prompt("Qual seu nome?")

const placar = document.getElementById("pontos")

function criarElemento(nome, pontos) {
    const container = document.getElementById('container');
    const pessoa = document.createElement('h3');
    const pontuacao = document.createElement('h4');
    pessoa.textContent = nome;
    pontuacao.textContent = pontos;
    container.appendChild(pessoa, pontuacao);
  }

function iniciaJogo(){
 points = 0;
 tempo = TEMPO_INICIAL;
 let tela = document.getElementById("tela");
 tela.innerHTML = "";

 for(let i = 0; i < NUM_STUDS; ++i){
    let moeda = document.createElement("img");
    moeda.src = "download.jpeg";
    moeda.id = "m" + i;
    moeda.onclick = function()
    {
        pegaMoeda(this);
    }
    tela.appendChild(moeda);
    moeda.ondragstart =function(){
        return false;
    }
 }

 timer = setInterval(contaTempo, 1000)

 fetch('mongodb://127.0.0.1:27017')
 .then(response => {
     if (!response.ok) {
       throw new Error('Erro no placar de líderes');
     }
     return response.json();
   })
   .then(data => {
     console.log(data.results);
     const jogadores = data.results;
     pontosMostrar.forEach( jogador => {
       criarElemento(jogador.nome, jogador.points);
     });

   })
   .catch(error => {
     console.error(error);
   });
}
function pegaMoeda(moeda) {
    if(tempo <= 0) return;

    moeda.src="moedinha lego.jpg";
    ++points;

    let contadorPontos = document.getElementById("pontos");
    contadorPontos.innerText = points;
}

function contaTempo(){

    --tempo;
    let contadorTempo = document.getElementById("tempo");
    contadorTempo.innerText = tempo;

    if(tempo <= 0){
        clearInterval(timer);
        alert("Parabéns "+ player + " você fez " + points + " pontos!");
        iniciaJogo();
    }
}


