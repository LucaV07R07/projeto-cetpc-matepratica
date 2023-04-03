const linkInicio = document.getElementById("link-inicio");
const linkMateria = document.getElementById("link-materiais");
const LinkMateria2 = document.getElementById("link-materiais2");
const linkCalc = document.getElementById("link-calc");
const linkCalc2 = document.getElementById("link-calc2");
const conteudoInicio = document.getElementById("conteudo-inicio");
const conteudoMaterialDidatico = document.getElementById(
  "conteudo-material-didatico"
);
const conteudoCalcgraf = document.getElementById("calcgraf");

linkInicio.addEventListener("click", function (event) {
  event.preventDefault();
  conteudoInicio.style.display = "flex";
  conteudoMaterialDidatico.style.display = "none";
  conteudoCalcgraf.style.display = "none";
});

linkMateria.addEventListener("click", function (event) {
  event.preventDefault();
  conteudoInicio.style.display = "none";
  conteudoMaterialDidatico.style.display = "block";
  conteudoCalcgraf.style.display = "none";
});
LinkMateria2.addEventListener("click", function (event) {
  event.preventDefault();
  conteudoInicio.style.display = "none";
  conteudoMaterialDidatico.style.display = "block";
  conteudoCalcgraf.style.display = "none";
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

