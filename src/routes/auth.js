router = require("express").Router({ mergeParams: true });
const { PrismaClient } = require("@prisma/client");
const { comparePassword, hashPassword } = require("../utils/hash");
const jwt = require("jsonwebtoken");

router.post("/login", login);
router.post('/register', register);
// router.post('/logout', logout);
// router.post('/forgot-password', forgotPassword);
// router.post('/reset-password', resetPassword);

async function register(req, res){
    const prisma = new PrismaClient();
    const { email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
        data: {
        email : email,
        password: hashedPassword,
        },
    });
    res.json({
        user,
    });
}

async function login(req, res) {
  jwt.sign({ foo: "bar" }, "privateKey", function (err, token) {
    res.json({
      token,
    });
  });
}

module.exports = router;
