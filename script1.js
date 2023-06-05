const linkInicio = document.getElementById("link-inicio");
const linkMateria = document.getElementById("link-materiais");
const LinkMateria2 = document.getElementById("link-materiais2");
const linkCalculadora = document.getElementById("link-calc");
const linkCalculadora2 = document.getElementById("link-calc2");
const conteudoInicio = document.getElementById("conteudo-inicio");
const conteudoMaterialDidatico = document.getElementById(
  "conteudo-material-didatico"
);
const conteudoCalculadora = document.getElementById("calcgraf");

linkInicio.addEventListener("click", function (event) {
  event.preventDefault();
  conteudoInicio.style.display = "flex";
  conteudoMaterialDidatico.style.display = "none";
  conteudoCalculadora.style.display = "none";
});

linkMateria.addEventListener("click", function (event) {
  event.preventDefault();
  conteudoInicio.style.display = "none";
  conteudoMaterialDidatico.style.display = "flex";
  conteudoCalculadora.style.display = "none";
});
LinkMateria2.addEventListener("click", function (event) {
  event.preventDefault();
  conteudoInicio.style.display = "none";
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
});
