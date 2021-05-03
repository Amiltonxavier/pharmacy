const path = require("path");
const User = require("../model/user");
const dotenv = require("dotenv");
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
dotenv.config();

exports.signin = (req, res) => {
  //const user = new User(req.body);
  const { email } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "O usuário com este email não existe",
      });
    }
    const validpPass = bcrypt.compareSync(
      req.body.hashed_password,
      user.hashed_password
    );
    if (!validpPass)
      return res.status(400).send("Email e password não correspodem");

    /* if (!user.authenticate(hashed_password)) {
      return res
        .status(401)
        .json({ error: "Email e password não correspodem" });
    }*/

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("t", token, { expire: new Date() + 999 });
    const { _id, name, email, phone, role } = user;

    return res.json({ token, user: { _id, name, email, phone, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "deslogado com sucesso" });
};

exports.requiredSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
  algorithms: ["sha1", "RS256", "HS256"],
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile == req.auth._id;
  if (!user) {
    return res
      .status(401)
      .json({ error: "Você não está Autenticado para realizar está ação!" });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  const role = req.user.role;
  console.log(role);
  if (role === 0) {
    return res
      .status(401)
      .json({ error: "Só pessoa de nível superior podem realizar está ação!" });
  }
  next();
};
