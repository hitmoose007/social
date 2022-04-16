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


//it says findOne is not a function and gives error
async function getUser(req, res) {
  try {
    const user = await prisma.user.findFirst({
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

/* "error": "\nInvalid `prisma.post.findMany()` invocation in\nC:\\Users\\Ali Abdullah\\OneDrive\\Desktop\\Vs code\\Social\\social\\src\\routes\\users\\profile.js:55:37\n\n   52 async function getPosts(req,res){\n   53   //function to get user's posts\n   54   try {\n→  55     const posts = await prisma.post.findMany({\n            where: {\n              userId: 'ckz9lnlsj000034uidpelrzlf'\n              ~~~~~~\n            },\n            orderBy: {\n              createdAt: 'desc'\n            }\n          })\n\nUnknown arg `userId` in where.userId for type PostWhereInput. Did you mean `authorId`? Available args:\ntype PostWhereInput {\n  AND?: PostWhereInput | List<PostWhereInput>\n  OR?: List<PostWhereInput>\n  NOT?: PostWhereInput | List<PostWhereInput>\n  id?: StringFilter | String\n  title?: StringFilter | String\n  content?: StringFilter | String\n  author?: UserRelationFilter | UserWhereInput\n  authorId?: StringFilter | String\n  createdAt?: DateTimeFilter | DateTime\n  updatedAt?: DateTimeFilter | DateTime\n  comments?: PostCommentListRelationFilter\n  likes?: PostLikeListRelationFilter\n  dislike?: PostDislikeListRelationFilter\n  share?: PostShareListRelationFilter\n}\n\n"*/
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

module.exports = router;