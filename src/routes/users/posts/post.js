const express = require("express");
const router = express.Router({
  mergeParams: true,
});
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { isLoggedIn, isAdmin } = require("../../../middleware/auth");

const { postSchema, postUpdateSchema } = require("../../../validation/posts");

router.post("/", isLoggedIn, createPost); //function to create a post
router.put("/:id", isLoggedIn, updatePost); //function to update a post
router.delete("/:id", isLoggedIn, deletePost); //function to delete a post
router.get("/", isLoggedIn, getPosts); //function to get posts of all friends chronologically

router.get("/user", isLoggedIn, getUserPosts); //function to get a post of a user his posts only chronologically

async function createPost(req, res) {
  const { value, error } = postSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
  try {
    const post = await prisma.post.create({
      data: {
        title: value.title,
        content: value.content,
        author: {
          connect: {
            id: req.user.id,
          },
        },
      },
    });
    res.json(post);
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
}

module.exports = router;

async function updatePost(req, res) {
  const { value, error } = postUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.message,
    });
  } //if we're doing it like facebook, shouldn't we get the string of content first
  //then allow the user to update the string itself rather than retyping the entire thing?
  //how would we implement that?

  try {
    const post = await prisma.post.update({
      where: {
        id: req.params.id,
      },
      data: {
        title: value.title,
        content: value.content,
      },
    });
    res.json(post);
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
}

async function deletePost(req, res) {
  try {
    const post = await prisma.post.delete({
      where: {
        id: req.params.id,
      },
    });
    res.json(post);
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
}

async function getPosts(req, res) {
  try {
    //find all the posts of a friend of a user
    const posts = await prisma.post.findMany({
      where: {
        authorId: req.friend.friendId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(posts);
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
}

async function getUserPosts(req, res) {
  try {
    const post = await prisma.post.findMany({
      where: {
        id: req.params.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(post);
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
}
