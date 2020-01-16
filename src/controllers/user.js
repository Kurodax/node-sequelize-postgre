const User = require("../models/user");
const validador = require("validator");

module.exports = {
  index: async (req, res) => {
    const response = await User.findAll();

    return res.json(response);
  },

  store: async (req, res) => {
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const phone = req.body.phone;

    const validaEmail = validador.isEmail(email);
    if (validaEmail == false) {
      return res.status(510).json({
        mensagem: "Email invalido.",
        validaEmail: validaEmail
      });
    }

    const validaPhone = validador.isMobilePhone(phone);
    if (validaPhone == false) {
      return res.status(510).json({
        mensagem: "incluir apenas núemros no campo telefone",
        validaPhone: validaPhone
      });
    }

    const criar = await User.create({
      name: name,
      username: username,
      password: password,
      email: email,
      phone: phone
    });

    return res.json(criar);
  },

  deleta: async (req, res) => {
    const deletadados = await User.destroy({
      where: {
        id: req.params.id
      }
    });
    if (deletadados === 0) {
      return res.status(404).json({
        mensagem: "Usuario não encontrado",
        deletadados: deletadados
      });
    }
    return res.status(200).json({
      mensagem: "Deletado com sucesso"
    });
  },

  update: async (req, res) => {
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const phone = req.body.phone;

    const altera = await User.update(
      {
        name: name,
        username: username,
        password: password,
        email: email,
        phone: phone
      },

      {
        where: {
          id: req.params.id
        }
      }
    );
    if (altera == 0) {
      return res.status(401).json({
        mensagem: "Não existe está ID para alteraão.",
        altera: altera
      });
    }
    return res.status(202).json({
      mensagem: "Aleracao realizada com sucesso"
    });
  },

  show: async (req, res) => {
    const mostra = await User.findOne({
      where: {
        id: req.params.id
      }
    });
    if (mostra == null) {
      return res.status(401).json({
        mensagem: "Item não encontrado"
      });
    }
    return res.status(202).json({
      mensagem: "Item encontrado com sucesso.",
      mostra: mostra
    });
  }
};
