import Estatisticas from "./Estatisticas.js";
import fetchData from "./FetchData.js";
import normalizarTransacao from "./normalizarTransacao.js";
async function handleData() {
    const data = await fetchData('https://api.origamid.dev/json/transacoes.json');
    if (!data)
        return;
    const transacoes = data.map(normalizarTransacao);
    console.log(transacoes);
    preencherTabela(transacoes);
    preencherEstatisticas(transacoes);
}
function preencherTabela(transacoes) {
    const tabela = document.querySelector('#transacoes tbody');
    if (!tabela)
        return;
    transacoes.forEach((transacao) => {
        tabela.innerHTML += `
        <tr>
            <td>${transacao.nome}</td>
            <td>${transacao.email}</td>
            <td>R$ ${transacao.moeda}</td>
            <td>${transacao.pagamento}</td>
            <td>${transacao.status}</td>
        </tr>
    `;
    });
}
function preencherLista(lista, container) {
    const containerElement = document.querySelector(`.${container}`);
    if (containerElement) {
        Object.keys(lista).forEach((item) => {
            containerElement.innerHTML += `<p>${item}: ${lista[item]}</p>`;
        });
    }
}
function preencherEstatisticas(transacoes) {
    const data = new Estatisticas(transacoes);
    const totalElement = document.querySelector('.total');
    const diaElement = document.querySelector('.dia');
    if (totalElement) {
        totalElement.innerText = data.total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }
    if (diaElement) {
        diaElement.innerText = `${data.melhorDia[0]}, ${data.melhorDia[1]} vendas.`;
    }
    preencherLista(data.pagamento, 'pagamento');
    preencherLista(data.status, 'status');
    console.log(transacoes);
}
handleData();
//# sourceMappingURL=script.js.map