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
  if(inputIDConvite.classList.contains("is-invalid")) {
    inputIDConvite.classList.remove("is-invalid");
    inputIDConvite.parentElement.classList.remove("is-invalid");
  }
  if(inputIDConvite.value.length > 4) {
    inputIDConvite.value = inputIDConvite.value.slice(0, 4);
  }
}

inputConvidado.oninput = (event) => {
if(inputConvidado.classList.contains("is-invalid")) {
    inputConvidado.classList.remove("is-invalid");
    inputConvidado.parentElement.classList.remove("is-invalid");
  }
}

const getItem = (event) => {
  if (event.target.type === "radio") {
    invalidMsg.classList.remove("show");
    invalidMsg.classList.add("hidden");
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
      return { "valid": false, "input": input };
    }
  }
  return { "valid": true };
};

const validarIDConvidado = async (idConvidado) => {
  const guests = await fetch(`${baseUrl}?getGuests=true`).then(res => res.json()).then(guests => { return guests });
  const guest = guests.find(guest => guest.id == idConvidado);
  if(!guest) {
    return false;
  }
  return true;
}

const proximaEtapa = async () => {

  const isEtapaValida = validarEtapas(etapaAtual);  
  if(!isEtapaValida.valid) {
    idInvalidMsg.innerText = "Por favor, digite o número do convite que você recebeu.";
    isEtapaValida.input.classList.add("is-invalid");
    isEtapaValida.input.parentElement.classList.add("is-invalid");
    if(etapaAtual === 2) {
      invalidMsg.classList.remove("hidden");
      invalidMsg.classList.add("show");
    }
    return;
  };

  if(etapaAtual === 1) {
    loadingEtapa1.classList.remove("hidden");
    loadingEtapa1.classList.add("show");
    const isIdValid = await validarIDConvidado(inputIDConvite.value);
    loadingEtapa1.classList.remove("show");
    loadingEtapa1.classList.add("hidden");
    if(!isIdValid) {
      idInvalidMsg.innerText = "Número do convite inválido.";
      inputIDConvite.classList.add("is-invalid");
      inputIDConvite.parentElement.classList.add("is-invalid");
      return;
    }
  }

  if(etapaAtual < totalEtapas) {
    let sessaoEtapaAtual = document.getElementById("etapa" + etapaAtual);
    
    if (etapaAtual === 4) {
      sessaoEtapaAtual.classList.remove("hidden");
      sessaoEtapaAtual.classList.add("show");
      await fetchData();
    }

    sessaoEtapaAtual.classList.add("hidden");
    sessaoEtapaAtual.classList.remove("show");
    
    etapaAtual++;
    
    let sessaoProximaEtapa = document.getElementById("etapa" + etapaAtual);
    sessaoProximaEtapa.classList.remove("hidden");
    sessaoProximaEtapa.classList.add("show");
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