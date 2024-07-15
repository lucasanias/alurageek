import { servicosProdutos } from "../services/product-services.js";

const containerProduto = document.querySelector("[data-produto]");
const formulario = document.querySelector("[data-form]");

function criandoElemento(nome, valor, imagem, id) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <div class="imagem-container">
            <img src="${imagem}" alt="${nome}">
        </div>
        <div class="card-container__informacao">
            <p>${nome}</p>
        <div class="card-container__valor">
            <p>R$${valor}</p>
            <button class="botao-excluir" data-id="${id}">
                <img src="imagens/icone-excluir.png" alt="icone">
            </button>    
        </div>
        </div>
    `

    containerProduto.appendChild(card);
    return card;
}

const render = async () => {
    try{
        const listaProdutos = await servicosProdutos.listaDeProdutos();
        
        listaProdutos.forEach(produto => {
            containerProduto.appendChild(
                criandoElemento(
                    produto.nome,
                    produto.valor,
                    produto.imagem,
                    produto.id
                )
            )
        });

    } catch(error) {
        console.log(error);
    }
}

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = document.querySelector("[data-name]").value;
    const valor = document.querySelector("[data-valor]").value;
    const imagem = document.querySelector("[data-imagem]").value;

    servicosProdutos.criaProduto(nome, valor, imagem)
    .then((resposta) => console.log(resposta))
    .catch((erro) => console.log(erro));
});

containerProduto.addEventListener("click", async (evento) => {
    if (evento.target.classList.contains("botao-excluir") || evento.target.closest(".botao-excluir")) {
        const botaoExcluir = evento.target.closest(".botao-excluir");
        const id = botaoExcluir.dataset.id;
        try {
            await servicosProdutos.deletaProduto(id);
            botaoExcluir.closest(".card").remove();
        } catch (erro) {
            console.log(erro);
        }
    }
});

render();