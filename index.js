const API_BASE_URL = 'http://localhost:5000';

// Definindo elementos do DOM
const tabBotoes = document.querySelectorAll('.linkstab');
const tabConteudo = document.querySelectorAll('.tabcontent');
const inputArquivo = document.getElementById('inputArquivo');
const botaoAvaliar = document.getElementById('botaoAvaliar');
const resultadoAvaliacao = document.getElementById('resultadoAvaliacao');
const listaDatasets = document.getElementById('listaDatasets');
const detalhesDataset = document.getElementById('detalhesDataset');

// Event listeners
tabBotoes.forEach(botao => {
    botao.addEventListener('click', (e) => abrirTab(e, botao.dataset.tab));
});

botaoAvaliar.addEventListener('click', avaliarDataset);

// Funções
function abrirTab(evt, nomeTab) {
    tabConteudo.forEach(conteudo => conteudo.style.display = 'none');
    tabBotoes.forEach(botao => botao.classList.remove('active'));

    document.getElementById(nomeTab).style.display = 'block';
    evt.currentTarget.classList.add('active');

    if (nomeTab === 'Listar') {
        listarAvaliacoes();
    }
}


