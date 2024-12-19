const confirmarBtn = document.getElementById("confirmarPresenca");
const actions = document.getElementById("actions");
const nextBtn = document.getElementById("next");
const previous = document.getElementById("previous");
const formControlBox = document.getElementById("formControlBox");
const submitBtn = document.getElementById("submit");
const inputIDConvite = document.getElementById("idConvite");
const inputConvidado = document.getElementById("nomeConvidado");

inputConvidado.value = "";
inputIDConvite.value = "";


inputIDConvite.addEventListener("keydown", function (event) {
  // Permitir: teclas de controle (Backspace, Delete, Tab, etc.)
  const controlKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
  if (controlKeys.includes(event.key)) {
    return;
  }

  // Bloquear se não for número (0-9)
  if (!/^\d$/.test(event.key)) {
    event.preventDefault();
  }
});

inputIDConvite.oninput = (event) => {
  if(inputIDConvite.value.length > 4) {
    inputIDConvite.value = inputIDConvite.value.slice(0, 4);
  }
}

let etapaAtual = 0;
let totalEtapas = 5;

const proximaEtapa = () => {

  if(etapaAtual < totalEtapas) {
    let sessaoEtapaAtual = document.getElementById("etapa" + etapaAtual);
    sessaoEtapaAtual.classList.add("hidden");
    sessaoEtapaAtual.classList.remove("show");
    
    etapaAtual++;
    
    if(etapaAtual != totalEtapas) {
      let sessaoProximaEtapa = document.getElementById("etapa" + etapaAtual);
      sessaoProximaEtapa.classList.remove("hidden");
      sessaoProximaEtapa.classList.add("show");
    }
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
    window.location.reload();
    
    let sessaoEtapaAtual = document.getElementById("etapa" + etapaAtual);
    sessaoEtapaAtual.classList.add("hidden");
    sessaoEtapaAtual.classList.remove("show");
    
    etapaAtual = 0;
    
    let sessaoProximaEtapa = document.getElementById("etapa" + etapaAtual);
    sessaoProximaEtapa.classList.remove("hidden");
    sessaoProximaEtapa.classList.add("show");
  }
}

const mostrarEtapa5 = () => {
  let etapa5 = document.getElementById("etapa5");
  etapa5.classList.remove("hidden");
  etapa5.classList.add("show");
}