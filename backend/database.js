// backend/database.js
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Caminho do banco de dados
const dbPath = path.join(__dirname, "guarani.db");

// Conecta (ou cria) o banco
const db = new sqlite3.Database("./guarani.db", (err) => {
  if (err) {
    console.error("Erro ao conectar no banco:", err.message);
  } else {
    console.log("Banco de dados conectado com sucesso!");
  }
});

db.all('SELECT * FROM produtos', [], (err, rows) => {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log(rows);
});

// Cria a tabela de produtos se não existir
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      descricao TEXT,
      categoria TEXT,
      imagem TEXT
    )
  `);
});

module.exports = db;