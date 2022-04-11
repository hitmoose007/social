router = require("express").Router({ mergeParams: true });
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { comparePassword, hashPassword } = require("../utils/hash");
const jwt = require("jsonwebtoken");
const { loginValidator } = require("../validation/index");

router.post("/login", login);
// router.post('/logout', logout);
// router.post('/forgot-password', forgotPassword);
// router.post('/reset-password', resetPassword);

async function login(req, res) {
  console.log(req.body)
  const { value, error } = loginValidator(req.body);
  if (error) return res.status(400).json({ error: error.message });

  //compare passwords
  const user = await prisma.user.findFirst({
    where: {
      email: value.email,
    },
  });
  if (!user) return res.status(400).json({ error: "User not found" });

  const isMatch = await comparePassword(value.password, user.password);
  
  if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

  jwt.sign({ email: value.email}, "privateKey", {
      expiresIn: "2h",
  },function (err, token) {
    //print out error if there is one
    if (err) {
      console.log(err);
    }
    //return the token
    console.log(token)
    res.json({
      token,
    });
  });
}

module.exports = router;
