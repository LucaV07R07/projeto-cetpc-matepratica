const anoSelect = document.getElementById('ano-select');
      const materiaSelect = document.getElementById('materia-select');
      const materiaSelectLabel = document.getElementById('materia-select-label');
      const materias = {
        "1ano": [
          { nome: "Conjuntos", valor: "t-conjuntos" },
          { nome: "Funções", valor: "t-funcoes" },
          { nome: "Funções Afins", valor: "t-funcoesAfins" },
          { nome: "Funções Quadráticas", valor: "t-funcoesQuadraticas" },
          { nome: "Funções Modulares", valor: "t-funcoesModulares" },
          { nome: "Funções Exponenciais", valor: "t-funcoesExponenciais" },
          { nome: "Funções Logarítmicas", valor: "t-funcoesLogaritmicas" },
          { nome: "Geometria plana: Triângulo e Semelhanças", valor: "t-geometriaPlana" },
          { nome: "Trigonometria no Triângulo Retângulo", valor: "t-trigonometriaTrianguloRetangulo" }
        ],
        "2ano": [
          { nome: "Ciclo trigonométrico", valor: "t-cicloTrigonometrico" },
          { nome: "Funções trigonométricas", valor: "t-funcoesTrigonometricas" },
          { nome: "Matrizes e determinantes", valor: "t-matrizesDeterminantes" },
          { nome: "Sistemas lineares", valor: "t-sistemasLineares" },
          { nome: "Superfícies poligonais", valor: "t-superficiesPoligonais" },
          { nome: "Introdução a geometria espacial", valor: "t-introducaoGeometriaEspacial" },
          { nome: "Poliedros", valor: "t-poliedros" },
          { nome: "Corpos redondos", valor: "t-corposRedondos" },
          { nome: "Análise combinatória", valor: "t-analiseCombinatoria" },
          { nome: "Probabilidade", valor: "t-probabilidade" }
        ],
        "3ano": [
          { nome: "Matemática Financeira", valor: "t-matematicaFinanceira" },
          { nome: "Estatísticas: análise de dados e medidas estatísticas", valor: "t-estatisticas" },
          { nome: "Geometria Analítica: conceitos básicos e a reta", valor: "t-geometriaAnalitica" },
          { nome: "Circunferência", valor: "t-circunferencia" },
          { nome: "Cônicas", valor: "t-conicas" },
          { nome: "Números complexos", valor: "t-numerosComplexos" },
          { nome: "Polinômios e equações polinomiais", valor: "t-polinomiosEquacoesPolinomiais" }
        ]
      };
      
      anoSelect.addEventListener('change', () => {
        const selectedYear = anoSelect.value;
        const selectedYearMaterias = materias[selectedYear];
        
        // Limpar o select de matérias
        materiaSelect.innerHTML = '';
      
        // Adicionar as opções correspondentes ao ano selecionado
        if (selectedYearMaterias) {
          selectedYearMaterias.forEach(materia => {
            const option = document.createElement('option');
            option.text = materia.nome;
            option.value = materia.valor;
            materiaSelect.appendChild(option);
          });
      
          // Mostrar o select de matérias e o seu rótulo
          materiaSelect.classList.remove('hidden');
          materiaSelectLabel.classList.remove('hidden');
        } else {
          // Se nenhum ano for selecionado, ocultar o select de matérias e o seu rótulo
          materiaSelect.classList.add('hidden');
          materiaSelectLabel.classList.add('hidden');
        }
      });