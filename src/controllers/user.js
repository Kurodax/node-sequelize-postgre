const validador = require("validator");

// models
const User = require("../models/user");

module.exports = {
  /**
   * @description Buscar a tabela no db com nome de 'User' e mostra seu conteudo.
   * @param {Request} req
   * @param {Response} res
   * @returns {User[]} Retorna uma Promise<Response[]>
   */
  index: async (req, res) => {
    // TODO: trycath
    const response = await User.findAll();

    return res.json(response); // TODO: faltou o status
  },
  /**
   * @description Inclui no banco de dados as informações passada pelo usuario. OBS: Campos como email e phone apresenta validação de informação.
   * @param {Request} req
   * @param {Response} res
   * @returns TODO: cade o retorno ?
   */

  store: async (req, res) => {
    // TODO: trycath

    // TODO: desestruturação
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const phone = req.body.phone;

    /**
     * TODO: comentarios da função
     */
    const validaEmail = validador.isEmail(email); // TODO: não mistura ingles com portugues
    if (validaEmail === false) {
      // TODO: pesquisar operador chamado not (negação)
      return res.status(510).json({
        mensagem: "Email invalido.",
        validaEmail: validaEmail
      });
    }

    /**
     * TODO: comentarios da função
     */
    const validaPhone = validador.isMobilePhone(phone); // TODO: não mistura ingles com portugues
    if (validaPhone == false) {
      // TODO: Não é o padrão para igualdade
      return res.status(510).json({
        mensagem: "incluir apenas núemros no campo telefone",
        validaPhone: validaPhone
      });
    }

    const criar = await User.create({
      // TODO: utilizar nome de variavel em ingles
      name: name,
      username: username,
      password: password,
      email: email,
      phone: phone
    });

    return res.json(criar); // TODO: faltou o status
  },
  /**
   * @description Apaga um registro passado por paremtro da tabela usuário
   * @param {Request} req
   * @param {Response} res
   * @returns Retorna uma Promise<numeros>
   */
  deleta: async (req, res) => {
    // TODO: utilizar nome de variavel em ingles
    // TODO: trycath

    const deletadados = await User.destroy({
      // TODO: utilizar nome de variavel em ing
      where: {
        id: req.params.id
      }
    });
    if (deletadados === 0) {
      // TODO: pesquisar operador chamado not (negação)
      return res.status(404).json({
        mensagem: "Usuario não encontrado",
        deletadados: deletadados
      });
    }
    return res.status(200).json({
      mensagem: "Deletado com sucesso" // TODO: mensagem em ingles
    });
  },
  /**
   * @description Atualiza a informações da db User, passando o ID e no corpo as infoações que deseja atualizar.
   * @param {Request} req
   * @param {Response} res
   * @returns Retorna um Options.returning que sempre vai ser TRUE.
   */
  update: async (req, res) => {
    // TODO: desestruturar
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const phone = req.body.phone;

    const isUser = await User.findOne({
      where: { id: req.params.id }
    });

    if (isUser === null) {
      return res.status(401).json({
        mensagem: "Não existe está ID para alteraão.", // TODO: mesagem em ingles
      });
    }

    const [number, user] = await User.update(
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
        },
        returning: true,
      }
    );

    return res.status(200).json({
      message: "update user success",
      data: user
    });
  },
  /**
   * @description Mostrar informações de um único registro (usuário)
   * @param {Request} req
   * @param {Response} res
   * @returns Promise<User>
   */
  show: async (req, res) => {
    const mostra = await User.findOne({ // TODO: passar variavel para ingls
      where: {
        id: req.params.id
      }
    });

    if (mostra == null) { // TODO: operador igualdade e de negação
      return res.status(401).json({
        mensagem: "Item não encontrado"  // TODO: messagem em ingles
      });
    }
    return res.status(202).json({
      mensagem: "Item encontrado com sucesso.",
      mostra: mostra
    });
  }
};
