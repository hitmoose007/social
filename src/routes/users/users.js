const express = require("express");
const router = express.Router({ mergeParams: true });

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { comparePassword, hashPassword } = require("../../utils/hash");
const { userRegisterationValidator } = require("../../validation/index");

router.get("/", getAllUsers);
router.post("/", registerUser);

async function getAllUsers(req, res) {
  try {
    const users = await prisma.user.findMany({});
    res.json(users);
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
}

async function registerUser(req, res) {
  try {
    const { value, error } = userRegisterationValidator(req.body);
    if (error) {
      res.status(400).json({
        error: error.message,
      });
    }

    const hashedPassword = await hashPassword(value.password);
    const user = await prisma.user.create({
      data: {
        email: value.email,
        password: hashedPassword,
      },
    });
    res.json({
      user,
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
}

module.exports = router;
