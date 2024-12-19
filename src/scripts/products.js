const baseUrl = "https://script.google.com/macros/s/AKfycbwMkQgejOcNsEO_rsPDSKzXddMIfznYuyBED9cQLaHzofQJGcRDf2L4tYL3aab1l4n-vA/exec";

const form = document.forms["confirm-form"];
const ulFraldas = document.getElementById("listaFraldas");
const ulMimos = document.getElementById("listaMimos");
const loadingEtapa2 = document.getElementById("loadingEtapa2");
const loadingEtapa5 = document.getElementById("loadingEtapa5");

const createElementID = (string) => {
  // Remove acentos e caracteres especiais
  const noAccents = string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Remove caracteres não alfanuméricos e divide as palavras
  const words = noAccents.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(" ");

  // Converte para camelCase
  const camelCase = words.map((word, index) => 
    index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
  ).join("");

  return camelCase;
}

function showLoading(etapa) {
  if(etapa === 2) {
    loadingEtapa2.style.display = 'flex';
  }
  if(etapa === 5) {
    loadingEtapa5.style.display = 'flex';
  }
}

function hideLoading(etapa) {
  if(etapa === 2) {
    loadingEtapa2.style.display = 'none';
  }
  if(etapa === 5) {
    loadingEtapa5.style.display = 'none';
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  
  showLoading(5);

  await fetch(baseUrl, { method: "POST", body: new FormData(form) })
    .then((res) => { 
      hideLoading(5);
      mostrarEtapa5();
    })
    .catch((error) => { console.error("Erro", error.message) });
})

async function fetchData() {
  showLoading(2);

  await fetch(`${baseUrl}?getAvailableProducts=true`)
    .then(res => res.json())
    .then(products => {
      if(ulFraldas.children.length > 0 && ulMimos.children.length > 0) {
        return;
      }
    
      for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const inputID = createElementID(product);
        let li = document.createElement("li");
        let inputRadio = document.createElement("input");
        let label = document.createElement("label");
        
        li.classList.add("itemLista");
        inputRadio.setAttribute("type", "radio");
        inputRadio.setAttribute("id", inputID);
        inputRadio.setAttribute("value", product);
        label.setAttribute("for", inputID);
        label.textContent = product;
        
        if(i <= 4) {
          inputRadio.setAttribute("name", "fralda");
          li.appendChild(inputRadio);
          li.appendChild(label);
          ulFraldas.appendChild(li);
        }
        if(i > 4) {
          inputRadio.setAttribute("name", "mimo");
          li.appendChild(inputRadio);
          li.appendChild(label);
          ulMimos.appendChild(li);
        }
      }
    })
    .then(() => {
      hideLoading(2);
    });
}

// Inicia o carregamento ao carregar a página
window.onload = fetchData;
