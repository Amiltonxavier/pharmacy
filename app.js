const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRouter = require("./router/user");
const categoryRouter = require("./router/category");
const productRouter = require("./router/product");
const userAuth = require("./router/auth");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config();

mongoose
  .connect(process.env.Mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Banco de dados conecado com sucesso"))
  .catch(() => console.log("correu um erro ao conectar com o banco de dados"));
app.use(express.json());
app.use(morgan("dev"));
app.use("/api", userAuth);
app.use("/api", userRouter);
app.use("/api", categoryRouter);
app.use("/api", productRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running in this port ${port}`);
});
