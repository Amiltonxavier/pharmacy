const formidable = require("formidable");
const Product = require("../model/product");
const fs = require("fs");
const _ = require("lodash");

exports.createproduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Está imagem não pode subir para o site",
      });
    }

    //checar todos os campos
    const { name, description, price, category, quantity, shipping } = fields;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "Todos os campos são Obrigatórios",
      });
    } //Termina o if

    let product = new Product(fields);

    //1kb = 100
    //1mb = 100000

    if (files.photo) {
      //console.log("Files photo: ", files.photo);
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Imagem o tamanho da imagem tem que ser menor que 1mb",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      if (err) {
        console.log("Erro ao criar o produto", err);
        return res.status(400).json({
          error: err,
        });
      }

      res.json(result);
    });
  });
};
