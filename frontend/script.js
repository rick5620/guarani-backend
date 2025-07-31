// Função para carregar os produtos do backend (com busca opcional)
async function carregarProdutos() {
  try {
    const termoBusca = document.getElementById("campoBusca")?.value || "";
    const resposta = await fetch(`http://localhost:3000/api/produtos?busca=${encodeURIComponent(termoBusca)}`);
    const produtos = await resposta.json();

    const container = document.getElementById("produtos");
    container.innerHTML = ""; // Limpa o grid

    produtos.forEach((produto) => {
      const card = document.createElement("div");

      card.innerHTML = `
        <img src="${produto.imagem || 'imagens/placeholder.jpg'}" alt="${produto.nome}">
        <h3>${produto.nome}</h3>
        <p>R$ ${produto.preco.toFixed(2)}</p>
        <a href="detalhes.html?id=${produto.id}">Ver detalhes</a>
      `;

      container.appendChild(card);
    });
  } catch (erro) {
    console.error("Erro ao carregar produtos:", erro);
  }
}

// Adiciona evento de busca se o campo existir
document.addEventListener("DOMContentLoaded", () => {
  const botaoBusca = document.getElementById("botaoBusca");
  if (botaoBusca) {
    botaoBusca.addEventListener("click", () => {
      carregarProdutos();
    });
  }

  carregarProdutos(); // Carrega inicialmente
});