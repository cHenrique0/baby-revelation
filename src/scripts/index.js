const confirmarBtn = document.getElementById("confirmarPresenca");
const actions = document.getElementById("actions");
const nextBtn = document.getElementById("next");
const previous = document.getElementById("previous");
const formControlBox = document.getElementById("formControlBox");
const submitBtn = document.getElementById("submit");
const inputIDConvite = document.getElementById("idConvite");
const inputConvidado = document.getElementById("nomeConvidado");
const fraldaEscolhida = document.getElementById("fraldaEscolhida");
const mimoEscolhido = document.getElementById("mimoEscolhido");
const ulFraldas = document.getElementById("listaFraldas");
const ulMimos = document.getElementById("listaMimos");
const loadingEtapa2 = document.getElementById("loadingEtapa2");
const loadingEtapa5 = document.getElementById("loadingEtapa5");
const etapas = document.querySelectorAll(".etapa");

const totalEtapas = 5;
let etapaAtual = 1;

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

const getItem = (event) => {
  if (event.target.type === "radio") {
    if(event.target.name === "fralda") {
      fraldaEscolhida.innerText = event.target.value;
    }
    if(event.target.name === "mimo") {
      mimoEscolhido.innerText = event.target.value;
    }
  }
};

const validarEtapas = (etapaIndex) => {  
  const etapa = etapas[etapaIndex];
  const inputsObrigatorios = etapa.querySelectorAll('[required]');
  
  for (let input of inputsObrigatorios) {
    if (!input.checkValidity()) {
      return false;
    }
  }
  return true;
};

const proximaEtapa = () => {  
  
  if(!validarEtapas(etapaAtual)) {
    if(etapaAtual === 1) {
      alert("PREENCHA OS CAMPOS")
    }
    if(etapaAtual === 2) {
      alert("Por favor, escolha uma opção de fralda!")
    }
    return;
  };

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
  if(etapaAtual > 1) {
    let sessaoEtapaAtual = document.getElementById("etapa" + etapaAtual);
    sessaoEtapaAtual.classList.add("hidden");
    sessaoEtapaAtual.classList.remove("show");

    etapaAtual--;

    let sessaoEtapaAnterior = document.getElementById("etapa" + etapaAtual);
    sessaoEtapaAnterior.classList.remove("hidden");
    sessaoEtapaAnterior.classList.add("show");
  }
}

const mostrarEtapa5 = () => {
  let etapa5 = document.getElementById("etapa5");
  etapa5.classList.remove("hidden");
  etapa5.classList.add("show");
}