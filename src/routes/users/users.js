const express = require("express");
const router = express.Router({ mergeParams: true });

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { comparePassword, hashPassword } = require("../../utils/hash");
const {
  userRegisterationValidator,
  userUpdateValidator,
} = require("../../validation/index");

const { isLoggedIn, isAdmin } = require("../../middleware/auth");

router.get("/", isLoggedIn, getAllUsers);
router.post("/", registerUser);
router.put("/:id", isLoggedIn, updateUser);

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
    //make sure user doesn't already exist
    const user = await prisma.user.findFirst({
      where: {
        email: value.email,
      },
    });
    if (user) {
      return res.status(400).json({
        error: "User already exists",
      });
    }

    const Newuser = await prisma.user.create({
      data: {
        email: value.email,
        password: hashedPassword,
      },
    });
    res.json({
      Newuser,
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
}

async function updateUser(req, res) {
  try {
    const { value, error } = userUpdateValidator(req.body);
    if (error) {
      res.status(400).json({
        error: error.message,
      });
    }
    //check users id is same as password
    const user = await prisma.user.findFirst({
      where: {
        id: req.params.id,
      },
    });

    const hashedPassword = await hashPassword(value.previousPassword);

    //user.password is encrypted password
    if (!comparePassword(user.password, hashedPassword)) {
      return res.status(400).json({
        error: "Incorrect password",
      });
    }
    //compare passwords
    const isMatch = await comparePassword(
      value.previousPassword,
      hashedPassword
    );
    if (!isMatch) {
      return res.status(400).json({
        error: "Passwords do not match",
      });
    }

    

    if (value.password) {
      const hashedPassword = await hashPassword(value.password);
      const updatedUser = await prisma.user.update({
        where: {
          id: req.params.id,
        },
        data: {
          password: hashedPassword,
        },
      });
      res.json({
        updatedUser,
      });
    }

    if (value.newEmail) {
      const updatedUser = await prisma.user.update({
        where: {
          id: req.params.id,
        },
        data: {
          email: value.newEmail,
        },
      });

      res.json({
        updatedUser,
      });
    }
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
}

module.exports = router;
