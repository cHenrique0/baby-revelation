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
  if(etapa === 4) {    
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

form.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
      event.preventDefault(); // Impede o comportamento padrão
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  
  showLoading(4);

  const fraldas = Array.from(form.querySelectorAll('input[name="fralda"]:checked')).map(input => input.value);
  const mimos = Array.from(form.querySelectorAll('input[name="mimo"]:checked')).map(input => input.value);
  const formData = new FormData(form);
  formData.append('fraldas', JSON.stringify(fraldas));
  formData.append('mimos', JSON.stringify(mimos));
  
  
  await fetch(baseUrl, { method: "POST", body: formData })
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
            let inputCheckbox = document.createElement("input");
            let labelCheck = document.createElement("label");
            let inputID = createElementID(fralda.name);
            let labelName = document.createElement("label");
            
            li.classList.add("checkbox-container");
            inputCheckbox.classList.add("hidden-xs-up");
            labelCheck.classList.add("checkbox");
            labelName.classList.add("checkbox-label");

            inputCheckbox.setAttribute("type", "checkbox");
            inputCheckbox.setAttribute("id", inputID);
            inputCheckbox.setAttribute("name", category);
            inputCheckbox.setAttribute("value", fralda.name);
            labelCheck.setAttribute("for", inputID);
            labelName.setAttribute("for", inputID);
            labelName.innerHTML += fralda.name;
            
            li.appendChild(inputCheckbox);
            li.appendChild(labelCheck);
            li.appendChild(labelName);
            ulFraldas.appendChild(li);
          })
        }
        if (category === "mimo") {
          categories.forEach((mimo) => {
            let li = document.createElement("li");
            let inputCheckbox = document.createElement("input");
            let labelCheck = document.createElement("label");
            let inputID = createElementID(mimo.name);
            let labelName = document.createElement("label");

            li.classList.add("checkbox-container");
            inputCheckbox.classList.add("hidden-xs-up");
            labelCheck.classList.add("checkbox");
            labelName.classList.add("checkbox-label");

            inputCheckbox.setAttribute("type", "checkbox");
            inputCheckbox.setAttribute("id", inputID);
            inputCheckbox.setAttribute("name", category);
            inputCheckbox.setAttribute("value", mimo.name);
            labelCheck.setAttribute("for", inputID);
            labelName.setAttribute("for", inputID);
            labelName.innerHTML += mimo.name;

            li.appendChild(inputCheckbox);
            li.appendChild(labelCheck);
            li.appendChild(labelName);
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
