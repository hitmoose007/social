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
const {
    commentsCreateSchema,
    commentUpdateSchema
}=require("../../../../validation/comments");

router.post("/:postId/", isLoggedIn, createComment);
router.put("/:postId/:commentId/", isLoggedIn, updateComment);
router.delete("/:postId/:commentId/", isLoggedIn, deleteComment);

//router for creating a comment under a post

async function createComment(req, res) {

    const { value, error } = commentsCreateSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            error: error.message
        });
    }
    try {
        const post = await prisma.postComment.create({
            data: {
                content: value.content,
                author: {
                    connect: {
                        id: req.user.id
                    }
                },
                post:{
                    connect:{
                        id:req.params.postId
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

//function to update comment
async function updateComment(req,res){
    const {value,error}=commentUpdateSchema.validate(req.body);
    if(error){
        return res.status(400).json({
            error:error.message
        });
    }
    try{
        const comment=await prisma.postComment.update({
            where:{
                id:req.params.commentId
            },
            data:{
                content:value.content
            }
        });
        res.json(comment);
    }catch(error){
        res.json({
            error:error.message
        });
    }
}
//deleting comment here
async function deleteComment(req,res){
    try{
        const comment=await prisma.postComment.delete({
            where:{
                id:req.params.commentId
            }
        });
        res.json(comment);
    }catch(error){
        res.json({
            error:error.message
        });
    }
}


module.exports=router;