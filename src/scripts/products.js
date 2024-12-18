const baseUrl = "https://script.google.com/macros/s/AKfycbx2gi2ikcMjuoqnm_vNWaraHTfiD-z7mPs0HVtoHvsmGtKqHV3DCgqofQzPB8YFsp_RUQ/exec";

const form = document.forms["confirm-form"];

form.addEventListener("submit", (event) => {
  event.preventDefault();
  
  fetch(baseUrl, { method: "POST", body: new FormData(form) })
    // .then((res) => { alert("OBRIGADO") })
    .catch((error) => { console.error("Erro", error.message()) });
})

/* fetch(`${baseUrl}?getAvailableProducts=true`)
  .then(res => res.json())
  .then(data => {
    const productInputs = form.querySelectorAll("input[type='radio']");
    
    productInputs.forEach(input => {
      if(!data.includes(input.value)) {
        input.parentElement.style.display = "none";
      }
    })
  }) */