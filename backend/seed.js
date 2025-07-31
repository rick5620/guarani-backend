const db = require("./database");

const produtos = [
  {
    nome: "Cadeira de Madeira",
    descricao: "Cadeira confortável feita em madeira maciça.",
    categoria: "Cadeiras",
    imagem: "/uploads/cadeira.jpg"
  },
  {
    nome: "Mesa de Jantar",
    descricao: "Mesa grande para até 6 pessoas, acabamento premium.",
    categoria: "Mesas",
    imagem: "/uploads/mesa.jpg"
  },
  {
    nome: "Armário de Cozinha",
    descricao: "''",
    categoria: "Armários",
    imagem: "/uploads/armario.jpg"
  },
];

produtos.forEach((produto) => {
  db.run(
    `INSERT INTO produtos (nome, descricao, categoria, imagem) VALUES (?, ?, ?, ?)`,
    [produto.nome, produto.descricao, produto.categoria, produto.imagem],
    (err) => {
      if (err) {
        console.error("Erro ao inserir produto:", err.message);
      } else {
        console.log(`Produto inserido: ${produto.nome}`);
      }
    }
  );
});
