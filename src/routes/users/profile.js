const express = require("express");
const router = express.Router({ mergeParams: true });
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { isLoggedIn, isAdmin } = require("../../middleware/auth");

//make function to get user
router.get("/profile", isLoggedIn, getUser);
router.put("/profile/change", isLoggedIn, updateUser);
//router to get posts of the current logged in user
router.get("/posts", isLoggedIn, getPosts);
//router to get comments of current user
router.get("/comments", isLoggedIn, getComments);



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

async function updateUser(req, res) {
  try {
    const user = await prisma.user.update({
      where: {
        email: req.user.email,
      },
      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      },
    });
    res.json(user);
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
}

async function getPosts(req,res){
  //function to get user's posts
  try {
    const posts = await prisma.post.findMany({
      where: {
        userId: req.user.id,
      },
      orderBy:{
        createdAt: "desc"
      }
    });
    res.json(posts);
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
}

async function getComments(req,res){
  //function to get user's comments
  try {
    const comments = await prisma.comment.findMany({
      where: {
        userId: req.user.id,
      },
      orderBy:{
        createdAt: "desc"
      }
    });
    res.json(comments);
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
}

module.exports=router;