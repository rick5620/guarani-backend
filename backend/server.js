const express = require("express");
const cors = require("cors");
const path = require("path");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({origin:['https://guaranimoveis.netlify.app']}));
app.use(express.json());

// Pasta pública para uploads de imagens
app.use("/imagens", express.static(path.join(__dirname, "../frontend/imagens")));

// Rotas da API
app.use("/api", routes);

// Rota principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
