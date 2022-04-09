const express = require("express");
const router = express.Router({ mergeParams: true });

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { isLoggedIn, isAdmin } = require("../../middleware/auth");

//make function to get user
router.get("/profile", isLoggedIn, getUser);

async function getUser(req, res) {
  try {
    const user = await prisma.user.findOne({
      where: {
        email: req.user.email,
      },
    });
    res.json(user);
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
}

module.exports=router;