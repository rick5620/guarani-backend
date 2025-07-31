const express = require("express");
const cors = require("cors");
const path = require("path");
const routes = require("./routes");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Pasta pública para uploads de imagens
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Servir o frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// Rotas da API
app.use("/api", routes);

// Rota principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
