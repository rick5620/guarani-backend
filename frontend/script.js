async function carregarProdutos() {
  try {
    const termoBusca = document.getElementById("campoBusca")?.value || "";
    const resposta = await fetch(`https://guarani-backend-1.onrender.com/api/produtos?busca=${encodeURIComponent(termoBusca)}`);
    const produtos = await resposta.json();

    const container = document.getElementById("produtos");
    container.innerHTML = ""; // Limpa o grid

    produtos.forEach((produto) => {
      const card = document.createElement("div");

      card.innerHTML = `
        <img src="imagens/${produto.imagem}" alt="${produto.nome}" style="width: 100%; height: auto;">
        <h3>${produto.nome}</h3>
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