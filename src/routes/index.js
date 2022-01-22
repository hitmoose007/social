const express = require("express");
const router = express.Router({mergeParams: true});

router.use("/users", require("./users"));

module.exports = router