const Usuario = require("../models/usuario");

module.exports = (app, io) => {
  var usuario = app.route("/usuario");
  //CRIAÇÃO DE NOVOS USUARIOS
  usuario.post((req, res) => {
    Usuario.create(req.body, function(err, usuario) {
      if (err) {
        res
          .status(500)
          .json({ status: "Error", message: err.toString(), data: null });
      } else {
        res.json({
          statusCode: 200,
          status: "sucesso",
          message: "Usuário Cadastrado com Sucesso !!!",
          data: usuario
        });
        io.emit("usuario", { date: usuario });
      }
    });
  });
  //RECUPERAR TODOS OS USUARIOS NO BANCO
  usuario.get((req, res) => {
    Usuario.find({}).exec((err, usuario) => {
      if (err) {
        res
          .status(500)
          .json({ status: "Error", message: err.toString(), data: null });
      } else {
        res.json({
          statusCode: 200,
          status: "sucesso",
          message: "Usuários Encontrado com Sucesso !!!",
          data: usuario
        });
        io.emit("usuario", { date: usuario });
      }
    });
  });
  //ATUALIZAR INFORMAÇOES DO USUARIO
  let usuarioId = app.route("/usuario/:id");
  usuarioId.put((req, res, next) => {
    var novasInformacoes = req.body;
    var idUsuario = req.params.id;
    Usuario.updateOne(
      { _id: idUsuario },
      novasInformacoes,
      { new: true },
      function(err, usuario) {
        if (err)
          res
            .status(500)
            .json({ status: "Error", message: err.toString(), data: null });
        else {
          res.json({
            statusCode: 200,
            status: "sucesso",
            message: "Usuário Atualizado com Sucesso !!!",
            data: usuario
          });
          io.emit("usuario", { date: usuario });
        }
      }
    );
  });
  //DELETAR USUARIO
  usuarioId.delete((req, res, next) => {
    var idUsuario = req.params.id;
    Usuario.deleteOne({ _id: idUsuario }, { new: true }, function(
      err,
      usuario
    ) {
      if (err)
        res
          .status(500)
          .json({ status: "Error", message: err.toString(), data: null });
      else {
        res.json({
          statusCode: 200,
          status: "sucesso",
          message: "Usuário Deletado com Sucesso !!!"
        });
        io.emit("usuario", { date: "Usuário Deletado com Sucesso !!!" });
      }
    });
  });
};
