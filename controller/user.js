const { remove } = require("../model/user");
const User = require("../model/user");
const bcrypt = require("bcryptjs");

exports.createuser = (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    hashed_password: req.body.hashed_password,
  });

  //create salt & hash
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.hashed_password, salt, (err, hash) => {
      if (err) return res.status(400).json({ error: err });
      user.hashed_password = hash;
      user.save((err, data) => {
        if (err) {
          return res.status(400).json({ error: err });
        } else {
          return res
            .status(200)
            .json({ message: "Funcionario cadastrado com sucesso" });
        }
      });
    });
  });
};
exports.readuser = (req, res) => {
  User.find({}, (err, data) => {
    if (err) {
      return res.status(400).json({ error: err });
    } else {
      return res.status(200).json({ data });
    }
  });
};
exports.updateuser = (req, res) => {
  console.log("hello world");
};
exports.deleteuser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    return res.status(400).json({ error: "Usuário não encontrado" });
  }
  user.remove();
  return res.status(200).json({ success: "Eliminado com sucesso" });
};
exports.updateoneuser = async (req, res) => {
  //name, email, phone, hashed_password
  const { name, email, phone, hashed_password, role } = req.body;
  const id = req.params.id;
  User.findOne({ _id: id }, (err, data) => {
    if (err || !data) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    if (!name) {
      return res.status(400).json({ error: "Campo nome está vázio" });
    } else {
      data.name = name;
    }
    if (!email) {
      return res.status(400).json({ error: "Campo email está vázio" });
    } else {
      data.email = email;
    }
    if (!phone) {
      return res.status(400).json({ error: "Campo Telefone está vázio" });
    } else {
      data.phone = phone;
    }
    if (!role) {
      return res.status(400).json({ error: "Campo Função está vázio" });
    } else {
      data.role = role;
    }
    if (!hashed_password) {
      return res.status(400).json({ error: "Campo Senha está vázio" });
    } else {
      data.hashed_password = hashed_password;
    }
    data.save((err, data) => {
      if (err) {
        return res.status(400).json({ error: err });
      } else {
        return res.json({
          message: "Dados do funcionario atualizado com sucesso",
        });
      }
    });
  });
};
exports.readoneuser = (req, res) => {
  const id = req.params.id;
  User.findOne({ _id: id }, (err, data) => {
    if (err) {
      return res.status(400).json({ error: err });
    } else {
      return res.json({ data });
    }
  });
};
