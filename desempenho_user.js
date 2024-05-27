const verificarDesempenhoBtn = document.getElementById('verificar-desempenho');
const notasUsuarioDiv = document.getElementById('notas-usuario');

async function obterNotasGerais(materia, ano, userId) {
    try {
        const snapshot = await database.ref(`results`).once('value');
        const notasGerais = [];
        snapshot.forEach(userSnapshot => {
            const userData = userSnapshot.val();
            if (userData[ano] && userData[ano][materia] && userSnapshot.key !== userId) {
                notasGerais.push(userData[ano][materia]);
            }
        });
        return notasGerais;
    } catch (error) {
        console.error("Erro ao obter as notas gerais:", error);
        throw error;
    }
}

async function calcularMediaMelhoresNotas(materia, ano, userId) {
    try {
        const notasGerais = await obterNotasGerais(materia, ano, userId);
        let somaMelhoresNotas = 0;
        let numUsuariosComNotas = 0;
        notasGerais.forEach(notasUsuario => {
            const melhorNotaGeral = Math.max(...Object.values(notasUsuario).map(nota => parseFloat(nota.indiceAcertos)));
            if (melhorNotaGeral > 0) {
                somaMelhoresNotas += melhorNotaGeral;
                numUsuariosComNotas++;
            }
        });
        const mediaMelhoresNotas = somaMelhoresNotas / numUsuariosComNotas;
        return mediaMelhoresNotas.toFixed(2);
    } catch (error) {
        console.error("Erro ao calcular a média das melhores notas:", error);
        throw error;
    }
}

async function calcularDistribuicaoMelhoresNotas(materia, ano) {
    try {
        const snapshot = await database.ref(`results`).once('value');
        const distribuicao = {};
        let numUsuariosComNotas = 0;

        snapshot.forEach(userSnapshot => {
            const userData = userSnapshot.val();
            if (userData[ano] && userData[ano][materia]) {
                numUsuariosComNotas++;
                let maiorNumeroAcertos = 0;

                Object.values(userData[ano][materia]).forEach(nota => {
                    const numAcertos = nota.acertos;
                    if (numAcertos > maiorNumeroAcertos) {
                        maiorNumeroAcertos = numAcertos;
                    }
                });

                distribuicao[maiorNumeroAcertos] = (distribuicao[maiorNumeroAcertos] || 0) + 1;
            }
        });

        return { distribuicao, numUsuariosComNotas };
    } catch (error) {
        console.error("Erro ao calcular a distribuição das melhores notas:", error);
        throw error;
    }
}

async function exibirGraficoDistribuicao(materia, ano) {
    const canvas = document.getElementById("grafico-distribuicao");
    if (!canvas) {
        console.error("Elemento canvas não encontrado.");
        return;
    }

    try {
        // Destruir o gráfico anterior, se existir
        if (window.myChart) {
            window.myChart.destroy();
        }

        // Limpar o conteúdo do canvas
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const { distribuicao, numUsuariosComNotas } = await calcularDistribuicaoMelhoresNotas(materia, ano);

        // Encontrar o maior número de acertos entre todas as notas
        const maxAcertos = Math.max(...Object.keys(distribuicao));

        // Criar um conjunto de todas as questões (incluindo aquelas em que nenhum usuário obteve acertos)
        const todasQuestoes = {};
        for (let i = 0; i <= maxAcertos; i++) {
            todasQuestoes[i] = distribuicao[i] ? distribuicao[i] / numUsuariosComNotas : 0;
        }

        window.myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(todasQuestoes),
                datasets: [{
                    label: 'Porcentagem de Usuários',
                    data: Object.values(todasQuestoes).map(valor => valor * 100), // Multiplica por 100 para obter a porcentagem
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            stepSize: 1,
                            min: 0,
                            max: maxAcertos,
                            callback: function (value) {
                                return value; // Mostra o número da questão
                            }
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            max: 100,
                            stepSize: 10,
                            callback: function (value) {
                                return value + "%"; // Adiciona % aos valores do eixo y
                            }
                        }
                    }]
                }
            }
        });
    } catch (error) {
        console.error("Erro ao exibir o gráfico:", error);
    }
}




document.addEventListener('DOMContentLoaded', (event) => {
    // Chamar a função para exibir o gráfico
    verificarDesempenhoBtn.addEventListener('click', async () => {
        const selectedYear = anoSelect.value;
        const selectedMateria = materiaSelect.value;

        // Limpar o conteúdo anterior
        notasUsuarioDiv.innerHTML = '';

        if (selectedYear && selectedMateria) {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userId = user.uid;
                    const notaSnapshot = await database.ref(`results/${userId}/${selectedYear}/${selectedMateria}`).get();
                    if (notaSnapshot.exists()) {
                        const notas = notaSnapshot.val();
                        
                        // Obter a melhor nota do usuário
                        const melhorNotaUsuario = Math.max(...Object.values(notas).map(nota => parseFloat(nota.indiceAcertos)));

                        // Calcular a média das melhores notas dos demais usuários
                        const mediaMelhoresNotas = await calcularMediaMelhoresNotas(selectedMateria, selectedYear, userId);

                        // Exibir a comparação na div
                        const comparacao = `Sua melhor nota: ${melhorNotaUsuario} | Média das melhores notas dos demais usuários: ${mediaMelhoresNotas}`;
                        notasUsuarioDiv.textContent = comparacao;

                        console.log(`Sua melhor nota: ${melhorNotaUsuario} | Média das melhores notas dos demais usuários: ${mediaMelhoresNotas}`);

                        // Chamar a função para exibir o gráfico
                        await exibirGraficoDistribuicao(selectedMateria, selectedYear, userId);
                    } else {
                        notasUsuarioDiv.textContent = "Nenhuma nota encontrada para a matéria selecionada.";
                    }
                } else {
                    notasUsuarioDiv.textContent = "Usuário não autenticado.";
                }
            } catch (error) {
                console.error("Erro ao buscar as notas:", error);
                notasUsuarioDiv.textContent = "Erro ao buscar as notas.";
            }
        } else {
            notasUsuarioDiv.textContent = "Selecione o ano e a matéria.";
        }
    });
});