const express = require("express");
const router = express.Router();

const Controllers = require("../controller");

router.get("/", Controllers.User.getAllUsers);
router.post("/", Controllers.User.createUser);
router.patch("/", Controllers.User.updateUser);
router.get("/:id", Controllers.User.getUser);

module.exports = router;
