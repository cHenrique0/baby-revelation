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
  if (event.target.type === "checkbox") {
    if(etapaAtual === 2) {
      fraldaInvalidMsg.classList.remove("show");
      fraldaInvalidMsg.classList.add("hidden");
    }
    if(etapaAtual === 3) {
      mimoInvalidMsg.classList.remove("show");
      mimoInvalidMsg.classList.add("hidden");
    }
    if(event.target.name === "fralda") {
      fraldaEscolhida.innerText = event.target.value;
    }
    if(event.target.name === "mimo") {
      mimoEscolhido.innerText = event.target.value;
    }
  }
};

const validarEtapas = (etapa) => {
  if (etapa === 1) {
    if(inputIDConvite.value === "") {
      return { "valid": false, "input": inputIDConvite };
    }
    if(inputConvidado.value === "") {
      return { "valid": false, "input": inputConvidado };
    }
  }
  if (etapa === 2) {
    let checkboxes = [...document.querySelectorAll('input[name="fralda"]')];
    let checked = checkboxes.some(checkbox => checkbox.checked);
    if(!checked) {
      return { "valid": false, "input": checkboxes[0] };
    }
  }
  if (etapa === 3) {
    let checkboxes = [...document.querySelectorAll('input[name="mimo"]')];
    let checked = checkboxes.some(checkbox => checkbox.checked);
    if(!checked) {
      return { "valid": false, "input": checkboxes[0] };
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

const isGuestConfirmed = async (idConvidado) => {
  
  const guests = await fetch(`${baseUrl}?getConfirmedGuests=true`).then(res => res.json()).then(guests => { return guests });
  const guest = guests.find(guest => guest.id == idConvidado);
  if(guest) {
    return true;
  }
  return false;
}

// Selecionar no máximo 2 itens e desabilitar os itens não selecionados
const maxTwoItems = () => {
  let checkboxes = [];

  if(etapaAtual === 2) {
    checkboxes = document.querySelectorAll('input[name="fralda"]');
  }
  if(etapaAtual === 3) {
    checkboxes = document.querySelectorAll('input[name="mimo"]');
  }

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      let checkedCount = 0;
      if(etapaAtual === 2) {
        checkedCount = document.querySelectorAll('input[name="fralda"]:checked').length;
      }
      if(etapaAtual === 3) {
        checkedCount = document.querySelectorAll('input[name="mimo"]:checked').length;
      }

      checkboxes.forEach(box => {
        if (checkedCount >= 2 && !box.checked) {
          box.disabled = true;
          box.classList.add("disabled");
          box.labels[1].classList.add("disabled");
        } else {
          box.disabled = false;          
          box.labels[1].classList.remove("disabled");
        }
      });
    });
  });
}

const proximaEtapa = async () => {

  const isEtapaValida = validarEtapas(etapaAtual);  
  if(!isEtapaValida.valid) {
    if(etapaAtual === 1) {
      idInvalidMsg.innerText = "Por favor, digite o número do convite que você recebeu.";
      isEtapaValida.input.classList.add("is-invalid");
      isEtapaValida.input.parentElement.classList.add("is-invalid");
    }
    if(etapaAtual === 2) {
      fraldaInvalidMsg.classList.remove("hidden");
      fraldaInvalidMsg.classList.add("show");
    }
    if(etapaAtual === 3) {
      mimoInvalidMsg.classList.remove("hidden");
      mimoInvalidMsg.classList.add("show");
    }
    return;
  };

  if(etapaAtual === 1) {
    loadingEtapa1.classList.remove("hidden");
    loadingEtapa1.classList.add("show");
    const isIdValid = await validarIDConvidado(inputIDConvite.value);
    const isIdConfirmed = await isGuestConfirmed(inputIDConvite.value);
    loadingEtapa1.classList.remove("show");
    loadingEtapa1.classList.add("hidden");
    if(!isIdValid) {
      idInvalidMsg.innerText = "Número do convite inválido.";
      inputIDConvite.classList.add("is-invalid");
      inputIDConvite.parentElement.classList.add("is-invalid");
      return;
    }
    if(isIdConfirmed) {
      idInvalidMsg.innerText = `O convidado com ID ${inputIDConvite.value} já confirmou presença.`;
      inputIDConvite.classList.add("is-invalid");
      inputIDConvite.parentElement.classList.add("is-invalid");
      return;
    }
    labelNomeConvidadoEtapa2.innerText = inputConvidado.value;
    labelNomeConvidadoEtapa4.innerText = inputConvidado.value;
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

  maxTwoItems();

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