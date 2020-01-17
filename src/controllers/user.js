const User = require("../models/user");
const validador = require("validator");

module.exports = {
  /**
   * @description Buscar a tabela no db com nome de 'User' e mostra seu conteudo.
   * @param {Request} req
   * @param {Response} res
   * @returns {Array} Retorna uma Promise<RES> dentro de um array.
   */
  index: async (req, res) => {
    const response = await User.findAll();

    return res.json(response);
  },
  /**
   * @description Inclui no banco de dados as informações passada pelo usuario. OBS: Campos como email e phone apresenta validação de informação.
   * @param {Request} req
   * @param {Response} res
   * @param isEmail valida o email para sempre o usuario incluia um arroba '@'
   * @param isMobilePhone valida o phone, para que incluia número validos sem os caracteres (14) xx-xx
   * @param create inclui no banco de dados as informações que o usuario passa.
   * @returns 
   */

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
  /**
   * @description Deleta uma informação do db, informando o ID que deseja deletar.
   * @param {Request} req
   * @param {Response} res
   * @returns Retorna uma Promise<numeros>
   */

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
  /**
   * @description Atualiza a informações da db User, passando o ID e no corpo as infoações que deseja atualizar.
   * @param {Request} req
   * @param {Response} res
   * @returns Retorna um Options.returning que sempre vai ser TRUE.
   */

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
  /**
   * @description Mostra a informação que solicitou do banco foram de um array, apenas a que você indicar com o ID
   * @param {Request} req
   * @param {Response} res
   * @returns Retorna as informações fora de um array, passando Promise <USER>
   */

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
