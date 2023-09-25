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
    linkInicio.style.backgroundColor = "#c4c4c4";
    linkMateria.style.backgroundColor = "";
});

linkMateria.addEventListener("click", function (event) {
    event.preventDefault();
    conteudoInicio.style.display = "none";
    conteudoMaterialDidatico.style.display = "flex";
    linkMateria.style.backgroundColor = "#c4c4c4";
    linkInicio.style.backgroundColor = "";
});
LinkMateria2.addEventListener("click", function (event) {
    event.preventDefault();
    conteudoInicio.style.display = "none";
    conteudoMaterialDidatico.style.display = "flex";
    linkMateria.style.backgroundColor = "#c4c4c4";
    linkInicio.style.backgroundColor = "";
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

    const bt1 = document.getElementById('bt-materias-1ano');
    let isActive1 = false;
    let isHovered1 = false;

    bt1.addEventListener('mouseover', () => {
        if (!isActive1 && !isHovered1) {
            bt1.style.background = 'linear-gradient(to bottom, #00acee, #0be6e6) padding-box, linear-gradient(to bottom, #00acee, #0be6e6) border-box';
            isHovered1 = true;
          }
      });

     bt1.addEventListener('mouseout', () => {
        if (!isActive1) {
            bt1.style.background = '';
            isHovered1 = false;
          }
      });

    bt1.addEventListener('click', () => {
      isActive1 = !isActive1;
      updateButton1Style(); 
    });

   function updateButton1Style(){
    bt1.style.background = isActive1 ? 'linear-gradient(to bottom, #00acee, #0be6e6) padding-box, linear-gradient(to bottom, #00acee, #0be6e6) border-box' : '';
   }

   const bt2 = document.getElementById('bt-materias-2ano');
    let isActive2 = false;
    let isHovered2 = false;

    bt2.addEventListener('mouseover', () => {
        if (!isActive2 && !isHovered2) {
            bt2.style.background = 'linear-gradient(to bottom, #00acee, #0be6e6) padding-box, linear-gradient(to bottom, #00acee, #0be6e6) border-box';
            isHovered2 = true;
          }
      });

     bt2.addEventListener('mouseout', () => {
        if (!isActive2) {
            bt2.style.background = '';
            isHovered2 = false;
          }
      });

    bt2.addEventListener('click', () => {
      isActive2 = !isActive2;
      updateButton2Style(); 
    });

   function updateButton2Style(){
    bt2.style.background = isActive2 ? 'linear-gradient(to bottom, #00acee, #0be6e6) padding-box, linear-gradient(to bottom, #00acee, #0be6e6) border-box' : '';
   }

   const bt3 = document.getElementById('bt-materias-3ano');
    let isActive3 = false;
    let isHovered3 = false;

    bt3.addEventListener('mouseover', () => {
        if (!isActive3 && !isHovered3) {
            bt3.style.background = 'linear-gradient(to bottom, #00acee, #0be6e6) padding-box, linear-gradient(to bottom, #00acee, #0be6e6) border-box';
            isHovered3 = true;
          }
      });

     bt3.addEventListener('mouseout', () => {
        if (!isActive3) {
            bt3.style.background = '';
            isHovered3 = false;
          }
      });

    bt3.addEventListener('click', () => {
      isActive3 = !isActive3;
      updateButton3Style(); 
    });

   function updateButton3Style(){
    bt3.style.background = isActive3 ? 'linear-gradient(to bottom, #00acee, #0be6e6) padding-box, linear-gradient(to bottom, #00acee, #0be6e6) border-box' : '';
   }
