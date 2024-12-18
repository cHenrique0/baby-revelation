const confirmarBtn = document.getElementById("confirmarPresenca");
const actions = document.getElementById("actions");
const nextBtn = document.getElementById("next");
const previous = document.getElementById("previous");
const formControlBox = document.getElementById("formControlBox");
const submitBtn = document.getElementById("submit");

let etapaAtual = 0;
let totalEtapas = 5;

const proximaEtapa = () => {

  if(etapaAtual < totalEtapas) {
    let sessaoEtapaAtual = document.getElementById("etapa" + etapaAtual);
    sessaoEtapaAtual.classList.add("hidden");
    sessaoEtapaAtual.classList.remove("show");
    
    etapaAtual++;
    
    let sessaoProximaEtapa = document.getElementById("etapa" + etapaAtual);
    sessaoProximaEtapa.classList.remove("hidden");
    sessaoProximaEtapa.classList.add("show");
  }
}

const etapaAnterior = () => {
  if(etapaAtual > 0) {
    let sessaoEtapaAtual = document.getElementById("etapa" + etapaAtual);
    sessaoEtapaAtual.classList.add("hidden");
    sessaoEtapaAtual.classList.remove("show");

    etapaAtual--;

    let sessaoEtapaAnterior = document.getElementById("etapa" + etapaAtual);
    sessaoEtapaAnterior.classList.remove("hidden");
    sessaoEtapaAnterior.classList.add("show");
  }
}

const goToHome = () => {  
  if(etapaAtual === totalEtapas) {
    let sessaoEtapaAtual = document.getElementById("etapa" + etapaAtual);
    sessaoEtapaAtual.classList.add("hidden");
    sessaoEtapaAtual.classList.remove("show");
    
    etapaAtual = 0;
    
    let sessaoProximaEtapa = document.getElementById("etapa" + etapaAtual);
    sessaoProximaEtapa.classList.remove("hidden");
    sessaoProximaEtapa.classList.add("show");
  }
}