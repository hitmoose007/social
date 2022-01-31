router = require("express").Router({ mergeParams: true });
const { PrismaClient } = require("@prisma/client");
const { comparePassword, hashPassword } = require("../utils/hash");
const jwt = require("jsonwebtoken");

router.post("/login", login);
// router.post('/logout', logout);
// router.post('/forgot-password', forgotPassword);
// router.post('/reset-password', resetPassword);


}

async function login(req, res) {
  jwt.sign({ foo: "bar" }, "privateKey", function (err, token) {
      //print out error if there is one
        if (err) {
            console.log(err);
        }      
  });
}

module.exports = router;
