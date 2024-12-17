const confirmarBtn = document.getElementById("confirmarPresenca");
const actions = document.getElementById("actions");
const nextBtn = document.getElementById("next");
const nextBtnBox = document.getElementById("nextButtonBox");
const submitBtn = document.getElementById("submit");
const submitBox = document.getElementById("submitBox");
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
  nextBtnBox.classList.remove("hidden");
  nextBtnBox.classList.add("show");
  submitBox.classList.remove("show");
  submitBox.classList.add("hidden");
  actions.classList.remove("show");
  actions.classList.add("hidden");
})

nextBtn.addEventListener("click", () => {

  etapa++;

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

    nextBtnBox.classList.add("hidden");
    nextBtnBox.classList.remove("show");
    
    submitBox.classList.remove("hidden");
    submitBox.classList.add("show");
  
    etapa4.classList.remove("hidden");
    etapa4.classList.add("show");
  }

  if(etapa === 6) {
    etapa = 0;

    etapa5.classList.add("hidden");
    etapa5.classList.remove("show");

    nextBtnBox.classList.add("hidden");
    nextBtnBox.classList.remove("show");
    
    submitBox.classList.add("hidden");
    submitBox.classList.remove("show");

    actions.classList.add("show");
    actions.classList.remove("hidden");
  }
})

submitBtn.addEventListener("click", (event) => {

  etapa++;

  if(etapa === 5) {
    etapa4.classList.add("hidden");
    etapa4.classList.remove("show");

    nextBtn.innerText = "Voltar para o início"

    nextBtnBox.classList.remove("hidden");
    nextBtnBox.classList.add("show");
    
    submitBox.classList.add("hidden");
    submitBox.classList.remove("show");

    etapa5.classList.remove("hidden");
    etapa5.classList.add("show")
  }
})
