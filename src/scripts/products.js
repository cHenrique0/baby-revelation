const baseUrl = "https://script.google.com/macros/s/AKfycbx6m_11HYdvdxINA0FzBBZuPj3qP4b0ScFmGnV7FkF6PdRzdT339nIjeFXoVtzYOhykcA/exec";

const form = document.forms["confirm-form"];

export const formEvent = () => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    fetch(baseUrl, { method: "POST", body: new FormData(form) })
    .then((res) => { alert("OBRIGADO") })
    .catch((error) => { console.error("Erro", error.message()) });
  })
}