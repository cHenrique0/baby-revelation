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
  console.log('showLoading');
  
  if(etapa === 2) {
    loadingEtapa2.style.display = 'flex';
  }
  if(etapa === 4) {
    console.log('showLoading 4');
    
    loadingEtapa4.style.display = 'flex';
  }
}

function hideLoading(etapa) {
  if(etapa === 2) {
    loadingEtapa2.style.display = 'none';
  }
  if(etapa === 4) {
    loadingEtapa4.style.display = 'none';
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  
  showLoading(4);

  await fetch(baseUrl, { method: "POST", body: new FormData(form) })
    .then((res) => { 
      hideLoading(4);
    })
    .catch((error) => { console.error("Erro", error.message) });
})

async function fetchData() {
  showLoading(2);

  await fetch(`${baseUrl}?getAvailableProducts=true`)
    .then(res => res.json())
    .then(products => {
      Object.keys(products).forEach((category) => {
        const categories = products[category];
        
        if (category === "fralda") {
          categories.forEach((fralda, index) => {
            let li = document.createElement("li");
            let inputRadio = document.createElement("input");
            let label = document.createElement("label");
            let inputID = createElementID(fralda.name);     
            let span = document.createElement("span");
            li.classList.add("radio-button");
            inputRadio.classList.add("radio-button__input");
            label.classList.add("radio-button__label");
            span.classList.add("radio-button__custom");
            inputRadio.setAttribute("type", "radio");
            inputRadio.setAttribute("id", inputID);
            inputRadio.setAttribute("name", category);
            inputRadio.setAttribute("value", fralda.name);
            label.setAttribute("for", inputID);
            label.appendChild(span);
            label.innerHTML += fralda.name;
            
            if(index === 0) {
              inputRadio.required = true;
            }
            
            li.appendChild(inputRadio);
            li.appendChild(label);
            ulFraldas.appendChild(li);
          })
        }
        if (category === "mimo") {
          categories.forEach((mimo) => {
            let li = document.createElement("li");
            let inputRadio = document.createElement("input");
            let label = document.createElement("label");
            let inputID = createElementID(mimo.name); 
            let span = document.createElement("span");
            li.classList.add("radio-button");
            inputRadio.classList.add("radio-button__input");
            label.classList.add("radio-button__label");
            span.classList.add("radio-button__custom");
            inputRadio.setAttribute("type", "radio");
            inputRadio.setAttribute("id", inputID);
            inputRadio.setAttribute("name", category);
            inputRadio.setAttribute("value", mimo.name);
            label.setAttribute("for", inputID);
            label.appendChild(span);
            label.innerHTML += mimo.name;
            li.appendChild(inputRadio);
            li.appendChild(label);
            ulMimos.appendChild(li);
          })
        }
      })
    })
    .then(() => {
      hideLoading(2);
    });
}

// Inicia o carregamento ao carregar a página
window.onload = fetchData;
