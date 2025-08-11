// index.js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Ruta principal
app.get("/", (req, res) => {
  res.send("🎵 Hola Seba! Tu backend está vivo y listo para rockear 🎸");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
