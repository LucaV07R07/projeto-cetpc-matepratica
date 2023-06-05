const linkInicio = document.getElementById("link-inicio");
const linkMateria = document.getElementById("link-materiais");
const LinkMateria2 = document.getElementById("link-materiais2");
<<<<<<< HEAD
const linkCalculadora = document.getElementById("link-calc");
const linkCalculadora2 = document.getElementById("link-calc2");
=======
const linkCalc = document.getElementById("link-calc");
const linkCalc2 = document.getElementById("link-calc2");
>>>>>>> 70b0704fce28b1b143e65ea5367f6318e3c2d446
const conteudoInicio = document.getElementById("conteudo-inicio");
const conteudoMaterialDidatico = document.getElementById(
  "conteudo-material-didatico"
);
<<<<<<< HEAD
const conteudoCalculadora = document.getElementById("calcgraf");
=======
const conteudoCalcgraf = document.getElementById("calcgraf");
>>>>>>> 70b0704fce28b1b143e65ea5367f6318e3c2d446

linkInicio.addEventListener("click", function (event) {
  event.preventDefault();
  conteudoInicio.style.display = "flex";
  conteudoMaterialDidatico.style.display = "none";
<<<<<<< HEAD
  conteudoCalculadora.style.display = "none";
=======
  conteudoCalcgraf.style.display = "none";
>>>>>>> 70b0704fce28b1b143e65ea5367f6318e3c2d446
});

linkMateria.addEventListener("click", function (event) {
  event.preventDefault();
  conteudoInicio.style.display = "none";
<<<<<<< HEAD
  conteudoMaterialDidatico.style.display = "flex";
  conteudoCalculadora.style.display = "none";
=======
  conteudoMaterialDidatico.style.display = "block";
  conteudoCalcgraf.style.display = "none";
>>>>>>> 70b0704fce28b1b143e65ea5367f6318e3c2d446
});
LinkMateria2.addEventListener("click", function (event) {
  event.preventDefault();
  conteudoInicio.style.display = "none";
<<<<<<< HEAD
  conteudoMaterialDidatico.style.display = "flex";
  conteudoCalculadora.style.display = "none";
});
linkCalculadora.addEventListener("click", function (event) {
  event.preventDefault();
  conteudoInicio.style.display = "none";
  conteudoMaterialDidatico.style.display = "none";
  conteudoCalculadora.style.display = "block";
});
linkCalculadora2.addEventListener("click", function (event) {
  event.preventDefault();
  conteudoInicio.style.display = "none";
  conteudoMaterialDidatico.style.display = "none";
  conteudoCalculadora.style.display = "flex";
});
const estadoSidebar = document.getElementById("estado-sidebar");
const sidebar = document.getElementById("side-bar");
const estiloComputado = window.getComputedStyle(sidebar);
estadoSidebar.addEventListener("click", function (event) {
  event.preventDefault();
  if (estiloComputado.display === "block") {
    sidebar.style.display = "none";
  } else {
    sidebar.style.display = "block";
  }
=======
  conteudoMaterialDidatico.style.display = "block";
  conteudoCalcgraf.style.display = "none";
>>>>>>> 70b0704fce28b1b143e65ea5367f6318e3c2d446
});
linkCalc.addEventListener("click", function (event) {
  event.preventDefault();
  conteudoInicio.style.display = "none";
  conteudoMaterialDidatico.style.display = "none";
  conteudoCalcgraf.style.display = "block";
});
linkCalc2.addEventListener("click", function (event) {
  event.preventDefault();
  conteudoInicio.style.display = "none";
  conteudoMaterialDidatico.style.display = "none";
  conteudoCalcgraf.style.display = "block";
});

