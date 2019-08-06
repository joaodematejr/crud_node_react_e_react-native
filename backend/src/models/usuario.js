var mongoose = require("mongoose");

const usuarioSchema = mongoose.Schema({
  nome: { type: String, required: false },
  telefone: { type: String, required: false },
  cpf: { type: String, required: false },
  foto: { type: String, required: false }
});

module.exports = mongoose.model("Usuario", usuarioSchema);
