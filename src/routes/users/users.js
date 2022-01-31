const express = require("express");
const router = express.Router({ mergeParams: true });

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { userRegisterationValidator } = require("../../validation/index");

router.get("/", getAllUsers);
router.post("/", createUser);

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

async function createUser(req, res) {
  try {
    //validation data using joi
    const { error } = userRegisterationValidator(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details,
      });
    }

    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      },
    });
    res.json(user);
  } catch (error) {
    handleServerError(req, res, error);
  }
  console.log(res);
}

module.exports = router;
