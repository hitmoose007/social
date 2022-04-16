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
} = require("../../middleware/auth");



//router to create a post
router.post("/", isLoggedIn, createPost);
//router to get posts of friends
router.get("/", isLoggedIn, getFriendPosts);
//router to get comments of on a post
router.get("/:postId/comments", isLoggedIn, getComments);
//router to like a post
router.post("/:postId/like", isLoggedIn, likePost);
//router to unlike a post
router.post("/:postId/unlike", isLoggedIn, unlikePost);
//router to delete a post of logged in user

router.delete("/:postId", isLoggedIn, deletePost);
//router to edit a post
router.put("/:postId", isLoggedIn, editPost);
//router to get a post
router.get("/:postId", isLoggedIn, getPost);


async function createPost(req, res) {

    
    try {
        const newPost = await prisma.post.create({
            data: {
                userId: req.user.id,
                user:req.user.name,
                content: req.body.content,
                image: req.body.image,
                likes: 0,
                comments: 0,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }
        });
    } catch (error) {
        res.json({
            error: error.message,
        });
    }
}
async function getFriendPosts(req, res) {
    //function to get friend's posts
    try {
        const posts = await prisma.post.findMany({
            where: {
                userId: req.friend.friendId,
            },
            orderBy: {
                createdAt: "desc"
            },
            include:{
                user:true,
            },
            select:{
                id:true,
                content:true,
                image:true,
                likes:true,
                comments:true,
                createdAt:true,
                updatedAt:true,
                user:true,
            }
        });
        res.json(posts);
    } catch (error) {
        res.json({
            error: error.message,
        });
    }
}

async function getComments(req, res) {
    //function to get comments on a post
    try {
        const comments = await prisma.comment.findMany({
            where: {
                postId: req.post.id,
            },
            orderBy: {
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

async function likePost(req,res){
    //function to like a post
    try {
        const post = await prisma.post.update({
            where: {
                id: req.post.id,
            },
            data: {
                likes: req.post.likes + 1,
            },
        });
        res.json(post);
    } catch (error) {
        res.json({
            error: error.message,
        });
    }    
}

async function unlikePost(req,res){
    //function to unlike a post
    try {
        const post = await prisma.post.update({
            where: {
                id: req.post.id,
            },
            data: {
                likes: req.post.likes - 1,
            },
        });
        res.json(post);
    } catch (error) {
        res.json({
            error: error.message,
        });
    }    
}

async function deletePost(req,res)
{
    //function to delete a post
    try {
        const post = await prisma.post.delete({
            where: {
                id: req.post.id,
                userId: req.user.id,
            },
            include:{
                comments:true,
            },

        });
        res.json(post);
    } catch (error) {
        res.json({
            error: error.message,
        });
    }
}

async function editPost(req,res){
    //function to edit a post
    try {
        const post = await prisma.post.update({
            where: {
                id: req.post.id,
                userId: req.user.id,
            },
            data: {
                content: req.body.content,
                image: req.body.image,
            },
        });
        res.json(post);
    } catch (error) {
        res.json({
            error: error.message,
        });
    }
}

async function getPost(req,res)
{
    //function to get a post
    try {
        const post = await prisma.post.findOne({
            where: {
                id: req.params.postId,
            },
            include:{
                user:true,
            },
            select:{
                id:true,
                content:true,
                image:true,
                likes:true,
                comments:true,
                createdAt:true,
                updatedAt:true,
                user:true,
            }
        });
        res.json(post);
    } catch (error) {
        res.json({
            error: error.message,
        });
    }
}
module.exports=router;
