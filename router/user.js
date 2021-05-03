const router = require("express").Router();
const {
  createuser,
  readuser,
  updateuser,
  deleteuser,
  readoneuser,
  updateoneuser,
} = require("../controller/user");
//Auth router
router.post("/createuser", createuser);
router.get("/readuser", readuser);
router.put("/updateuser/:id", updateuser);
router.delete("/deleteuser/:id", deleteuser);
router.get("/readoneuser/:id", readoneuser);
router.put("/updateoneuser/:id", updateoneuser);

module.exports = router;
