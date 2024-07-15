const listaDeProdutos = () => {
    return fetch("https://6684917256e7503d1ae09162.mockapi.io/produtos")
    .then((resposta) => resposta.json())
    .catch((erro) => console.log(erro));
};

const criaProduto = (nome, valor, imagem) => {
    return fetch("https://6684917256e7503d1ae09162.mockapi.io/produtos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nome,
            valor,
            imagem,
        })
    })
    .then((resposta) => resposta.json())
    .catch((erro) => console.log(erro));
}

const deletaProduto = (id) => {
    return fetch(`https://6684917256e7503d1ae09162.mockapi.io/produtos/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((resposta) => resposta.json())
    .catch((erro) => console.log(erro));
}

export const servicosProdutos = {
    listaDeProdutos,
    criaProduto,
    deletaProduto,
};