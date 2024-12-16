const confirmarBtn = document.getElementById("confirmarPresenca");
const boxNomeConvidado = document.getElementById("boxNomeConvidado");
const inputNomeConvidado = document.getElementById("inputNomeConvidado");
const listaFraldas = document.getElementById("listaFraldas");
const listaMimos = document.getElementById("listaMimos");

let etapa = 0;


confirmarBtn.addEventListener("click", () => {
  if(etapa < 3) {
    etapa++;
  }
})


if(etapa == 0) {
  boxNomeConvidado.classList.remove("hidden");
  boxNomeConvidado.classList.add("show");
  listaFraldas.classList.remove("hidden");
  listaFraldas.classList.add("show");
  listaMimos.classList.remove("hidden");
  listaMimos.classList.add("show");
}