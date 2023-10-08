const linkInicio = document.getElementById("link-inicio");
const linkMateria = document.getElementById("link-materiais");
const LinkMateria2 = document.getElementById("link-materiais2");
const conteudoInicio = document.getElementById("conteudo-inicio");
const conteudoMaterialDidatico = document.getElementById(
  "conteudo-material-didatico"
);
const barraPesquisa = document.querySelector("#txtbusca");
const botaoPesquisa = document.querySelector("#search-button");
const conteudoResultadoPesquisa = document.getElementById(
  "id-resultado-pesquisa"
);
linkInicio.addEventListener("click", function (event) {
  event.preventDefault();
  conteudoInicio.style.display = "flex";
  conteudoMaterialDidatico.style.display = "none";
  conteudoResultadoPesquisa.style.display = "none";
  linkInicio.style.backgroundColor = "#c4c4c4";
  linkMateria.style.backgroundColor = "";
});

linkMateria.addEventListener("click", function (event) {
  event.preventDefault();
  conteudoInicio.style.display = "none";
  conteudoMaterialDidatico.style.display = "flex";
  conteudoResultadoPesquisa.style.display = "none";
  linkMateria.style.backgroundColor = "#c4c4c4";
  linkInicio.style.backgroundColor = "";
});

LinkMateria2.addEventListener("click", function (event) {
  event.preventDefault();
  conteudoInicio.style.display = "none";
  conteudoMaterialDidatico.style.display = "flex";
  conteudoResultadoPesquisa.style.display = "none";
  linkMateria.style.backgroundColor = "#c4c4c4";
  linkInicio.style.backgroundColor = "";
});
function trataTexto(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}
var urlsMaterias = (urlsMaterias = [
  { nome: "Conjuntos", url: "material 1ano/file_conjuntos.html" },
  { nome: "Funções", url: "material 1ano/file_funções.html" },
  { nome: "Funções Afins", url: "material 1ano/file_funções_afins.html" },
  {
    nome: "Funções Quadráticas",
    url: "material 1ano/file_funções_quadráticas.html",
  },
  { nome: "Sequências", url: "material 1ano/file_sequências.html" },
]);
async function acionarPesquisa(event) {
  if (
    event.type === "click" ||
    (event.type === "keyup" && event.key === "Enter")
  ) {
    event.preventDefault();
    conteudoInicio.style.display = "none";
    conteudoMaterialDidatico.style.display = "none";
    conteudoResultadoPesquisa.style.display = "block";
    conteudoResultadoPesquisa.innerHTML = ""; // Limpa o conteúdo anterior
    var pesquisa = trataTexto(barraPesquisa.value.toLowerCase());

    let pesquisaEncontrada = false; // Flag para verificar se a pesquisa foi encontrada

    try {
      for (const materia of urlsMaterias) {
        const response = await fetch(materia.url);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const paragrafos = doc.querySelectorAll("p,label,h1");
        let paragrafosConcatenados = "";

        paragrafos.forEach((paragrafo) => {
          paragrafosConcatenados +=
            trataTexto(paragrafo.textContent.toLowerCase()) + " ";
        });

        const pesquisaCount = (
          paragrafosConcatenados.match(new RegExp(pesquisa, "gi")) || []
        ).length;

        if (trataTexto(paragrafosConcatenados).includes(pesquisa)) {
          const link = document.createElement("a");
          link.textContent = materia.nome;
          link.href = materia.url;
          link.target = "_blank";
          link.style.display = "flex";
          link.style.marginBottom = "5px";
          link.style.width = "auto";
          link.style.height = "50px";
          link.style.textDecoration = "none";
          link.style.color = "black";
          link.style.justifyContent = "center";
          link.style.alignItems = "center";
          let ishovered = false;
          link.addEventListener("mouseover", () => {
            link.style.backgroundColor = "#F5F5F5";
            ishovered = true;
          });
          link.addEventListener("mouseout", () => {
            link.style.backgroundColor = "";
            ishovered = false;
          });

          const countElement = document.createElement("span");
          countElement.textContent = `Ocorrências do termo pesquisado em ${materia.nome}: ${pesquisaCount}`;
          countElement.style.fontSize = "small"; // Tamanho pequeno
          countElement.style.color = "#777"; // Cor sem destaque

          conteudoResultadoPesquisa.appendChild(link);
          conteudoResultadoPesquisa.appendChild(countElement);
        }
      }

      // Se não houver ocorrências da pesquisa em nenhuma matéria
      if (conteudoResultadoPesquisa.children.length === 0) {
        const resultado = document.createElement("div");
        resultado.textContent =
          "Sua pesquisa não encontrou nenhum resultado correspondente.";
        conteudoResultadoPesquisa.appendChild(resultado);
      }
    } catch (error) {
      console.error("Ocorreu um erro ao carregar:", error);
    }
  }
}
botaoPesquisa.addEventListener("click", acionarPesquisa);
barraPesquisa.addEventListener("keyup", acionarPesquisa);

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

const bt1 = document.getElementById("bt-materias-1ano");
let isActive1 = false;
let isHovered1 = false;

bt1.addEventListener("mouseover", () => {
  if (!isActive1 && !isHovered1) {
    bt1.style.background =
      "linear-gradient(to bottom, #00acee, #0be6e6) padding-box, linear-gradient(to bottom, #00acee, #0be6e6) border-box";
    isHovered1 = true;
  }
});

bt1.addEventListener("mouseout", () => {
  if (!isActive1) {
    bt1.style.background = "";
    isHovered1 = false;
  }
});

bt1.addEventListener("click", () => {
  isActive1 = !isActive1;
  updateButton1Style();
});

function updateButton1Style() {
  bt1.style.background = isActive1
    ? "linear-gradient(to bottom, #00acee, #0be6e6) padding-box, linear-gradient(to bottom, #00acee, #0be6e6) border-box"
    : "";
}

const bt2 = document.getElementById("bt-materias-2ano");
let isActive2 = false;
let isHovered2 = false;

bt2.addEventListener("mouseover", () => {
  if (!isActive2 && !isHovered2) {
    bt2.style.background =
      "linear-gradient(to bottom, #00acee, #0be6e6) padding-box, linear-gradient(to bottom, #00acee, #0be6e6) border-box";
    isHovered2 = true;
  }
});

bt2.addEventListener("mouseout", () => {
  if (!isActive2) {
    bt2.style.background = "";
    isHovered2 = false;
  }
});

bt2.addEventListener("click", () => {
  isActive2 = !isActive2;
  updateButton2Style();
});

function updateButton2Style() {
  bt2.style.background = isActive2
    ? "linear-gradient(to bottom, #00acee, #0be6e6) padding-box, linear-gradient(to bottom, #00acee, #0be6e6) border-box"
    : "";
}

const bt3 = document.getElementById("bt-materias-3ano");
let isActive3 = false;
let isHovered3 = false;

bt3.addEventListener("mouseover", () => {
  if (!isActive3 && !isHovered3) {
    bt3.style.background =
      "linear-gradient(to bottom, #00acee, #0be6e6) padding-box, linear-gradient(to bottom, #00acee, #0be6e6) border-box";
    isHovered3 = true;
  }
});

bt3.addEventListener("mouseout", () => {
  if (!isActive3) {
    bt3.style.background = "";
    isHovered3 = false;
  }
});

bt3.addEventListener("click", () => {
  isActive3 = !isActive3;
  updateButton3Style();
});

function updateButton3Style() {
  bt3.style.background = isActive3
    ? "linear-gradient(to bottom, #00acee, #0be6e6) padding-box, linear-gradient(to bottom, #00acee, #0be6e6) border-box"
    : "";
}

   
   
  
