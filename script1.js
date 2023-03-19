const linkInicio = document.getElementById("link-inicio");
const linkMateria = document.getElementById("link-materiais");
const LinkMateria2 = document.getElementById("link-materiais2");
const conteudoInicio = document.getElementById("conteudo-inicio");
const conteudoMaterialDidatico = document.getElementById(
  "conteudo-material-didatico"
);

linkInicio.addEventListener("click", function (event) {
  event.preventDefault();
  conteudoInicio.style.display = "flex";
  conteudoMaterialDidatico.style.display = "none";
});

linkMateria.addEventListener("click", function (event) {
  event.preventDefault();
  conteudoInicio.style.display = "none";
  conteudoMaterialDidatico.style.display = "block";
});
LinkMateria2.addEventListener("click", function (event) {
  event.preventDefault();
  conteudoInicio.style.display = "none";
  conteudoMaterialDidatico.style.display = "block";
});
