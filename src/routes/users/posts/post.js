const express = require("express");
const router = express.Router({
    mergeParams: true
});
const {
    PrismaClient
} = require("@prisma/client");
const prisma = new PrismaClient();
const {
    isLoggedIn,
    isAdmin
} = require("../../../middleware/auth");

const{postSchema,postUpdateSchema,postDeleteSchema} = require("../../../validation/posts");


// //router to get posts of friends
// router.get("/", isLoggedIn, getFriendPosts);
// //router to get comments of on a post
// router.get("/:postId/comments", isLoggedIn, getComments);

// //router to get a post
// router.get("/:postId", isLoggedIn, getPost);

// //router to create a post
router.post("/", isLoggedIn, createPost);
// //router to like a post
// router.post("/:postId/like", isLoggedIn, likePost);
// //router to unlike a post
// router.post("/:postId/unlike", isLoggedIn, unlikePost);
// //router to delete a post of logged in user

// router.delete("/:postId", isLoggedIn, deletePost);
// //router to edit a post
// router.put("/:postId", isLoggedIn, editPost);



async function createPost(req, res) {

    const { value, error } = postSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            error: error.message
        });
    }
    try {
        const post = await prisma.post.create({
            data: {
                title: value.title,
                content: value.content,
                author: {
                    connect: {
                        id: req.user.id
                    }
                }
            }
        });
        res.json(post);
    } catch (error) {
        res.json({
            error: error.message
        });
    }
}

module.exports=router;
