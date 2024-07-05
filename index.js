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

async function avaliarDataset() {
    const arquivo = inputArquivo.files[0];
    if (!arquivo) {
        alert('Selecione um arquivo para avaliar');
        return;
    }

    const formData = new FormData();
    formData.append('file', arquivo);

    try {
        const resposta = await axios.post(`${API_BASE_URL}/avaliar`, formData);
        resultadoAvaliacao.innerHTML = `
        <p>Avaliação bem sucedida!</p>
        <p>Score: ${resposta.data.score}</p>
        `;
    } catch (error) {
        resultadoAvaliacao.innerHTML = `
        <p>Erro: ${error.response?.data?.erro || 'Um erro ocorreu'}</p>
        `;	
    }
}

async function listarAvaliacoes() {
    try {
        const resposta = await axios.get(`${API_BASE_URL}/avaliacoes`);
        listaDatasets.innerHTML = '';
        resposta.data.avaliacoes.forEach(dataset => {
            const li = document.createElement('li');
            li.textContent = `${dataset.nome_arquivo} - Score: ${dataset.score}`;
            li.onclick = () => exibirDetalhes(dataset.id);
            listaDatasets.appendChild(li);
        });
    } catch (error) {
        console.error('Erro ao listar avaliações', error);
        listaDatasets.innerHTML = '<li>Erro ao listar avaliações</li>';
    }
}

async function exibirDetalhes(datasetId) {
    try {
        const resposta = await axios.get(`${API_BASE_URL}/avaliacoes/${datasetId}`);
        const dataset = resposta.data;
        detalhesDataset.innerHTML = `
        <h3>Detalhes do dataset</h3>
        <p>Nome: ${dataset.nome_arquivo}</p>
        <p>Score: ${dataset.score}</p>
        <p>Avaliado em: ${new Date(dataset.avaliado_em).toLocaleString()}</p>
        `;
    } catch (error) {
        console.error('Erro ao exibir detalhes do dataset', error);
        detalhesDataset.innerHTML = '<p>Erro ao exibir detalhes do dataset</p>';
    }
}

// Inicializando a primeira aba
tabBotoes[0].click();