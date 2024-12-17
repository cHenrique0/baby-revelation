const confirmarBtn = document.getElementById("confirmarPresenca");
const actions = document.getElementById("actions");
const nextBtn = document.getElementById("next");
const nextBtnBox = document.getElementById("nextButtonBox");
const etapa1 = document.getElementById("etapa1");
const etapa2 = document.getElementById("etapa2");
const etapa3 = document.getElementById("etapa3");
const etapa4 = document.getElementById("etapa4");
const etapa5 = document.getElementById("etapa5");

let etapa = 0;

confirmarBtn.addEventListener("click", () => {
  if(etapa === 0) {
    etapa = 1;
    etapa1.classList.remove("hidden");
    etapa1.classList.add("show");
  }
  nextBtnBox.classList.toggle("hidden")
  nextBtnBox.classList.toggle("show")
  actions.classList.toggle("show");
  actions.classList.toggle("hidden");
})

nextBtn.addEventListener("click", () => {

  if(etapa >= 1 && etapa < 6) {
    etapa++;
    nextBtn.innerText = "Próximo"
  }

  if(etapa === 2) {
    etapa1.classList.add("hidden");
    etapa1.classList.remove("show");

    etapa2.classList.remove("hidden");
    etapa2.classList.add("show");
  }
  if(etapa === 3) {
    etapa2.classList.add("hidden");
    etapa2.classList.remove("show");

    etapa3.classList.remove("hidden");
    etapa3.classList.add("show");
  }
  if(etapa === 4) {
    etapa3.classList.add("hidden");
    etapa3.classList.remove("show");

    nextBtn.innerText = "Confirmar"
  
    etapa4.classList.remove("hidden");
    etapa4.classList.add("show");
  }

  if(etapa === 5) {
    etapa4.classList.add("hidden");
    etapa4.classList.remove("show");

    nextBtn.innerText = "Voltar para o início"

    etapa5.classList.remove("hidden");
    etapa5.classList.add("show")
  }

  if(etapa === 6) {
    etapa = 0;
    etapa5.classList.add("hidden");
    etapa5.classList.remove("show");
    nextBtnBox.classList.toggle("show");
    nextBtnBox.classList.toggle("hidden");
    actions.classList.toggle("hidden");
    actions.classList.toggle("show");
  }
})
