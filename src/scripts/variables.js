const confirmarBtn = document.getElementById("confirmarPresenca");
const actions = document.getElementById("actions");
const nextBtn = document.getElementById("next");
const previous = document.getElementById("previous");
const formControlBox = document.getElementById("formControlBox");
const submitBtn = document.getElementById("submit");
const inputIDConvite = document.getElementById("idConvite");
const inputConvidado = document.getElementById("nomeConvidado");
const divIDConvite = document.getElementById("id-convite-container");
const divNomeConvidado = document.getElementById("nome-convidado-container");
const fraldaEscolhida = document.getElementById("fraldaEscolhida");
const mimoEscolhido = document.getElementById("mimoEscolhido");
const ulFraldas = document.getElementById("listaFraldas");
const ulMimos = document.getElementById("listaMimos");
const loadingEtapa1 = document.getElementById("loadingEtapa1");
const loadingEtapa2 = document.getElementById("loadingEtapa2");
const loadingEtapa4 = document.getElementById("loadingEtapa4");
const etapas = document.querySelectorAll(".etapa");
const invalidMsg = document.getElementById("invalid-msg");
const idInvalidMsg = document.getElementById("id-invalid-msg");
const labelNomeConvidadoEtapa2 = document.getElementById("label-nome-convidado-etapa-2");
const labelNomeConvidadoEtapa4 = document.getElementById("label-nome-convidado-etapa-4");

const form = document.forms["confirm-form"];
const baseUrl = "https://script.google.com/macros/s/AKfycbwn6uSiwUBc7g1ZXyxnzdIuztG-ENnZMbMuIrNCepqTrzZ3k2wkAvHdA7Ls_rijNlJPPQ/exec";