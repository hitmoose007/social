const express= require("express");
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
} = require("../../../../middleware/auth");

//router for creating a comment under a post
router.post("/:postId/comments/create", isLoggedIn, createComment);
//router for getting comments of friends
router.get("/:postId/comments/friends", isLoggedIn, getCommentsFriends);
//router for getting comments of a post
router.get("/:postId/comments", isLoggedIn, getCommentsPost);
//router for deleting users own comment
router.delete("/:postId/comments/:commentId", isLoggedIn, deleteComment);
//router for updating users own post
router.put("/:postId/comments/:commentId", isLoggedIn, updateComment);


async function createComment(req,res)
{
    try{
        const newComment = await prisma.comment.create({
            data:{
                userId:req.user.id,
                user:req.user.name,
                postId:req.params.postId,
                content:req.body.content,
                createdAt:new Date().toISOString(),
                updatedAt:new Date().toISOString(),
            }
        });
        res.json(newComment);
    }
    catch(error)
    {
        res.json({
            error:error.message,
        });
    }
}

async function getCommentsFriends(req,res){
    try{
        const comments = await prisma.comment.findMany({
            where:{
                userId:req.friend.friendId,
                postId:req.params.postId,
            },
            orderBy:{
                createdAt:"desc",
            }
        });
        res.json(comments);
    }
    catch(error)
    {
        res.json({
            error:error.message,
        });
    }
}

async function getCommentsPost(req,res){
    try{
        const comments = await prisma.comment.findMany({
            where:{
                postId:req.params.postId,
            },
            orderBy:{
                createdAt:"desc",
            }
        });
        res.json(comments);
    }
    catch(error)
    {
        res.json({
            error:error.message,
        });
    }
}

async function deleteComment(req,res){
    try{
        const comment = await prisma.comment.delete({
            where:{
                id:req.params.commentId,
            }
        });
        res.json(comment);
    }
    catch(error)
    {
        res.json({
            error:error.message,
        });
    }
}

async function updateComment(req,res){
    try{
        const comment = await prisma.comment.update({
            where:{
                id:req.params.commentId,
            },
            data:{
                content:req.body.content,
                updatedAt:new Date().toISOString(),
            }
        });
        res.json(comment);
    }
    catch(error)
    {
        res.json({
            error:error.message,
        });
    }
} 
module.exports=router;