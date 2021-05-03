const router = require("express").Router();
const {
  createcatogory,
  readcatogory,
  deletecatogory,
  updatecatogory,
  readonecatogory,
} = require("../controller/category");
const { isAuth, isAdmin, requiredSignin } = require("../controller/auth");

router.post("/createcatogory", isAuth, requiredSignin, createcatogory);
router.get("/readcatogory", isAuth, readcatogory);
router.delete("/deletecatogory/:id", isAdmin, isAuth, deletecatogory);
router.put("/updatecatogory/:id", isAuth, requiredSignin, updatecatogory);
router.get("/readonecatogory/:id", isAuth, requiredSignin, readonecatogory);

module.exports = router;
