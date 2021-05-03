const router = require("express").Router();
const { createproduct } = require("../controller/product");

router.post("/createproduct", createproduct);
router.get("/");
//router.delete("/");
//router.put("");
//router.get("");

module.exports = router;
