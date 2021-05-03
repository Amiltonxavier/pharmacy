const Category = require("../model/category");

exports.createcatogory = async (req, res) => {
  const category = new Category(req.body);
  const haveCagotory = await Category.findOne({ name: category.name });
  if (haveCagotory)
    return res
      .status(400)
      .send("Cateogria já cadastrada, impossível cadastrar novamente");
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({ error: err });
    } else {
      return res.status(200).json({ data });
    }
  });
};

exports.readcatogory = async (req, res) => {
  Category.find({}, (err, data) => {
    if (err) {
      return res.status(400).json({ error: err });
    } else {
      return res.status(200).json({ data });
    }
  });
};
exports.deletecatogory = async (req, res) => {
  const id = req.params.id;
  const category = await Category.findById(id);
  if (!category) {
    return res
      .status(400)
      .json({ error: "Não foi possível Eliminar está category" });
  }
  category.remove();
  return res.status(400).json({ message: "Categoria eliminada com sucesso" });
};
exports.updatecatogory = async (req, res) => {
  const { name } = req.body;
  const id = req.params.id;
  Category.findOne({ _id: id }, (err, data) => {
    if (err || !data) {
      return res.status(400).json({ error: err });
    }
    if (!name) {
      return res
        .status(400)
        .json({ error: "Campo nome não pode estar vázio!" });
    } else {
      data.name = name;
    }

    data.save((err, data) => {
      if (err) {
        return res
          .status(400)
          .json({ error: "Correu um erro durante o processo!" });
      } else {
        return res
          .status(200)
          .json({ message: "Categoria atualizada com sucesso" });
      }
    });
  });
};
exports.readonecatogory = async (req, res) => {
  const id = req.params.id;
  Category.findOne({ _id: id }, (err, data) => {
    if (err) {
      return res.status(400).json({ error: err });
    } else {
      return res.status(200).json({ data });
    }
  });
};
