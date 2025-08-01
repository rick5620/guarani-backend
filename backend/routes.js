const express = require("express");
const router = express.Router();
const db = require("./database");
const multer = require("multer");
const path = require("path");

// Configuração do Multer para upload de imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../frontend/imagens"));
  },
  filename: function(req, file, cb)
  {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

// Buscar produtos com filtro
router.get("/produtos", (req, res) => {
  const busca = req.query.busca;
  let query = "SELECT * FROM produtos";
  const params = [];

  if (busca) {
    query += " WHERE nome LIKE ?";
    params.push(`%${busca}%`);
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao buscar produtos." });
    }
    res.json(rows);
  });
});

// Adicionar produto
router.post("/produtos", (req, res) => {
  const { nome, descricao, categoria, imagem } = req.body;
  if (!nome || !preco) {
    return res.status(400).json({ error: "Nome é obrigatório." });
  }

  const query = `
    INSERT INTO produtos (nome, descricao, categoria, imagem)
    VALUES (?, ?, ?, ?)
  `;
  db.run(query, [nome, descricao, categoria, imagem], function (err) {
    if (err) {
      return res.status(500).json({ error: "Erro ao adicionar produto." });
    }
    res.json({ id: this.lastID, nome, descricao, categoria, imagem });
  });
});

// Upload de imagem
router.post("/imagens", upload.single("imagem"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Nenhum arquivo enviado." });
  }
  const caminho = `/imagens/${req.file.filename}`;
  res.json({ caminho });
});

// Editar produto
router.put("/produtos/:id", (req, res) => {
  const { id } = req.params;
  const { nome, descricao, categoria, imagem } = req.body;

  const query = `
    UPDATE produtos
    SET nome = ?, descricao = ?, categoria = ?, imagem = ?
    WHERE id = ?
  `;
  db.run(query, [nome, descricao, categoria, imagem, id], function (err) {
    if (err) {
      return res.status(500).json({ error: "Erro ao atualizar produto." });
    }
    res.json({ updated: this.changes });
  });
});

// Remover produto
router.delete("/produtos/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM produtos WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).json({ error: "Erro ao remover produto." });
    }
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
